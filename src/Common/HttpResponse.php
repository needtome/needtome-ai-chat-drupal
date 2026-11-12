<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\aiworker_chat\Common;

class HttpResponse
{
    public $status;
    public $body;
    public $headers;

    public function __construct(int $status, string $body = '', array $headers = array())
    {
        $this->status = $status;
        $this->body = $body;
        $clean = array();
        foreach ($headers as $key => $value) {
            $clean[strtolower((string) $key)] = is_array($value) ? implode(', ', $value) : (string) $value;
        }
        $this->headers = $clean;
    }

    public function json(): ?array
    {
        $value = json_decode($this->body, true);
        return is_array($value) ? $value : null;
    }

    public function retryAfter(): int
    {
        $value = isset($this->headers['retry-after']) ? trim((string) $this->headers['retry-after']) : '';
        if ($value !== '' && is_numeric($value)) {
            return max(0, (int) $value);
        }
        if ($value !== '') {
            $timestamp = strtotime($value);
            if ($timestamp !== false) {
                return max(0, $timestamp - time());
            }
        }
        $json = $this->json();
        return is_array($json) && isset($json['retry_after']) ? max(0, (int) $json['retry_after']) : 0;
    }
}
