<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\aiworker_chat\Common;

/** Host decorator that scopes chat settings and locks while leaving OAuth/account metadata site-wide. */
class ScopedHost extends AbstractHost
{
    private $inner;
    private $id;
    private $registry;

    public function __construct(Host $inner, string $id, ChatRegistry $registry)
    {
        $this->inner = $inner;
        $this->id = $id;
        $this->registry = $registry;
    }

    public function chatId(): string { return $this->id; }
    public function baseHost(): Host { return $this->inner; }
    public function registered(): bool { return $this->registry->contains($this->id); }

    private function scopedKey(string $key): bool
    {
        return in_array($key, ChatRegistry::CHAT_KEYS, true) || strpos($key, 'cache:') === 0;
    }

    private function storageKey(string $key): string
    {
        return $this->id === 'chat1' ? $key : 'chat:'.$this->id.':'.$key;
    }

    public function platform(): string { return $this->inner->platform(); }
    public function platformLabel(): string { return $this->inner->platformLabel(); }
    public function version(): string { return $this->inner->version(); }
    public function base(): string { return $this->inner->base(); }
    public function siteHome(): string { return $this->inner->siteHome(); }
    public function siteHost(): string { return $this->inner->siteHost(); }
    public function callbackUrl(): string { return $this->inner->callbackUrl(); }
    public function adminPageUrl(array $query = array()): string { return $this->inner->adminPageUrl($query); }
    public function adminLanguage(): string { return $this->inner->adminLanguage(); }
    public function userKey(): string { return $this->inner->userKey(); }
    public function secret(): string { return $this->inner->secret(); }

    public function settingGet(string $key, $default = null)
    {
        if (!$this->registered()) return $default;
        return $this->inner->settingGet($this->scopedKey($key) ? $this->storageKey($key) : $key, $default);
    }

    public function settingPut(string $key, $value): void
    {
        if (!$this->registered()) return;
        $storageKey = $this->scopedKey($key) ? $this->storageKey($key) : $key;
        if ($this->scopedKey($key) && !$this->registry->track($this->id, $storageKey)) return;
        $this->inner->settingPut($storageKey, $value);
    }

    public function settingForget(string $key): void
    {
        if (!$this->registered()) return;
        $this->inner->settingForget($this->scopedKey($key) ? $this->storageKey($key) : $key);
    }

    public function settingsClear(): void { $this->registry->clearData($this->id); }
    public function cacheGet(string $key) { return parent::cacheGet($key); }
    public function cacheSet(string $key, $value, int $ttl): void { parent::cacheSet($key, $value, $ttl); }
    public function cacheDelete(string $key): void { parent::cacheDelete($key); }

    public function lockAcquire(string $name, int $ttl): bool
    {
        $lock = $this->id === 'chat1' ? $name : 'chat:'.$this->id.':'.$name;
        return $this->registered() && $this->inner->lockAcquire($lock, $ttl);
    }

    public function lockRelease(string $name): void { $this->inner->lockRelease($this->id === 'chat1' ? $name : 'chat:'.$this->id.':'.$name); }
    public function sessionGet(string $key) { return $this->inner->sessionGet($key); }
    public function sessionPut(string $key, $value): void { $this->inner->sessionPut($key, $value); }
    public function sessionForget(string $key): void { $this->inner->sessionForget($key); }
    public function productsAvailable(): bool { return $this->inner->productsAvailable(); }
    public function enqueueSync(array $data): bool { return $this->inner->enqueueSync($data + array('chat' => $this->id)); }
    public function exportReport(string $kind): array { return $this->inner->exportReport($kind); }
    public function sanitizePageSources(array $input): array { return $this->inner->sanitizePageSources($input); }
    public function pageSources(): array
    {
        return $this->scopedPageSources();
    }

    public function scopedPageSources(): array
    {
        $options = $this->settingGet('sync_options', array());
        return is_array($options) && isset($options['pages']['sources']) && is_array($options['pages']['sources']) ? $options['pages']['sources'] : array();
    }

    private function inChatContext(callable $callback)
    {
        $before = $GLOBALS['needtome_aiworker_chat_scoped_host'] ?? null;
        $GLOBALS['needtome_aiworker_chat_scoped_host'] = $this;
        try { return $callback(); }
        finally {
            if ($before === null) unset($GLOBALS['needtome_aiworker_chat_scoped_host']);
            else $GLOBALS['needtome_aiworker_chat_scoped_host'] = $before;
        }
    }

    private function scopedIterable(callable $callback): iterable
    {
        $scope = $this;
        return (static function () use ($scope, $callback) {
            $before = $GLOBALS['needtome_aiworker_chat_scoped_host'] ?? null;
            $GLOBALS['needtome_aiworker_chat_scoped_host'] = $scope;
            try { foreach ($callback() as $row) yield $row; }
            finally {
                if ($before === null) unset($GLOBALS['needtome_aiworker_chat_scoped_host']);
                else $GLOBALS['needtome_aiworker_chat_scoped_host'] = $before;
            }
        })();
    }

    public function pageDocuments(): iterable { return $this->scopedIterable(function () { return $this->inner->pageDocuments(); }); }
    public function productRows(int $cap): iterable { return $this->scopedIterable(function () use ($cap) { return $this->inner->productRows($cap); }); }
    public function pageIndex()
    {
        $index = $this->inChatContext(function () { return method_exists($this->inner, 'pageIndex') ? $this->inner->pageIndex() : null; });
        return is_iterable($index) ? $this->scopedIterable(function () use ($index) { return $index; }) : null;
    }
    public function pageDocumentsByIds(array $ids): iterable
    {
        if (method_exists($this->inner, 'pageDocumentsByIds')) return $this->scopedIterable(function () use ($ids) { return $this->inChatContext(function () use ($ids) { return $this->inner->pageDocumentsByIds($ids); }); });
        return parent::pageDocumentsByIds($ids);
    }
    public function productIndex()
    {
        $index = $this->inChatContext(function () { return method_exists($this->inner, 'productIndex') ? $this->inner->productIndex() : null; });
        return is_iterable($index) ? $this->scopedIterable(function () use ($index) { return $index; }) : null;
    }
    public function productDocumentsByIds(array $ids): iterable
    {
        if (method_exists($this->inner, 'productDocumentsByIds')) return $this->scopedIterable(function () use ($ids) { return $this->inChatContext(function () use ($ids) { return $this->inner->productDocumentsByIds($ids); }); });
        return parent::productDocumentsByIds($ids);
    }
}
