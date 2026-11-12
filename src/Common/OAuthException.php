<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\needtome_ai_chat\Common;

class OAuthException extends \RuntimeException
{
    public $status;

    public function __construct(string $message, int $status = 502, ?\Throwable $previous = null)
    {
        $this->status = $status;
        parent::__construct($message, 0, $previous);
    }
}
