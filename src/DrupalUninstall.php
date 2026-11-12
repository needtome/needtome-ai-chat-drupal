<?php

namespace Drupal\needtome_ai_chat;

use Drupal\needtome_ai_chat\Common\Host;
use Drupal\needtome_ai_chat\Common\OAuth;
use Drupal\needtome_ai_chat\Common\Uninstaller;

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
    $state->delete('needtome_ai_chat.last_enqueued');
    $cacheTags->invalidateTags(['needtome_ai_chat', 'needtome_ai_chat_widget']);
  }

}
