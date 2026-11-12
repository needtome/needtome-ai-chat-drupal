<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\aiworker_chat\Common;

class Pkce
{
    public function verifier(): string
    {
        return $this->base64Url(random_bytes(32));
    }

    public function challenge(string $verifier): string
    {
        return $this->base64Url(hash('sha256', $verifier, true));
    }

    public function state(): string
    {
        return bin2hex(random_bytes(24));
    }

    private function base64Url(string $value): string
    {
        return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
    }
}
