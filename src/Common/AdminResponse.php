<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\aiworker_chat\Common;

class AdminResponse
{
    public $status;
    public $json;
    public $redirect;

    public function __construct(int $status = 200, ?array $json = null, ?string $redirect = null)
    {
        $this->status = $status;
        $this->json = $json;
        $this->redirect = $redirect;
    }

    public function headers(): array
    {
        return array(
            'Content-Type' => 'application/json; charset=utf-8',
            'Cache-Control' => 'no-store',
            'X-Content-Type-Options' => 'nosniff',
        );
    }
}
