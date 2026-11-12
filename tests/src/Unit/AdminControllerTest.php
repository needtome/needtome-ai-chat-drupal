<?php

namespace Drupal\Tests\needtome_ai_chat\Unit;

use Drupal\needtome_ai_chat\Controller\AdminController;
use PHPUnit\Framework\Attributes\Group;
use PHPUnit\Framework\TestCase;

/**
 * Tests Drupal request mapping before requests reach php-common. */
#[Group('needtome_ai_chat')]
class AdminControllerTest extends TestCase {

  /**
   * Tests route parameter and CSRF request handling.
   */
  public function testRouteParameterAndCsrfExtraction(): void {
    self::assertSame('state', AdminController::normalizeRouteParameter('/state'));
    self::assertSame('sync/status', AdminController::normalizeRouteParameter('sync/status'));
    self::assertNull(AdminController::normalizeRouteParameter('admin/delete'));
    self::assertSame('X-CSRF-Token', AdminController::csrfHeaderName());
    self::assertTrue(AdminController::csrfIsValid('expected', 'expected'));
    self::assertFalse(AdminController::csrfIsValid('expected', 'other'));
    self::assertFalse(AdminController::csrfIsValid('', 'expected'));
    self::assertTrue(AdminController::csrfRequiredFor('GET', 'sync/status'));
    self::assertFalse(AdminController::csrfRequiredFor('GET', 'state'));
    self::assertTrue(AdminController::csrfRequiredFor('POST', 'sync'));
    self::assertTrue((new \ReflectionClass(AdminController::class))->hasProperty('stringTranslation'));
  }

  /**
   * Tests permission checks and JSON request parsing.
   */
  public function testPermissionAndJsonBodyMapping(): void {
    $account = new class {

      /**
       * Provides has permission for the test.
       */
      public function hasPermission(string $permission): bool {
        return $permission === 'administer needtome_ai_chat';
      }

    };
    self::assertTrue(AdminController::permissionAllowed($account));
    self::assertFalse(AdminController::permissionAllowed(new \stdClass()));
    self::assertSame(['scope' => 'pages'], AdminController::jsonBody('{"scope":"pages"}', 'application/json'));
    self::assertNull(AdminController::jsonBody('{bad json}', 'application/json'));
    self::assertNull(AdminController::jsonBody(str_repeat('x', 65537), 'application/json'));
  }

}
