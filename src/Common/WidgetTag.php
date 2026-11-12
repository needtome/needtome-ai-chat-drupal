<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\aiworker_chat\Common;

class WidgetTag
{
    public function options(Host $host, string $lang): ?array
    {
        $registry = new ChatRegistry($host instanceof ScopedHost ? $host->baseHost() : $host);
        $ids = $host instanceof ScopedHost ? array($host->chatId()) : $registry->ids();
        $chats = array();
        foreach ($ids as $id) {
            $chat = $host instanceof ScopedHost ? $host : $registry->scoped($id);
            if (!$chat || !$chat->registered()) continue;
            $options = $this->singleOptions($chat, $lang);
            if ($options !== null) $chats[] = $options;
        }
        if (!$chats) return null;
        usort($chats, static function (array $a, array $b): int { return (int) ($a['stack_order'] ?? 0) <=> (int) ($b['stack_order'] ?? 0); });
        $base = rtrim($host->base(), '/');
        $version = $host->settingGet('widget_version') ?: gmdate('Ymd');
        if (count($chats) === 1) {
            // Keep the previous single-object fields for cached loaders while shipping the new chats array.
            return array_merge($chats[0], array('base' => $base, 'widget_version' => $version, 'chats' => $chats));
        }
        return array('base' => $base, 'lang' => $chats[0]['lang'], 'widget_version' => $version, 'chats' => $chats);
    }

    private function singleOptions(ScopedHost $host, string $lang): ?array
    {
        $key = $host->settingGet('widget_key');
        if (!is_string($key) || !preg_match('/^wk_[A-Za-z0-9]{24}$/', $key)) return null;
        $stored = $host->settingGet('widget_options', array());
        $stored = is_array($stored) ? $stored : array();
        if (!(bool) ($stored['enabled'] ?? false) || !$this->pageAllowed($host, $stored)) return null;
        $defaults = array('theme' => 'classic', 'color' => '#4f46e5', 'position' => 'right', 'load' => 'interaction', 'delay' => 5);
        $options = array_replace($defaults, $stored);
        $options['key'] = $key;
        $options['base'] = rtrim($host->base(), '/');
        $options['lang'] = in_array(strtolower($lang), array('ru', 'en', 'uk'), true) ? strtolower($lang) : 'auto';
        unset($options['widgetVersion'], $options['widget_version']);
        $options['widget_version'] = $host->settingGet('widget_version') ?: gmdate('Ymd');
        $options['stack_order'] = max(0, (int) ($stored['stack_order'] ?? 0));
        $options['stack'] = !array_key_exists('stack', $stored) || (bool) $stored['stack'];
        $localGreeting = $stored['greet_popup'] ?? null;
        $options['greet_popup'] = $localGreeting === null ? (bool) $host->settingGet('remote_greet_popup', false) : (bool) $localGreeting;
        if (isset($stored['privacy_url'])) $options['privacyUrl'] = $stored['privacy_url'];
        if (isset($stored['siteOffsetX'])) $options['offset_x'] = $stored['siteOffsetX'];
        if (isset($stored['siteOffsetY'])) $options['offset_y'] = $stored['siteOffsetY'];
        unset($options['pages'], $options['pages_mode'], $options['privacy_url'], $options['enabled'], $options['chat_id'], $options['chat_name'], $options['sync']);
        return $options;
    }

    private function pageAllowed(Host $host, array $options): bool
    {
        $mode = (string) ($options['pages_mode'] ?? 'all');
        if ($mode === 'all') return true;
        $rules = is_array($options['pages'] ?? null) ? $options['pages'] : preg_split('/\\r\\n|\\r|\\n/', (string) ($options['pages'] ?? ''));
        $requestUri = isset($_SERVER['REQUEST_URI']) && is_string($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
        $path = (string) preg_replace('#^[a-z][a-z0-9+.\\-]*://[^/?\\#]*#i', '', $requestUri);
        $path = (string) strtok($path, '?#');
        if ($path === '' || $path[0] !== '/') $path = '/'.$path;
        $homePath = (string) (parse_url($host->siteHome(), PHP_URL_PATH) ?: '/');
        $homePath = rtrim($homePath, '/');
        if ($homePath !== '' && ($path === $homePath || strpos($path, $homePath.'/') === 0)) {
            $path = substr($path, strlen($homePath)) ?: '/';
        }
        $normalize = static function (string $value): string {
            $value = rawurldecode($value);
            return $value === '/' ? '/' : rtrim($value, '/');
        };
        $path = $normalize($path);
        $hit = false;
        foreach ($rules as $rule) {
            if (!is_string($rule) || trim($rule) === '') continue;
            $pattern = '#^'.str_replace('\\*', '.*', preg_quote($normalize($rule), '#')).'$#iu';
            if (@preg_match($pattern, $path) === 1) { $hit = true; break; }
        }
        return $mode === 'only' ? $hit : !$hit;
    }

    public function render(Host $host, string $loaderUrl, string $lang, ?string $nonce = null): string
    {
        $options = $this->options($host, $lang);
        if ($options === null) {
            return '';
        }
        $json = json_encode($options, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if (!is_string($json)) {
            return '';
        }
        $src = htmlspecialchars($loaderUrl, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $attribute = htmlspecialchars($json, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $nonceAttribute = is_string($nonce) && $nonce !== '' ? ' nonce="'.htmlspecialchars($nonce, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8').'"' : '';
        return '<script src="'.$src.'" data-aiworker-chat-options="'.$attribute.'" defer'.$nonceAttribute.'></script>';
    }

    public function cspSources(string $base): array
    {
        $origin = $this->origin($base);
        $base = rtrim($base, '/').'/';
        return array(
            'script-src' => array("'self'", $base),
            'connect-src' => array($base),
            'img-src' => array($origin, 'blob:'),
            'trusted-types' => array('aiworker-chat', 'aiworker-chat-loader'),
        );
    }

    public function cspHeader(string $base): string
    {
        $sources = $this->cspSources($base);
        $parts = array();
        foreach ($sources as $directive => $values) {
            $parts[] = $directive.' '.implode(' ', $values);
        }
        return implode('; ', $parts);
    }

    private function origin(string $base): string
    {
        $parts = parse_url($base);
        if (!is_array($parts) || !isset($parts['scheme'], $parts['host']) || !in_array(strtolower($parts['scheme']), array('http', 'https'), true) || isset($parts['user']) || isset($parts['pass'])) {
            return '';
        }
        $origin = strtolower($parts['scheme']).'://'.strtolower($parts['host']);
        if (isset($parts['port'])) {
            $origin .= ':'.(int) $parts['port'];
        }
        return $origin;
    }
}
