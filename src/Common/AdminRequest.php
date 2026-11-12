<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\needtome_ai_chat\Common;

class AdminRequest
{
    public $route;
    public $method;
    public $json;
    public $rawLength;
    public $file;
    public $query;
    public $csrfValid;
    public $allowed;

    public function __construct(string $route, string $method = 'GET', ?array $json = null, int $rawLength = 0, ?array $file = null, array $query = array(), bool $csrfValid = false, bool $allowed = false)
    {
        $this->route = $route;
        $this->method = strtoupper($method);
        $this->json = $json;
        $this->rawLength = $rawLength;
        $this->file = $file;
        $this->query = $query;
        $this->csrfValid = $csrfValid;
        $this->allowed = $allowed;
    }
}
