<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\needtome_ai_chat\Common;

class CurlHttp implements Http
{
    const MAX_RESPONSE_BYTES = 8388608;
    private $platform;

    public function __construct(string $platform = 'unknown')
    {
        $this->platform = preg_replace('/[^a-z0-9-]/i', '', $platform) ?: 'unknown';
    }

    public function send(string $method, string $url, array $options = array()): HttpResponse
    {
        $url = $this->withQuery($url, isset($options['query']) && is_array($options['query']) ? $options['query'] : array());
        $parts = parse_url($url);
        if (!is_array($parts) || !isset($parts['scheme'], $parts['host']) || !in_array(strtolower($parts['scheme']), array('http', 'https'), true) || isset($parts['user']) || isset($parts['pass'])) {
            return new HttpResponse(0, '', array());
        }
        $method = strtoupper($method);
        $headers = $this->safeHeaders(isset($options['headers']) && is_array($options['headers']) ? $options['headers'] : array());
        if (isset($options['multipart'])) {
            unset($headers['content-type']);
        }
        if (!isset($headers['accept'])) {
            $headers['accept'] = 'application/json';
        }
        $body = '';
        if (isset($options['json']) && is_array($options['json'])) {
            $body = json_encode($options['json'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            if (!isset($headers['content-type'])) {
                $headers['content-type'] = 'application/json';
            }
        } elseif (isset($options['form']) && is_array($options['form'])) {
            $body = http_build_query($options['form'], '', '&', PHP_QUERY_RFC3986);
            if (!isset($headers['content-type'])) {
                $headers['content-type'] = 'application/x-www-form-urlencoded';
            }
        } elseif (isset($options['multipart']) && is_array($options['multipart'])) {
            $body = null;
        }
        if (!is_string($body) && $body !== null) {
            return new HttpResponse(0, '', array());
        }
        $timeout = isset($options['timeout']) ? max(1, (int) $options['timeout']) : 20;
        $connectTimeout = isset($options['connect_timeout']) ? max(1, (int) $options['connect_timeout']) : 10;
        if (function_exists('curl_init')) {
            return $this->curlSend($method, $url, $options, $headers, $body, $timeout, $connectTimeout);
        }
        return $this->streamSend($method, $url, $options, $headers, $body, $timeout, $connectTimeout);
    }

    private function curlSend(string $method, string $url, array $options, array $headers, $body, int $timeout, int $connectTimeout): HttpResponse
    {
        $handle = curl_init($url);
        if ($handle === false) {
            return new HttpResponse(0, '', array());
        }
        $response = '';
        $responseHeaders = array();
        $curlHeaders = array('User-Agent: NeedToMe-AI-Chat/'.$this->platform);
        foreach ($headers as $name => $value) {
            $curlHeaders[] = $this->headerTitle($name).': '.$value;
        }
        $temp = null;
        try {
            $postFields = $body;
            if (isset($options['multipart']) && is_array($options['multipart'])) {
                $multipart = $options['multipart'];
                $temp = tempnam(sys_get_temp_dir(), 'aiwc');
                if ($temp === false || file_put_contents($temp, (string) ($multipart['bytes'] ?? '')) === false) {
                    return new HttpResponse(0, '', array());
                }
                $filename = $this->safeFilename((string) ($multipart['filename'] ?? 'upload.bin'));
                $mime = $this->safeMime((string) ($multipart['mime'] ?? 'application/octet-stream'));
                $fieldName = preg_replace('/[^A-Za-z0-9_-]/', '', (string) ($multipart['name'] ?? 'file')) ?: 'file';
                $postFields = array($fieldName => new \CURLFile($temp, $mime, $filename));
            }
            curl_setopt_array($handle, array(
                CURLOPT_CUSTOMREQUEST => $method,
                CURLOPT_HTTPHEADER => $curlHeaders,
                CURLOPT_USERAGENT => 'NeedToMe-AI-Chat/'.$this->platform,
                CURLOPT_RETURNTRANSFER => false,
                CURLOPT_FOLLOWLOCATION => false,
                CURLOPT_MAXREDIRS => 0,
                CURLOPT_CONNECTTIMEOUT => $connectTimeout,
                CURLOPT_TIMEOUT => $timeout,
                CURLOPT_SSL_VERIFYPEER => true,
                CURLOPT_SSL_VERIFYHOST => 2,
                CURLOPT_HEADERFUNCTION => function ($curl, $line) use (&$responseHeaders) {
                    $length = strlen($line);
                    $parts = explode(':', $line, 2);
                    if (count($parts) === 2) {
                        $responseHeaders[strtolower(trim($parts[0]))] = trim($parts[1]);
                    }
                    return $length;
                },
                CURLOPT_WRITEFUNCTION => function ($curl, $chunk) use (&$response) {
                    $remaining = self::MAX_RESPONSE_BYTES - strlen($response);
                    if ($remaining <= 0) {
                        return 0;
                    }
                    $response .= substr($chunk, 0, $remaining);
                    return min(strlen($chunk), $remaining);
                },
            ));
            if ($postFields !== null && $method !== 'GET' && $method !== 'HEAD') {
                curl_setopt($handle, CURLOPT_POSTFIELDS, $postFields);
            }
            $executed = curl_exec($handle);
            if ($executed === false && $response === '' && curl_errno($handle) !== CURLE_WRITE_ERROR) {
                return new HttpResponse(0, '', array());
            }
            return new HttpResponse((int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE), $response, $responseHeaders);
        } finally {
            if ($temp !== null && is_file($temp)) {
                @unlink($temp);
            }
            curl_close($handle);
        }
    }

    private function streamSend(string $method, string $url, array $options, array $headers, $body, int $timeout, int $connectTimeout): HttpResponse
    {
        $headerLines = array('User-Agent: NeedToMe-AI-Chat/'.$this->platform);
        foreach ($headers as $name => $value) {
            $headerLines[] = $this->headerTitle($name).': '.$value;
        }
        if (isset($options['multipart']) && is_array($options['multipart'])) {
            $multipart = $options['multipart'];
            $boundary = '----aiwc'.bin2hex(random_bytes(12));
            $name = preg_replace('/[^A-Za-z0-9_-]/', '', (string) ($multipart['name'] ?? 'file')) ?: 'file';
            $filename = $this->safeFilename((string) ($multipart['filename'] ?? 'upload.bin'));
            $mime = $this->safeMime((string) ($multipart['mime'] ?? 'application/octet-stream'));
            $body = '--'.$boundary."\r\n".'Content-Disposition: form-data; name="'.$name.'"; filename="'.$filename.'"' ."\r\n".'Content-Type: '.$mime."\r\n\r\n".(string) ($multipart['bytes'] ?? '')."\r\n--".$boundary."--\r\n";
            $headerLines[] = 'Content-Type: multipart/form-data; boundary='.$boundary;
        }
        $context = stream_context_create(array('http' => array(
            'method' => $method,
            'header' => implode("\r\n", $headerLines),
            'content' => $body === null ? '' : $body,
            'timeout' => $timeout,
            'ignore_errors' => true,
            'follow_location' => 0,
            'max_redirects' => 0,
            'protocol_version' => 1.1,
        ), 'ssl' => array('verify_peer' => true, 'verify_peer_name' => true)));
        $warning = null;
        set_error_handler(function ($severity, $message) use (&$warning) { $warning = $message; return true; });
        $previousSocketTimeout = ini_get('default_socket_timeout');
        if ($previousSocketTimeout !== false) {
            ini_set('default_socket_timeout', (string) $connectTimeout);
        }
        try {
            $stream = fopen($url, 'rb', false, $context);
        } finally {
            if ($previousSocketTimeout !== false) {
                ini_set('default_socket_timeout', (string) $previousSocketTimeout);
            }
            restore_error_handler();
        }
        if ($stream === false) {
            return new HttpResponse(0, '', array());
        }
        $response = '';
        while (!feof($stream) && strlen($response) < self::MAX_RESPONSE_BYTES) {
            $chunk = fread($stream, min(65536, self::MAX_RESPONSE_BYTES - strlen($response)));
            if (!is_string($chunk) || $chunk === '') {
                break;
            }
            $response .= $chunk;
        }
        fclose($stream);
        $status = 0;
        $responseHeaders = array();
        $lines = isset($http_response_header) && is_array($http_response_header) ? $http_response_header : array();
        foreach ($lines as $line) {
            if (preg_match('#^HTTP/\S+\s+(\d{3})#i', $line, $match)) {
                $status = (int) $match[1];
            } else {
                $parts = explode(':', $line, 2);
                if (count($parts) === 2) {
                    $responseHeaders[strtolower(trim($parts[0]))] = trim($parts[1]);
                }
            }
        }
        return new HttpResponse($status, $response, $responseHeaders);
    }

    private function safeHeaders(array $headers): array
    {
        $allowed = array('authorization', 'accept', 'content-type', 'x-aiw-platform');
        $clean = array();
        foreach ($headers as $name => $value) {
            $key = strtolower((string) $name);
            if (in_array($key, $allowed, true) && is_scalar($value)) {
                $clean[$key] = trim((string) preg_replace('/[\r\n]+/', '', (string) $value));
            }
        }
        return $clean;
    }

    private function headerTitle(string $name): string
    {
        $names = array('authorization' => 'Authorization', 'accept' => 'Accept', 'content-type' => 'Content-Type', 'x-aiw-platform' => 'X-AIW-Platform');
        return isset($names[$name]) ? $names[$name] : $name;
    }

    private function safeFilename(string $filename): string
    {
        $filename = basename(str_replace(array("\0", "\r", "\n"), '', $filename));
        $filename = preg_replace('/[^A-Za-z0-9._-]/', '_', $filename);
        return is_string($filename) && $filename !== '' ? $filename : 'upload.bin';
    }

    private function safeMime(string $mime): string
    {
        return preg_match('#^[A-Za-z0-9.+-]+/[A-Za-z0-9.+-]+$#', $mime) ? $mime : 'application/octet-stream';
    }

    private function withQuery(string $url, array $query): string
    {
        if (!$query) {
            return $url;
        }
        $encoded = http_build_query($query, '', '&', PHP_QUERY_RFC3986);
        return $url.(strpos($url, '?') === false ? '?' : '&').$encoded;
    }
}
