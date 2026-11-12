<?php

namespace Drupal\aiworker_chat;

use Drush\Drush;
use Drupal\user\Entity\User;
use Drupal\Core\Url;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Cache\CacheTagsInvalidatorInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\KeyValueStore\KeyValueFactoryInterface;
use Drupal\Core\Language\LanguageManagerInterface;
use Drupal\Core\Lock\LockBackendInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\Core\Queue\QueueFactory;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Session\AccountSwitcherInterface;
use Drupal\Core\Site\Settings;
use Drupal\aiworker_chat\Common\AbstractHost;
use Drupal\aiworker_chat\Common\HtmlToText;
use Drupal\aiworker_chat\Common\TokenCrypto;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Drupal services and content export implementation for php-common.
 */
class DrupalHost extends AbstractHost {

  /**
   * The adapter's key-value storage wrapper.
   *
   * @var \Drupal\aiworker_chat\DrupalStorage
   */
  private DrupalStorage $storage;

  public function __construct(
    private readonly ConfigFactoryInterface $configFactory,
    KeyValueFactoryInterface $keyValueFactory,
    private readonly CacheBackendInterface $cache,
    private readonly CacheTagsInvalidatorInterface $cacheTagsInvalidator,
    LockBackendInterface $lock,
    private readonly RequestStack $requestStack,
    private readonly AccountProxyInterface $currentUser,
    private readonly EntityTypeManagerInterface $entityTypeManager,
    private readonly AccountSwitcherInterface $accountSwitcher,
    private readonly RendererInterface $renderer,
    private readonly LanguageManagerInterface $languageManager,
    private readonly ModuleHandlerInterface $moduleHandler,
    private readonly Connection $database,
    private readonly QueueFactory $queueFactory,
    private readonly EntityFieldManagerInterface $entityFieldManager,
  ) {
    $this->storage = new DrupalStorage($keyValueFactory->get('aiworker_chat'), $lock);
  }

  /**
   * Returns the Drupal platform machine name.
   */
  public function platform(): string {
    return 'drupal';
  }

  /**
   * Returns the human-readable platform name.
   */
  public function platformLabel(): string {
    return 'Drupal';
  }

  /**
   * Returns the adapter version.
   */
  public function version(): string {
    return '0.1.1';
  }

  /**
   * Returns the configured AI Worker base URL.
   */
  public function base(): string {
    return self::normalizeBase((string) $this->configFactory->get('aiworker_chat.settings')->get('base'));
  }

  /**
   * Returns the normalized public URL of this Drupal site.
   */
  public function siteHome(): string {
    $configured = trim((string) $this->configFactory->get('aiworker_chat.settings')->get('site_url'));
    if ($configured !== '') {
      return self::normalizeSiteUrl($configured);
    }
    $stored = trim((string) $this->settingGet('site_home', ''));
    if ($stored !== '') {
      return self::normalizeSiteUrl($stored);
    }
    $drushUri = $this->drushUri();
    if ($drushUri !== '') {
      return self::normalizeSiteUrl($drushUri);
    }
    throw new \RuntimeException('Set the Site URL in AI Worker Chat settings, visit the admin page once, or pass --uri to Drush before syncing.');
  }

  /**
   * Returns the host name of this Drupal site.
   */
  public function siteHost(): string {
    return strtolower((string) parse_url($this->siteHome(), PHP_URL_HOST));
  }

  /**
   * Returns the absolute OAuth callback URL.
   */
  public function callbackUrl(): string {
    return Url::fromRoute('aiworker_chat.api.callback', [], ['absolute' => TRUE])->toString();
  }

  /**
   * Builds the absolute administration page URL.
   */
  public function adminPageUrl(array $query = []): string {
    return Url::fromRoute('aiworker_chat.admin', [], ['absolute' => TRUE, 'query' => $query])->toString();
  }

  /**
   * Returns the normalized administration language code.
   */
  public function adminLanguage(): string {
    return self::normalizeLanguage($this->languageManager->getCurrentLanguage()->getId());
  }

  /**
   * Returns the current Drupal user identifier.
   */
  public function userKey(): string {
    return 'uid:' . (string) $this->currentUser->id();
  }

  /**
   * Returns the site hash salt used to encrypt OAuth tokens.
   */
  public function secret(): string {
    return Settings::getHashSalt();
  }

  /**
   * Creates the OAuth token encryption service.
   */
  public function createTokenCrypto(): TokenCrypto {
    return new TokenCrypto($this->secret());
  }

  /**
   * Reads a value from the adapter key-value store.
   */
  public function settingGet(string $key, $default = NULL) {
    return $this->storage->get($key, $default);
  }

  /**
   * Stores a value and invalidates related widget caches.
   */
  public function settingPut(string $key, $value): void {
    $this->storage->put($key, $value);
    if (self::shouldInvalidateWidgetSetting($key)) {
      $this->invalidateWidget();
    }
  }

  /**
   * Removes a stored value and invalidates related widget caches.
   */
  public function settingForget(string $key): void {
    $this->storage->forget($key);
    if (self::shouldInvalidateWidgetSetting($key)) {
      $this->invalidateWidget();
    }
  }

  /**
   * Checks whether a setting affects rendered widget output.
   */
  public static function shouldInvalidateWidgetSetting(string $key): bool {
    if (in_array($key, ['widget_key', 'widget_options', 'sync_options', 'chat_registry'], TRUE)) {
      return TRUE;
    }
    return preg_match('/^chat:[^:]+:(?:widget_key|widget_options|sync_options)$/', $key) === 1;
  }

  /**
   * Removes all adapter settings.
   */
  public function settingsClear(): void {
    $this->storage->clear();
    $this->invalidateWidget();
    $this->cacheTagsInvalidator->invalidateTags(['aiworker_chat']);
  }

  /**
   * Reads an item from the adapter cache.
   */
  public function cacheGet(string $key) {
    $entry = $this->cache->get('aiworker_chat:' . hash('sha256', $key));
    return $entry ? $entry->data : NULL;
  }

  /**
   * Stores an item in the adapter cache.
   */
  public function cacheSet(string $key, $value, int $ttl): void {
    $this->cache->set('aiworker_chat:' . hash('sha256', $key), $value, time() + max(1, $ttl), ['aiworker_chat']);
  }

  /**
   * Removes an item from the adapter cache.
   */
  public function cacheDelete(string $key): void {
    $this->cache->delete('aiworker_chat:' . hash('sha256', $key));
  }

  /**
   * Acquires a namespaced lock for a limited time.
   */
  public function lockAcquire(string $name, int $ttl): bool {
    return $this->storage->acquire($name, $ttl);
  }

  /**
   * Releases a namespaced lock.
   */
  public function lockRelease(string $name): void {
    $this->storage->release($name);
  }

  /**
   * Adds a knowledge synchronization item to Drupal Queue API.
   */
  public function enqueueSync(array $data): bool {
    $this->queueFactory->get('aiworker_chat_sync')->createItem($data);
    return TRUE;
  }

  /**
   * Reads a value from the active Drupal session.
   */
  public function sessionGet(string $key) {
    $request = $this->requestStack->getCurrentRequest();
    return $request && $request->hasSession() ? $request->getSession()->get('aiworker_chat.' . $key) : NULL;
  }

  /**
   * Stores a value in the active Drupal session.
   */
  public function sessionPut(string $key, $value): void {
    $request = $this->requestStack->getCurrentRequest();
    if (!$request || !$request->hasSession()) {
      throw new \RuntimeException('An active Drupal session is required to start OAuth.');
    }
    $request->getSession()->set('aiworker_chat.' . $key, $value);
  }

  /**
   * Removes a value from the active Drupal session.
   */
  public function sessionForget(string $key): void {
    $request = $this->requestStack->getCurrentRequest();
    if ($request && $request->hasSession()) {
      $request->getSession()->remove('aiworker_chat.' . $key);
    }
  }

  /**
   * Save the active origin for later CLI and cron operations. */
  public function rememberSiteHome(Request $request): void {
    $this->settingPut('site_home', $request->getSchemeAndHttpHost() . $request->getBasePath() . '/');
  }

  /**
   * Return public node documents, one document for each public translation.
   */
  public function pageDocuments(): iterable {
    $this->exportBegin('pages');
    $storage = $this->entityTypeManager->getStorage('node');
    $bundles = $this->pageSources()['bundles'] ?? [];
    $query = $storage->getQuery()->accessCheck(FALSE)->condition('status', 1)->sort('nid')->range(0, 2000);
    if ($bundles) {
      $query->condition('type', $bundles, 'IN');
    }
    $anonymous = User::getAnonymousUser();
    $converter = new HtmlToText();
    $count = 0;
    $nids = $query->execute();
    if (count($nids) >= 2000) {
      $this->exportStopped('pages', 'node:' . end($nids));
    }
    $siteHome = $this->siteHome();
    $aliases = $this->pathAliasMarkers(array_map('intval', $nids));
    foreach ($storage->loadMultiple($nids) as $node) {
      $translations = [];
      foreach ($node->getTranslationLanguages() as $langcode => $language) {
        if (!$node->hasTranslation($langcode)) {
          continue;
        }
        $translation = $node->getTranslation($langcode);
        if (!$translation->isPublished() || !$translation->access('view', $anonymous)) {
          continue;
        }
        try {
          $translations[$langcode] = self::absolutePageUrl($siteHome, $aliases[(int) $node->id()][$langcode] ?? '/node/' . $node->id());
        }
        catch (\Throwable) {
          $this->exportFailed('pages', 'node:' . $node->id() . ':' . $langcode, 'url_failed');
          continue;
        }
      }
      foreach ($translations as $langcode => $url) {
        if ($count >= 2000) {
          $this->exportStopped('pages', 'node:' . $node->id() . ':' . $langcode);
          return;
        }
        $translation = $node->getTranslation($langcode);
        try {
          $switched = FALSE;
          $this->accountSwitcher->switchTo($anonymous);
          $switched = TRUE;
          try {
            $render = $this->entityTypeManager->getViewBuilder('node')->view($translation, 'full', $langcode);
            $html = (string) $this->renderer->renderInIsolation($render);
          }
          finally {
            if ($switched) {
              $this->accountSwitcher->switchBack();
            }
          }
          if ($converter->isNoIndex($html)) {
            $this->exportOmitted('pages', 'node:' . $node->id() . ':' . $langcode);
            continue;
          }
          $converted = $converter->convert($html);
          $content = trim((string) ($converted['content'] ?? ''));
          if ($content === '') {
            $this->exportOmitted('pages', 'node:' . $node->id() . ':' . $langcode);
            continue;
          }
          yield self::pageDocument(
            (string) $translation->id(),
            $langcode,
            $url,
            (string) $translation->label(),
            (int) $translation->getChangedTime(),
            $content,
            $translations,
          );
          $count++;
        }
        catch (\Throwable) {
          // A rendering exception skips this translation without stopping
          // the queue. The walk is then incomplete, so the existing document
          // on kra.name stays.
          $this->exportFailed('pages', 'node:' . $node->id() . ':' . $langcode, 'render_failed');
        }
      }
    }
  }

  /**
   * Builds the index of eligible Drupal pages.
   */
  public function pageIndex(): iterable {
    $this->exportBegin('pages');
    $storage = $this->entityTypeManager->getStorage('node');
    $bundles = $this->pageSources()['bundles'] ?? [];
    $anonymous = User::getAnonymousUser();
    $this->accountSwitcher->switchTo($anonymous);
    try {
      $query = $storage->getQuery()->accessCheck(TRUE)->condition('status', 1)->sort('nid')->range(0, 2000);
      if ($bundles) {
        $query->condition('type', $bundles, 'IN');
      }
      $nids = array_values($query->execute());
    }
    catch (\Throwable) {
      $this->exportFailed('pages', 'query', 'query_failed');
      return [];
    }
    finally {
      $this->accountSwitcher->switchBack();
    }
    if (count($nids) >= 2000) {
      $this->exportStopped('pages', 'node:' . end($nids));
    }
    if (!$nids) {
      return [];
    }

    try {
      $database = $this->database;
      $query = $database->select('node_field_data', 'n')
        ->fields('n', ['nid', 'langcode', 'title', 'changed', 'status', 'type', 'vid', 'default_langcode'])
        ->condition('nid', $nids, 'IN')->condition('status', 1)->orderBy('nid')->orderBy('langcode');
      if ($bundles) {
        $query->condition('type', $bundles, 'IN');
      }
      $records = $query->execute()->fetchAll(\PDO::FETCH_ASSOC);
    }
    catch (\Throwable) {
      $this->exportFailed('pages', 'query', 'query_failed');
      return [];
    }

    $aliases = $this->pathAliasMarkers($nids);
    $references = $this->nodeReferenceMarkers($nids);
    $translations = [];
    foreach ($records as $record) {
      $nid = (int) $record['nid'];
      $langcode = (string) $record['langcode'];
      $translations[$nid][$langcode] = $aliases[$nid][$langcode] ?? '/node/' . $nid;
    }
    $index = [];
    foreach ($records as $record) {
      $nid = (int) $record['nid'];
      $langcode = (string) $record['langcode'];
      $record['alias'] = $aliases[$nid][$langcode] ?? '/node/' . $nid;
      $record['translations'] = $translations[$nid] ?? [];
      $record['references'] = $references[$nid]['values'] ?? [];
      $marker = !empty($references[$nid]['trustworthy']) ? self::pageMarker($record) : NULL;
      $index[] = ['id' => 'node:' . $nid . ':' . $langcode, 'marker' => $marker];
    }
    return $index;
  }

  /**
   * Exports selected publicly viewable Drupal pages.
   */
  public function pageDocumentsByIds(array $ids): iterable {
    $requested = [];
    foreach ($ids as $id) {
      if (preg_match('/^node:(\d+):([A-Za-z0-9_-]+)$/', (string) $id, $match)) {
        $requested[(int) $match[1]][$match[2]] = TRUE;
      }
    }
    if (!$requested) {
      return [];
    }
    $nids = array_keys($requested);
    try {
      $records = $this->database->select('node_field_data', 'n')
        ->fields('n', ['nid', 'langcode', 'title', 'changed', 'status', 'type'])
        ->condition('nid', $nids, 'IN')->condition('status', 1)->orderBy('nid')->orderBy('langcode')
        ->execute()->fetchAll(\PDO::FETCH_ASSOC);
    }
    catch (\Throwable) {
      $this->exportFailed('pages', 'query', 'query_failed');
      return [];
    }
    $nodes = $this->entityTypeManager->getStorage('node')->loadMultiple($nids);
    $anonymous = User::getAnonymousUser();
    $converter = new HtmlToText();
    $documents = [];
    $aliases = $this->pathAliasMarkers($nids);
    $siteHome = $this->siteHome();
    $resolved = [];
    foreach ($nodes as $node) {
      foreach ($records as $record) {
        if ((int) $record['nid'] !== (int) $node->id()) {
          continue;
        }
        $langcode = (string) $record['langcode'];
        if (empty($requested[(int) $node->id()][$langcode]) || !$node->hasTranslation($langcode)) {
          continue;
        }
        $id = 'node:' . $node->id() . ':' . $langcode;
        $resolved[$id] = TRUE;
        $translation = $node->getTranslation($langcode);
        if (!$translation->isPublished() || !$translation->access('view', $anonymous)) {
          $this->exportOmitted('pages', $id);
          continue;
        }
        try {
          $this->accountSwitcher->switchTo($anonymous);
          try {
            $render = $this->entityTypeManager->getViewBuilder('node')->view($translation, 'full', $langcode);
            $html = (string) $this->renderer->renderInIsolation($render);
          }
          finally {
            $this->accountSwitcher->switchBack();
          }
          if ($converter->isNoIndex($html)) {
            $this->exportOmitted('pages', $id);
            continue;
          }
          $converted = $converter->convert($html);
          $content = trim((string) ($converted['content'] ?? ''));
          if ($content === '') {
            $this->exportOmitted('pages', $id);
            continue;
          }
          $translationUrls = [];
          foreach ($node->getTranslationLanguages() as $translationCode => $unused) {
            $translationUrls[$translationCode] = self::absolutePageUrl($siteHome, $aliases[(int) $node->id()][$translationCode] ?? '/node/' . $node->id());
          }
          $url = self::absolutePageUrl($siteHome, $aliases[(int) $node->id()][$langcode] ?? '/node/' . $node->id());
          $documents[] = self::pageDocument((string) $translation->id(), $langcode,
            $url, (string) $translation->label(),
            (int) $translation->getChangedTime(), $content, $translationUrls);
        }
        catch (\Throwable) {
          $this->exportFailed('pages', 'node:' . $node->id() . ':' . $langcode, 'render_failed');
        }
      }
    }
    foreach ($requested as $nid => $languages) {
      foreach ($languages as $langcode => $unused) {
        $id = 'node:' . $nid . ':' . $langcode;
        if (!isset($resolved[$id])) {
          $this->exportOmitted('pages', $id);
        }
      }
    }
    return $documents;
  }

  /**
   * Builds an absolute page URL from a site URL and path.
   */
  public static function absolutePageUrl(string $siteHome, string $path): string {
    return rtrim($siteHome, '/') . '/' . ltrim($path, '/');
  }

  /**
   * Creates a change marker for an indexed page.
   */
  public static function pageMarker(array $record): string {
    $markerFields = [
      'nid',
      'langcode',
      'title',
      'changed',
      'status',
      'type',
      'vid',
      'default_langcode',
      'alias',
      'translations',
      'references',
    ];
    $fields = array_intersect_key($record, array_flip($markerFields));
    return hash('sha256', json_encode($fields, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
  }

  /**
   * Builds change markers for selected Drupal path aliases.
   */
  private function pathAliasMarkers(array $nids): array {
    if (!$nids || !$this->database->schema()->tableExists('path_alias')) {
      return [];
    }
    $paths = array_map(static fn ($nid) => '/node/' . (int) $nid, $nids);
    $records = $this->database->select('path_alias', 'p')
      ->fields('p', ['path', 'langcode', 'alias', 'status', 'id'])
      ->condition('path', $paths, 'IN')->condition('status', 1)->orderBy('id')->execute()->fetchAll(\PDO::FETCH_ASSOC);
    $aliases = [];
    foreach ($records as $record) {
      if (preg_match('#^/node/(\d+)$#', (string) $record['path'], $match)) {
        $aliases[(int) $match[1]][(string) $record['langcode']] = (string) $record['alias'];
      }
    }
    return $aliases;
  }

  /**
   * Builds change markers for referenced node fields.
   */
  private function nodeReferenceMarkers(array $nids): array {
    $result = [];
    foreach ($nids as $nid) {
      $result[(int) $nid] = ['values' => [], 'trustworthy' => TRUE];
    }
    try {
      $definitions = $this->entityFieldManager->getFieldStorageDefinitions('node');
      $database = $this->database;
      foreach ($definitions as $name => $definition) {
        if (!in_array($definition->getType(), ['entity_reference', 'entity_reference_revisions'], TRUE)) {
          continue;
        }
        $table = 'node__' . $name;
        if (!$database->schema()->tableExists($table) || !$database->schema()->fieldExists($table, 'target_id')) {
          continue;
        }
        $columns = ['entity_id', 'langcode', 'target_id'];
        if ($database->schema()->fieldExists($table, 'target_revision_id')) {
          $columns[] = 'target_revision_id';
        }
        $rows = $database->select($table, 'r')->fields('r', $columns)->condition('entity_id', $nids, 'IN')->orderBy('entity_id')->orderBy('delta')->execute()->fetchAll(\PDO::FETCH_ASSOC);
        $targetType = (string) $definition->getSetting('target_type');
        $entityType = $this->entityTypeManager->getDefinition($targetType, FALSE);
        $baseTable = $entityType ? $entityType->getDataTable() ?: $entityType->getBaseTable() : NULL;
        $idKey = $entityType ? $entityType->getKey('id') : NULL;
        $hasChanged = $baseTable && $database->schema()->fieldExists($baseTable, 'changed');
        foreach ($rows as $row) {
          $nid = (int) $row['entity_id'];
          $entry = [
            'field' => (string) $name,
            'target_id' => (string) $row['target_id'],
            'target_revision_id' => (string) ($row['target_revision_id'] ?? ''),
          ];
          if ($hasChanged && $idKey) {
            $entry['target_changed'] = (int) $database->select($baseTable, 't')->fields('t', ['changed'])->condition($idKey, $row['target_id'])->range(0, 1)->execute()->fetchField();
          }
          else {
            $result[$nid]['trustworthy'] = FALSE;
          }
          $result[$nid]['values'][] = $entry;
        }
      }
    }
    catch (\Throwable) {
      foreach ($result as &$row) {
        $row['trustworthy'] = FALSE;
      }
      unset($row);
    }
    return $result;
  }

  /**
   * Formats an exported Drupal page document.
   */
  public static function pageDocument(string $nid, string $langcode, string $url, string $title, int $changed, string $content, array $translations = []): array {
    $doc = [
      'id' => 'node:' . $nid . ':' . $langcode,
      'url' => $url,
      'title' => $title,
      'lang' => $langcode,
      'type' => 'page',
      'modified' => gmdate('c', $changed),
      'content' => $content,
    ];
    if (count($translations) > 1) {
      $doc['translations'] = $translations;
    }
    return $doc;
  }

  /**
   * Checks whether Drupal Commerce Product is enabled.
   */
  public function productsAvailable(): bool {
    return $this->moduleHandler->moduleExists('commerce_product');
  }

  /**
   * Builds the index of eligible Commerce products.
   */
  public function productIndex(): iterable {
    $this->exportBegin('products');
    if (!$this->productsAvailable()) {
      return [];
    }
    try {
      $storage = $this->entityTypeManager->getStorage('commerce_product');
      $query = $storage->getQuery()->accessCheck(FALSE)->condition('status', 1)->sort('product_id')->range(0, 501);
      $ids = array_values($query->execute());
      if (count($ids) >= 500) {
        $this->exportStopped('products', (string) $ids[499]);
      }
      if (!$ids) {
        return [];
      }

      $database = $this->database;
      $productRows = $database->select('commerce_product_field_data', 'p')
        ->fields('p', ['product_id', 'langcode', 'title', 'changed', 'status', 'type', 'default_langcode'])
        ->condition('product_id', $ids, 'IN')->condition('status', 1)->orderBy('product_id')->orderBy('langcode')
        ->execute()->fetchAll(\PDO::FETCH_ASSOC);
      $links = $database->select('commerce_product__variations', 'v')
        ->fields('v', ['entity_id', 'langcode', 'delta', 'variations_target_id'])
        ->condition('entity_id', $ids, 'IN')->orderBy('entity_id')->orderBy('delta')->execute()->fetchAll(\PDO::FETCH_ASSOC);
      $variationIds = array_values(array_unique(array_map(static fn ($row) => (int) $row['variations_target_id'], $links)));
      $variations = [];
      if ($variationIds) {
        $variationRows = $database->select('commerce_product_variation_field_data', 'v')
          ->fields('v', ['variation_id', 'sku', 'price_number', 'price_currency_code', 'status', 'changed'])
          ->condition('variation_id', $variationIds, 'IN')->orderBy('variation_id')->execute()->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($variationRows as $row) {
          $variations[(int) $row['variation_id']] = $row;
        }
      }
      $byProduct = [];
      foreach ($links as $link) {
        $variationId = (int) $link['variations_target_id'];
        $row = $variations[$variationId] ?? ['variation_id' => $variationId, 'missing' => TRUE];
        $byProduct[(int) $link['entity_id']][] = $row;
      }
      $aliases = $this->productPathAliasMarkers($ids);
      $references = $this->productReferenceMarkers($ids);
      $result = [];
      foreach ($productRows as $row) {
        $productId = (int) $row['product_id'];
        $row['variations'] = $byProduct[$productId] ?? [];
        $result[$productId] = $result[$productId] ?? [
          'id' => (string) $productId,
          'variations' => [],
          'aliases' => $aliases[$productId] ?? [],
          'references' => $references[$productId]['values'] ?? [],
          'references_trustworthy' => $references[$productId]['trustworthy'] ?? TRUE,
        ];
        $result[$productId]['languages'][(string) $row['langcode']] = [
          'langcode' => (string) $row['langcode'], 'title' => (string) $row['title'], 'changed' => (int) $row['changed'],
          'status' => (int) $row['status'], 'type' => (string) $row['type'], 'default_langcode' => (int) $row['default_langcode'],
        ];
        $result[$productId]['variations'] = $row['variations'];
      }
      foreach ($result as $productId => $row) {
        $result[$productId]['marker'] = !empty($row['references_trustworthy']) ? self::productMarker($row) : NULL;
        $result[$productId]['variation_ids'] = array_map(static fn ($variation) => (string) $variation['variation_id'], $row['variations']);
      }
      return array_values($result);
    }
    catch (\Throwable) {
      $this->exportFailed('products', 'query', 'query_failed');
      return [];
    }
  }

  /**
   * Exports selected Commerce products.
   */
  public function productDocumentsByIds(array $ids): iterable {
    return $this->productRowsForIds(500, array_map('intval', $ids));
  }

  /**
   * Creates a change marker for an indexed product.
   */
  public static function productMarker(array $row): string {
    return hash('sha256', json_encode($row, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
  }

  /**
   * Builds change markers for selected product aliases.
   */
  private function productPathAliasMarkers(array $productIds): array {
    $database = $this->database;
    if (!$productIds || !$database->schema()->tableExists('path_alias')) {
      return [];
    }
    $paths = array_map(static fn ($id) => '/product/' . (int) $id, $productIds);
    $records = $database->select('path_alias', 'p')
      ->fields('p', ['path', 'langcode', 'alias', 'status', 'id'])
      ->condition('path', $paths, 'IN')->condition('status', 1)->orderBy('id')->execute()->fetchAll(\PDO::FETCH_ASSOC);
    $aliases = [];
    foreach ($records as $record) {
      if (preg_match('#^/product/(\d+)$#', (string) $record['path'], $match)) {
        $aliases[(int) $match[1]][(string) $record['langcode']] = (string) $record['alias'];
      }
    }
    return $aliases;
  }

  /**
   * Builds change markers for referenced product fields.
   */
  private function productReferenceMarkers(array $productIds): array {
    $result = [];
    foreach ($productIds as $productId) {
      $result[(int) $productId] = ['values' => [], 'trustworthy' => TRUE];
    }
    try {
      $definitions = $this->entityFieldManager->getFieldStorageDefinitions('commerce_product');
      $database = $this->database;
      foreach ($definitions as $name => $definition) {
        if (!in_array($definition->getType(), ['entity_reference', 'entity_reference_revisions'], TRUE)) {
          continue;
        }
        $table = 'commerce_product__' . $name;
        if (!$database->schema()->tableExists($table) || !$database->schema()->fieldExists($table, 'target_id')) {
          continue;
        }
        $columns = ['entity_id', 'langcode', 'target_id'];
        if ($database->schema()->fieldExists($table, 'target_revision_id')) {
          $columns[] = 'target_revision_id';
        }
        $rows = $database->select($table, 'r')->fields('r', $columns)->condition('entity_id', $productIds, 'IN')->orderBy('entity_id')->orderBy('delta')->execute()->fetchAll(\PDO::FETCH_ASSOC);
        $targetType = (string) $definition->getSetting('target_type');
        $entityType = $this->entityTypeManager->getDefinition($targetType, FALSE);
        $baseTable = $entityType ? ($entityType->getDataTable() ?: $entityType->getBaseTable()) : NULL;
        $idKey = $entityType ? $entityType->getKey('id') : NULL;
        $hasChanged = $baseTable && $database->schema()->fieldExists($baseTable, 'changed');
        foreach ($rows as $row) {
          $productId = (int) $row['entity_id'];
          $entry = [
            'field' => (string) $name,
            'target_id' => (string) $row['target_id'],
            'target_revision_id' => (string) ($row['target_revision_id'] ?? ''),
          ];
          if ($hasChanged && $idKey) {
            $entry['target_changed'] = (int) $database->select($baseTable, 't')->fields('t', ['changed'])->condition($idKey, $row['target_id'])->range(0, 1)->execute()->fetchField();
          }
          else {
            $result[$productId]['trustworthy'] = FALSE;
          }
          $result[$productId]['values'][] = $entry;
        }
      }
    }
    catch (\Throwable) {
      foreach ($result as &$row) {
        $row['trustworthy'] = FALSE;
      }
      unset($row);
    }
    return $result;
  }

  /**
   * Loads published Commerce products for synchronization.
   */
  public function productRows(int $cap): iterable {
    return $this->productRowsForIds($cap, []);
  }

  /**
   * Loads selected published Commerce products.
   */
  private function productRowsForIds(int $cap, array $filterIds): iterable {
    if (!$filterIds) {
      $this->exportBegin('products');
    }
    if (!$this->productsAvailable() || $cap < 1) {
      return [];
    }
    $cap = min(500, $cap);
    $storage = $this->entityTypeManager->getStorage('commerce_product');
    $query = $storage->getQuery()->accessCheck(FALSE)->condition('status', 1)->sort('product_id');
    if ($filterIds) {
      $query->condition('product_id', $filterIds, 'IN');
    }
    $ids = $query->range(0, $cap)->execute();
    if (count($ids) >= $cap) {
      $this->exportStopped('products', (string) end($ids));
    }
    $rows = [];
    $converter = new HtmlToText();
    foreach ($storage->loadMultiple($ids) as $product) {
      foreach ($product->getTranslationLanguages() as $langcode => $language) {
        if (!$product->hasTranslation($langcode)) {
          continue;
        }
        $translation = $product->getTranslation($langcode);
        if (method_exists($translation, 'isPublished') && !$translation->isPublished()) {
          continue;
        }
        $variations = [];
        foreach ($translation->getVariations() as $variation) {
          $variations[] = self::variationRow($variation);
        }
        $body = self::fieldText($translation, ['body', 'description']);
        $converted = $body !== '' ? $converter->convert($body) : ['content' => ''];
        $title = (string) $translation->label();
        $url = '';
        try {
          $url = $translation->toUrl('canonical', ['absolute' => TRUE])->toString();
        }
        catch (\Throwable) {
        }
        $rows[] = self::productDocument([
          'id' => (string) $translation->id(),
          'title' => $title,
          'url' => $url,
          'lang' => $langcode,
          'price' => $variations[0]['price'] ?? NULL,
          'currency' => $variations[0]['currency'] ?? NULL,
          'sku' => $variations[0]['sku'] ?? NULL,
          'short_text' => self::fieldText($translation, ['summary', 'field_summary']),
          'description' => (string) ($converted['content'] ?? ''),
          'modified_at' => gmdate('c', (int) $translation->getChangedTime()),
          'variations' => $variations,
          'categories' => self::taxonomyLabels($translation, 'category'),
          'tags' => self::taxonomyLabels($translation, 'tag'),
        ]);
        if (count($rows) >= $cap) {
          return $rows;
        }
      }
    }
    return $rows;
  }

  /**
   * Formats an exported Commerce product document.
   */
  public static function productDocument(array $row): array {
    return [
      'id' => (string) ($row['id'] ?? ''),
      'sku' => $row['sku'] ?? NULL,
      'title' => (string) ($row['title'] ?? ''),
      'url' => (string) ($row['url'] ?? ''),
      'lang' => (string) ($row['lang'] ?? 'en'),
      'price' => $row['price'] ?? NULL,
      'regular_price' => $row['price'] ?? NULL,
      'sale_price' => NULL,
      'currency' => $row['currency'] ?? NULL,
      'stock_status' => 'unknown',
      'stock_qty' => NULL,
      'categories' => array_values((array) ($row['categories'] ?? [])),
      'tags' => array_values((array) ($row['tags'] ?? [])),
      'attributes' => [],
      'image_url' => NULL,
      'short_text' => (string) ($row['short_text'] ?? ''),
      'description' => (string) ($row['description'] ?? ''),
      'modified_at' => (string) ($row['modified_at'] ?? gmdate('c')),
      'variations' => array_values((array) ($row['variations'] ?? [])),
    ];
  }

  /**
   * Normalizes the configured content type selection.
   */
  public function sanitizePageSources(array $input): array {
    $requested = $input['bundles'] ?? [];
    if (!is_array($requested)) {
      return ['bundles' => []];
    }
    $available = $this->entityTypeManager->getStorage('node_type')->loadMultiple();
    $bundles = [];
    foreach ($requested as $bundle) {
      $bundle = (string) $bundle;
      if (isset($available[$bundle]) && preg_match('/^[a-z0-9_]{1,32}$/', $bundle)) {
        $bundles[] = $bundle;
      }
    }
    return ['bundles' => array_values(array_unique($bundles))];
  }

  /**
   * Invalidates caches for the public widget.
   */
  private function invalidateWidget(): void {
    $this->cacheTagsInvalidator->invalidateTags(['aiworker_chat', 'aiworker_chat_widget']);
  }

  /**
   * Returns the current Drush site URL when available.
   */
  private function drushUri(): string {
    if (class_exists('\Drush\Drush')) {
      try {
        $uri = Drush::config()->get('options.uri');
        if (is_string($uri) && $uri !== '') {
          return $uri;
        }
      }
      catch (\Throwable) {
      }
    }
    return '';
  }

  /**
   * Validates and normalizes an absolute site URL.
   */
  private static function normalizeSiteUrl(string $url): string {
    $parts = parse_url($url);
    if (
      !is_array($parts)
      || empty($parts['scheme'])
      || empty($parts['host'])
      || isset($parts['user'])
      || isset($parts['pass'])
      || isset($parts['query'])
      || isset($parts['fragment'])
      || !in_array(strtolower($parts['scheme']), ['http', 'https'], TRUE)
    ) {
      throw new \RuntimeException('The configured Drupal site URL must be an absolute HTTP or HTTPS URL without credentials, query, or fragment.');
    }
    return rtrim($url, '/');
  }

  /**
   * Formats a Commerce product variation row.
   */
  private static function variationRow($variation): array {
    $price = NULL;
    $currency = NULL;
    if (method_exists($variation, 'getPrice') && $variation->getPrice()) {
      $priceObject = $variation->getPrice();
      $price = method_exists($priceObject, 'getNumber') ? (string) $priceObject->getNumber() : NULL;
      $currency = method_exists($priceObject, 'getCurrencyCode') ? (string) $priceObject->getCurrencyCode() : NULL;
    }
    return [
      'id' => (string) $variation->id(),
      'sku' => method_exists($variation, 'getSku') ? (string) $variation->getSku() : '',
      'title' => (string) $variation->label(),
      'price' => $price,
      'regular_price' => $price,
      'sale_price' => NULL,
      'currency' => $currency,
      'stock_status' => 'unknown',
      'attributes' => [],
    ];
  }

  /**
   * Extracts readable text from the selected entity fields.
   */
  private static function fieldText($entity, array $names): string {
    foreach ($names as $name) {
      if (!$entity->hasField($name) || $entity->get($name)->isEmpty()) {
        continue;
      }
      $item = $entity->get($name)->first();
      $value = $item->value ?? $item->summary ?? '';
      if (is_string($value) && trim($value) !== '') {
        return trim($value);
      }
    }
    return '';
  }

  /**
   * Returns matching taxonomy labels for an entity.
   */
  private static function taxonomyLabels($entity, string $needle): array {
    $labels = [];
    foreach ($entity->getFieldDefinitions() as $name => $definition) {
      if ($definition->getType() !== 'entity_reference' || stripos((string) $name, $needle) === FALSE || $definition->getSetting('target_type') !== 'taxonomy_term' || !$entity->hasField($name)) {
        continue;
      }
      foreach ($entity->get($name)->referencedEntities() as $term) {
        $labels[] = (string) $term->label();
      }
    }
    return array_values(array_unique($labels));
  }

}
