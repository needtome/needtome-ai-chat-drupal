<?php

namespace Drupal\aiworker_chat;

use Drupal\aiworker_chat\Common\Host;
use Drupal\aiworker_chat\Common\OAuth;
use Drupal\aiworker_chat\Common\Uninstaller;

/**
 * Uninstall effects split into a small unit-testable routine.
 */
class DrupalUninstall {

  /**
   * Disconnects the adapter and removes its stored data.
   */
  public static function run(Host $host, OAuth $oauth, object $keyValue, object $queue, object $state, object $cacheTags): void {
    (new Uninstaller())->run($host, $oauth);
    $keyValue->deleteAll();
    $queue->deleteQueue();
    $state->delete('aiworker_chat.last_enqueued');
    $cacheTags->invalidateTags(['aiworker_chat', 'aiworker_chat_widget']);
  }

}
