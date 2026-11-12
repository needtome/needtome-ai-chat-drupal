<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\needtome_ai_chat\Common;

class Uninstaller
{
    public function run(Host $host, OAuth $oauth): void
    {
        $oauth->disconnect();
        $host->settingsClear();
    }
}
