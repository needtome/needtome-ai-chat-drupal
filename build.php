<?php
// phpcs:ignoreFile -- Local build or sandbox helper, excluded from the release package.

/**
 * @file
 */

declare(strict_types=1);

$moduleRoot = __DIR__;
$repoRoot = dirname(__DIR__, 2);
$checks = [
  ['node', 'integrations/php-common/sync.mjs', '--check'],
  ['node', 'integrations/shared-admin-ui/sync.mjs', '--check', '--adapters-only'],
];
if (!is_file($repoRoot . '/integrations/php-common/sync.mjs') || !is_file($repoRoot . '/integrations/shared-admin-ui/sync.mjs')) {
  $checks = [];
}
foreach ($checks as $command) {
  $process = proc_open($command, [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes, $repoRoot);
  if (!is_resource($process)) {
    fwrite(STDERR, "Unable to run generated-copy check: " . implode(' ', $command) . "\n");
    exit(1);
  }
  fclose($pipes[0]);
  $stdout = stream_get_contents($pipes[1]);
  $stderr = stream_get_contents($pipes[2]);
  fclose($pipes[1]);
  fclose($pipes[2]);
  $status = proc_close($process);
  if ($stdout !== '') {
    fwrite(STDOUT, $stdout);
  }
  if ($stderr !== '') {
    fwrite(STDERR, $stderr);
  }
  if ($status !== 0) {
    fwrite(STDERR, "Refusing to build because generated files are stale.\n");
    exit($status);
  }
}

if (!class_exists(ZipArchive::class)) {
  fwrite(STDERR, "PHP ZipArchive is required to create the Drupal release ZIP.\n");
  exit(1);
}
$dist = $moduleRoot . '/dist';
if (!is_dir($dist) && !mkdir($dist, 0775, TRUE) && !is_dir($dist)) {
  fwrite(STDERR, "Unable to create dist directory.\n");
  exit(1);
}
$version = '1.0.2';
$target = $dist . '/needtome_ai_chat-' . $version . '.zip';
$zip = new ZipArchive();
if ($zip->open($target, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== TRUE) {
  fwrite(STDERR, "Unable to open release ZIP for writing.\n");
  exit(1);
}
$iterator = new RecursiveIteratorIterator(
  new RecursiveDirectoryIterator($moduleRoot, FilesystemIterator::SKIP_DOTS),
  RecursiveIteratorIterator::LEAVES_ONLY,
);
foreach ($iterator as $file) {
  if (!$file->isFile()) {
    continue;
  }
  $path = $file->getPathname();
  $relative = substr($path, strlen($moduleRoot) + 1);
  // Ship the module and its PHPUnit tests (drupal.org convention); keep repo-only tooling out of the release.
  if (str_starts_with($relative, 'dist/') || str_starts_with($relative, 'vendor/') || str_starts_with($relative, 'tests/sandbox/') || in_array($relative, ['build.php', 'tests/run.php', '.gitignore', '.gitlab-ci.yml', '.cspell-project-words.txt'], TRUE)
    || str_contains($relative, DIRECTORY_SEPARATOR . '.git' . DIRECTORY_SEPARATOR) || basename($relative) === '.DS_Store') {
    continue;
  }
  $name = 'needtome_ai_chat/' . str_replace(DIRECTORY_SEPARATOR, '/', $relative);
  // The source info.yml has no version (drupal.org adds it when packaging); the ZIP for manual installs gets the same block,
  // otherwise Extend shows no version.
  if ($relative === 'needtome_ai_chat.info.yml') {
    $zip->addFromString($name, rtrim((string) file_get_contents($path)) . "\n\n# Information added by the NeedToMe AI Chat packaging script\nversion: '" . $version . "'\n");
    continue;
  }
  $zip->addFile($path, $name);
}
$zip->close();
fwrite(STDOUT, "Built $target\n");
