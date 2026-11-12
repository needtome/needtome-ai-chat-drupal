<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\needtome_ai_chat\Common;

class OAuth
{
    const TOKEN_KEY = 'oauth_tokens';
    const CLIENT_KEY = 'oauth_client';

    private $host;
    private $http;
    private $crypto;
    private $pkce;

    public function __construct(Host $host, Http $http, TokenCrypto $crypto)
    {
        $this->host = $host;
        $this->http = $http;
        $this->crypto = $crypto;
        $this->pkce = new Pkce();
    }

    public function discover(): array
    {
        $cacheKey = 'oauth-discovery:'.sha1($this->host->base());
        $cached = $this->host->cacheGet($cacheKey);
        if (is_array($cached)) {
            $this->validateMetadata($cached);
            return $cached;
        }
        $base = rtrim($this->host->base(), '/');
        try {
            $response = $this->http->send('GET', $base.'/.well-known/oauth-authorization-server', array(
                'headers' => array('Accept' => 'application/json'), 'timeout' => 20, 'connect_timeout' => 10,
            ));
        } catch (\Throwable $exception) {
            throw new OAuthException('AI Worker OAuth discovery is unavailable.', 502, $exception);
        }
        $metadata = $response->json();
        if ($response->status < 200 || $response->status >= 300 || !is_array($metadata)) {
            throw new OAuthException('AI Worker OAuth discovery is unavailable.', $response->status ?: 502);
        }
        $this->validateMetadata($metadata);
        $this->host->cacheSet($cacheKey, $metadata, 3600);
        return $metadata;
    }

    public function beginAuthorization(): string
    {
        $base = rtrim($this->host->base(), '/');
        $metadata = $this->discover();
        $redirectUri = $this->host->callbackUrl();
        $client = $this->registerClient($metadata, $redirectUri);
        $state = $this->pkce->state();
        $verifier = $this->pkce->verifier();
        $this->host->sessionPut('oauth_pending:'.$state, array(
            'verifier' => $verifier,
            'client_id' => $client['client_id'],
            'redirect_uri' => $redirectUri,
            'base' => $base,
            'created_at' => time(),
        ));
        $endpoint = $this->endpoint($metadata, 'authorization_endpoint');
        $query = array(
            'response_type' => 'code',
            'client_id' => $client['client_id'],
            'redirect_uri' => $redirectUri,
            'scope' => 'chat',
            'state' => $state,
            'code_challenge' => $this->pkce->challenge($verifier),
            'code_challenge_method' => 'S256',
            'resource' => $base.'/api/mcp',
        );
        return $endpoint.(strpos($endpoint, '?') === false ? '?' : '&').http_build_query($query, '', '&', PHP_QUERY_RFC3986);
    }

    public function completeAuthorization(string $state, string $code): void
    {
        if ($state === '' || !preg_match('/^[a-f0-9]{48}$/', $state)) {
            throw new OAuthException('OAuth state is invalid or expired.', 403);
        }
        $pendingKey = 'oauth_pending:'.$state;
        $pending = $this->host->sessionGet($pendingKey);
        $this->host->sessionForget($pendingKey);
        if (!is_array($pending) || (int) ($pending['created_at'] ?? 0) < time() - 600 || $code === '') {
            throw new OAuthException('OAuth state is invalid or expired.', 403);
        }
        $base = $pending['base'] ?? null;
        if (!is_string($base) || !hash_equals($base, rtrim($this->host->base(), '/'))) {
            throw new OAuthException('The AI Worker base URL changed during authorization. Reconnect to continue.', 403);
        }
        $metadata = $this->discover();
        try {
            $response = $this->http->send('POST', $this->endpoint($metadata, 'token_endpoint'), array(
                'form' => array(
                    'grant_type' => 'authorization_code',
                    'code' => $code,
                    'redirect_uri' => (string) $pending['redirect_uri'],
                    'client_id' => (string) $pending['client_id'],
                    'code_verifier' => (string) $pending['verifier'],
                    'resource' => $base.'/api/mcp',
                ),
                'headers' => array('Accept' => 'application/json'), 'timeout' => 20, 'connect_timeout' => 10,
            ));
        } catch (\Throwable $exception) {
            throw new OAuthException('The AI Worker connection could not be completed.', 502, $exception);
        }
        $tokenResponse = $response->json();
        if ($response->status < 200 || $response->status >= 300 || !is_array($tokenResponse) || empty($tokenResponse['access_token'])) {
            throw new OAuthException('The AI Worker connection could not be completed.', $response->status ?: 502);
        }
        $this->host->settingPut(self::CLIENT_KEY, array(
            'client_id' => (string) $pending['client_id'],
            'redirect_uri' => (string) $pending['redirect_uri'],
            'base' => $base,
        ));
        $this->saveTokenResponse($tokenResponse, (string) $pending['client_id']);
    }

    public function tokens(): ?array
    {
        $encrypted = $this->host->settingGet(self::TOKEN_KEY);
        if (!is_string($encrypted)) {
            return null;
        }
        $tokens = $this->crypto->decrypt($encrypted);
        if (!is_array($tokens) || empty($tokens['access_token']) || empty($tokens['refresh_token'])) {
            return null;
        }
        $client = $this->host->settingGet(self::CLIENT_KEY, array());
        $clientBase = is_array($client) ? ($client['base'] ?? null) : null;
        $tokenBase = array_key_exists('base', $tokens) ? $tokens['base'] : $clientBase;
        if (!is_string($tokenBase) || !hash_equals($tokenBase, rtrim($this->host->base(), '/'))) {
            return null;
        }
        unset($tokens['base']);
        return $tokens;
    }

    public function refresh(?string $previousAccess = null): ?array
    {
        $lockName = 'oauth-refresh:'.sha1($this->host->siteHome());
        $deadline = microtime(true) + 10;
        while (!$this->host->lockAcquire($lockName, 30)) {
            $tokens = $this->tokens();
            if ($tokens && $previousAccess !== null && !hash_equals((string) $tokens['access_token'], $previousAccess)) {
                return $tokens;
            }
            if (microtime(true) >= $deadline) {
                throw new OAuthException('AI Worker token refresh is already in progress.', 503);
            }
            usleep(100000);
        }
        try {
            $tokens = $this->tokens();
            if (!$tokens) {
                return null;
            }
            if ($previousAccess !== null && !hash_equals((string) $tokens['access_token'], $previousAccess)) {
                return $tokens;
            }
            $client = $this->host->settingGet(self::CLIENT_KEY, array());
            $client = is_array($client) ? $client : array();
            $metadata = $this->discover();
            try {
                $response = $this->http->send('POST', $this->endpoint($metadata, 'token_endpoint'), array(
                    'form' => array(
                        'grant_type' => 'refresh_token',
                        'refresh_token' => $tokens['refresh_token'],
                        'client_id' => (string) ($client['client_id'] ?? ''),
                        'resource' => rtrim($this->host->base(), '/').'/api/mcp',
                    ),
                    'headers' => array('Accept' => 'application/json'), 'timeout' => 20, 'connect_timeout' => 10,
                ));
            } catch (\Throwable $exception) {
                throw new OAuthException('AI Worker could not be reached while refreshing the connection.', 502, $exception);
            }
            $body = $response->json();
            if ($response->status < 200 || $response->status >= 300 || !is_array($body)) {
                if (is_array($body) && ($body['error'] ?? null) === 'invalid_grant') {
                    $this->forgetTokens();
                }
                throw new OAuthException('AI Worker could not refresh the connection.', $response->status ?: 502);
            }
            if (empty($body['access_token'])) {
                throw new OAuthException('AI Worker returned an invalid token response.', $response->status ?: 502);
            }
            return $this->saveTokenResponse($body, (string) ($client['client_id'] ?? ''));
        } finally {
            $this->host->lockRelease($lockName);
        }
    }

    public function disconnect(): void
    {
        $tokens = $this->tokens();
        $client = $this->host->settingGet(self::CLIENT_KEY, array());
        $client = is_array($client) ? $client : array();
        if ($tokens && !empty($tokens['refresh_token'])) {
            $url = rtrim($this->host->base(), '/').'/api/oauth/revoke';
            try {
                $metadata = $this->discover();
                if (isset($metadata['revocation_endpoint'])) {
                    $url = $this->endpoint($metadata, 'revocation_endpoint');
                }
            } catch (\Throwable $ignored) {
            }
            try {
                $this->validateEndpoint($url);
                $this->http->send('POST', $url, array(
                    'form' => array('token' => $tokens['refresh_token'], 'client_id' => (string) ($client['client_id'] ?? '')),
                    'headers' => array('Accept' => 'application/json'), 'timeout' => 20, 'connect_timeout' => 10,
                ));
            } catch (\Throwable $ignored) {
            }
        }
        $this->forgetTokens();
        foreach (array('sync_state', 'sync_hashes', 'sync_markers', 'sync_record_counts', 'sync_fingerprints', 'sync_reconcile_at', 'sync_backoff') as $key) {
            $this->host->settingForget($key);
        }
        $this->clearCaches();
    }

    private function registerClient(array $metadata, string $redirectUri): array
    {
        $client = $this->host->settingGet(self::CLIENT_KEY, array());
        $client = is_array($client) ? $client : array();
        // A client id belongs to one AI Worker installation: re-register when the base or the callback changes.
        $base = rtrim($this->host->base(), '/');
        if (($client['redirect_uri'] ?? null) === $redirectUri && ($client['base'] ?? null) === $base && !empty($client['client_id'])) {
            return $client;
        }
        $this->preserveLegacyTokenBase($client);
        $endpoint = isset($metadata['registration_endpoint']) ? $this->endpoint($metadata, 'registration_endpoint') : rtrim($this->host->base(), '/').'/api/oauth/register';
        $this->validateEndpoint($endpoint);
        $payload = array(
            'client_name' => $this->host->platformLabel().': '.$this->host->siteHost(),
            'software_id' => 'needtome-ai-chat-'.$this->host->platform(),
            'software_version' => $this->host->version(),
            'redirect_uris' => array($redirectUri),
            'grant_types' => array('authorization_code', 'refresh_token'),
            'response_types' => array('code'),
            'token_endpoint_auth_method' => 'none',
            'scope' => 'chat',
        );
        try {
            $response = $this->http->send('POST', $endpoint, array(
                'json' => $payload, 'headers' => array('Accept' => 'application/json'), 'timeout' => 20, 'connect_timeout' => 10,
            ));
        } catch (\Throwable $exception) {
            throw new OAuthException('AI Worker client registration failed.', 502, $exception);
        }
        $body = $response->json();
        if ($response->status < 200 || $response->status >= 300 || !is_array($body) || empty($body['client_id'])) {
            throw new OAuthException('AI Worker client registration failed.', $response->status ?: 502);
        }
        $client = array('client_id' => (string) $body['client_id'], 'redirect_uri' => $redirectUri, 'base' => $base);
        $this->host->settingPut(self::CLIENT_KEY, $client);
        return $client;
    }

    private function saveTokenResponse(array $response, string $clientId): array
    {
        $old = $this->tokens();
        $tokens = array(
            'access_token' => (string) $response['access_token'],
            'refresh_token' => (string) ($response['refresh_token'] ?? ($old['refresh_token'] ?? '')),
            'expires_at' => time() + max(60, (int) ($response['expires_in'] ?? 3600)),
            'scope' => (string) ($response['scope'] ?? 'chat'),
            'base' => rtrim($this->host->base(), '/'),
        );
        if ($tokens['refresh_token'] === '') {
            throw new OAuthException('AI Worker did not return a refresh token.', 502);
        }
        $this->host->settingPut(self::TOKEN_KEY, $this->crypto->encrypt($tokens));
        if ($clientId !== '') {
            $client = $this->host->settingGet(self::CLIENT_KEY, array());
            $client = is_array($client) ? $client : array();
            $client['client_id'] = $clientId;
            $this->host->settingPut(self::CLIENT_KEY, $client);
        }
        return $tokens;
    }

    private function endpoint(array $metadata, string $key): string
    {
        if (!isset($metadata[$key]) || !is_string($metadata[$key])) {
            throw new OAuthException('AI Worker OAuth endpoint is unavailable.', 502);
        }
        $this->validateEndpoint($metadata[$key]);
        return $metadata[$key];
    }

    private function validateMetadata(array $metadata): void
    {
        foreach (array('authorization_endpoint', 'token_endpoint') as $required) {
            if (!isset($metadata[$required]) || !is_string($metadata[$required])) {
                throw new OAuthException('AI Worker OAuth discovery is incomplete.', 502);
            }
        }
        foreach ($metadata as $name => $value) {
            if (substr((string) $name, -9) === '_endpoint') {
                if (!is_string($value)) {
                    throw new OAuthException('AI Worker OAuth discovery is incomplete.', 502);
                }
                $this->validateEndpoint($value);
            }
        }
    }

    private function validateEndpoint(string $url): void
    {
        $baseUrl = rtrim($this->host->base(), '/');
        $base = parse_url($baseUrl);
        $target = parse_url($url);
        if (!is_array($base) || !is_array($target)) {
            throw new OAuthException('AI Worker returned an endpoint outside the configured base URL.', 502);
        }
        $scheme = strtolower((string) ($base['scheme'] ?? ''));
        $targetScheme = strtolower((string) ($target['scheme'] ?? ''));
        $host = strtolower((string) ($base['host'] ?? ''));
        $targetHost = strtolower((string) ($target['host'] ?? ''));
        $port = isset($base['port']) ? (int) $base['port'] : ($scheme === 'https' ? 443 : 80);
        $targetPort = isset($target['port']) ? (int) $target['port'] : ($targetScheme === 'https' ? 443 : 80);
        $basePath = rtrim((string) ($base['path'] ?? ''), '/');
        $targetPath = (string) ($target['path'] ?? '');
        $prefix = $basePath === '' ? '/' : $basePath.'/';
        if (!in_array($scheme, array('http', 'https'), true) || $targetScheme !== $scheme || $targetHost !== $host || $targetPort !== $port ||
            isset($target['user']) || isset($target['pass']) || isset($target['fragment']) || strpos($targetPath, '%') !== false || strpos($targetPath, '\\') !== false || strpos($targetPath, '..') !== false ||
            strpos($targetPath, $prefix) !== 0) {
            throw new OAuthException('AI Worker returned an endpoint outside the configured base URL.', 502);
        }
    }

    private function forgetTokens(): void
    {
        $this->host->settingForget(self::TOKEN_KEY);
    }

    /**
     * Legacy token records inherited their base from oauth_client. Pin that value inside the encrypted record before
     * replacing the client registration, so starting a reconnect at another base cannot rebind the old credentials.
     */
    private function preserveLegacyTokenBase(array $client): void
    {
        $encrypted = $this->host->settingGet(self::TOKEN_KEY);
        if (!is_string($encrypted) || empty($client['base']) || !is_string($client['base'])) {
            return;
        }
        $tokens = $this->crypto->decrypt($encrypted);
        if (!is_array($tokens) || isset($tokens['base'])) {
            return;
        }
        $clientBase = rtrim($client['base'], '/');
        if ($clientBase === '' || self::baseForTokenIsSafe($clientBase) === false) {
            return;
        }
        $tokens['base'] = $clientBase;
        $this->host->settingPut(self::TOKEN_KEY, $this->crypto->encrypt($tokens));
    }

    private static function baseForTokenIsSafe(string $base): bool
    {
        return AbstractHost::normalizeBase($base) === $base;
    }

    private function clearCaches(): void
    {
        $indexKey = 'screen-cache-index:'.sha1($this->host->siteHome());
        $keys = $this->host->cacheGet($indexKey);
        if (is_array($keys)) {
            foreach ($keys as $key) {
                $this->host->cacheDelete((string) $key);
            }
        }
        $this->host->cacheDelete($indexKey);
        $this->host->cacheDelete('sync-status:'.sha1($this->host->siteHome().'|'.$this->host->settingGet('chat_id')));
    }

}
