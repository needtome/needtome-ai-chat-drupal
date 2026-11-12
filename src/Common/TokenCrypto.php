<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\aiworker_chat\Common;

class TokenCrypto
{
    private $key;

    public function __construct(string $secret)
    {
        if ($secret === '') {
            throw new \InvalidArgumentException('A non-empty host secret is required.');
        }
        if (!function_exists('hash_hkdf')) {
            throw new \RuntimeException('HKDF support is required.');
        }
        $this->key = hash_hkdf('sha256', $secret, 32, 'needtome-ai-chat-tokens-v1');
    }

    public function encrypt(array $data): string
    {
        $plain = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if (!is_string($plain)) {
            throw new \RuntimeException('Token data could not be encoded.');
        }
        if (function_exists('sodium_crypto_secretbox')) {
            $nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);
            return 'v1s:'.base64_encode($nonce.sodium_crypto_secretbox($plain, $nonce, $this->key));
        }
        if (!function_exists('openssl_encrypt')) {
            throw new \RuntimeException('OpenSSL or sodium is required for token encryption.');
        }
        $iv = random_bytes(12);
        $tag = '';
        $cipher = openssl_encrypt($plain, 'aes-256-gcm', $this->key, OPENSSL_RAW_DATA, $iv, $tag);
        if (!is_string($cipher)) {
            throw new \RuntimeException('Token encryption failed.');
        }
        return 'v1g:'.base64_encode($iv.$tag.$cipher);
    }

    public function decrypt(string $blob): ?array
    {
        $parts = explode(':', $blob, 2);
        if (count($parts) !== 2) {
            return null;
        }
        $packed = base64_decode($parts[1], true);
        if (!is_string($packed)) {
            return null;
        }
        $plain = false;
        if ($parts[0] === 'v1s' && function_exists('sodium_crypto_secretbox_open')) {
            if (strlen($packed) <= SODIUM_CRYPTO_SECRETBOX_NONCEBYTES) {
                return null;
            }
            $nonce = substr($packed, 0, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);
            $plain = sodium_crypto_secretbox_open(substr($packed, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES), $nonce, $this->key);
        } elseif ($parts[0] === 'v1g' && function_exists('openssl_decrypt')) {
            if (strlen($packed) < 28) {
                return null;
            }
            $plain = openssl_decrypt(substr($packed, 28), 'aes-256-gcm', $this->key, OPENSSL_RAW_DATA, substr($packed, 0, 12), substr($packed, 12, 16));
        }
        if (!is_string($plain)) {
            return null;
        }
        $data = json_decode($plain, true);
        return is_array($data) ? $data : null;
    }
}
