<?php

/**
 * @file
 * One-time migration helper for the legacy Drupal module.
 */

declare(strict_types=1);

/**
 * Migrates a legacy aichat installation to aiworker_chat.
 *
 * Run from the Drupal project root with `drush php:script`.
 */

$moduleHandler = \Drupal::moduleHandler();
if (!$moduleHandler->moduleExists('aichat')) {
  throw new RuntimeException('The legacy aichat module must be enabled before migration.');
}
if ($moduleHandler->moduleExists('aiworker_chat')) {
  throw new RuntimeException('The aiworker_chat module is already enabled.');
}

// Confirm that the new module files are discoverable before changing data.
\Drupal::service('extension.list.module')->getPath('aiworker_chat');

$legacyConfig = \Drupal::config('aichat.settings')->getRawData();
if ($legacyConfig === []) {
  throw new RuntimeException(
    'The legacy aichat.settings configuration is missing or empty.',
  );
}
$targetConfig = \Drupal::configFactory()->getEditable('aiworker_chat.settings');
if (!$targetConfig->isNew()) {
  throw new RuntimeException('aiworker_chat.settings already exists; refusing to overwrite it.');
}

$legacyStore = \Drupal::keyValue('aichat');
$targetStore = \Drupal::keyValue('aiworker_chat');
$legacySettings = $legacyStore->getAll();
if ($legacySettings === []) {
  throw new RuntimeException('The legacy aichat settings store is empty.');
}
if (empty($legacySettings['oauth_tokens']) || !is_string($legacySettings['oauth_tokens'])) {
  throw new RuntimeException(
    'The legacy OAuth connection was not found; no migration was performed.',
  );
}
if ($targetStore->getAll() !== []) {
  throw new RuntimeException('The aiworker_chat settings store is not empty; refusing to overwrite it.');
}

$chat877HasKey = FALSE;
foreach ($legacySettings as $key => $value) {
  if ((string) $key === 'chat_id' && (int) $value === 877) {
    $chat877HasKey = is_string($legacySettings['widget_key'] ?? NULL) && $legacySettings['widget_key'] !== '';
    break;
  }
  if (str_starts_with((string) $key, 'chat:') && str_ends_with((string) $key, ':chat_id') && (int) $value === 877) {
    $widgetKeyName = substr((string) $key, 0, -strlen(':chat_id')) . ':widget_key';
    $chat877HasKey = is_string($legacySettings[$widgetKeyName] ?? NULL) && $legacySettings[$widgetKeyName] !== '';
    break;
  }
}
if (!$chat877HasKey) {
  throw new RuntimeException('The chat 877 binding and its key were not found; no migration was performed.');
}

$sourceQueue = \Drupal::service('queue')->get('aichat_sync');
$targetQueue = \Drupal::service('queue')->get('aiworker_chat_sync');
if ($targetQueue->numberOfItems() > 0) {
  throw new RuntimeException('The aiworker_chat sync queue is not empty; resolve it before migration.');
}

// Copy queue payloads before uninstalling the old module. Roll back if a worker
// still owns an item or Drupal cannot insert every item into the new queue.
$expectedQueueItems = $sourceQueue->numberOfItems();
$claimedItems = [];
try {
  while (count($claimedItems) < $expectedQueueItems && ($item = $sourceQueue->claimItem(30))) {
    $claimedItems[] = $item;
    if ($targetQueue->createItem($item->data) === FALSE) {
      throw new RuntimeException('A queued sync item could not be copied.');
    }
  }
  if (count($claimedItems) !== $expectedQueueItems) {
    throw new RuntimeException('Some legacy sync items are still claimed by a worker.');
  }
  foreach ($claimedItems as $item) {
    $sourceQueue->deleteItem($item);
  }
}
catch (Throwable $exception) {
  $targetQueue->deleteQueue();
  foreach ($claimedItems as $item) {
    $sourceQueue->releaseItem($item);
  }
  throw $exception;
}

// Keep the encrypted OAuth token in the new store. Removing only the old copy
// prevents the legacy uninstall hook from revoking the token copied above.
$targetStore->setMultiple($legacySettings);
$legacyStore->delete('oauth_tokens');
$targetConfig->setData($legacyConfig)->save();

$state = \Drupal::state();
$lastEnqueued = $state->get('aichat.last_enqueued');
if ($lastEnqueued !== NULL) {
  $state->set('aiworker_chat.last_enqueued', $lastEnqueued);
}
\Drupal::service('cache_tags.invalidator')->invalidateTags(['aichat', 'aichat_widget']);

$installer = \Drupal::service('module_installer');
$installer->uninstall(['aichat']);
$installer->install(['aiworker_chat']);
\Drupal::service('cache_tags.invalidator')->invalidateTags(['aiworker_chat', 'aiworker_chat_widget']);

fwrite(STDOUT, "Migration complete. The chat binding, keys, and connection were copied without displaying their values.\n");
