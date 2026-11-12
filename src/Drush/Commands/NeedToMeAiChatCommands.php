<?php

namespace Drupal\needtome_ai_chat\Drush\Commands;

use Drupal\needtome_ai_chat\Common\SyncEngine;
use Drupal\needtome_ai_chat\DrupalHost;
use Drush\Attributes as CLI;
use Drush\Commands\DrushCommands;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Drush operations for NeedToMe AI Chat.
 */
class NeedToMeAiChatCommands extends DrushCommands {

  public function __construct(private readonly DrupalHost $host, private readonly SyncEngine $syncEngine) {
    parent::__construct();
  }

  /**
   * Creates the queue worker with its injected services.
   */
  public static function create(ContainerInterface $container): static {
    return new static($container->get('needtome_ai_chat.host'), $container->get('needtome_ai_chat.sync_engine'));
  }

  /**
   * Synchronizes Drupal content and Commerce products with AI Worker.
   */
  #[CLI\Command(name: 'needtome_ai_chat:sync')]
  #[CLI\Help(description: 'Sync this Drupal site\'s public pages and optional Commerce products to AI Worker.')]
  #[CLI\Option(name: 'dry-run', description: 'Show the export plan without sending data.')]
  #[CLI\Option(name: 'force', description: 'Send every public document, ignoring saved hashes.')]
  #[CLI\Option(name: 'pages', description: 'Sync published public Drupal nodes.')]
  #[CLI\Option(name: 'products', description: 'Sync Commerce products when product sync is enabled.')]
  #[CLI\Usage(name: 'drush needtome_ai_chat:sync --dry-run', description: 'Preview the public node export.')]
  public function sync(array $options = ['dry-run' => FALSE, 'force' => FALSE, 'pages' => FALSE, 'products' => FALSE]): int {
    try {
      $this->host->siteHome();
    }
    catch (\Throwable $exception) {
      $this->logger()->error($exception->getMessage());
      return 1;
    }
    $products = (bool) ($options['products'] ?? FALSE);
    $pages = (bool) ($options['pages'] ?? FALSE) || !$products;
    $dryRun = (bool) ($options['dry-run'] ?? FALSE);
    $force = (bool) ($options['force'] ?? FALSE);
    $result = $this->syncEngine->run($pages, $products, $dryRun, $force, 100, 'daily');
    $this->logger()->notice(($dryRun ? 'Dry run' : 'Sync') . ': ' . (!empty($result['ok']) ? 'ready' : 'stopped'));
    $multiChat = isset($result['chats']) && is_array($result['chats']);
    if ($multiChat) {
      foreach ($result['chats'] as $id => $chat) {
        $context = [
          'chat' => (string) $id,
          'status' => !empty($chat['ok']) ? 'ready' : (string) ($chat['reason'] ?? $chat['error'] ?? 'stopped'),
          'pages' => (int) ($chat['pages'] ?? 0),
          'products' => (int) ($chat['products'] ?? 0),
          'page_batches' => (int) ($chat['page_batches'] ?? 0),
          'product_batches' => (int) ($chat['product_batches'] ?? 0),
        ];
        $message = '{chat}: {status}; Pages: {pages}; products: {products}; batches: pages {page_batches}, products {product_batches}';
        if (!empty($chat['ok']) || !empty($chat['skipped'])) {
          $this->logger()->notice($message, $context);
        }
        else {
          $this->logger()->error($message, $context);
        }
      }
    }
    else {
      $this->logger()->notice('Pages: {pages}; products: {products}; batches: pages {page_batches}, products {product_batches}', [
        'pages' => (int) ($result['pages'] ?? 0),
        'products' => (int) ($result['products'] ?? 0),
        'page_batches' => (int) ($result['page_batches'] ?? 0),
        'product_batches' => (int) ($result['product_batches'] ?? 0),
      ]);
      if (!empty($result['would_send'])) {
        $this->logger()->notice('Document IDs: {ids}', ['ids' => implode(', ', array_slice((array) $result['would_send'], 0, 2000))]);
      }
    }
    if (empty($result['ok'])) {
      if (!$multiChat) {
        $this->logger()->error('Sync stopped: {reason}', ['reason' => (string) ($result['error'] ?? $result['reason'] ?? 'unknown error')]);
      }
      return 1;
    }
    return 0;
  }

}
