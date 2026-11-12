<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\needtome_ai_chat\Common;

/** Site-wide registry and lifecycle operations for independently scoped local chats. */
class ChatRegistry
{
    const KEY = 'chat_registry';
    const MANIFEST_PREFIX = 'chat_data_keys_';
    const CHAT_KEYS = array(
        'widget_key', 'chat_id', 'chat_name', 'remote_greet_popup', 'widget_link', 'widget_key_check', 'widget_options',
        'sync_options', 'sync_state', 'sync_backoff', 'sync_hashes', 'sync_markers', 'sync_record_counts',
        'sync_omitted', 'sync_reconcile_at', 'sync_fingerprints', 'sync_queue', 'sync_inbox',
        'sync_deletions', 'products_status',
    );

    private $host;

    public function __construct(Host $host)
    {
        $this->host = $host;
    }

    /** A missing registry is a virtual chat1; reading it never writes a migration setting. */
    public function ids(): array
    {
        $value = $this->host->settingGet(self::KEY, null);
        if (!is_array($value)) return array('chat1');
        $ids = array();
        foreach ($value as $id) {
            if (is_string($id) && $this->validId($id) && !in_array($id, $ids, true)) $ids[] = $id;
        }
        return $ids;
    }

    public function validId(string $id): bool
    {
        return $id === 'chat1' || preg_match('/^c[a-f0-9]{16}$/', $id) === 1;
    }

    public function contains(string $id): bool
    {
        return $this->validId($id) && in_array($id, $this->ids(), true);
    }

    public function scoped(string $id): ?ScopedHost
    {
        return $this->contains($id) ? new ScopedHost($this->host, $id, $this) : null;
    }

    /** Add a local record. A pristine virtual chat1 is already the empty first chat. */
    public function add(): ?string
    {
        if (!$this->host->lockAcquire('chat-registry', 30)) return null;
        try {
            $ids = $this->ids();
            if ($ids === array('chat1') && !$this->hasKey('chat1')) return 'chat1';
            if ($ids === array() && !$this->hasKey('chat1')) {
                $this->host->settingPut(self::KEY, array('chat1'));
                return 'chat1';
            }
            do { $id = 'c'.bin2hex(random_bytes(8)); } while (in_array($id, $ids, true));
            $ids[] = $id;
            $this->host->settingPut(self::KEY, $ids);
            $chat = $this->scoped($id);
            if ($chat) $chat->settingPut('widget_options', array('stack_order' => count($ids) - 1, 'mount' => 'aiworker-'.$id));
            return $id;
        } finally {
            $this->host->lockRelease('chat-registry');
        }
    }

    public function findByRemoteId(int $chatId): ?string
    {
        if ($chatId < 1) return null;
        foreach ($this->ids() as $id) {
            $chat = $this->scoped($id);
            if ($chat && (int) $chat->settingGet('chat_id', 0) === $chatId) return $id;
        }
        return null;
    }

    public function findByKey(string $key, ?string $except = null): ?string
    {
        if ($key === '') return null;
        foreach ($this->ids() as $id) {
            if ($id === $except) continue;
            $chat = $this->scoped($id);
            $saved = $chat ? $chat->settingGet('widget_key') : null;
            if (is_string($saved) && hash_equals($saved, $key)) return $id;
        }
        return null;
    }

    public function hasKey(string $id): bool
    {
        $chat = $this->scoped($id);
        $key = $chat ? $chat->settingGet('widget_key') : null;
        return is_string($key) && $key !== '';
    }

    /** Remove only a registered local chat, serializing against its sync worker. */
    public function remove(string $id): string
    {
        if (!$this->host->lockAcquire('chat-registry', 30)) return 'busy';
        $syncLock = 'sync-run:'.sha1($this->host->siteHome());
        $syncLockKey = $id === 'chat1' ? $syncLock : 'chat:'.$id.':'.$syncLock;
        $dataLock = 'chat-data-keys:'.$id;
        try {
            $ids = $this->ids();
            if (!in_array($id, $ids, true)) return 'unknown';
            if (!$this->host->lockAcquire($syncLockKey, 300)) return 'syncing';
            try {
                if (!$this->host->lockAcquire($dataLock, 30)) return 'busy';
                try {
                    $ids = array_values(array_diff($this->ids(), array($id)));
                    $this->host->settingPut(self::KEY, $ids);
                    $this->clearDataLocked($id);
                } finally {
                    $this->host->lockRelease($dataLock);
                }
            } finally {
                $this->host->lockRelease($syncLockKey);
            }
            return 'removed';
        } finally {
            $this->host->lockRelease('chat-registry');
        }
    }

    /** Change a destination only after excluding concurrent syncs and duplicate keys. */
    public function saveKey(string $id, string $key, int $remoteId = 0, string $name = '', bool $preserveSyncOptions = false): string
    {
        if (!preg_match('/^wk_[A-Za-z0-9]{24}$/', $key) && $key !== '') return 'invalid';
        if (!$this->host->lockAcquire('chat-keys', 30)) return 'busy';
        try {
            if (!$this->contains($id)) return 'unknown';
            $duplicate = $this->findByKey($key, $id);
            if ($duplicate !== null) return 'duplicate';
            $syncLock = 'sync-run:'.sha1($this->host->siteHome());
            $syncLockKey = $id === 'chat1' ? $syncLock : 'chat:'.$id.':'.$syncLock;
            if (!$this->host->lockAcquire($syncLockKey, 300)) return 'syncing';
            try {
                $chat = $this->scoped($id);
                if (!$chat) return 'unknown';
                $old = $chat->settingGet('widget_key');
                if (!is_string($old)) $old = '';
                $oldRemoteId = (int) $chat->settingGet('chat_id', 0);
                $hasOldBinding = $old !== '' || $oldRemoteId > 0;
                $bindingChanged = $old !== $key || ($remoteId > 0 && $oldRemoteId !== $remoteId);
                if ($bindingChanged && $hasOldBinding) {
                    if (!$this->clearCaches($id)) return 'busy';
                    if (!$preserveSyncOptions && $old !== '') {
                        $sync = $chat->settingGet('sync_options', array());
                        $sync = is_array($sync) ? $sync : array();
                        $pages = isset($sync['pages']) && is_array($sync['pages']) ? $sync['pages'] : array();
                        $pages['enabled'] = false;
                        $sync['pages'] = $pages;
                        $products = isset($sync['products']) && is_array($sync['products']) ? $sync['products'] : array();
                        $products['enabled'] = false;
                        $sync['products'] = $products;
                        $chat->settingPut('sync_options', $sync);
                    }
                    foreach (array('sync_state', 'sync_backoff', 'sync_hashes', 'sync_markers', 'sync_record_counts', 'sync_omitted', 'sync_reconcile_at', 'sync_fingerprints', 'sync_queue', 'sync_inbox', 'sync_deletions', 'products_status', 'widget_link', 'remote_greet_popup') as $setting) {
                        $chat->settingForget($setting);
                    }
                    $chat->settingForget('widget_key_check');
                    $chat->settingPut('chat_id', 0);
                    $chat->settingPut('chat_name', '');
                }
                if ($old !== $key) $chat->settingPut('widget_key', $key === '' ? null : $key);
                if ($remoteId > 0) {
                    $chat->settingPut('chat_id', $remoteId);
                    if ($name !== '') $chat->settingPut('chat_name', $name);
                }
                return $old === $key ? 'same' : 'saved';
            } finally {
                $this->host->lockRelease($syncLockKey);
            }
        } finally {
            $this->host->lockRelease('chat-keys');
        }
    }

    /** Move one remote binding to another local tab and remove the source tab under the registry locks. */
    public function moveBinding(string $fromId, string $toId, string $key, int $remoteId, string $name = ''): string
    {
        if ($fromId === $toId || !$this->validId($fromId) || !$this->validId($toId) || $remoteId < 1
            || !preg_match('/^wk_[A-Za-z0-9]{24}$/', $key)) return 'invalid';
        if (!$this->host->lockAcquire('chat-registry', 30)) return 'busy';
        $held = array();
        try {
            if (!$this->host->lockAcquire('chat-keys', 30)) return 'busy';
            $held[] = 'chat-keys';
            $ids = $this->ids();
            if (!in_array($fromId, $ids, true) || !in_array($toId, $ids, true)) return 'unknown';
            if ($this->findByRemoteId($remoteId) !== $fromId) return 'stale';
            $duplicate = $this->findByKey($key, $toId);
            if ($duplicate !== null && $duplicate !== $fromId) return 'duplicate';

            $syncLocks = array_values(array_unique(array($this->syncLockFor($fromId), $this->syncLockFor($toId))));
            sort($syncLocks, SORT_STRING);
            foreach ($syncLocks as $lock) {
                if (!$this->host->lockAcquire($lock, 300)) return 'syncing';
                $held[] = $lock;
            }
            $dataLocks = array('chat-data-keys:'.$fromId, 'chat-data-keys:'.$toId);
            sort($dataLocks, SORT_STRING);
            foreach ($dataLocks as $lock) {
                if (!$this->host->lockAcquire($lock, 30)) return 'busy';
                $held[] = $lock;
            }

            $oldKey = $this->chatSetting($toId, 'widget_key');
            $oldRemoteId = (int) $this->chatSetting($toId, 'chat_id', 0);
            if ($oldKey !== $key || $oldRemoteId !== $remoteId) {
                $this->clearCachesLocked($toId);
                foreach (array('sync_state', 'sync_backoff', 'sync_hashes', 'sync_markers', 'sync_record_counts', 'sync_omitted', 'sync_reconcile_at', 'sync_fingerprints', 'sync_queue', 'sync_inbox', 'sync_deletions', 'products_status', 'widget_link', 'remote_greet_popup', 'widget_key_check') as $setting) {
                    $this->forgetChatSetting($toId, $setting);
                }
                $this->putChatSettingLocked($toId, 'chat_id', 0);
                $this->putChatSettingLocked($toId, 'chat_name', '');
            }
            $this->putChatSettingLocked($toId, 'widget_key', $key);
            $this->putChatSettingLocked($toId, 'chat_id', $remoteId);
            if ($name !== '') $this->putChatSettingLocked($toId, 'chat_name', $name);

            $this->host->settingPut(self::KEY, array_values(array_diff($ids, array($fromId))));
            $this->clearDataLocked($fromId);
            return 'moved';
        } finally {
            foreach (array_reverse($held) as $lock) $this->host->lockRelease($lock);
            $this->host->lockRelease('chat-registry');
        }
    }

    /** Forget per-chat records while retaining the site-wide registry and OAuth/account settings. */
    public function clearData(string $id): bool
    {
        $lock = 'chat-data-keys:'.$id;
        if (!$this->host->lockAcquire($lock, 30)) return false;
        try { $this->clearDataLocked($id); return true; }
        finally { $this->host->lockRelease($lock); }
    }

    private function clearDataLocked(string $id): void
    {
        $manifestKey = self::MANIFEST_PREFIX.$id;
        $keys = $this->host->settingGet($manifestKey, array());
        $keys = is_array($keys) ? $keys : array();
        foreach (self::CHAT_KEYS as $key) $keys[] = $id === 'chat1' ? $key : 'chat:'.$id.':'.$key;
        foreach ($keys as $key) {
            if (is_string($key) && $key !== self::KEY && $key !== $manifestKey) $this->host->settingForget($key);
        }
        $this->host->settingForget($manifestKey);
    }

    /** Invalidate per-chat admin/status caches when the destination key changes. */
    private function clearCaches(string $id): bool
    {
        $lock = 'chat-data-keys:'.$id;
        if (!$this->host->lockAcquire($lock, 30)) return false;
        try { $this->clearCachesLocked($id); return true; }
        finally { $this->host->lockRelease($lock); }
    }

    private function clearCachesLocked(string $id): void
    {
        $manifestKey = self::MANIFEST_PREFIX.$id;
        $keys = $this->host->settingGet($manifestKey, array());
        $keys = is_array($keys) ? $keys : array();
        $prefix = $id === 'chat1' ? 'cache:' : 'chat:'.$id.':cache:';
        $kept = array();
        foreach ($keys as $key) {
            if (!is_string($key)) continue;
            if (strpos($key, $prefix) === 0) $this->host->settingForget($key);
            else $kept[] = $key;
        }
        if ($kept) $this->host->settingPut($manifestKey, array_values(array_unique($kept)));
        else $this->host->settingForget($manifestKey);
    }

    private function syncLockFor(string $id): string
    {
        $lock = 'sync-run:'.sha1($this->host->siteHome());
        return $id === 'chat1' ? $lock : 'chat:'.$id.':'.$lock;
    }

    private function storageKey(string $id, string $key): string
    {
        return $id === 'chat1' ? $key : 'chat:'.$id.':'.$key;
    }

    private function chatSetting(string $id, string $key, $default = null)
    {
        return $this->host->settingGet($this->storageKey($id, $key), $default);
    }

    private function putChatSettingLocked(string $id, string $key, $value): void
    {
        $storageKey = $this->storageKey($id, $key);
        if ($id === 'chat1') {
            $this->host->settingPut($storageKey, $value);
            return;
        }
        $manifestKey = self::MANIFEST_PREFIX.$id;
        $keys = $this->host->settingGet($manifestKey, array());
        $keys = is_array($keys) ? $keys : array();
        if (!in_array($storageKey, $keys, true)) {
            $keys[] = $storageKey;
            $this->host->settingPut($manifestKey, $keys);
        }
        $this->host->settingPut($storageKey, $value);
    }

    private function forgetChatSetting(string $id, string $key): void
    {
        $this->host->settingForget($this->storageKey($id, $key));
    }

    public function track(string $id, string $storageKey): bool
    {
        // chat1 already uses the legacy, site-wide setting names. Do not create a
        // migration manifest for those existing keys; clearDataLocked() also
        // enumerates every legacy chat key when uninstalling or removing it.
        if ($id === 'chat1') return $this->contains($id);
        $manifestKey = self::MANIFEST_PREFIX.$id;
        $lock = 'chat-data-keys:'.$id;
        if (!$this->host->lockAcquire($lock, 30)) return false;
        try {
            if (!$this->contains($id)) return false;
            $keys = $this->host->settingGet($manifestKey, array());
            $keys = is_array($keys) ? $keys : array();
            if (!in_array($storageKey, $keys, true)) {
                $keys[] = $storageKey;
                $this->host->settingPut($manifestKey, $keys);
            }
            return true;
        } finally {
            $this->host->lockRelease($lock);
        }
    }
}
