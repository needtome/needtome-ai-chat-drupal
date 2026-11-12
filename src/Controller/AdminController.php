<?php

namespace Drupal\needtome_ai_chat\Controller;

use Drupal\Core\Access\CsrfRequestHeaderAccessCheck;
use Drupal\Core\Cache\CacheTagsInvalidatorInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Core\StringTranslation\TranslationInterface;
use Drupal\Core\Access\CsrfTokenGenerator;
use Drupal\Core\Url;
use Drupal\needtome_ai_chat\DrupalHost;
use Drupal\needtome_ai_chat\Common\AdminApi;
use Drupal\needtome_ai_chat\Common\AdminRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Drupal\Core\Routing\TrustedRedirectResponse;

/**
 * Admin UI and same-origin API endpoints.
 */
class AdminController {

  /**
   * The translation service used to build translated API responses.
   */
  private TranslationInterface $stringTranslation;

  public function __construct(
    private readonly AdminApi $adminApi,
    private readonly DrupalHost $host,
    private readonly CsrfTokenGenerator $csrfToken,
    private readonly AccountProxyInterface $currentUser,
    private readonly RequestStack $requestStack,
    private readonly CacheTagsInvalidatorInterface $cacheTagsInvalidator,
    TranslationInterface $stringTranslation,
  ) {
    $this->stringTranslation = $stringTranslation;
  }

  /**
   * Admin page containing the bundled shared UI mount point. */
  public function index(): array {
    $request = $this->requestStack->getCurrentRequest();
    if ($request) {
      $this->host->rememberSiteHome($request);
    }
    $endpoint = '/admin/config/services/aiworker-chat/api';
    $mount = $this->adminApi->mountConfig(
      $endpoint,
      self::csrfHeaderName(),
      $this->csrfToken->get(CsrfRequestHeaderAccessCheck::TOKEN_KEY),
    );
    $json = json_encode($mount, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    $json = is_string($json) ? $json : '{}';
    return [
      '#type' => 'container',
      '#attributes' => ['class' => ['needtome_ai_chat-admin-page']],
      '#attached' => ['library' => ['needtome_ai_chat/admin']],
      '#cache' => ['max-age' => 0, 'tags' => ['needtome_ai_chat_widget']],
      'mount' => [
        '#type' => 'html_tag',
        '#tag' => 'div',
        '#attributes' => [
          'class' => ['aiwc-root'],
          'data-aiwc-config' => $json,
        ],
      ],
      'settings_link' => [
        '#type' => 'link',
        '#title' => new TranslatableMarkup('Connection and site URL settings', [], [], $this->stringTranslation),
        '#url' => Url::fromRoute('needtome_ai_chat.settings'),
      ],
    ];
  }

  /**
   * Route handler for all named API operations. */
  public function api(Request $request, string $route): Response {
    return $this->respond($request, $route);
  }

  /**
   * Separate route avoids accepting a slash inside the route parameter. */
  public function syncStatus(Request $request): Response {
    return $this->respond($request, 'sync/status');
  }

  /**
   * Returns the CSRF request header name.
   */
  public static function csrfHeaderName(): string {
    return 'X-CSRF-Token';
  }

  /**
   * Checks an expected CSRF token against the request token.
   */
  public static function csrfIsValid(string $expected, ?string $provided): bool {
    return $expected !== '' && is_string($provided) && $provided !== '' && hash_equals($expected, $provided);
  }

  /**
   * Checks whether a route requires a CSRF token.
   */
  public static function csrfRequiredFor(string $method, string $route): bool {
    return !in_array(strtoupper($method), ['GET', 'HEAD', 'OPTIONS', 'TRACE'], TRUE) || $route === 'sync/status';
  }

  /**
   * Checks whether the account can administer the module.
   */
  public static function permissionAllowed($account): bool {
    return is_object($account) && method_exists($account, 'hasPermission') && $account->hasPermission('administer needtome_ai_chat');
  }

  /**
   * Validates and normalizes an API route parameter.
   */
  public static function normalizeRouteParameter(string $route): ?string {
    $route = trim($route, " /\t\n\r\0\x0B");
    $routes = [
      'state', 'batch', 'api', 'icon', 'connect', 'callback', 'disconnect', 'link', 'settings', 'sync',
      'sync/status', 'chats/add', 'chats/remove', 'key',
    ];
    return in_array($route, $routes, TRUE) ? $route : NULL;
  }

  /**
   * Checks whether an API route changes widget output.
   */
  public static function shouldInvalidateWidgetRoute(string $route): bool {
    return in_array($route, ['disconnect', 'link', 'settings', 'chats/add', 'chats/remove', 'key'], TRUE);
  }

  /**
   * Decodes a bounded JSON request body.
   */
  public static function jsonBody(string $raw, string $contentType): ?array {
    if ($raw === '' || strlen($raw) > 65536 || !str_contains(strtolower($contentType), 'application/json')) {
      return NULL;
    }
    $decoded = json_decode($raw, TRUE);
    return is_array($decoded) ? $decoded : NULL;
  }

  /**
   * Validates and dispatches an administration API request.
   */
  private function respond(Request $request, string $route): Response {
    $route = self::normalizeRouteParameter($route);
    if ($route === NULL) {
      return new JsonResponse(['error' => 'not_found'], 404, ['Cache-Control' => 'no-store, private, max-age=0']);
    }
    $method = strtoupper($request->getMethod());
    $raw = $request->getContent();
    $file = NULL;
    if ($route === 'icon') {
      $upload = $request->files->get('file');
      if ($upload) {
        try {
          $file = [
            'bytes' => $upload->getContent(),
            'name' => $upload->getClientOriginalName(),
            'size' => (int) $upload->getSize(),
            'error' => $upload->getError(),
          ];
        }
        catch (\Throwable) {
          $file = ['error' => UPLOAD_ERR_CANT_WRITE];
        }
      }
    }
    $expected = $this->csrfToken->get(CsrfRequestHeaderAccessCheck::TOKEN_KEY);
    $csrfValid = !self::csrfRequiredFor($method, $route) || self::csrfIsValid($expected, $request->headers->get(self::csrfHeaderName()));
    $json = self::jsonBody($raw, (string) $request->headers->get('Content-Type', ''));
    $allowed = self::permissionAllowed($this->currentUser);
    $adminRequest = new AdminRequest(
      $route,
      $method,
      $json,
      strlen($raw),
      $file,
      $request->query->all(),
      $csrfValid,
      $allowed,
    );
    $adminResponse = $this->adminApi->handle($adminRequest);
    if (self::shouldInvalidateWidgetRoute($route)) {
      $this->cacheTagsInvalidator->invalidateTags(['needtome_ai_chat_widget']);
    }
    $headers = array_replace($adminResponse->headers(), [
      'Cache-Control' => 'no-store, private, max-age=0',
      'Pragma' => 'no-cache',
      'Expires' => '0',
    ]);
    if ($adminResponse->redirect !== NULL) {
      $response = new TrustedRedirectResponse($adminResponse->redirect, $adminResponse->status, $headers);
      $response->setMaxAge(0);
      return $response;
    }
    $response = new JsonResponse($adminResponse->json ?? [], $adminResponse->status, $headers);
    $response->setMaxAge(0);
    return $response;
  }

}
