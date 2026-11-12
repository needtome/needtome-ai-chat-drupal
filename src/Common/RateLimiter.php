<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\aiworker_chat\Common;

class RateLimiter
{
    private $host;

    public function __construct(Host $host)
    {
        $this->host = $host;
    }

    public function hit(string $bucket, int $max, int $window = 60): bool
    {
        $key = 'rate:'.sha1($this->host->userKey().'|'.$bucket);
        $now = time();
        $state = $this->host->cacheGet($key);
        if (!is_array($state) || !isset($state['expires']) || (int) $state['expires'] <= $now) {
            $state = array('count' => 0, 'expires' => $now + max(1, $window));
        }
        if ((int) $state['count'] >= $max) {
            return false;
        }
        $state['count'] = (int) $state['count'] + 1;
        $this->host->cacheSet($key, $state, max(1, (int) $state['expires'] - $now));
        return true;
    }
}
