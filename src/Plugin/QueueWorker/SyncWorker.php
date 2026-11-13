<?php

namespace Drupal\needtome_ai_chat\Plugin\QueueWorker;

use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Queue\Attribute\QueueWorker;
use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\needtome_ai_chat\Common\SyncEngine;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Runs one AI Worker knowledge sync from Drupal's cron queue.
 */
#[QueueWorker(
  id: 'needtome_ai_chat_sync',
  title: new TranslatableMarkup('NeedToMe AI Chat knowledge sync'),
  cron: ['time' => 60],
)]
class SyncWorker extends QueueWorkerBase implements ContainerFactoryPluginInterface {

  final public function __construct(array $configuration, $plugin_id, $plugin_definition, protected SyncEngine $syncEngine) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  /**
   * Creates the queue worker with its injected services.
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    return new static($configuration, $plugin_id, $plugin_definition, $container->get('needtome_ai_chat.sync_engine'));
  }

  /**
   * Runs the queued knowledge synchronization.
   */
  public function processItem($data): void {
    $data = is_array($data) ? $data : [];
    $chat = isset($data['chat']) && is_string($data['chat']) ? $data['chat'] : '';
    if ($chat !== '') {
      $this->syncEngine->forChat($chat)?->runScheduled(TRUE, TRUE, 50, 'daily');
      return;
    }
    $this->syncEngine->runScheduled(TRUE, TRUE, 50, 'daily');
  }

}
