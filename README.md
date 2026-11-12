# NeedToMe AI Chat for Drupal

## Introduction

Connect a Drupal site to an AI Worker web chat and synchronize public content
with its knowledge base. The module includes its administration interface and
does not load executable administration code from a remote server.

For project information, visit the
[Drupal.org project page](https://www.drupal.org/project/needtome_ai_chat) or
report a problem in the
[issue queue](https://www.drupal.org/project/issues/needtome_ai_chat).

## Requirements

- Drupal 10.3 or Drupal 11.
- PHP 8.1 or newer, with cURL, JSON, DOM, and OpenSSL or sodium enabled.
- Drush 12 or 13 for command-line knowledge synchronization.
- The Drupal Commerce Product module is optional and is only needed to sync
  products.

## Installation

Install with Composer:

```sh
composer require drupal/needtome_ai_chat
drush en needtome_ai_chat -y
```

You can also download the module ZIP and install it from **Extend → Install
module**. Alternatively, extract the `needtome_ai_chat` directory into
`web/modules/custom/needtome_ai_chat`, then enable it from **Extend** or with
Drush. See Drupal's guide to
[installing modules][drupal-module-guide] for other supported installation
methods.

## Configuration

Open **Configuration → Web services → NeedToMe AI Chat** and select
**Connect**.
Authorize the Drupal site in AI Worker. If the account has more than one chat,
select the chat to use. The public widget remains disabled until an
administrator enables **Show the chat on the site's public pages**.

The module can synchronize published Drupal content that anonymous visitors can
view. Page synchronization is enabled by default; an empty content type
selection includes all content types. Product synchronization is optional and
requires Drupal Commerce Product. Run a manual synchronization with:

```sh
drush needtome_ai_chat:sync --dry-run
drush needtome_ai_chat:sync --dry-run --pages --products
drush needtome_ai_chat:sync --force --pages
```

Drupal cron enqueues scheduled synchronization. Set the optional **Site URL for
Drush and cron** value if Drupal cannot infer the public site URL in a
command-line run. The default AI Worker service URL is `https://kra.name/app`.

The `administer needtome_ai_chat` permission controls the settings page and its
same-origin API. OAuth uses PKCE, and refresh tokens are encrypted with the
Drupal site hash salt. Uninstalling the module revokes the OAuth token where
possible and removes its stored settings and queued work.

Interface translations are provided through
[localize.drupal.org](https://localize.drupal.org/).
The project does not ship `.po` files.

This project is licensed under the GNU General Public License, version 2 or any
later version. See [LICENSE.txt](LICENSE.txt).

## Maintainers

- [AI Worker team](https://kra.name/integrations/)

[drupal-module-guide]:
  https://www.drupal.org/docs/extending-drupal/installing-modules
