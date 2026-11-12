<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\needtome_ai_chat\Common;

class KraClient
{
    private $host;
    private $http;
    private $oauth;

    public function __construct(Host $host, Http $http, OAuth $oauth)
    {
        $this->host = $host;
        $this->http = $http;
        $this->oauth = $oauth;
    }

    public function request(string $method, string $path, array $query = array(), ?array $body = null): array
    {
        $path = trim($path, '/');
        $method = strtoupper($method);
        $rules = new ProxyRules();
        if (!($path === 'plugin/link' && $method === 'POST') && !$rules->allows($method, $path)) {
            return array('status' => 403, 'body' => array('error' => 'not_allowed'), 'retry_after' => 0);
        }
        $timeout = $rules->isAssistantPath($path) ? 60 : 20;
        return $this->authorizedRequest($method, rtrim($this->host->base(), '/').'/api/v1/'.$path, $query, $body, $timeout, null);
    }

    public function screen(array $query): array
    {
        return $this->authorizedRequest('GET', rtrim($this->host->base(), '/').'/api/v1/plugin/screen', $query, null, 20, null);
    }

    public function checkWidgetKey(string $key, string $lang): array
    {
        if (!preg_match('/^wk_[A-Za-z0-9]{24}$/', $key)) {
            return array('status' => 422, 'ok' => false, 'name' => '', 'setup_required' => false);
        }
        $site = parse_url($this->host->siteHome());
        if (!is_array($site) || !isset($site['scheme'], $site['host']) || !in_array(strtolower($site['scheme']), array('http', 'https'), true)) {
            return array('status' => 0, 'ok' => false, 'name' => '', 'setup_required' => false);
        }
        $origin = strtolower($site['scheme']).'://'.strtolower($site['host']);
        if (isset($site['port'])) $origin .= ':'.(int) $site['port'];
        $url = rtrim($this->host->base(), '/').'/api/web/'.rawurlencode($key).'/config';
        $response = $this->http->send('GET', $url, array(
            'query' => array('lang' => in_array($lang, array('ru', 'en', 'uk'), true) ? $lang : 'en'),
            'headers' => array('Accept' => 'application/json', 'Origin' => $origin),
            'timeout' => 10,
            'connect_timeout' => 5,
        ));
        $body = $response->json();
        return array(
            'status' => $response->status,
            'ok' => $response->status === 200 && is_array($body) && !empty($body['ok']),
            'name' => $response->status === 200 && is_array($body) && is_scalar($body['name'] ?? null) ? (string) $body['name'] : '',
            'setup_required' => $response->status === 200 && is_array($body) && !empty($body['setup_required']),
        );
    }

    public function siteKnowledge(string $key, string $path, string $method = 'GET', array $query = array(), ?array $body = null, int $timeout = 60): array
    {
        $path = trim($path, '/');
        $allowed = array('status', 'documents', 'documents/reconcile', 'documents/delete', 'products/status', 'products', 'products/reconcile', 'products/delete');
        $method = strtoupper($method);
        $read = in_array($path, array('status', 'products/status'), true);
        if (!in_array($path, $allowed, true) || !preg_match('/^wk_[A-Za-z0-9]{24}$/', $key) || ($read && $method !== 'GET') || (!$read && $method !== 'POST')) {
            return array('status' => 403, 'body' => array('error' => 'not_allowed'), 'retry_after' => 0);
        }
        $url = rtrim($this->host->base(), '/').'/api/web/'.$key.'/kb/site/'.$path;
        if ($method === 'GET') {
            $query['platform'] = $this->host->platform();
        } else {
            $body = is_array($body) ? $body : array();
            $body['platform'] = $this->host->platform();
        }
        return $this->authorizedRequest($method, $url, $query, $body, max(1, min(60, $timeout)), $this->host->platform());
    }

    public function uploadIcon(string $bytes, string $filename, int $chatId, string $lang): array
    {
        if (strlen($bytes) > 1024 * 1024 || !$this->validImage($bytes)) {
            return array('status' => 422, 'body' => array('error' => 'invalid_image'), 'retry_after' => 0);
        }
        return $this->authorizedRequest('POST', rtrim($this->host->base(), '/').'/api/v1/plugin/chat/launcher-icon', array('chat_id' => $chatId, 'lang' => $lang), null, 20, null, array(
            'multipart' => array('name' => 'file', 'filename' => basename($filename), 'bytes' => $bytes, 'mime' => $this->imageMime($bytes)),
        ));
    }

    private function authorizedRequest(string $method, string $url, array $query, ?array $body, int $timeout, ?string $platform, array $extra = array()): array
    {
        $tokens = $this->oauth->tokens();
        if (!$tokens) {
            return array('status' => 401, 'body' => array('error' => 'not_connected'), 'retry_after' => 0);
        }
        $first = $this->send($method, $url, $query, $body, (string) $tokens['access_token'], $timeout, $platform, $extra);
        if ($first['status'] !== 401) {
            return $first;
        }
        try {
            $fresh = $this->oauth->refresh((string) $tokens['access_token']);
        } catch (OAuthException $exception) {
            return array('status' => $exception->status, 'body' => array('error' => 'refresh_failed'), 'retry_after' => 0);
        }
        if (!$fresh || empty($fresh['access_token'])) {
            return array('status' => 401, 'body' => array('error' => 'not_connected'), 'retry_after' => 0);
        }
        return $this->send($method, $url, $query, $body, (string) $fresh['access_token'], $timeout, $platform, $extra);
    }

    private function send(string $method, string $url, array $query, ?array $body, string $token, int $timeout, ?string $platform, array $extra): array
    {
        $headers = array('Authorization' => 'Bearer '.$token, 'Accept' => 'application/json');
        if ($platform !== null) {
            $headers['X-AIW-Platform'] = $platform;
        }
        $options = array('query' => $query, 'headers' => $headers, 'timeout' => $timeout, 'connect_timeout' => 10);
        if ($body !== null && strtoupper($method) !== 'GET') {
            $options['json'] = $body;
        }
        foreach ($extra as $key => $value) {
            $options[$key] = $value;
        }
        $response = $this->http->send($method, $url, $options);
        $decoded = $response->json();
        if (!is_array($decoded)) {
            $decoded = $response->body === '' ? array() : array('message' => function_exists('mb_substr') ? mb_substr($response->body, 0, 2000, 'UTF-8') : substr($response->body, 0, 2000));
        }
        return array('status' => $response->status, 'body' => $decoded, 'retry_after' => $response->retryAfter());
    }

    private function validImage(string $bytes): bool
    {
        return strpos($bytes, "\x89PNG\r\n\x1a\n") === 0 || strpos($bytes, "\xff\xd8\xff") === 0 || (strlen($bytes) >= 12 && substr($bytes, 0, 4) === 'RIFF' && substr($bytes, 8, 4) === 'WEBP');
    }

    private function imageMime(string $bytes): string
    {
        if (strpos($bytes, "\x89PNG\r\n\x1a\n") === 0) {
            return 'image/png';
        }
        if (strpos($bytes, "\xff\xd8\xff") === 0) {
            return 'image/jpeg';
        }
        return 'image/webp';
    }
}
