<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\aiworker_chat\Common;

class AdminApi
{
    private $host;
    private $siteHost;
    private $oauth;
    private $kra;
    private $sync;
    private $baseSync;
    private $rules;
    private $limiter;

    public function __construct(Host $host, OAuth $oauth, KraClient $kra, SyncEngine $sync, ProxyRules $rules, RateLimiter $limiter)
    {
        $this->host = $host;
        $this->siteHost = $host;
        $this->oauth = $oauth;
        $this->kra = $kra;
        $this->sync = $sync;
        $this->baseSync = $sync;
        $this->rules = $rules;
        $this->limiter = $limiter;
    }

    public function handle(AdminRequest $request): AdminResponse
    {
        $this->host = $this->siteHost;
        $this->sync = $this->baseSync;
        if (!$request->allowed) {
            return $this->json(array('error' => 'forbidden'), 403);
        }
        $route = trim(ltrim($request->route, '/'), '/');
        $methods = array(
            'state' => 'GET', 'batch' => 'POST', 'api' => 'POST', 'icon' => 'POST', 'connect' => 'GET', 'callback' => 'GET',
            'disconnect' => 'POST', 'link' => 'POST', 'settings' => 'POST', 'sync' => 'POST', 'sync/status' => 'GET',
            'chats/add' => 'POST', 'chats/remove' => 'POST', 'key' => 'POST',
        );
        if (!isset($methods[$route])) {
            return $this->json(array('error' => 'not_found'), 404);
        }
        if ($request->method !== $methods[$route]) {
            return $this->json(array('error' => 'method_not_allowed'), 405);
        }
        if (($request->method !== 'GET' || $route === 'sync/status') && !$request->csrfValid) {
            return $this->json(array('error' => 'csrf'), 403);
        }
        $limit = $route === 'icon' ? 1024 * 1024 + 4096 : 65536;
        if ($this->requestLength($request) > $limit) {
            return $this->json(array('error' => 'body_too_large'), 413);
        }
        $registry = new ChatRegistry($this->siteHost);
        $perChat = array('batch', 'api', 'icon', 'link', 'settings', 'sync', 'sync/status', 'chats/remove', 'key');
        $requestedChat = null;
        if (isset($request->json['chat']) && is_string($request->json['chat'])) $requestedChat = $request->json['chat'];
        elseif (isset($request->query['chat']) && is_string($request->query['chat'])) $requestedChat = $request->query['chat'];
        if ($route === 'state' && $requestedChat === null) $requestedChat = $registry->ids()[0] ?? null;
        if (in_array($route, $perChat, true) && $requestedChat === null) {
            return $this->json(array('error' => 'chat_required'), 422);
        }
        if ($requestedChat !== null) {
            $scoped = $registry->scoped($requestedChat);
            if (!$scoped) return $this->json(array('error' => 'unknown_chat'), 404);
            $this->host = $scoped;
            $this->sync = $this->baseSync->forHost($scoped);
        }
        if (!$this->limiter->hit('all', 120, 60)) {
            return $this->json(array('error' => 'rate_limit', 'retry_after' => 60), 429);
        }
        if ($route === 'api' && isset($request->json['path']) && $this->rules->normalizePath((string) $request->json['path']) === 'plugin/assistant/ask' && !$this->limiter->hit('assistant-ask', 20, 60)) {
            return $this->json(array('error' => 'rate_limit', 'retry_after' => 60), 429);
        }
        if ($route === 'icon' && !$this->limiter->hit('icon', 10, 60)) {
            return $this->json(array('error' => 'rate_limit', 'retry_after' => 60), 429);
        }
        switch ($route) {
            case 'state': return $this->json($this->state());
            case 'batch': return $this->batch($request);
            case 'api': return $this->api($request);
            case 'icon': return $this->icon($request);
            case 'connect':
                try {
                    return new AdminResponse(302, null, $this->oauth->beginAuthorization());
                } catch (\Throwable $exception) {
                    return new AdminResponse(302, null, $this->host->adminPageUrl(array('aiworker_chat_error' => 'connect_failed')));
                }
            case 'callback': return $this->callback($request);
            case 'disconnect':
                $this->oauth->disconnect();
                $this->clearScreenCache();
                return $this->json(array('connected' => false));
            case 'link': return $this->link($request);
            case 'settings': return $this->settings($request);
            case 'sync': return $this->sync($request);
            case 'sync/status': return $this->syncStatus();
            case 'chats/add': return $this->addChat();
            case 'chats/remove': return $this->removeChat((string) $requestedChat);
            case 'key': return $this->saveKey($request, (string) $requestedChat);
        }
        return $this->json(array('error' => 'not_found'), 404);
    }

    public function mountConfig(string $endpoint, string $csrfHeader, string $csrfToken): array
    {
        $base = rtrim($this->host->base(), '/');
        return array(
            'endpoint' => $endpoint,
            'csrf' => array('header' => $csrfHeader, 'token' => $csrfToken),
            'lang' => $this->host->adminLanguage(),
            'platform' => $this->host->platform(),
            'version' => $this->host->version(),
            'widgetBase' => $base,
            'panelBase' => $base.'/panel',
        );
    }

    private function state(): array
    {
        $this->adoptManualKey();
        $currentChat = $this->host instanceof ScopedHost ? $this->host->chatId() : null;
        $registry = new ChatRegistry($this->siteHost);
        $chats = array();
        foreach ($registry->ids() as $id) {
            $chat = $registry->scoped($id);
            if (!$chat) continue;
            $chats[] = array(
                'id' => $id,
                'name' => (string) $chat->settingGet('chat_name', ''),
                'key' => $chat->settingGet('widget_key'),
                'chat_id' => (int) $chat->settingGet('chat_id', 0),
                'linked' => (int) $chat->settingGet('chat_id', 0) > 0,
            );
        }
        $widget = $this->host->settingGet('widget_options', array());
        $widget = is_array($widget) ? $widget : array();
        $widgetState = array_intersect_key($widget, array_flip(array(
            'theme', 'color', 'position', 'load', 'delay', 'scheme', 'colors', 'mount', 'height',
            'siteOffsetX', 'siteOffsetY', 'pages_mode', 'pages', 'voice', 'rating', 'privacy_url', 'stack_order', 'stack', 'greet_popup',
        )));
        $widgetState['enabled'] = (bool) ($widget['enabled'] ?? false);
        if (!array_key_exists('greet_popup', $widgetState) || $widgetState['greet_popup'] === null) {
            $widgetState['greet_popup'] = (bool) $this->host->settingGet('remote_greet_popup', false);
        }
        $widgetState['key'] = $this->host->settingGet('widget_key');
        $keyCheck = $this->currentSetupKeyCheck($widgetState['key']);
        if (is_array($keyCheck)) {
            $widgetState['key_check'] = array_intersect_key($keyCheck, array_flip(array('ok', 'name', 'setup_required', 'status', 'unreachable')));
        }
        $syncState = $this->host->settingGet('sync_state', array());
        $syncState = is_array($syncState) ? $syncState : array();
        $syncOptions = $this->host->settingGet('sync_options', array());
        $syncOptions = is_array($syncOptions) ? $syncOptions : array();
        $pages = isset($syncOptions['pages']) && is_array($syncOptions['pages']) ? $syncOptions['pages'] : array();
        $products = isset($syncOptions['products']) && is_array($syncOptions['products']) ? $syncOptions['products'] : array();
        return array(
            'connected' => $this->oauth->tokens() !== null,
            'platform' => $this->host->platform(),
            'version' => $this->host->version(),
            'lang' => $this->host->adminLanguage(),
            'site' => array('host' => $this->host->siteHost(), 'home' => rtrim($this->host->siteHome(), '/')),
            'chat_id' => $this->host->settingGet('chat_id'),
            'current_chat' => $currentChat,
            'chats' => $chats,
            'chat_name' => $this->host->settingGet('chat_name', ''),
            'key_only' => (bool) $this->host->settingGet('widget_key') && (int) $this->host->settingGet('chat_id', 0) < 1,
            'widget' => $widgetState,
            'sync' => array(
                'pages' => array('enabled' => array_key_exists('enabled', $pages) ? (bool) $pages['enabled'] : true, 'sources' => $this->host->pageSources()),
                'products' => array('enabled' => (bool) ($products['enabled'] ?? false), 'available' => $this->host->productsAvailable()),
                'last_run' => $syncState['last_run'] ?? null,
                'next_run' => $syncState['next_run'] ?? null,
                'running' => (bool) ($syncState['running'] ?? false),
                'error' => $syncState['error'] ?? null,
                'job_id' => $syncState['manual_job_id'] ?? null,
                'job_status' => $syncState['manual_job_status'] ?? null,
                'job_next_run' => $syncState['manual_job_next_run'] ?? null,
            ),
            'account' => $this->host->settingGet('account'),
        );
    }

    private function currentSetupKeyCheck($key): ?array
    {
        if (!is_string($key) || !preg_match('/^wk_[A-Za-z0-9]{24}$/', $key)) {
            return null;
        }
        $cacheKey = $this->setupKeyCheckCacheKey($key);
        $check = $this->host->cacheGet($cacheKey);
        if (is_array($check)) {
            return $check;
        }
        try {
            $check = $this->kra->checkWidgetKey($key, $this->host->adminLanguage());
        } catch (\Throwable $ignored) {
            $check = array('status' => 0, 'ok' => false, 'name' => '', 'setup_required' => false);
        }
        $status = (int) ($check['status'] ?? 0);
        $check['unreachable'] = $status === 0 || $status >= 500;
        $check = array_intersect_key($check, array_flip(array('ok', 'name', 'setup_required', 'status', 'unreachable')));
        $this->host->cacheSet($cacheKey, $check, 300);
        return $check;
    }

    private function setupKeyCheckCacheKey(string $key): string
    {
        return 'setup-key-check:'.sha1($this->host->siteHome().'|'.$this->host->adminLanguage().'|'.$key);
    }

    /** Link a manually entered public key after OAuth only when this host identifies one matching chat. */
    private function adoptManualKey(): void
    {
        $key = $this->host->settingGet('widget_key');
        if ($this->oauth->tokens() === null || $this->host->settingGet('chat_id') || !is_string($key) || !preg_match('/^wk_[A-Za-z0-9]{24}$/', $key)) {
            return;
        }
        $attemptKey = 'manual-key-adopt:'.sha1($this->host->siteHost());
        if ($this->host->cacheGet($attemptKey) === true) {
            return;
        }
        $this->host->cacheSet($attemptKey, true, 600);

        $me = $this->kra->request('GET', 'plugin/me');
        if ($me['status'] < 200 || $me['status'] >= 300 || !is_array($me['body'])) {
            return;
        }
        $this->host->settingPut('account', $me['body']['account'] ?? array());
        if (array_key_exists('widget_version', $me['body'])) {
            $this->host->settingPut('widget_version', $me['body']['widget_version']);
        }
        $host = $this->host->siteHost();
        $matching = array_values(array_filter($me['body']['chats'] ?? array(), static function ($chat) use ($host): bool {
            return is_array($chat) && filter_var($chat['id'] ?? null, FILTER_VALIDATE_INT) && in_array($host, is_array($chat['site_domains'] ?? null) ? $chat['site_domains'] : array(), true);
        }));
        if (count($matching) !== 1) {
            return;
        }

        $chatId = (int) $matching[0]['id'];
        $link = $this->kra->request('POST', 'plugin/link', array(), array('chat_id' => $chatId, 'site' => $host));
        $linkedKey = $link['body']['key'] ?? null;
        if ($link['status'] < 200 || $link['status'] >= 300 || !is_string($linkedKey) || !hash_equals($key, $linkedKey)) {
            return;
        }
        $this->host->settingPut('chat_id', $chatId);
        $this->host->settingForget('widget_key_check');
        $this->clearScreenCache();
    }

    private function batch(AdminRequest $request): AdminResponse
    {
        $input = is_array($request->json) ? $request->json : array();
        $blocks = isset($input['blocks']) && is_array($input['blocks']) ? array_values(array_unique(array_map('strval', $input['blocks']))) : array();
        if (!$blocks || count($blocks) > 8 || count(array_diff($blocks, ProxyRules::BLOCKS)) > 0) {
            return $this->json(array('error' => 'not_allowed'), 403);
        }
        $unlinkedBlocks = array_diff($blocks, array('me', 'assistant')) === array();
        $allowUnlinked = (int) $this->host->settingGet('chat_id', 0) < 1 && !$this->host->settingGet('widget_key') && $unlinkedBlocks;
        $query = $this->proxyQuery(isset($input['query']) && is_array($input['query']) ? $input['query'] : array(), $allowUnlinked);
        if ($query === null) {
            return $this->json(array('error' => 'not_allowed'), 403);
        }
        $results = array();
        $missing = array();
        foreach ($blocks as $block) {
            $key = $this->screenCacheKey($block, $query);
            $cached = in_array($block, ProxyRules::CACHED_BLOCKS, true) ? $this->host->cacheGet($key) : null;
            if (is_array($cached) && isset($cached['status'])) {
                $results[$block] = $cached;
            } else {
                $missing[] = $block;
            }
        }
        if ($missing) {
            $remote = $this->kra->screen($query + array('blocks' => implode(',', $missing)));
            // kra.name answers /plugin/screen with {"blocks": {...}}; «results» and a bare map are kept for older servers.
            // Preserve each returned block status and body while unwrapping the envelope.
            $remoteBody = is_array($remote['body']) ? $remote['body'] : array();
            $remoteResults = isset($remoteBody['blocks']) && is_array($remoteBody['blocks']) ? $remoteBody['blocks'] : (isset($remoteBody['results']) && is_array($remoteBody['results']) ? $remoteBody['results'] : $remoteBody);
            foreach ($missing as $block) {
                $result = isset($remoteResults[$block]) && is_array($remoteResults[$block]) ? $remoteResults[$block] : array('status' => $remote['status'], 'body' => $remote['body']);
                $results[$block] = array('status' => (int) ($result['status'] ?? $remote['status']), 'body' => $result['body'] ?? array());
                if ($block === 'me' && $results[$block]['status'] >= 200 && $results[$block]['status'] < 300) {
                    $body = $results[$block]['body'];
                    if (is_array($body)) {
                        $this->host->settingPut('account', $body['account'] ?? array());
                        if (isset($body['widget_version'])) {
                            $this->host->settingPut('widget_version', $body['widget_version']);
                        }
                    }
                }
                if (in_array($block, ProxyRules::CACHED_BLOCKS, true) && $remote['status'] >= 200 && $remote['status'] < 300) {
                    $key = $this->screenCacheKey($block, $query);
                    $this->host->cacheSet($key, $results[$block], 60);
                    $this->indexScreenCache($key);
                }
            }
        }
        return $this->json(array('results' => $results));
    }

    private function api(AdminRequest $request): AdminResponse
    {
        $input = is_array($request->json) ? $request->json : array();
        $method = strtoupper((string) ($input['method'] ?? ''));
        $path = $this->rules->normalizePath((string) ($input['path'] ?? ''));
        if ($path === null || !$this->rules->allows($method, $path)) {
            return $this->json(array('error' => 'not_allowed'), 403);
        }
        $query = $this->proxyQuery(isset($input['query']) && is_array($input['query']) ? $input['query'] : array());
        if ($query === null) {
            return $this->json(array('error' => 'not_allowed'), 403);
        }
        $body = isset($input['body']) && is_array($input['body']) ? $input['body'] : array();
        if ($this->rules->isAssistantPath($path)) {
            $body['chat_id'] = $query['chat_id'];
            if (!isset($body['lang'])) {
                $body['lang'] = $query['lang'];
            }
        }
        if ($path === 'plugin/chat' && $method === 'PATCH') {
            $body = $this->boundChatSettings($body);
        }
        $bodySize = strlen((string) json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        if ($bodySize > 65536) {
            return $this->json(array('error' => 'body_too_large'), 413);
        }
        $result = $this->kra->request($method, $path, $query, $method === 'GET' ? null : $body);
        if ($result['status'] >= 200 && $result['status'] < 300 && $method !== 'GET') {
            $this->clearScreenCache();
        }
        return $this->json(array('status' => $result['status'], 'body' => $result['body']));
    }

    private function boundChatSettings(array $body): array
    {
        if (isset($body['languages']) && is_array($body['languages'])) {
            $body['languages'] = array_slice($body['languages'], 0, 20);
        } elseif (isset($body['languages']) && is_string($body['languages'])) {
            $body['languages'] = implode(', ', array_slice(array_map('trim', explode(',', $body['languages'])), 0, 20));
        }
        if (isset($body['texts']) && is_array($body['texts'])) {
            $body['texts'] = array_slice($body['texts'], 0, 20, true);
            foreach ($body['texts'] as &$text) {
                if (is_array($text) && isset($text['suggestions']) && is_array($text['suggestions'])) {
                    $text['suggestions'] = array_slice($text['suggestions'], 0, 10);
                }
            }
            unset($text);
        }
        return $body;
    }

    private function icon(AdminRequest $request): AdminResponse
    {
        $file = $request->file;
        if (!is_array($file) || !empty($file['error']) || !isset($file['bytes']) || !is_string($file['bytes']) || (int) ($file['size'] ?? strlen($file['bytes'])) > 1024 * 1024) {
            return $this->json(array('error' => 'invalid_image'), 422);
        }
        $chatId = (int) $this->host->settingGet('chat_id', 0);
        if ($chatId < 1) {
            return $this->json(array('error' => 'not_linked'), 422);
        }
        $result = $this->kra->uploadIcon($file['bytes'], (string) ($file['name'] ?? 'upload'), $chatId, $this->host->adminLanguage());
        if ($result['status'] >= 200 && $result['status'] < 300) {
            $this->clearScreenCache();
        }
        return $this->json(array('status' => $result['status'], 'body' => $result['body']));
    }

    private function callback(AdminRequest $request): AdminResponse
    {
        if (!empty($request->query['error'])) {
            return new AdminResponse(302, null, $this->host->adminPageUrl(array('aiworker_chat_error' => 'failed')));
        }
        try {
            $this->oauth->completeAuthorization((string) ($request->query['state'] ?? ''), (string) ($request->query['code'] ?? ''));
            return new AdminResponse(302, null, $this->host->adminPageUrl(array('aiworker_chat_connected' => 1)));
        } catch (\Throwable $exception) {
            $notice = $exception instanceof OAuthException && $exception->status === 403 ? 'state' : 'failed';
            return new AdminResponse(302, null, $this->host->adminPageUrl(array('aiworker_chat_error' => $notice)));
        }
    }

    private function link(AdminRequest $request): AdminResponse
    {
        $input = is_array($request->json) ? $request->json : array();
        $ids = isset($input['chat_ids']) && is_array($input['chat_ids']) ? $input['chat_ids'] : array($input['chat_id'] ?? null);
        $ids = array_values(array_unique(array_map('intval', $ids)));
        if (!$ids || count($ids) > 50 || count(array_filter($ids, static function ($id) { return $id > 0; })) !== count($ids)) {
            return $this->json(array('error' => 'invalid_chat'), 422);
        }
        $registry = new ChatRegistry($this->siteHost);
        $currentId = $this->host instanceof ScopedHost ? $this->host->chatId() : '';
        $adding = !empty($input['new']); // «Add chat»: never the current chat, and a record only for a chat that linked
        $replaceCurrent = !empty($input['replace_current']) && !$adding && $currentId !== '';
        if ($replaceCurrent && count($ids) > 1) return $this->json(array('error' => 'invalid_chat'), 422);
        $results = array();
        $succeeded = false;
        foreach ($ids as $remoteId) {
            $boundLocalId = $registry->findByRemoteId($remoteId);
            if ($replaceCurrent && $boundLocalId !== null && $boundLocalId === $currentId) {
                $key = $this->host->settingGet('widget_key');
                $results[] = array(
                    'chat_id' => $remoteId, 'local_chat' => $currentId, 'status' => 200,
                    'body' => array('key' => is_string($key) ? $key : ''), 'preserved' => true,
                    'changed' => false, 'unchanged' => true,
                );
                continue;
            }
            $moveFrom = null;
            if ($boundLocalId !== null && $boundLocalId !== $currentId) {
                if (!$replaceCurrent || empty($input['confirm_move'])) return $this->chatOnOtherTab($registry, $boundLocalId);
                $moveFrom = $boundLocalId;
            }
            $localId = $moveFrom !== null ? $currentId : $boundLocalId;
            $alreadyLinked = $boundLocalId !== null && $moveFrom === null;
            $rebind = $moveFrom !== null;
            $preserve = $alreadyLinked || $moveFrom !== null;
            $currentRemote = (int) $this->host->settingGet('chat_id', 0);
            if ($localId === null && !$adding && $currentId !== '' && (!empty($input['replace_current']) || $currentRemote < 1)) {
                // «Change chat» replaces this tab's destination; an unlinked tab receives its first
                // remote binding. Both rebind paths clear destination-specific state.
                $localId = $currentId;
                $rebind = true;
                $preserve = true;
            }
            $result = $this->kra->request('POST', 'plugin/link', array(), array('chat_id' => $remoteId, 'site' => $this->siteHost->siteHost()));
            $body = is_array($result['body'] ?? null) ? $result['body'] : array();
            $key = $body['key'] ?? null;
            if ($result['status'] >= 200 && $result['status'] < 300 && is_string($key) && preg_match('/^wk_[A-Za-z0-9]{24}$/', $key)) {
                if (!$alreadyLinked) {
                    if ($localId === null) $localId = $registry->add();
                    if (!is_string($localId)) {
                        $results[] = array('chat_id' => $remoteId, 'status' => 409, 'body' => array('error' => 'registry_busy'));
                        continue;
                    }
                    $chatName = (string) ($body['name'] ?? ($body['chat']['name'] ?? ''));
                    $saved = $moveFrom !== null
                        ? $registry->moveBinding($moveFrom, $localId, $key, $remoteId, $chatName)
                        : $registry->saveKey($localId, $key, $remoteId, $chatName, $rebind);
                    if (!in_array($saved, array('saved', 'same', 'moved'), true)) {
                        if ($saved === 'stale') {
                            $nowBound = $registry->findByRemoteId($remoteId);
                            if ($nowBound !== null && $nowBound !== $currentId) return $this->chatOnOtherTab($registry, $nowBound);
                        }
                        $results[] = array('chat_id' => $remoteId, 'local_chat' => $localId, 'status' => 409, 'body' => array('error' => $saved === 'duplicate' ? 'duplicate_key' : $saved));
                        continue;
                    }
                    $target = $registry->scoped($localId);
                    if ($target) {
                        $target->settingForget('widget_key_check');
                        $target->settingPut('widget_link', $body);
                        $chatResponse = $this->kra->request('GET', 'plugin/chat', array('chat_id' => $remoteId, 'lang' => $this->siteHost->adminLanguage()));
                        $remoteChat = $chatResponse['body']['chat'] ?? null;
                        if ($chatResponse['status'] >= 200 && $chatResponse['status'] < 300 && is_array($remoteChat)) {
                            if (isset($remoteChat['name']) && is_scalar($remoteChat['name'])) $target->settingPut('chat_name', (string) $remoteChat['name']);
                            if (array_key_exists('greet_popup', $remoteChat)) $target->settingPut('remote_greet_popup', (bool) $remoteChat['greet_popup']);
                        }
                    }
                    $preserve = true;
                }
                $succeeded = true;
            }
            $results[] = array('chat_id' => $remoteId, 'local_chat' => $localId, 'status' => (int) $result['status'], 'body' => $body, 'preserved' => $preserve, 'changed' => !$alreadyLinked);
        }
        if ($succeeded) {
            $me = $this->kra->request('GET', 'plugin/me');
            if ($me['status'] >= 200 && $me['status'] < 300 && is_array($me['body'])) {
                $this->siteHost->settingPut('account', $me['body']['account'] ?? array());
                if (array_key_exists('widget_version', $me['body'])) $this->siteHost->settingPut('widget_version', $me['body']['widget_version']);
            }
            $this->clearScreenCache();
        }
        if (count($results) === 1) return $this->json($results[0] + array('results' => $results));
        return $this->json(array('results' => $results, 'linked' => $succeeded));
    }

    private function chatOnOtherTab(ChatRegistry $registry, string $otherId): AdminResponse
    {
        $other = $registry->scoped($otherId);
        $name = $other ? trim((string) $other->settingGet('chat_name', '')) : '';
        if ($name === '') $name = $otherId;
        $messages = array(
            'ru' => 'Этот чат уже подключён на другой вкладке сайта. Подтвердите перенос, чтобы закрыть ту вкладку.',
            'en' => 'This chat is already connected on another site tab. Confirm the move to close that tab.',
            'uk' => 'Цей чат уже підключено на іншій вкладці сайту. Підтвердьте перенесення, щоб закрити ту вкладку.',
        );
        $language = $this->siteHost->adminLanguage();
        return $this->json(array(
            'error' => 'chat_on_other_tab', 'code' => 'chat_on_other_tab',
            'other_tab_id' => $otherId, 'other_tab_name' => $name,
            'message' => $messages[$language] ?? $messages['en'],
        ), 409);
    }

    private function addChat(): AdminResponse
    {
        $id = (new ChatRegistry($this->siteHost))->add();
        return $id === null ? $this->json(array('error' => 'registry_busy'), 409) : $this->json(array('added' => true, 'chat' => $id));
    }

    private function removeChat(string $id): AdminResponse
    {
        $result = (new ChatRegistry($this->siteHost))->remove($id);
        if ($result === 'unknown') return $this->json(array('error' => 'unknown_chat'), 404);
        if ($result !== 'removed') return $this->json(array('error' => $result), 409);
        return $this->json(array('removed' => true, 'chats' => (new ChatRegistry($this->siteHost))->ids()));
    }

    private function saveKey(AdminRequest $request, string $id): AdminResponse
    {
        $input = is_array($request->json) ? $request->json : array();
        $key = trim((string) ($input['key'] ?? ''));
        if ($key !== '' && !preg_match('/^wk_[A-Za-z0-9]{24}$/', $key)) return $this->json(array('error' => 'invalid_chat_key'), 422);
        if ($key !== '') {
            try { $check = $this->kra->checkWidgetKey($key, $this->siteHost->adminLanguage()); }
            catch (\Throwable $ignored) { $check = array('status' => 0, 'ok' => false, 'unreachable' => true); }
            if (empty($check['ok'])) {
                $unavailable = (int) ($check['status'] ?? 0) === 0 || (int) ($check['status'] ?? 0) >= 500;
                return $this->json(array('error' => $unavailable ? 'key_check_unavailable' : 'invalid_chat_key'), $unavailable ? 503 : 422);
            }
        }
        $registry = new ChatRegistry($this->siteHost);
        if (!empty($input['new'])) {
            // «Add chat»: the record appears only now, with its checked key
            if ($key === '') return $this->json(array('error' => 'invalid_chat_key'), 422);
            if ($registry->findByKey($key) !== null) return $this->json(array('error' => 'duplicate_key'), 422);
            $id = $registry->add();
            $scoped = $id === null ? null : $registry->scoped($id);
            if (!$scoped) return $this->json(array('error' => 'registry_busy'), 409);
            $this->host = $scoped;
            $this->sync = $this->baseSync->forHost($scoped);
        }
        $saved = $registry->saveKey($id, $key);
        if (!empty($input['new']) && !in_array($saved, array('saved', 'same'), true)) $registry->remove($id);
        if ($saved === 'duplicate') return $this->json(array('error' => 'duplicate_key'), 422);
        if ($saved === 'unknown') return $this->json(array('error' => 'unknown_chat'), 404);
        if (!in_array($saved, array('saved', 'same'), true)) return $this->json(array('error' => $saved), 409);
        if ($key === '') {
            $this->host->settingForget('widget_key_check');
        } else {
            $check = array_intersect_key($check, array_flip(array('ok', 'name', 'setup_required', 'status')));
            $this->host->settingPut('widget_key_check', $check);
            $this->host->cacheSet($this->setupKeyCheckCacheKey($key), $check, 300);
        }
        $this->clearScreenCache();
        return $this->json(array('saved' => true, 'state' => $this->state()));
    }

    private function settings(AdminRequest $request): AdminResponse
    {
        $input = is_array($request->json) ? $request->json : array();
        $storedWidget = $this->host->settingGet('widget_options', array());
        $storedWidget = is_array($storedWidget) ? $storedWidget : array();
        if (isset($input['widget']) && is_array($input['widget'])) {
            $widget = $input['widget'];
            $keyCheck = null;
            if (array_key_exists('key', $widget)) {
                $key = trim((string) $widget['key']);
                if ($key !== '' && !preg_match('/^wk_[A-Za-z0-9]{24}$/', $key)) {
                    return $this->json(array('error' => 'invalid_chat_key'), 422);
                }
                $registry = new ChatRegistry($this->siteHost);
                if ($key !== '' && $registry->findByKey($key, $this->host->chatId()) !== null) {
                    return $this->json(array('error' => 'duplicate_key'), 422);
                }
                try {
                    $keyCheck = $key !== '' ? $this->kra->checkWidgetKey($key, $this->host->adminLanguage()) : null;
                } catch (\Throwable $ignored) {
                    $keyCheck = array('status' => 0, 'ok' => false, 'name' => '', 'setup_required' => false, 'unreachable' => true);
                }
                if ($key !== '' && empty($keyCheck['ok'])) {
                    $unavailable = (int) ($keyCheck['status'] ?? 0) === 0 || (int) ($keyCheck['status'] ?? 0) >= 500;
                    return $this->json(array('error' => $unavailable ? 'key_check_unavailable' : 'invalid_chat_key'), $unavailable ? 503 : 422);
                }
                $savedKey = $registry->saveKey($this->host->chatId(), $key);
                if ($savedKey === 'duplicate') return $this->json(array('error' => 'duplicate_key'), 422);
                if ($savedKey === 'unknown') return $this->json(array('error' => 'unknown_chat'), 404);
                if (!in_array($savedKey, array('saved', 'same'), true)) return $this->json(array('error' => $savedKey), 409);
                $storedWidget = $this->host->settingGet('widget_options', array());
                $storedWidget = is_array($storedWidget) ? $storedWidget : array();
                if (is_array($keyCheck)) {
                    $keyCheck['unreachable'] = false;
                    $this->host->settingPut('widget_key_check', $keyCheck);
                    $this->host->cacheSet($this->setupKeyCheckCacheKey($key), $keyCheck, 300);
                }
                else $this->host->settingForget('widget_key_check');
                if ($key === '') {
                    $storedWidget['enabled'] = false;
                }
            }
            if (array_key_exists('enabled', $widget)) {
                $storedWidget['enabled'] = $this->boolValue($widget['enabled']) && (bool) $this->host->settingGet('widget_key');
            }
            if (in_array($widget['theme'] ?? null, array('classic', 'bar', 'panel', 'inline'), true)) {
                $storedWidget['theme'] = $widget['theme'];
            }
            if (preg_match('/^#[0-9a-f]{6}$/i', (string) ($widget['color'] ?? ''))) {
                $storedWidget['color'] = strtolower((string) $widget['color']);
            }
            if (in_array($widget['position'] ?? null, array('left', 'right'), true)) {
                $storedWidget['position'] = $widget['position'];
            }
            if (in_array($widget['scheme'] ?? null, array('', 'light', 'dim', 'dark', 'auto'), true)) {
                $storedWidget['scheme'] = $widget['scheme'];
            }
            if (in_array($widget['load'] ?? null, array('immediate', 'interaction', 'delay'), true)) {
                $storedWidget['load'] = $widget['load'];
            } elseif (!isset($storedWidget['load'])) {
                $storedWidget['load'] = 'interaction';
            }
            $rawDelay = $widget['delay'] ?? 5;
            $delay = is_scalar($rawDelay) && preg_match('/^-?\\d+$/', trim((string) $rawDelay)) ? (int) $rawDelay : 5;
            $storedWidget['delay'] = max(1, min(120, $delay));
            if (in_array($widget['pages_mode'] ?? null, array('all', 'only', 'except'), true)) {
                $storedWidget['pages_mode'] = $widget['pages_mode'];
            }
            if (isset($widget['pages']) && is_string($widget['pages'])) {
                $storedWidget['pages'] = implode("\n", $this->normalizePageRules($widget['pages']));
            }
            foreach (array('siteOffsetX', 'siteOffsetY') as $offset) {
                if (array_key_exists($offset, $widget)) {
                    $value = trim((string) $widget[$offset]);
                    $storedWidget[$offset] = preg_match('/^-?\\d{1,3}$/', $value) ? (string) max(-300, min(300, (int) $value)) : '';
                }
            }
            foreach (array('voice', 'rating') as $toggle) {
                if (array_key_exists($toggle, $widget)) {
                    $storedWidget[$toggle] = $this->boolValue($widget[$toggle]);
                }
            }
            if (isset($widget['privacy_url']) && is_string($widget['privacy_url']) && filter_var($widget['privacy_url'], FILTER_VALIDATE_URL) && in_array(strtolower((string) parse_url($widget['privacy_url'], PHP_URL_SCHEME)), array('http', 'https'), true)) {
                $storedWidget['privacy_url'] = $widget['privacy_url'];
            }
            if (isset($widget['colors']) && is_array($widget['colors'])) {
                $colors = isset($storedWidget['colors']) && is_array($storedWidget['colors']) ? $storedWidget['colors'] : array();
                foreach ($widget['colors'] as $name => $hex) {
                    if (!preg_match('/^[a-z_]{1,32}$/', (string) $name)) continue;
                    if ($name === 'accent_text' && is_string($hex) && in_array($hex, array('auto', 'light', 'dark'), true)) $colors[$name] = $hex;
                    elseif (is_string($hex) && preg_match('/^#[0-9a-f]{6}$/i', $hex)) $colors[$name] = strtolower($hex);
                    elseif ($hex === null || $hex === '') unset($colors[$name]);
                }
                $storedWidget['colors'] = $colors;
            }
            if (isset($widget['mount']) && is_string($widget['mount']) && preg_match('/^[.]?[A-Za-z][A-Za-z0-9_-]{0,63}$/', $widget['mount'])) {
                $storedWidget['mount'] = $widget['mount'];
            }
            if (isset($widget['height']) && preg_match('/^\d{2,4}$/', (string) $widget['height'])) {
                $height = (int) $widget['height'];
                if ($height >= 100 && $height <= 1200) {
                    $storedWidget['height'] = $height;
                }
            }
            if (array_key_exists('stack_order', $widget) && filter_var($widget['stack_order'], FILTER_VALIDATE_INT) !== false) {
                $storedWidget['stack_order'] = max(0, min(100, (int) $widget['stack_order']));
            }
            foreach (array('stack', 'greet_popup') as $multiToggle) {
                if (array_key_exists($multiToggle, $widget)) $storedWidget[$multiToggle] = $this->boolValue($widget[$multiToggle]);
            }
            $this->host->settingPut('widget_options', $storedWidget);
        }
        if (isset($input['sync']) && is_array($input['sync'])) {
            $sync = $input['sync'];
            $saved = $this->host->settingGet('sync_options', array());
            $saved = is_array($saved) ? $saved : array();
            $pages = isset($saved['pages']) && is_array($saved['pages']) ? $saved['pages'] : array();
            if (isset($sync['pages']) && is_array($sync['pages'])) {
                if (array_key_exists('enabled', $sync['pages'])) {
                    $pages['enabled'] = $this->boolValue($sync['pages']['enabled']);
                }
                if (isset($sync['pages']['sources']) && is_array($sync['pages']['sources'])) {
                    $pages['sources'] = $this->host->sanitizePageSources($sync['pages']['sources']);
                }
            }
            $saved['pages'] = $pages;
            if (isset($sync['products']) && is_array($sync['products']) && array_key_exists('enabled', $sync['products'])) {
                $saved['products'] = array('enabled' => $this->host->productsAvailable() && $this->boolValue($sync['products']['enabled']));
            }
            $this->host->settingPut('sync_options', $saved);
        }
        $this->clearScreenCache();
        return $this->json(array('saved' => true, 'state' => $this->state(), 'key_check' => $keyCheck ?? null));
    }

    private function normalizePageRules(string $raw): array
    {
        $rules = array();
        foreach (preg_split('/\\r\\n|\\r|\\n/', $raw) as $line) {
            $line = trim(strip_tags($line));
            if ($line === '') continue;
            if (preg_match('#^https?://#i', $line)) {
                $path = parse_url($line, PHP_URL_PATH);
                $line = is_string($path) && $path !== '' ? $path : '/';
            }
            if ($line[0] !== '/') $line = '/'.$line;
            $line = rawurldecode($line);
            $line = (string) preg_replace('#[^\\p{L}\\p{N}\\p{M}/_\\-.*~+]#u', '', $line);
            if ($line !== '' && !in_array($line, $rules, true)) {
                if (function_exists('mb_substr')) $line = mb_substr($line, 0, 300, 'UTF-8');
                elseif (function_exists('iconv_substr')) {
                    $part = @iconv_substr($line, 0, 300, 'UTF-8');
                    if ($part !== false) $line = $part;
                }
                $rules[] = $line;
            }
            if (count($rules) >= 200) break;
        }
        return $rules;
    }

    private function sync(AdminRequest $request): AdminResponse
    {
        $input = is_array($request->json) ? $request->json : array();
        $scope = (string) ($input['scope'] ?? '');
        if (!in_array($scope, array('pages', 'products', 'all'), true)) {
            return $this->json(array('error' => 'invalid_scope'), 422);
        }
        $pages = in_array($scope, array('pages', 'all'), true);
        $products = in_array($scope, array('products', 'all'), true);
        $lock = 'manual-sync-enqueue:'.sha1($this->host->siteHome());
        if (!$this->host->lockAcquire($lock, 30)) {
            $state = $this->host->settingGet('sync_state', array());
            $state = is_array($state) ? $state : array();
            if ($this->activeManualJob($state)) return $this->activeJobResponse($state);
            return $this->json(array('error' => 'sync_busy'), 409);
        }
        try {
            $state = $this->host->settingGet('sync_state', array());
            $state = is_array($state) ? $state : array();
            if ($this->activeManualJob($state)) return $this->activeJobResponse($state);
            $requestId = bin2hex(random_bytes(16));
            $requestData = array('id' => $requestId, 'scope' => $scope, 'pages' => $pages, 'products' => $products,
                'force' => true, 'requested_at' => gmdate('c'), 'next_attempt_at' => null);
            $state['manual_request'] = $requestData;
            $state['manual_job_id'] = $requestId;
            $state['manual_job_status'] = 'queued';
            $state['manual_job_next_run'] = null;
            $state['manual_job_error'] = null;
            $state['manual_job_progress'] = null;
            $state['manual_job_summary'] = null;
            $state['manual_job_finished_at'] = null;
            $state['running'] = false;
            $this->host->settingPut('sync_state', $state);
            // Drupal can put the request straight into its native queue. Other adapters consume the durable request
            // from their existing cron/Task Scheduler entry point.
            $this->host->enqueueSync(array('manual' => true, 'job_id' => $requestId));
            return $this->json(array('started' => true, 'job_id' => $requestId, 'job_status' => 'queued'));
        } finally {
            $this->host->lockRelease($lock);
        }
    }

    private function syncStatus(): AdminResponse
    {
        $syncState = $this->host->settingGet('sync_state', array());
        $syncState = is_array($syncState) ? $syncState : array();
        $request = $syncState['manual_request'] ?? null;
        $jobStatus = (string) ($syncState['manual_job_status'] ?? '');
        if (is_array($request) && in_array($jobStatus, array('queued', 'retry_scheduled'), true)) {
            $retryAt = isset($request['next_attempt_at']) ? strtotime((string) $request['next_attempt_at']) : false;
            $requestedAt = isset($request['requested_at']) ? strtotime((string) $request['requested_at']) : false;
            $due = $retryAt !== false ? $retryAt <= time() : ($requestedAt !== false && $requestedAt <= time() - 5);
            if ($due) {
                $this->sync->runManualSlice(20);
                $syncState = $this->host->settingGet('sync_state', array());
                $syncState = is_array($syncState) ? $syncState : array();
                $jobStatus = (string) ($syncState['manual_job_status'] ?? '');
            }
        }
        $chatId = $this->host->settingGet('chat_id');
        $cacheKey = 'sync-status:'.sha1($this->host->siteHome().'|'.$chatId.'|'.(string) ($syncState['manual_job_id'] ?? '').'|'.(string) ($syncState['manual_job_finished_at'] ?? ''));
        $isActive = in_array($jobStatus, array('queued', 'running', 'retry_scheduled'), true);
        $result = $this->host->cacheGet($cacheKey);
        if ($isActive) {
            $result = array('site' => null, 'knowledge' => null, 'products' => null, 'status_pending' => true);
        } elseif ((int) $chatId < 1) {
            $result = array('connected' => false, 'key_only' => (bool) $this->host->settingGet('widget_key'));
        } elseif (!is_array($result)) {
            $key = $this->host->settingGet('widget_key');
            if (!is_string($key) || !preg_match('/^wk_[A-Za-z0-9]{24}$/', $key)) {
                $result = array('connected' => false);
            } else {
                $site = rtrim($this->host->siteHome(), '/');
                $chatContext = array('site' => $site, 'lang' => $this->host->adminLanguage());
                if ((int) $chatId > 0) $chatContext['chat_id'] = (int) $chatId;
                $status = $this->kra->siteKnowledge($key, 'status', 'GET', $chatContext);
                $products = null;
                $options = $this->host->settingGet('sync_options', array());
                if (is_array($options) && !empty($options['products']['enabled']) && $this->host->productsAvailable()) {
                    $products = $this->kra->siteKnowledge($key, 'products/status', 'GET', $chatContext);
                    if (isset($products['body']['limits']['max_products'])) {
                        $this->host->settingPut('products_status', $products['body']);
                    }
                }
                // `site` is what the shared UI reads (docs, chars, indexing, last_sync_at); the wrappers stay for callers.
                $result = array(
                    'site' => ($status['status'] >= 200 && $status['status'] < 300 && is_array($status['body'])) ? $status['body'] : array(),
                    'knowledge' => $status,
                    'products' => $products,
                );
            }
            $this->host->cacheSet($cacheKey, $result, 15);
        }
        $result['sync_job'] = array('id' => $syncState['manual_job_id'] ?? null, 'status' => $syncState['manual_job_status'] ?? null,
            'next_run' => $syncState['manual_job_next_run'] ?? null, 'error' => $syncState['manual_job_error'] ?? null,
            'progress' => $syncState['manual_job_progress'] ?? null, 'result' => $syncState['manual_job_summary'] ?? null,
            'finished_at' => $syncState['manual_job_finished_at'] ?? null);
        return $this->json($result);
    }

    private function activeManualJob(array $state): bool
    {
        return !empty($state['manual_job_id']) && in_array((string) ($state['manual_job_status'] ?? ''), array('queued', 'running', 'retry_scheduled'), true);
    }

    private function activeJobResponse(array $state): AdminResponse
    {
        return $this->json(array('started' => false, 'active' => true, 'job_id' => (string) ($state['manual_job_id'] ?? ''),
            'job_status' => (string) ($state['manual_job_status'] ?? 'queued')));
    }

    private function proxyQuery(array $query, bool $allowUnlinked = false): ?array
    {
        if (!$this->rules->queryAllowed($query)) {
            return null;
        }
        $chatId = (int) $this->host->settingGet('chat_id', 0);
        if ($chatId < 1) {
            if (!$allowUnlinked || array_key_exists('chat_id', $query)) return null;
        }
        $query = array_filter($query, function ($value) { return is_scalar($value) && (string) $value !== ''; });
        if ($chatId > 0) $query['chat_id'] = $chatId;
        if (!isset($query['lang'])) {
            $query['lang'] = $this->host->adminLanguage();
        }
        return $query;
    }

    private function screenCacheKey(string $block, array $query): string
    {
        ksort($query);
        return 'screen:'.sha1($this->host->siteHome().'|'.$block.'|'.json_encode($query, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    }

    private function indexScreenCache(string $key): void
    {
        $indexKey = 'screen-cache-index:'.sha1($this->host->siteHome());
        $keys = $this->host->cacheGet($indexKey);
        $keys = is_array($keys) ? $keys : array();
        $keys[] = $key;
        $this->host->cacheSet($indexKey, array_values(array_unique($keys)), 120);
    }

    private function clearScreenCache(): void
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

    private function requestLength(AdminRequest $request): int
    {
        $length = $request->rawLength;
        if ($length === 0 && is_array($request->json)) {
            $encoded = json_encode($request->json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            $length = is_string($encoded) ? strlen($encoded) : 0;
        }
        return $length;
    }

    private function boolValue($value): bool
    {
        if (is_string($value)) {
            return in_array(strtolower($value), array('1', 'true', 'yes', 'on'), true);
        }
        return (bool) $value;
    }

    private function json(array $body, int $status = 200): AdminResponse
    {
        return new AdminResponse($status, $body);
    }
}
