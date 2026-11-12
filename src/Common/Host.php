<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\needtome_ai_chat\Common;

interface Host
{
    public function platform(): string;
    public function platformLabel(): string;
    public function version(): string;
    public function base(): string;
    public function siteHome(): string;
    public function siteHost(): string;
    public function callbackUrl(): string;
    public function adminPageUrl(array $query = array()): string;
    public function adminLanguage(): string;
    public function userKey(): string;
    public function secret(): string;
    public function settingGet(string $key, $default = null);
    public function settingPut(string $key, $value): void;
    public function settingForget(string $key): void;
    public function settingsClear(): void;
    public function cacheGet(string $key);
    public function cacheSet(string $key, $value, int $ttl): void;
    public function cacheDelete(string $key): void;
    public function lockAcquire(string $name, int $ttl): bool;
    public function lockRelease(string $name): void;
    public function sessionGet(string $key);
    public function sessionPut(string $key, $value): void;
    public function sessionForget(string $key): void;
    public function pageDocuments(): iterable;
    public function productsAvailable(): bool;
    public function productRows(int $cap): iterable;
    public function exportReport(string $kind): array;
    public function sanitizePageSources(array $input): array;
    public function pageSources(): array;
    /** Enqueue an immediate platform-native background sync when the host has a queue. */
    public function enqueueSync(array $data): bool;
}
