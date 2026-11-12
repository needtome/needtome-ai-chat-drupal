<?php

namespace Drupal\Tests\needtome_ai_chat\Unit;

use Drupal\needtome_ai_chat\DrupalHost;
use PHPUnit\Framework\Attributes\Group;
use PHPUnit\Framework\TestCase;

/**
 * Unit tests for Drupal document mapping.
 */
#[Group('needtome_ai_chat')]
class DocumentMappingTest extends TestCase {

  /**
   * Tests mapping translated Drupal nodes to page documents.
   */
  public function testNodeTranslationMapping(): void {
    $document = DrupalHost::pageDocument('5', 'en', 'https://site.example/en/page', 'Page', 1790000000, '# Hello', [
      'en' => 'https://site.example/en/page',
      'uk' => 'https://site.example/uk/page',
    ]);
    self::assertSame('node:5:en', $document['id']);
    self::assertSame('page', $document['type']);
    self::assertSame('en', $document['lang']);
    self::assertSame('https://site.example/uk/page', $document['translations']['uk']);
  }

  /**
   * Tests mapping Commerce products to product documents.
   */
  public function testCommerceProductContractMapping(): void {
    $product = DrupalHost::productDocument([
      'id' => '8',
      'title' => 'Sample',
      'lang' => 'uk',
      'price' => '12.50',
      'currency' => 'EUR',
      'variations' => [['id' => '9']],
    ]);
    self::assertSame('8', $product['id']);
    self::assertSame('12.50', $product['price']);
    self::assertSame('EUR', $product['currency']);
    self::assertSame('unknown', $product['stock_status']);
    self::assertCount(1, $product['variations']);
  }

}
