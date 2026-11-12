<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\aiworker_chat\Common;

class Sleeper
{
    public function wait(int $seconds): void
    {
        if ($seconds > 0) {
            sleep($seconds);
        }
    }
}
