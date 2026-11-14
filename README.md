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

Build the local release archive from the repository root with
`php integrations/drupal/build.php`. The script writes
`integrations/drupal/dist/needtome_ai_chat-1.0.6.zip`.

## Configuration

Open **Configuration → Web services → NeedToMe AI Chat** and select
**Connect**.
Authorize the Drupal site in AI Worker. If the account has more than one chat,
select the chat to use. The public widget remains disabled until an
administrator enables **Show the chat on the site's public pages**.

After Connect, the module links the only available chat automatically. If the account has multiple chats, choose one in the admin screen. The public widget stays disabled until the owner enables **Show the chat on the site's public pages** in the first settings step. Page sync is enabled by default; products are disabled until opted in and require `commerce_product`.

The module settings form lets an administrator set:

- **Site URL for Drush and cron** — optional. If unset, the module uses the origin saved on an admin page visit, then Drush's `--uri`; otherwise sync stops with a clear error.

AI Worker requests use `https://kra.name/app` by default. Any previously saved `base` value is preserved and remains in use. To point a local or test installation at another endpoint, define `NEEDTOME_AI_CHAT_BASE_URL` in `sites/default/settings.php`, for example `define('NEEDTOME_AI_CHAT_BASE_URL', 'http://aimage.loc/app');`. A non-empty constant takes precedence over the saved value; no update removes the saved setting.

## Knowledge synchronization

The module provides the chat widget and knowledge sync only; CMS updates are handled through AI Worker tasks or a separate AI Admin module.

The module exports published node translations that anonymous visitors can view. An empty bundle selection includes every content type. Each language version has a stable `node:{nid}:{langcode}` ID, its canonical absolute URL built from the configured site URL (also in cron/Drush), the full view rendered in that translation's language as the anonymous user, and links to the other available translations. The export limit is 2,000 documents. Commerce products are capped at 500.

Daily runs compare cheap node metadata (changed time, revision, status, type, language, alias, translations, and changed times for referenced entities) before rendering nodes. Commerce product markers include product status and changed times, canonical aliases, reference changes where targets expose a changed field, and variation SKU, status, price, currency, and changed time. If a referenced target has no trustworthy changed field, that record is rendered on each ordinary pass. A translation that is intentionally excluded or renders no exportable body is removed only on a complete pass; render or URL errors make the walk incomplete. Weekly checks rebuild and hash-compare records; an unchanged rebuild sends no documents. Daily runs reconcile only when the exported ID set changes. The full entity renderer can still depend on render configuration, blocks, or extension output outside these markers, which is refreshed at the weekly check.

The admin screen's **Sync now** action forces a full resend for the selected scope. Drush and cron are also available. The module synchronizes published Drupal content that anonymous visitors can view; page sync is enabled by default, and an empty content type selection includes all content types.

```sh
drush needtome_ai_chat:sync --dry-run
drush needtome_ai_chat:sync --dry-run --pages --products
drush needtome_ai_chat:sync --force --pages
```

Drupal cron enqueues scheduled synchronization. Set the optional **Site URL for
Drush and cron** value if Drupal cannot infer the public site URL in a
command-line run.

## Security and privacy

- The `administer needtome_ai_chat` permission controls the settings page and its same-origin API. Non-GET admin API requests require Drupal's CSRF header token.
- OAuth uses PKCE and a one-time session state. Access and refresh tokens are encrypted with the Drupal site hash salt; refresh rotation uses Drupal's atomic lock backend.
- The widget loader is served from this module and runs only after the owner enables the widget. Only published content accessible to the anonymous account is exported; inaccessible translations are omitted.
- The optional Commerce adapter exports published products only after opt-in. Commerce is not required when product sync is disabled.

Uninstalling the module revokes the OAuth token where possible and removes its stored settings and queued work.

Interface translations are provided through
[localize.drupal.org](https://localize.drupal.org/).
The project does not ship `.po` files.

This project is licensed under the GNU General Public License, version 2 or any
later version.

## Maintainers

- [AI Worker team](https://kra.name/integrations/)

[drupal-module-guide]:
  https://www.drupal.org/docs/extending-drupal/installing-modules
