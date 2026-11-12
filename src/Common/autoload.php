<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.
namespace Drupal\aiworker_chat\Common;

if (!class_exists(__NAMESPACE__ . '\\PhpCommonAutoloadGuard', false)) {
    class PhpCommonAutoloadGuard {}
    spl_autoload_register(function ($class) {
        $prefix = __NAMESPACE__ . '\\';
        if (strpos($class, $prefix) !== 0) return;
        $relative = substr($class, strlen($prefix));
        $file = __DIR__ . '/' . str_replace('\\', '/', $relative) . '.php';
        if (is_file($file)) require_once $file;
    }, true, true);
}
