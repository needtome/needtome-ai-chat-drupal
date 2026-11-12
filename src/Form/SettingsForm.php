<?php

namespace Drupal\needtome_ai_chat\Form;

use Drupal\Core\Cache\CacheTagsInvalidatorInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Config\TypedConfigManagerInterface;
use Drupal\needtome_ai_chat\Common\AbstractHost;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Site-specific AI Worker endpoint settings.
 */
class SettingsForm extends ConfigFormBase {

  public function __construct(
    ConfigFactoryInterface $config_factory,
    private readonly CacheTagsInvalidatorInterface $cacheTagsInvalidator,
    ?TypedConfigManagerInterface $typed_config_manager = NULL,
  ) {
    parent::__construct($config_factory, $typed_config_manager);
  }

  /**
   * Creates the settings form with its injected services.
   */
  public static function create(ContainerInterface $container): static {
    return new static(
      $container->get('config.factory'),
      $container->get('cache_tags.invalidator'),
      $container->get('config.typed'),
    );
  }

  /**
   * Returns the configuration names edited by this form.
   */
  protected function getEditableConfigNames(): array {
    return ['needtome_ai_chat.settings'];
  }

  /**
   * Returns the unique form identifier.
   */
  public function getFormId(): string {
    return 'needtome_ai_chat_settings_form';
  }

  /**
   * Builds the AI Worker endpoint settings form.
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {
    $config = $this->config('needtome_ai_chat.settings');
    $form['base'] = [
      '#type' => 'url',
      '#title' => $this->t('AI Worker base URL'),
      '#default_value' => $config->get('base') ?: AbstractHost::DEFAULT_BASE,
      '#required' => TRUE,
      '#description' => $this->t('Use an HTTPS URL. Plain HTTP is accepted only for localhost and 127.0.0.1 development servers.'),
    ];
    $form['site_url'] = [
      '#type' => 'url',
      '#title' => $this->t('Site URL for Drush and cron'),
      '#default_value' => $config->get('site_url') ?: '',
      '#description' => $this->t('Optional. If empty, the module uses the site URL saved when an administrator visits the chat page.'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * Validates the AI Worker endpoint and site URLs.
   */
  public function validateForm(array &$form, FormStateInterface $form_state): void {
    parent::validateForm($form, $form_state);
    $base = trim((string) $form_state->getValue('base'));
    if (AbstractHost::normalizeBase($base) !== rtrim($base, '/')) {
      $form_state->setErrorByName('base', $this->t('Enter a valid HTTPS base URL, or an HTTP localhost URL for local development.'));
    }
    $siteUrl = trim((string) $form_state->getValue('site_url'));
    if ($siteUrl !== '') {
      $parts = parse_url($siteUrl);
      if (
        !is_array($parts)
        || empty($parts['scheme'])
        || empty($parts['host'])
        || isset($parts['user'])
        || isset($parts['pass'])
        || isset($parts['query'])
        || isset($parts['fragment'])
        || !in_array(strtolower($parts['scheme']), ['http', 'https'], TRUE)
      ) {
        $form_state->setErrorByName(
          'site_url',
          $this->t('Enter a full HTTP or HTTPS site URL without credentials, query, or fragment.'),
        );
      }
    }
  }

  /**
   * Saves the AI Worker endpoint and site URL settings.
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    parent::submitForm($form, $form_state);
    $siteUrl = trim((string) $form_state->getValue('site_url'));
    $this->config('needtome_ai_chat.settings')
      ->set('base', rtrim(trim((string) $form_state->getValue('base')), '/'))
      ->set('site_url', $siteUrl === '' ? '' : rtrim($siteUrl, '/'))
      ->save();
    $this->cacheTagsInvalidator->invalidateTags(['needtome_ai_chat', 'needtome_ai_chat_widget']);
  }

}
