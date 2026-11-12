<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\aiworker_chat\Common;

abstract class AbstractHost implements Host
{
    private $exports = array();

    public function enqueueSync(array $data): bool
    {
        return false;
    }

    public function sanitizePageSources(array $input): array
    {
        return array();
    }

    public function pageSources(): array
    {
        $scope = $GLOBALS['needtome_aiworker_chat_scoped_host'] ?? null;
        if ($scope instanceof ScopedHost && $scope->baseHost() === $this) return $scope->scopedPageSources();
        $options = $this->settingGet('sync_options', array());
        return is_array($options) && isset($options['pages']['sources']) && is_array($options['pages']['sources'])
            ? $options['pages']['sources'] : array();
    }

    public function productsAvailable(): bool
    {
        return false;
    }

    public function productRows(int $cap): iterable
    {
        return array();
    }

    public function pageIndex()
    {
        return null;
    }

    public function pageDocumentsByIds(array $ids): iterable
    {
        $wanted = array_fill_keys(array_map('strval', $ids), true);
        foreach ($this->pageDocuments() as $document) {
            if (is_array($document) && isset($document['id']) && isset($wanted[(string) $document['id']])) {
                yield $document;
            }
        }
    }

    public function productIndex()
    {
        return null;
    }

    public function productDocumentsByIds(array $ids): iterable
    {
        $wanted = array_fill_keys(array_map('strval', $ids), true);
        foreach ($this->productRows(500) as $product) {
            if (is_array($product) && isset($product['id']) && isset($wanted[(string) $product['id']])) {
                yield $product;
            }
        }
    }

    /**
     * How the last walk of «pages» or «products» ended. A document missing from an incomplete walk may still exist on
     * the site, so SyncEngine removes nothing after one. «cursor» is where a walk stopped at a limit.
     */
    public function exportReport(string $kind): array
    {
        return $this->exports[$kind] ?? array('complete' => true, 'errors' => 0, 'failed' => array(), 'omitted' => array(), 'cursor' => null);
    }

    protected function exportBegin(string $kind): void
    {
        unset($this->exports[$kind]);
    }

    /** A public document could not be read. Documents a site hides on purpose (noindex, no access) are not failures. */
    protected function exportFailed(string $kind, string $id, string $reason): void
    {
        $report = $this->exportReport($kind);
        $report['complete'] = false;
        $report['errors']++;
        if (count($report['failed']) < 20) {
            $report['failed'][] = array('id' => $id, 'reason' => $reason);
        }
        $this->exports[$kind] = $report;
    }

    /** A public source record intentionally produced no document, for example because it has no exportable body. */
    protected function exportOmitted(string $kind, string $id): void
    {
        $report = $this->exportReport($kind);
        if (!in_array($id, $report['omitted'], true)) {
            $report['omitted'][] = $id;
        }
        $this->exports[$kind] = $report;
    }

    protected function exportStopped(string $kind, string $cursor): void
    {
        $report = $this->exportReport($kind);
        $report['complete'] = false;
        $report['cursor'] = $cursor;
        $this->exports[$kind] = $report;
    }

    public function adminLanguage(): string
    {
        return self::normalizeLanguage((string) $this->settingGet('admin_language', 'en'));
    }

    const DEFAULT_BASE = 'https://kra.name/app';

    /**
     * Returns a safe AI Worker base URL: https (http only for localhost / 127.0.0.1 / [::1]), no credentials,
     * no query or fragment, no trailing slash. Anything else falls back to the production base.
     */
    public static function normalizeBase(?string $base): string
    {
        $base = trim((string) $base);
        $parts = $base === '' ? false : parse_url($base);
        if (!is_array($parts) || !isset($parts['scheme'], $parts['host']) || isset($parts['user']) || isset($parts['pass']) || isset($parts['query']) || isset($parts['fragment'])) {
            return self::DEFAULT_BASE;
        }
        $scheme = strtolower($parts['scheme']);
        $host = strtolower($parts['host']);
        $local = in_array($host, array('localhost', '127.0.0.1', '[::1]', '::1'), true);
        if ($scheme !== 'https' && !($scheme === 'http' && $local)) {
            return self::DEFAULT_BASE;
        }
        $path = isset($parts['path']) ? rtrim($parts['path'], '/') : '';
        if ($path !== '' && !preg_match('#^(/[A-Za-z0-9._~-]+)+$#', $path)) {
            return self::DEFAULT_BASE;
        }
        return $scheme.'://'.$host.(isset($parts['port']) ? ':'.(int) $parts['port'] : '').$path;
    }

    public static function normalizeLanguage(string $locale): string
    {
        $language = strtolower((string) preg_split('/[_-]/', $locale, 2)[0]);
        return in_array($language, array('ru', 'en', 'uk'), true) ? $language : 'en';
    }

    public function cacheGet(string $key)
    {
        $cacheKey = 'cache:'.sha1($key);
        $entry = $this->settingGet($cacheKey);
        if (!is_array($entry) || !array_key_exists('expires', $entry) || (int) $entry['expires'] <= time()) {
            if ($entry !== null) {
                $this->settingForget($cacheKey);
            }
            return null;
        }
        return array_key_exists('value', $entry) ? $entry['value'] : null;
    }

    public function cacheSet(string $key, $value, int $ttl): void
    {
        $this->settingPut('cache:'.sha1($key), array('expires' => time() + max(1, $ttl), 'value' => $value));
    }

    public function cacheDelete(string $key): void
    {
        $this->settingForget('cache:'.sha1($key));
    }
}
