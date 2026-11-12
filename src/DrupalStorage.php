<?php

namespace Drupal\aiworker_chat;

/**
 * Testable adapter around Drupal's key-value and lock services.
 */
class DrupalStorage {

  public function __construct(private readonly object $keyValue, private readonly object $lock) {}

  /**
   * Reads a value from the key-value store.
   */
  public function get(string $key, $default = NULL) {
    return $this->keyValue->get($key, $default);
  }

  /**
   * Stores a value in the key-value store.
   */
  public function put(string $key, $value): void {
    $this->keyValue->set($key, $value);
  }

  /**
   * Removes a value from the key-value store.
   */
  public function forget(string $key): void {
    $this->keyValue->delete($key);
  }

  /**
   * Removes all values from the key-value store.
   */
  public function clear(): void {
    $this->keyValue->deleteAll();
  }

  /**
   * Acquires a namespaced lock.
   */
  public function acquire(string $name, int $ttl): bool {
    return $this->lock->acquire('aiworker_chat:' . $name, max(1, $ttl));
  }

  /**
   * Releases a namespaced lock.
   */
  public function release(string $name): void {
    $this->lock->release('aiworker_chat:' . $name);
  }

}
