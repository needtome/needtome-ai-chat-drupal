<?php

namespace Drupal\Tests\needtome_ai_chat\Unit;

use Drupal\needtome_ai_chat\DrupalStorage;
use PHPUnit\Framework\Attributes\Group;
use PHPUnit\Framework\TestCase;

/**
 * Unit tests for the Drupal key-value storage adapter.
 */
#[Group('needtome_ai_chat')]
class DrupalStorageTest extends TestCase {

  /**
   * Tests delegation to Drupal key-value and lock services.
   */
  public function testKeyValueAndLockServicesAreDelegated(): void {
    $keyValue = new class() {
      /** The in-memory key-value data for this test double. */
      public array $values = [];

      /**
       * Provides get for the test.
       */
      public function get(string $key, $default = NULL) {
        return $this->values[$key] ?? $default;
      }

      /**
       * Provides set for the test.
       */
      public function set(string $key, $value): void {
        $this->values[$key] = $value;
      }

      /**
       * Provides delete for the test.
       */
      public function delete(string $key): void {
        unset($this->values[$key]);
      }

      /**
       * Provides delete all for the test.
       */
      public function deleteAll(): void {
        $this->values = [];
      }

    };
    $lock = new class() {
      /** The lock operations recorded by this test double. */
      public array $calls = [];

      /**
       * Provides acquire for the test.
       */
      public function acquire(string $name, int $ttl): bool {
        $this->calls[] = ['acquire', $name, $ttl];
        return TRUE;
      }

      /**
       * Provides release for the test.
       */
      public function release(string $name): void {
        $this->calls[] = ['release', $name];
      }

    };

    $storage = new DrupalStorage($keyValue, $lock);
    $storage->put('value', ['a' => 1]);
    self::assertSame(['a' => 1], $storage->get('value'));
    self::assertTrue($storage->acquire('refresh', 45));
    $storage->release('refresh');
    self::assertSame([
      ['acquire', 'needtome_ai_chat:refresh', 45],
      ['release', 'needtome_ai_chat:refresh'],
    ], $lock->calls);
    $storage->clear();
    self::assertSame([], $keyValue->values);
  }

}
