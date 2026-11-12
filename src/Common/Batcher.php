<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\aiworker_chat\Common;

class Batcher
{
    public function docHash(array $doc): string
    {
        unset($doc['modified']);
        return hash('sha256', $this->encode($doc));
    }

    public function productHash(array $product): string
    {
        return hash('sha256', $this->encode($product));
    }

    public function parts(array $doc, int $max = 55000): array
    {
        $max = max(1, $max);
        $content = (string) ($doc['content'] ?? '');
        if ($this->length($content) <= $max) {
            return array($doc);
        }
        $paragraphs = preg_split('/\n\s*\n/u', $content);
        if (!is_array($paragraphs)) {
            $paragraphs = array($content);
        }
        $parts = array();
        $current = '';
        foreach ($paragraphs as $paragraph) {
            $paragraph = (string) $paragraph;
            if ($this->length($paragraph) > $max) {
                if ($current !== '') {
                    $parts[] = trim($current);
                    $current = '';
                }
                $words = preg_split('/\s+/u', $paragraph);
                if (!is_array($words)) {
                    $words = array($paragraph);
                }
                foreach ($words as $word) {
                    $word = (string) $word;
                    if ($this->length($word) > $max) {
                        if ($current !== '') {
                            $parts[] = trim($current);
                            $current = '';
                        }
                        foreach ($this->chunks($word, $max) as $chunk) {
                            $parts[] = $chunk;
                        }
                    } else {
                        $candidate = $current === '' ? $word : $current.' '.$word;
                        if ($this->length($candidate) > $max && $current !== '') {
                            $parts[] = trim($current);
                            $current = $word;
                        } else {
                            $current = $candidate;
                        }
                    }
                }
                continue;
            }
            $candidate = $current === '' ? $paragraph : $current."\n\n".$paragraph;
            if ($this->length($candidate) > $max && $current !== '') {
                $parts[] = trim($current);
                $current = $paragraph;
            } else {
                $current = $candidate;
            }
        }
        if ($current !== '') {
            $parts[] = trim($current);
        }
        if (count($parts) > 200) {
            throw new \LengthException('Document exceeds the maximum number of sync parts.');
        }
        $total = count($parts);
        $result = array();
        foreach ($parts as $index => $text) {
            $piece = $doc;
            $piece['content'] = $text;
            $piece['part'] = $index + 1;
            $piece['parts'] = $total;
            $result[] = $piece;
        }
        return $result;
    }

    public function documentBatches(array $docs, array $envelope, int $maxDocs = 50, int $maxBytes = 1500000): array
    {
        $batches = array();
        $current = array();
        foreach ($docs as $doc) {
            $candidate = array_merge($current, array($doc));
            $size = strlen($this->encode(array_merge($envelope, array('docs' => $candidate))));
            if ($current && (count($candidate) > $maxDocs || $size > $maxBytes)) {
                $batches[] = $current;
                $current = array($doc);
                $size = strlen($this->encode(array_merge($envelope, array('docs' => $current))));
            } else {
                $current = $candidate;
            }
            if ($size > $maxBytes) {
                throw new \LengthException('A document batch exceeds the maximum payload size.');
            }
        }
        if ($current) {
            $batches[] = $current;
        }
        return $batches;
    }

    public function productBatches(array $products): array
    {
        $chunks = array();
        foreach ($products as $product) {
            $variations = array_values((array) ($product['variations'] ?? array()));
            if (count($variations) <= 49) {
                $chunks[] = $product;
                continue;
            }
            $allIds = isset($product['variation_ids']) && is_array($product['variation_ids'])
                ? array_values($product['variation_ids']) : array_values(array_filter(array_map(function ($row) { return (string) ($row['id'] ?? ''); }, $variations)));
            foreach (array_chunk($variations, 49) as $part) {
                $copy = $product;
                $copy['variations'] = $part;
                $copy['variation_ids'] = $allIds;
                $chunks[] = $copy;
            }
        }
        $batches = array();
        $current = array();
        $records = 0;
        foreach ($chunks as $product) {
            $count = 1 + count((array) ($product['variations'] ?? array()));
            $candidate = array_merge($current, array($product));
            $bytes = strlen($this->encode($candidate));
            if ($current && (count($candidate) > 50 || $records + $count > 50 || $bytes > 1500000)) {
                $batches[] = $current;
                $current = array($product);
                $records = 0;
                $bytes = strlen($this->encode($current));
            } else {
                $current = $candidate;
            }
            if ($count > 50 || $bytes > 1500000) {
                throw new \LengthException('A product batch exceeds the maximum payload size.');
            }
            $records += $count;
        }
        if ($current) {
            $batches[] = $current;
        }
        return $batches;
    }

    private function encode(array $value): string
    {
        $json = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if (!is_string($json)) {
            throw new \UnexpectedValueException('Payload could not be encoded as JSON.');
        }
        return $json;
    }

    private function length(string $value): int
    {
        if (function_exists('mb_strlen')) {
            return mb_strlen($value, 'UTF-8');
        }
        $count = preg_match_all('/./us', $value, $unused);
        return $count === false ? strlen($value) : $count;
    }

    private function chunks(string $value, int $max): array
    {
        if (function_exists('mb_substr')) {
            $chunks = array();
            $length = mb_strlen($value, 'UTF-8');
            for ($offset = 0; $offset < $length; $offset += $max) {
                $chunks[] = mb_substr($value, $offset, $max, 'UTF-8');
            }
            return $chunks;
        }
        $characters = preg_split('//u', $value, -1, PREG_SPLIT_NO_EMPTY);
        if (!is_array($characters)) {
            return str_split($value, $max);
        }
        return array_map(function ($slice) { return implode('', $slice); }, array_chunk($characters, $max));
    }
}
