<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\needtome_ai_chat\Common;

class ProxyRules
{
    const QUERY_KEYS = array('chat_id', 'lang', 'period', 'from', 'to', 'id', 'index', 'blocks');
    const BLOCKS = array('me', 'chat', 'usage', 'channels', 'sources', 'faq', 'stats', 'assistant');
    const CACHED_BLOCKS = array('me', 'usage', 'channels', 'stats');

    public function normalizePath(string $path): ?string
    {
        if (strpos($path, '..') !== false || strpos($path, '%') !== false || strpos($path, '//') !== false || strpos($path, '\\') !== false) {
            return null;
        }
        $path = ltrim($path, '/');
        return preg_match('#^plugin(/[a-z0-9-]+)*$#', $path) === 1 ? $path : null;
    }

    public function allows(string $method, string $path): bool
    {
        $path = $this->normalizePath($path);
        if ($path === null) {
            return false;
        }
        $method = strtoupper($method);
        $static = array(
            'GET' => array('plugin/me', 'plugin/chat', 'plugin/channels', 'plugin/usage', 'plugin/stats', 'plugin/assistant', 'plugin/sources', 'plugin/faq', 'plugin/telegram-link'),
            'PATCH' => array('plugin/chat', 'plugin/faq'),
            'POST' => array('plugin/assistant/ask', 'plugin/assistant/apply', 'plugin/assistant/discard', 'plugin/assistant/clear', 'plugin/chat/translate', 'plugin/chat/leads/test', 'plugin/sources', 'plugin/faq'),
            'DELETE' => array('plugin/faq', 'plugin/chat/launcher-icon'),
        );
        if (isset($static[$method]) && in_array($path, $static[$method], true)) {
            return true;
        }
        if ($method === 'PATCH' || $method === 'DELETE') {
            return preg_match('#^plugin/sources/\d{1,10}$#', $path) === 1;
        }
        if ($method === 'POST') {
            return preg_match('#^plugin/sources/\d{1,10}/refresh$#', $path) === 1;
        }
        return false;
    }

    public function queryAllowed(array $query): bool
    {
        if (count(array_diff(array_keys($query), self::QUERY_KEYS)) !== 0) return false;
        if (array_key_exists('chat_id', $query) && (!is_scalar($query['chat_id']) || filter_var($query['chat_id'], FILTER_VALIDATE_INT) === false || (int) $query['chat_id'] < 1)) return false;
        return true;
    }

    public function isAssistantPath(string $path): bool
    {
        $path = $this->normalizePath($path);
        return $path !== null && ($path === 'plugin/assistant' || strpos($path, 'plugin/assistant/') === 0);
    }
}
