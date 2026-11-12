# Migrate from the legacy `aichat` module

This one-time migration replaces a locally installed `aichat` module with
`aiworker_chat`. It copies the active configuration, all adapter settings
(including encrypted OAuth credentials and the chat 877 binding), and queued
sync work before uninstalling the old module. Credential values are never
printed.

1. Back up the Drupal database and files. Install the new module code at
   `web/modules/custom/aiworker_chat` while leaving the old `aichat` directory
   in place.
2. Pause Drupal cron and queue workers for the migration window.
3. From the Drupal project root, run:

   ```sh
   drush php:script web/modules/custom/aiworker_chat/scripts/migrate-aichat.php
   ```

   Adjust the path if the module is installed elsewhere. The script stops
   before uninstalling if the old connection, chat 877 binding, or its key is
   missing, if the new configuration or queue already exists, or if a queue
   worker still holds an item.
4. Confirm `aiworker_chat` is enabled and the AI Worker Chat settings page
   opens. Then resume cron and queue workers.
5. After confirming the migrated site, remove the now-uninstalled `aichat`
   module files.

The new module keeps the existing OAuth callback URL path, so the registered
redirect remains valid. Its callback route name and service IDs use the new
machine name. Existing OAuth credentials are copied encrypted and are not
revoked by the old module's uninstall hook.
