<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\aiworker_chat\Common;

class HtmlToText
{
    const OMIT = array('nav', 'header', 'footer', 'script', 'style', 'form', 'noscript', 'template', 'svg', 'iframe', 'button');

    public function convert(string $html): array
    {
        $document = $this->parse($html);
        $xpath = new \DOMXPath($document);
        foreach ($xpath->query('//'.implode(' | //', self::OMIT)) ?: array() as $node) {
            if ($node->parentNode) {
                $node->parentNode->removeChild($node);
            }
        }
        $title = $this->firstText($xpath, '//title');
        if ($title === '') {
            $title = $this->firstText($xpath, '//h1');
        }
        $htmlNode = $xpath->query('/html')->item(0);
        $lang = '';
        if ($htmlNode && $htmlNode->attributes && $htmlNode->attributes->getNamedItem('lang')) {
            $lang = strtolower(trim((string) $htmlNode->attributes->getNamedItem('lang')->nodeValue));
        }
        $contentNode = $xpath->query('//main')->item(0);
        if (!$contentNode) {
            $contentNode = $xpath->query('//article')->item(0);
        }
        if (!$contentNode) {
            $contentNode = $xpath->query('//body')->item(0);
        }
        $contentNode = $contentNode ?: $document;
        $lines = array();
        $this->walk($contentNode, $lines);
        $clean = array();
        foreach ($lines as $line) {
            $line = trim((string) $line);
            if ($line !== '') {
                $clean[] = $line;
            }
        }
        $content = preg_replace('/\n{3,}/', "\n\n", implode("\n", $clean));
        return array('title' => $title, 'lang' => $lang !== '' ? $lang : null, 'content' => trim((string) $content));
    }

    public function isNoIndex(string $html, array $headers = array()): bool
    {
        foreach ($headers as $name => $value) {
            if (strtolower((string) $name) === 'x-robots-tag' && preg_match('/\bnoindex\b/i', (string) $value)) {
                return true;
            }
        }
        $document = $this->parse($html);
        $xpath = new \DOMXPath($document);
        $nodes = $xpath->query('//meta[translate(@name,"ROBOTS","robots")="robots" or translate(@name,"GOOGLEBOT","googlebot")="googlebot"]');
        foreach ($nodes ?: array() as $meta) {
            $content = $meta->attributes && $meta->attributes->getNamedItem('content') ? (string) $meta->attributes->getNamedItem('content')->nodeValue : '';
            if (preg_match('/\bnoindex\b/i', $content)) {
                return true;
            }
        }
        return false;
    }

    private function parse(string $html): \DOMDocument
    {
        $document = new \DOMDocument('1.0', 'UTF-8');
        $previous = libxml_use_internal_errors(true);
        $document->loadHTML('<?xml encoding="utf-8" ?>'.$html, LIBXML_NONET | LIBXML_NOERROR | LIBXML_NOWARNING);
        libxml_clear_errors();
        libxml_use_internal_errors($previous);
        return $document;
    }

    private function walk(\DOMNode $node, array &$lines): void
    {
        if ($node instanceof \DOMElement) {
            $tag = strtolower($node->tagName);
            if (in_array($tag, self::OMIT, true)) {
                return;
            }
            if (preg_match('/^h([1-6])$/', $tag, $match)) {
                $text = $this->nodeText($node);
                if ($text !== '') {
                    $lines[] = str_repeat('#', (int) $match[1]).' '.$text;
                }
                return;
            }
            if ($tag === 'p' || $tag === 'blockquote') {
                $text = $this->nodeText($node);
                if ($text !== '') {
                    $lines[] = $text;
                }
                return;
            }
            if ($tag === 'ul' || $tag === 'ol') {
                foreach ($node->childNodes as $child) {
                    if ($child instanceof \DOMElement && strtolower($child->tagName) === 'li') {
                        $text = $this->nodeText($child);
                        if ($text !== '') {
                            $lines[] = '- '.$text;
                        }
                    }
                }
                return;
            }
            if ($tag === 'table') {
                foreach ($node->getElementsByTagName('tr') as $row) {
                    $cells = array();
                    foreach ($row->childNodes as $cell) {
                        if ($cell instanceof \DOMElement && in_array(strtolower($cell->tagName), array('td', 'th'), true)) {
                            $cells[] = $this->nodeText($cell);
                        }
                    }
                    if ($cells) {
                        $lines[] = '| '.implode(' | ', $cells).' |';
                    }
                }
                return;
            }
        }
        $hasElement = false;
        foreach ($node->childNodes as $child) {
            if ($child instanceof \DOMElement) {
                $hasElement = true;
                $this->walk($child, $lines);
            }
        }
        if (!$hasElement && trim((string) $node->textContent) !== '') {
            $lines[] = $this->nodeText($node);
        }
    }

    private function firstText(\DOMXPath $xpath, string $query): string
    {
        $nodes = $xpath->query($query);
        $node = $nodes ? $nodes->item(0) : null;
        return $node ? $this->nodeText($node) : '';
    }

    private function nodeText(\DOMNode $node): string
    {
        $text = html_entity_decode((string) $node->textContent, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = preg_replace('/\s+/u', ' ', $text);
        return trim((string) $text);
    }
}
