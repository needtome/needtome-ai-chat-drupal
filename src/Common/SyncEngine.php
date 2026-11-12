<?php
// phpcs:ignoreFile -- Generated from the shared php-common source.
// Part of NeedToMe AI Chat php-common. Edit integrations/php-common/src, then run node integrations/php-common/sync.mjs.

namespace Drupal\needtome_ai_chat\Common;

class SyncEngine
{
    private $host;
    private $kra;
    private $batcher;
    private $sleeper;

    public function __construct(Host $host, KraClient $kra, Batcher $batcher, Sleeper $sleeper)
    {
        $this->host = $host;
        $this->kra = $kra;
        $this->batcher = $batcher;
        $this->sleeper = $sleeper;
    }

    /**
     * A platform cron/CLI run fans out over the current registry. A scoped instance is one explicit chat run;
     * errors and backoff in one chat never prevent the next chat from running.
     */
    public function run(bool $pages = true, bool $products = false, bool $dryRun = false, bool $force = false, int $timeLimit = 100, string $passKind = 'daily'): array
    {
        if ($this->host instanceof ScopedHost) {
            if (!$this->host->registered()) return array('ok' => false, 'skipped' => true, 'reason' => 'unknown_chat');
            return $this->runOne($pages, $products, $dryRun, $force, $timeLimit, $passKind);
        }
        $registry = new ChatRegistry($this->host);
        $ids = $registry->ids();
        $results = array();
        foreach ($ids as $id) {
            $scoped = $registry->scoped($id);
            if (!$scoped) continue;
            try {
                $results[$id] = $this->forHost($scoped)->runOne($pages, $products, $dryRun, $force, $timeLimit, $passKind);
            } catch (\Throwable $exception) {
                $results[$id] = array('ok' => false, 'error' => 'sync_failed');
            }
        }
        if (count($results) === 1) return reset($results);
        $ok = true;
        foreach ($results as $result) if (empty($result['ok']) && empty($result['skipped'])) $ok = false;
        return array('ok' => $ok, 'chats' => $results);
    }

    /** Consume one queued admin request from the adapter's native scheduler, otherwise run its ordinary sync. */
    public function runScheduled(bool $pages = true, bool $products = false, int $timeLimit = 100, string $passKind = 'daily'): array
    {
        if ($this->host instanceof ScopedHost) {
            if (!$this->host->registered()) return array('ok' => false, 'skipped' => true, 'reason' => 'unknown_chat');
            return $this->runScheduledOne($pages, $products, $timeLimit, $passKind);
        }
        $results = array();
        foreach ((new ChatRegistry($this->host))->ids() as $id) {
            $scoped = (new ChatRegistry($this->host))->scoped($id);
            if (!$scoped) continue;
            try { $results[$id] = $this->forHost($scoped)->runScheduledOne($pages, $products, $timeLimit, $passKind); }
            catch (\Throwable $exception) { $results[$id] = array('ok' => false, 'error' => 'sync_failed'); }
        }
        if (count($results) === 1) return reset($results);
        $ok = true;
        foreach ($results as $result) if (empty($result['ok']) && empty($result['skipped'])) $ok = false;
        return array('ok' => $ok, 'chats' => $results);
    }

    /** Run exactly one checkpointed API step for a due admin job, suitable for an authenticated status poll. */
    public function runManualSlice(int $timeLimit = 20): array
    {
        if (!$this->host instanceof ScopedHost || !$this->host->registered()) {
            return array('ok' => false, 'skipped' => true, 'reason' => 'unknown_chat');
        }
        return $this->runScheduledOne(true, true, min(20, max(1, $timeLimit)), 'manual', true);
    }

    private function runScheduledOne(bool $pages, bool $products, int $timeLimit, string $passKind, bool $singleSlice = false): array
    {
        $state = $this->host->settingGet('sync_state', array());
        $state = is_array($state) ? $state : array();
        $previousProgress = $state['manual_job_progress'] ?? null;
        $request = $state['manual_request'] ?? null;
        if (!is_array($request)) return $this->runOne($pages, $products, false, false, $timeLimit, $passKind);
        $nextAttempt = isset($request['next_attempt_at']) ? strtotime((string) $request['next_attempt_at']) : false;
        if ($nextAttempt !== false && $nextAttempt > time()) {
            return array('ok' => false, 'skipped' => true, 'reason' => 'scheduled_retry', 'next_attempt_at' => $request['next_attempt_at']);
        }

        $jobLock = 'manual-sync-job:'.sha1($this->host->siteHome());
        if (!$this->host->lockAcquire($jobLock, max(30, $timeLimit + 10))) {
            return array('ok' => false, 'skipped' => true, 'reason' => 'running', 'job_id' => $state['manual_job_id'] ?? null);
        }

        try {
            $jobId = (string) ($request['id'] ?? $state['manual_job_id'] ?? '');
            $state['running'] = true;
            $state['manual_job_id'] = $jobId;
            $state['manual_job_status'] = 'running';
            $state['manual_job_next_run'] = null;
            $this->host->settingPut('sync_state', $state);

            $sliceRequest = $request;
            $result = $this->runOne((bool) ($request['pages'] ?? $pages), (bool) ($request['products'] ?? $products), false,
                (bool) ($request['force'] ?? true), $timeLimit, 'manual', $sliceRequest, $singleSlice);
            if ($singleSlice) $request = $sliceRequest;
            $state = $this->host->settingGet('sync_state', array());
            $state = is_array($state) ? $state : array();
            $state['manual_job_progress'] = $previousProgress;
            $state['manual_job_id'] = $jobId;
            $state['running'] = false;
            $state['manual_job_next_run'] = $result['next_attempt_at'] ?? null;
            $state['manual_job_error'] = $result['error'] ?? ($result['warning'] ?? null);
            if (!empty($result['slice_pending'])) {
                $state['manual_request'] = $request;
                $state['manual_job_status'] = 'queued';
                $state['manual_job_progress'] = $result['progress'] ?? null;
                $state['manual_job_summary'] = array_intersect_key($result, array_flip(array('pages', 'products', 'page_batches', 'product_batches')));
            } elseif (!empty($result['skipped']) && ($result['reason'] ?? '') === 'running') {
                $state['manual_request'] = $request;
                $state['manual_job_status'] = 'queued';
            } elseif (($result['error'] ?? '') === 'rate_limited' && !empty($result['next_attempt_at'])) {
                $request['next_attempt_at'] = $result['next_attempt_at'];
                $state['manual_request'] = $request;
                $state['manual_job_status'] = 'retry_scheduled';
            } else {
                unset($state['manual_request']);
                if (!empty($result['ok'])) $state['manual_job_progress'] = null;
                $state['manual_job_summary'] = array_intersect_key($result, array_flip(array('pages', 'products', 'page_batches', 'product_batches', 'warning', 'export', 'error', 'ok')));
                $state['manual_job_status'] = !empty($result['ok'])
                    ? (!empty($result['warning']) ? 'completed_with_warnings' : 'completed') : 'failed';
                $state['manual_job_finished_at'] = gmdate('c');
            }
            $this->host->settingPut('sync_state', $state);
            return $result;
        } finally {
            $this->host->lockRelease($jobLock);
        }
    }

    public function forHost(Host $host): self
    {
        return new self($host, $this->kra, $this->batcher, $this->sleeper);
    }

    /** Return a chat-scoped engine for a native queue item without fanning out to other chats. */
    public function forChat(string $id): ?self
    {
        $base = $this->host instanceof ScopedHost ? $this->host->baseHost() : $this->host;
        $scoped = (new ChatRegistry($base))->scoped($id);
        return $scoped ? $this->forHost($scoped) : null;
    }

    private function runOne(bool $pages = true, bool $products = false, bool $dryRun = false, bool $force = false, int $timeLimit = 100, string $passKind = 'daily', ?array &$manualRequest = null, bool $singleSlice = false): array
    {
        $lockName = 'sync-run:'.sha1($this->host->siteHome());
        if (!$this->host->lockAcquire($lockName, 300)) {
            return array('ok' => false, 'skipped' => true, 'reason' => 'running');
        }
        $started = microtime(true);
        $timeLimit = max(1, $timeLimit);
        try {
            if ($this->host instanceof ScopedHost && !$this->host->registered()) {
                return array('ok' => false, 'skipped' => true, 'reason' => 'unknown_chat');
            }
            $backoff = $this->host->settingGet('sync_backoff', array());
            if (!$dryRun && !$force && is_array($backoff) && !empty($backoff['next_attempt_at'])) {
                $next = strtotime((string) $backoff['next_attempt_at']);
                if ($next !== false && $next > time()) {
                    return array('ok' => false, 'skipped' => true, 'reason' => 'backoff', 'next_attempt_at' => $backoff['next_attempt_at']);
                }
            }
            $options = $this->host->settingGet('sync_options', array());
            $options = is_array($options) ? $options : array();
            $pagesEnabled = !isset($options['pages']['enabled']) || (bool) $options['pages']['enabled'];
            $productEnabled = !empty($options['products']['enabled']) && $this->host->productsAvailable();
            $pages = $pages && $pagesEnabled;
            $products = $products && $productEnabled;
            $key = $this->host->settingGet('widget_key');
            $chatId = (int) $this->host->settingGet('chat_id', 0);
            if (!$dryRun && (!is_string($key) || !preg_match('/^wk_[A-Za-z0-9]{24}$/', $key))) {
                return array('ok' => false, 'error' => 'not_linked');
            }
            if (!$dryRun) {
                $state = $this->host->settingGet('sync_state', array());
                $state = is_array($state) ? $state : array();
                $this->host->settingPut('sync_state', array_replace($state, array('last_run' => gmdate('c'), 'next_run' => null, 'running' => true, 'error' => null)));
            }

            $fingerprint = $this->exportFingerprint($options);
            $fingerprints = $this->host->settingGet('sync_fingerprints', array());
            $fingerprints = is_array($fingerprints) ? $fingerprints : array();
            $pageFingerprintChanged = isset($fingerprints['pages']) && !hash_equals((string) $fingerprints['pages'], $fingerprint);
            $productFingerprintChanged = isset($fingerprints['products']) && !hash_equals((string) $fingerprints['products'], $fingerprint);
            $pageResend = $force || $pageFingerprintChanged;
            $productResend = $force || $productFingerprintChanged;
            $schedule = $this->host->settingGet('sync_reconcile_at', array());
            $schedule = is_array($schedule) ? $schedule : array();
            $pageWeekly = $pages && ($passKind === 'weekly' || $this->reconcileDue($schedule, 'doc_reconcile_at'));
            $productWeekly = $products && ($passKind === 'weekly' || $this->reconcileDue($schedule, 'product_reconcile_at'));
            $pageRebuild = $pageResend || $pageWeekly;
            $productRebuild = $productResend || $productWeekly;

            $pageWalk = $this->emptyWalk();
            $productWalk = $this->emptyWalk();
            $pageDocs = array();
            $productRows = array();
            $pageMarkers = array();
            $productMarkers = array();
            $storedOmissions = $this->storedOmissions();
            $omittedPages = $storedOmissions['pages'];
            $omittedProducts = $storedOmissions['products'];
            $pageIds = array();
            $productRootIds = array();
            $productIds = array();
            $pageSkipped = array();
            $productSkipped = array();
            $pageBuilt = array();
            $productBuilt = array();
            $pageIndexed = false;
            $productIndexed = false;
            $pageIndexObserved = null;
            $productIndexObserved = null;

            if ($pages && method_exists($this->host, 'pageIndex')) {
                try {
                    $index = $this->host->pageIndex();
                } catch (\Throwable $exception) {
                    $index = null;
                    $pageWalk = $this->walkWithFailure($pageWalk, 'pages', 'index_failed');
                }
                if (is_iterable($index)) {
                    $pageIndexed = true;
                    $indexed = $this->collectIndex($index, 'pages', 2000);
                    $pageWalk = $indexed['walk'];
                    $pageIndexObserved = $indexed['observed'];
                    foreach ($indexed['rows'] as $row) {
                        $id = $row['id'];
                        $pageIds[$id] = true;
                        $pageMarkers[$id] = $row['marker'];
                    }
                    $storedHashes = $this->storedHashes();
                    $storedMarkers = $this->storedMarkers();
                    $buildIds = array();
                    foreach ($pageIds as $id => $unused) {
                        if (!$pageRebuild && !isset($omittedPages[$id]) && $pageMarkers[$id] !== null && isset($storedHashes[$id], $storedMarkers[$id]) && hash_equals((string) $storedMarkers[$id], (string) $pageMarkers[$id])) {
                            $pageSkipped[] = $id;
                        } else {
                            $buildIds[] = $id;
                        }
                    }
                    $pageBuilt = $buildIds;
                    $pageDocs = $this->buildPagesByIds($buildIds, $pageIds, $pageMarkers, $pageWalk, $omittedPages);
                }
            }
            if ($pages && !$pageIndexed) {
                $pageDocs = $this->collectPages($pageWalk);
                foreach ($pageDocs as $doc) {
                    $id = (string) ($doc['id'] ?? '');
                    if ($id !== '') {
                        $pageIds[$id] = true;
                        $pageMarkers[$id] = null;
                        $pageBuilt[] = $id;
                    }
                }
            }

            if ($products && method_exists($this->host, 'productIndex')) {
                try {
                    $index = $this->host->productIndex();
                } catch (\Throwable $exception) {
                    $index = null;
                    $productWalk = $this->walkWithFailure($productWalk, 'products', 'index_failed');
                }
                if (is_iterable($index)) {
                    $productIndexed = true;
                    $indexed = $this->collectIndex($index, 'products', $this->productCap());
                    $productWalk = $indexed['walk'];
                    $productIndexObserved = $indexed['observed'];
                    foreach ($indexed['rows'] as $row) {
                        $id = $row['id'];
                        $productRootIds[$id] = true;
                        $productMarkers[$id] = $row['marker'];
                        $variationIds = isset($row['variation_ids']) && is_array($row['variation_ids']) ? $row['variation_ids'] : array();
                        $productIds[] = $id;
                        foreach ($variationIds as $variationId) if ((string) $variationId !== '') $productIds[] = $id.'#'.(string) $variationId;
                    }
                    $storedHashes = $this->storedHashes();
                    $storedMarkers = $this->storedMarkers();
                    $buildIds = array();
                    foreach ($productRootIds as $id => $unused) {
                        $productHashKey = 'product:'.$id;
                        if (!$productRebuild && !isset($omittedProducts[$id]) && $productMarkers[$id] !== null && isset($storedHashes[$productHashKey], $storedMarkers[$productHashKey]) && hash_equals((string) $storedMarkers[$productHashKey], (string) $productMarkers[$id])) {
                            $productSkipped[] = $id;
                        } else {
                            $buildIds[] = $id;
                        }
                    }
                    $productBuilt = $buildIds;
                    $productRows = $this->buildProductsByIds($buildIds, $productRootIds, $productMarkers, $productWalk, $omittedProducts);
                    foreach ($productRows as $product) {
                        $id = (string) ($product['id'] ?? '');
                        foreach ((array) ($product['variation_ids'] ?? array_column((array) ($product['variations'] ?? array()), 'id')) as $variationId) {
                            if ((string) $variationId !== '') $productIds[] = $id.'#'.(string) $variationId;
                        }
                    }
                }
            }
            if ($products && !$productIndexed) {
                $productRows = $this->collectProducts($this->productCap(), $productWalk);
                foreach ($productRows as $product) {
                    $id = (string) ($product['id'] ?? '');
                    if ($id !== '') {
                        $productRootIds[$id] = true;
                        $productMarkers[$id] = null;
                        $productBuilt[] = $id;
                    }
                }
                $productIds = $this->productIds($productRows);
            }
            if ($productIndexed) {
                $productIds = array_values(array_filter($productIds, function ($id) use ($productRootIds) {
                    return isset($productRootIds[explode('#', (string) $id, 2)[0]]);
                }));
            }

            $changedPages = $this->changedPages($pageDocs, $pageResend, $pageMarkers);
            $changedProducts = $this->changedProducts($productRows, $productResend, $productMarkers);
            $envelope = array('site' => rtrim($this->host->siteHome(), '/'), 'platform' => $this->host->platform());
            $pageBatches = $this->batcher->documentBatches($changedPages['payload'], $envelope);
            $productBatches = $this->batcher->productBatches($changedProducts['payload']);
            $plan = array(
                'pages' => count($pageIds),
                'products' => count($productRootIds),
                'page_batches' => count($pageBatches),
                'product_batches' => count($productBatches),
                'would_send' => array_merge(array_values(array_unique(array_column($changedPages['payload'], 'id'))), $this->productPayloadIds($changedProducts['payload'])),
                'would_build' => array_merge($pageBuilt, $productBuilt),
                'would_skip' => array_merge($pageSkipped, $this->productPayloadIdsFromIds($productSkipped)),
            );
            $incompletePages = $pages && !$pageWalk['complete'];
            $incompleteProducts = $products && !$productWalk['complete'];
            if ($incompletePages) {
                $plan['export']['pages'] = $pageWalk;
            }
            if ($incompleteProducts) {
                $plan['export']['products'] = $productWalk;
            }
            if ($dryRun) {
                $idsByBatch = array();
                foreach ($pageBatches as $batch) {
                    $idsByBatch[] = array_values(array_unique(array_column($batch, 'id')));
                }
                foreach ($productBatches as $batch) {
                    $idsByBatch[] = $this->productPayloadIds($batch);
                }
                return array_merge(array('ok' => true, 'dry_run' => true, 'batches' => $idsByBatch), $plan);
            }
            if (!is_string($key) || !preg_match('/^wk_[A-Za-z0-9]{24}$/', $key)) {
                return array_merge(array('ok' => false, 'error' => 'not_linked'), $plan);
            }
            $chatContext = $chatId > 0 ? array('chat_id' => $chatId) : array();

            // Never reconcile after an empty or incomplete export. This check is shared by cron and poll slices.
            $skipPageReconcile = $pages && count($pageIds) === 0 && ($pageIndexObserved === null || $pageIndexObserved === 0) && $this->hadSentIds(false);
            $skipProductReconcile = $products && count($productRootIds) === 0 && ($productIndexObserved === null || $productIndexObserved === 0) && $this->hadSentIds(true);
            if ($skipPageReconcile || $skipProductReconcile) $plan['reconcile_skipped'] = 'empty_export';
            if ($incompletePages || $incompleteProducts) $plan['reconcile_skipped'] = 'incomplete_export';
            $reconcilePages = $pages && !$skipPageReconcile && !$incompletePages && ($force || $pageWeekly || $this->storedIdsDiffer(false, $pageIds));
            $reconcileProducts = $products && !$skipProductReconcile && !$incompleteProducts && ($force || $productWeekly || $this->storedIdsDiffer(true, $productRootIds));

            $operations = array();
            foreach ($pageBatches as $index => $batch) $operations[] = array('kind' => 'page_batch', 'index' => $index, 'payload' => $batch);
            foreach ($productBatches as $index => $batch) $operations[] = array('kind' => 'product_batch', 'index' => $index, 'payload' => $batch);
            if ($reconcilePages) $operations[] = array('kind' => 'page_reconcile', 'ids' => array_keys($pageIds));
            if ($reconcileProducts) $operations[] = array('kind' => 'product_reconcile', 'ids' => array_values(array_unique($productIds)));
            if ($products && !$incompleteProducts && !$skipProductReconcile) $operations[] = array('kind' => 'product_status');
            $operations[] = array('kind' => 'status');

            $sliceSignature = hash('sha256', serialize($operations));
            $sliceCursor = 0;
            if ($singleSlice) {
                if (!is_array($manualRequest)) $manualRequest = array();
                if (!isset($manualRequest['slice_signature']) || !hash_equals((string) $manualRequest['slice_signature'], $sliceSignature)) {
                    $manualRequest['slice_signature'] = $sliceSignature;
                    $manualRequest['slice_cursor'] = 0;
                    $manualRequest['slice_initialized'] = false;
                    $manualRequest['pages_processed'] = 0;
                    $manualRequest['products_processed'] = 0;
                }
                $manualRequest['pages_processed'] = max(0, (int) ($manualRequest['pages_processed'] ?? 0));
                $manualRequest['products_processed'] = max(0, (int) ($manualRequest['products_processed'] ?? 0));
                $sliceCursor = max(0, (int) ($manualRequest['slice_cursor'] ?? 0));
                if (empty($manualRequest['slice_initialized'])) {
                    $this->saveOmissions($omittedPages, $omittedProducts);
                    $this->dropBeforeSend(false, $changedPages['sent_ids'], $pageResend);
                    $this->dropBeforeSend(true, $changedProducts['sent_ids'], $productResend);
                    if ($pages && !$pageBatches) $this->markAccepted(false, $changedPages['hashes'], $changedPages['markers'], $changedPages['record_counts']);
                    if ($products && !$productBatches) $this->markAccepted(true, $changedProducts['hashes'], $changedProducts['markers'], $changedProducts['record_counts']);
                    $manualRequest['slice_initialized'] = true;
                }
                if ($sliceCursor < count($operations)) {
                    $operation = $operations[$sliceCursor];
                    $requestTimeout = max(1, min(20, $timeLimit - (int) (microtime(true) - $started)));
                    $kind = $operation['kind'];
                    if ($kind === 'page_batch') {
                        $batch = $operation['payload'];
                        $result = $this->sendWithRetry($started, $timeLimit, function () use ($key, $chatContext, $batch, $envelope, $requestTimeout) {
                            return $this->kra->siteKnowledge($key, 'documents', 'POST', array(), array_merge($envelope, $chatContext, array('docs' => $batch)), $requestTimeout);
                        });
                        if (!$this->successful($result) || $this->hasRejected($result['body'] ?? array())) return array_merge($this->failure('documents_failed', $result), $plan);
                        $manualRequest['pages_processed'] += count($batch);
                        if ((int) $operation['index'] === count($pageBatches) - 1 && $pages) $this->markAccepted(false, $changedPages['hashes'], $changedPages['markers'], $changedPages['record_counts']);
                    } elseif ($kind === 'product_batch') {
                        $batch = $operation['payload'];
                        $result = $this->sendWithRetry($started, $timeLimit, function () use ($key, $chatContext, $batch, $envelope, $requestTimeout) {
                            return $this->kra->siteKnowledge($key, 'products', 'POST', array(), array_merge($envelope, $chatContext, array('products' => $batch)), $requestTimeout);
                        });
                        if (!$this->successful($result) || $this->hasRejected($result['body'] ?? array())) return array_merge($this->failure('products_failed', $result), $plan);
                        $manualRequest['products_processed'] += count($batch);
                        if ((int) $operation['index'] === count($productBatches) - 1 && $products) $this->markAccepted(true, $changedProducts['hashes'], $changedProducts['markers'], $changedProducts['record_counts']);
                    } elseif ($kind === 'page_reconcile') {
                        $result = $this->sendWithRetry($started, $timeLimit, function () use ($key, $chatContext, $envelope, $pageIds, $requestTimeout) {
                            return $this->kra->siteKnowledge($key, 'documents/reconcile', 'POST', array(), array_merge($envelope, $chatContext, array('ids' => array_keys($pageIds))), $requestTimeout);
                        });
                        if (!$this->successful($result)) return array_merge($this->failure('reconcile_failed', $result), $plan);
                        $this->keepKindData(false, $pageIds);
                        $omittedPages = array_intersect_key($omittedPages, $pageIds);
                        if ($force || $pageWeekly) $this->rememberReconcile('doc_reconcile_at');
                    } elseif ($kind === 'product_reconcile') {
                        $result = $this->sendWithRetry($started, $timeLimit, function () use ($key, $chatContext, $envelope, $productIds, $requestTimeout) {
                            return $this->kra->siteKnowledge($key, 'products/reconcile', 'POST', array(), array_merge($envelope, $chatContext, array('ids' => array_values(array_unique($productIds)))), $requestTimeout);
                        });
                        if (!$this->successful($result)) return array_merge($this->failure('products_reconcile_failed', $result), $plan);
                        $this->keepKindData(true, $productRootIds);
                        $omittedProducts = array_intersect_key($omittedProducts, $productRootIds);
                        if ($force || $productWeekly) $this->rememberReconcile('product_reconcile_at');
                    } elseif ($kind === 'status') {
                        $status = $this->sendWithRetry($started, $timeLimit, function () use ($key, $chatContext, $envelope, $requestTimeout) {
                            return $this->kra->siteKnowledge($key, 'status', 'GET', array_merge(array('site' => $envelope['site']), $chatContext), null, $requestTimeout);
                        });
                        if (!$this->successful($status)) return array_merge($this->failure('status_failed', $status), $plan);
                    } else {
                        $productStatus = $this->sendWithRetry($started, $timeLimit, function () use ($key, $chatContext, $envelope, $requestTimeout) {
                            return $this->kra->siteKnowledge($key, 'products/status', 'GET', array_merge(array('site' => $envelope['site']), $chatContext), null, $requestTimeout);
                        });
                        if ($this->successful($productStatus)) {
                            $expected = $this->storedRecordCount(true, $productRootIds);
                            $productHashCount = $this->storedKindCount(true);
                            if ($this->remoteBehind($productStatus['body'] ?? array(), 'items', $expected) || (($productStatus['body']['items'] ?? null) === 0 && $productHashCount > 0)) {
                                $this->keepKindData(true, array());
                                $plan['resync'] = 'remote_behind';
                            }
                        }
                    }
                    $manualRequest['slice_cursor'] = ++$sliceCursor;
                    if ($sliceCursor < count($operations)) {
                        $pageDone = min($sliceCursor, count($pageBatches));
                        $productDone = max(0, min(count($productBatches), $sliceCursor - count($pageBatches)));
                        $progress = array('step' => $sliceCursor, 'total' => count($operations), 'pages_sent' => $pageDone,
                            'pages_total' => count($pageBatches), 'products_sent' => $productDone, 'products_total' => count($productBatches),
                            'pages_target' => count($pageIds), 'products_target' => count($productRootIds),
                            'pages_processed' => $manualRequest['pages_processed'], 'products_processed' => $manualRequest['products_processed']);
                        $state = $this->host->settingGet('sync_state', array());
                        $state = is_array($state) ? $state : array();
                        $state['manual_request'] = $manualRequest;
                        $state['running'] = false;
                        $this->host->settingPut('sync_state', $state);
                        return array_merge(array('ok' => false, 'slice_pending' => true, 'progress' => $progress), $plan);
                    }
                }
            } else {
                $this->saveOmissions($omittedPages, $omittedProducts);
                $this->dropBeforeSend(false, $changedPages['sent_ids'], $pageResend);
                $this->dropBeforeSend(true, $changedProducts['sent_ids'], $productResend);
                foreach ($pageBatches as $batch) {
                    $result = $this->sendWithRetry($started, $timeLimit, function () use ($key, $chatContext, $batch, $envelope) {
                        return $this->kra->siteKnowledge($key, 'documents', 'POST', array(), array_merge($envelope, $chatContext, array('docs' => $batch)));
                    });
                    if (!$this->successful($result) || $this->hasRejected($result['body'] ?? array())) return array_merge($this->failure('documents_failed', $result), $plan);
                }
                if ($pages) $this->markAccepted(false, $changedPages['hashes'], $changedPages['markers'], $changedPages['record_counts']);
                foreach ($productBatches as $batch) {
                    $result = $this->sendWithRetry($started, $timeLimit, function () use ($key, $chatContext, $batch, $envelope) {
                        return $this->kra->siteKnowledge($key, 'products', 'POST', array(), array_merge($envelope, $chatContext, array('products' => $batch)));
                    });
                    if (!$this->successful($result) || $this->hasRejected($result['body'] ?? array())) return array_merge($this->failure('products_failed', $result), $plan);
                }
                if ($products) $this->markAccepted(true, $changedProducts['hashes'], $changedProducts['markers'], $changedProducts['record_counts']);
            }
            // An empty export after earlier successful ones is far more often a broken page source (a theme or
            // rendering error) than a site that unpublished everything; reconciling with [] would wipe the chat's
            // knowledge. Keep the previous documents until the export is non-empty again.
            // The reconciliation booleans above were computed before either execution path to preserve the same
            // complete-export guard for ordinary scheduler runs and checkpointed admin polls.
            if ($reconcilePages && !$singleSlice) {
                $result = $this->sendWithRetry($started, $timeLimit, function () use ($key, $chatContext, $envelope, $pageIds) {
                    return $this->kra->siteKnowledge($key, 'documents/reconcile', 'POST', array(), array_merge($envelope, $chatContext, array('ids' => array_keys($pageIds))));
                });
                if (!$this->successful($result)) {
                    return array_merge($this->failure('reconcile_failed', $result), $plan);
                }
                $this->keepKindData(false, $pageIds);
                $omittedPages = array_intersect_key($omittedPages, $pageIds);
                if ($force || $pageWeekly) $this->rememberReconcile('doc_reconcile_at');
            }
            if ($reconcileProducts && !$singleSlice) {
                $result = $this->sendWithRetry($started, $timeLimit, function () use ($key, $chatContext, $envelope, $productIds) {
                    return $this->kra->siteKnowledge($key, 'products/reconcile', 'POST', array(), array_merge($envelope, $chatContext, array('ids' => array_values(array_unique($productIds)))));
                });
                if (!$this->successful($result)) {
                    return array_merge($this->failure('products_reconcile_failed', $result), $plan);
                }
                $this->keepKindData(true, $productRootIds);
                $omittedProducts = array_intersect_key($omittedProducts, $productRootIds);
                if ($force || $productWeekly) $this->rememberReconcile('product_reconcile_at');
            }
            if (!$singleSlice) $status = $this->sendWithRetry($started, $timeLimit, function () use ($key, $chatContext, $envelope) {
                return $this->kra->siteKnowledge($key, 'status', 'GET', array_merge(array('site' => $envelope['site']), $chatContext), null);
            });
            if (!$singleSlice && !$this->successful($status)) {
                return array_merge($this->failure('status_failed', $status), $plan);
            }
            if (!$singleSlice && $pages && !$incompletePages && !$skipPageReconcile) {
                $expected = $this->storedRecordCount(false, $pageIds);
                $pageHashCount = $this->storedKindCount(false);
                if ($this->remoteBehind($status['body'] ?? array(), 'docs', $expected) || (($status['body']['docs'] ?? null) === 0 && $pageHashCount > 0)) {
                    $this->keepKindData(false, array());
                    $plan['resync'] = 'remote_behind';
                }
            }
            if ($products && !$incompleteProducts && !$skipProductReconcile && !$singleSlice) {
                $productStatus = $this->sendWithRetry($started, $timeLimit, function () use ($key, $chatContext, $envelope) {
                    return $this->kra->siteKnowledge($key, 'products/status', 'GET', array_merge(array('site' => $envelope['site']), $chatContext), null);
                });
                $expected = $this->storedRecordCount(true, $productRootIds);
                $productHashCount = $this->storedKindCount(true);
                if ($this->successful($productStatus) && ($this->remoteBehind($productStatus['body'] ?? array(), 'items', $expected) || (($productStatus['body']['items'] ?? null) === 0 && $productHashCount > 0))) {
                    $this->keepKindData(true, array());
                    $plan['resync'] = 'remote_behind';
                }
            }
            $fingerprints = is_array($this->host->settingGet('sync_fingerprints', array())) ? $this->host->settingGet('sync_fingerprints', array()) : array();
            if ($pages && !$incompletePages && !$skipPageReconcile) $fingerprints['pages'] = $fingerprint;
            if ($products && !$incompleteProducts && !$skipProductReconcile) $fingerprints['products'] = $fingerprint;
            $this->host->settingPut('sync_fingerprints', $fingerprints);
            $this->saveOmissions($omittedPages, $omittedProducts);
            $this->host->settingForget('sync_backoff');
            $state = $this->host->settingGet('sync_state', array());
            $state = is_array($state) ? $state : array();
            $state = array_replace($state, array('last_run' => gmdate('c'), 'next_run' => null, 'running' => false, 'error' => null));
            if ($singleSlice && is_array($manualRequest)) {
                $state['manual_request'] = $manualRequest;
                $state['manual_request']['slice_signature'] = null;
                $state['manual_request']['slice_cursor'] = null;
                $state['manual_request']['slice_initialized'] = false;
            }
            if (isset($plan['export'])) {
                $state['warning'] = 'incomplete_export';
                $state['export'] = $plan['export'];
            } else {
                unset($state['warning'], $state['export']);
            }
            $this->host->settingPut('sync_state', $state);
            return array_merge(array('ok' => true), $plan);
        } catch (\LengthException $exception) {
            return array('ok' => false, 'error' => 'page_too_large');
        } finally {
            $this->host->lockRelease($lockName);
            $state = $this->host->settingGet('sync_state', array());
            if (is_array($state) && !empty($state['running'])) {
                $state['running'] = false;
                $this->host->settingPut('sync_state', $state);
            }
        }
    }

    private function collectPages(array &$walk): array
    {
        $docs = array();
        foreach ($this->host->pageDocuments() as $doc) {
            if (!is_array($doc)) continue;
            $public = $this->publicDocument($doc);
            if ($public === true) {
                $docs[] = $doc;
                if (count($docs) >= 2000) break;
            } elseif (is_string($public)) {
                $walk = $this->walkWithFailure($walk, 'pages', (string) ($doc['id'] ?? 'unknown'), $public);
            }
        }
        $walk = $this->mergeWalk($walk, $this->host->exportReport('pages'));
        $walk = $this->walkAtLimit($walk, count($docs) >= 2000, (string) (end($docs)['id'] ?? ''));
        return $docs;
    }

    private function collectProducts(int $cap, array &$walk): array
    {
        if ($cap < 1 || !$this->host->productsAvailable()) {
            $walk = $this->walkAtLimit($walk, true, '');
            return array();
        }
        $products = array();
        foreach ($this->host->productRows($cap) as $product) {
            if (is_array($product) && isset($product['id'], $product['title'])) {
                $products[] = $product;
                if (count($products) >= $cap) {
                    break;
                }
            }
        }
        $walk = $this->walkAtLimit($this->host->exportReport('products'), count($products) >= $cap, (string) (end($products)['id'] ?? ''));
        return $products;
    }

    private function emptyWalk(): array
    {
        return array('complete' => true, 'errors' => 0, 'failed' => array(), 'omitted' => array(), 'cursor' => null);
    }

    private function collectIndex(iterable $index, string $kind, int $limit): array
    {
        $rows = array();
        $observed = array();
        $atLimit = false;
        $cursor = '';
        $indexFailed = false;
        try {
            foreach ($index as $row) {
                if (!is_array($row) || !isset($row['id']) || (string) $row['id'] === '') continue;
                $id = (string) $row['id'];
                if (isset($observed[$id])) continue;
                $observed[$id] = true;
                if (array_key_exists('public', $row) && !$row['public']) continue;
                if (count($rows) >= $limit) {
                    $atLimit = true;
                    break;
                }
                $rows[$id] = array(
                    'id' => $id,
                    'marker' => isset($row['marker']) && is_scalar($row['marker']) ? (string) $row['marker'] : null,
                    'variation_ids' => isset($row['variation_ids']) && is_array($row['variation_ids']) ? array_values(array_map('strval', $row['variation_ids'])) : array(),
                    'url' => isset($row['url']) ? (string) $row['url'] : null,
                );
                $cursor = $id;
            }
        } catch (\Throwable $exception) {
            $indexFailed = true;
        }
        $walk = $this->host->exportReport($kind);
        if (!is_array($walk)) $walk = $this->emptyWalk();
        if ($indexFailed) $walk = $this->walkWithFailure($walk, $kind, 'index_failed');
        if ($atLimit || count($rows) >= $limit) {
            $walk = $this->walkAtLimit($walk, true, $cursor);
        }
        return array('rows' => $rows, 'walk' => $walk, 'observed' => count($observed));
    }

    private function buildPagesByIds(array $ids, array &$current, array &$markers, array &$walk, array &$omitted): array
    {
        if (!$ids) return array();
        $documents = array();
        $found = array();
        try {
            foreach ($this->host->pageDocumentsByIds($ids) as $doc) {
                if (!is_array($doc) || !isset($doc['id'])) continue;
                $id = (string) $doc['id'];
                if (!isset($current[$id])) continue;
                $found[$id] = true;
                $public = $this->publicDocument($doc);
                if ($public === false) {
                    unset($current[$id], $markers[$id]);
                    $omitted[$id] = true;
                    continue;
                }
                if (is_string($public)) {
                    $walk = $this->walkWithFailure($walk, 'pages', $id, $public);
                    continue;
                }
                $documents[] = $doc;
                unset($omitted[$id]);
            }
        } catch (\Throwable $exception) {
            $walk = $this->walkWithFailure($walk, 'pages', 'build_failed');
        }
        $report = $this->host->exportReport('pages');
        $omittedIds = array_fill_keys(array_map('strval', (array) ($report['omitted'] ?? array())), true);
        $reportedFailures = array();
        foreach ((array) ($report['failed'] ?? array()) as $failure) {
            if (is_array($failure) && isset($failure['id'])) $reportedFailures[(string) $failure['id']] = true;
        }
        foreach ($ids as $id) {
            if (isset($found[$id])) continue;
            if (isset($omittedIds[(string) $id])) {
                unset($current[$id], $markers[$id]);
                $omitted[$id] = true;
            } elseif (!isset($reportedFailures[(string) $id])) {
                $walk = $this->walkWithFailure($walk, 'pages', (string) $id);
            }
        }
        if (is_array($report) && empty($report['complete'])) $walk = $this->mergeWalk($walk, $report);
        return $documents;
    }

    private function buildProductsByIds(array $ids, array &$current, array &$markers, array &$walk, array &$omitted): array
    {
        if (!$ids) return array();
        $products = array();
        $found = array();
        try {
            foreach ($this->host->productDocumentsByIds($ids) as $product) {
                if (!is_array($product) || !isset($product['id'])) continue;
                $id = (string) $product['id'];
                if (!isset($current[$id])) continue;
                $found[$id] = true;
                $products[] = $product;
                unset($omitted[$id]);
            }
        } catch (\Throwable $exception) {
            $walk = $this->walkWithFailure($walk, 'products', 'build_failed');
        }
        $report = $this->host->exportReport('products');
        $omittedIds = array_fill_keys(array_map('strval', (array) ($report['omitted'] ?? array())), true);
        $reportedFailures = array();
        foreach ((array) ($report['failed'] ?? array()) as $failure) {
            if (is_array($failure) && isset($failure['id'])) $reportedFailures[(string) $failure['id']] = true;
        }
        foreach ($ids as $id) {
            if (isset($found[$id])) continue;
            if (isset($omittedIds[(string) $id])) {
                unset($current[$id], $markers[$id]);
                $omitted[$id] = true;
            } elseif (!isset($reportedFailures[(string) $id])) {
                $walk = $this->walkWithFailure($walk, 'products', (string) $id);
            }
        }
        if (is_array($report) && empty($report['complete'])) $walk = $this->mergeWalk($walk, $report);
        return $products;
    }

    private function walkWithFailure(array $walk, string $kind, string $id, string $reason = 'build_failed'): array
    {
        $walk['complete'] = false;
        $walk['errors'] = (int) ($walk['errors'] ?? 0) + 1;
        if (count((array) ($walk['failed'] ?? array())) < 20) $walk['failed'][] = array('id' => $id, 'reason' => $reason);
        return $walk;
    }

    private function mergeWalk(array $walk, array $report): array
    {
        $walk['complete'] = !empty($walk['complete']) && !empty($report['complete']);
        $walk['errors'] = max((int) ($walk['errors'] ?? 0), (int) ($report['errors'] ?? 0));
        $walk['failed'] = array_slice(array_merge((array) ($walk['failed'] ?? array()), (array) ($report['failed'] ?? array())), 0, 20);
        $walk['omitted'] = array_values(array_unique(array_merge((array) ($walk['omitted'] ?? array()), (array) ($report['omitted'] ?? array()))));
        $walk['cursor'] = $walk['cursor'] ?? ($report['cursor'] ?? null);
        return $walk;
    }

    /** A walk that filled its limit may have left documents behind, so it counts as incomplete. */
    private function walkAtLimit(array $walk, bool $atLimit, string $cursor): array
    {
        if ($atLimit) {
            $walk['complete'] = false;
            $walk['cursor'] = $walk['cursor'] ?? $cursor;
        }
        return $walk;
    }

    private function publicDocument(array $doc)
    {
        if (!isset($doc['url']) || !is_string($doc['url'])) {
            return 'invalid_document_url';
        }
        $url = parse_url($doc['url']);
        $home = parse_url($this->host->siteHome());
        if (!is_array($url) || !is_array($home) || !isset($url['host']) ||
            !in_array(strtolower((string) ($url['scheme'] ?? '')), array('http', 'https'), true) || isset($url['user']) || isset($url['pass'])) {
            return 'invalid_document_url';
        }
        if (strtolower((string) $url['host']) !== strtolower((string) ($home['host'] ?? $this->host->siteHost()))) {
            return 'site_host_mismatch';
        }
        $path = strtolower(rawurldecode((string) ($url['path'] ?? '/')));
        return preg_match('#(?:^|/)(?:admin|administrator|login|user/login|account|my-account|cart|checkout|basket|order|wp-admin)(?:/|$)#', $path) !== 1 ? true : false;
    }

    private function changedPages(array $docs, bool $force, array $markers = array()): array
    {
        $payload = array();
        $hashes = array();
        $acceptedMarkers = array();
        $recordCounts = array();
        $sentIds = array();
        $stored = $this->storedHashes();
        foreach ($docs as $doc) {
            $id = (string) ($doc['id'] ?? '');
            if ($id === '') {
                continue;
            }
            $hash = $this->batcher->docHash($doc);
            $hashes[$id] = $hash;
            $acceptedMarkers[$id] = $markers[$id] ?? null;
            $parts = $this->batcher->parts($doc);
            $recordCounts[$id] = count($parts);
            if ($force || !isset($stored[$id]) || !hash_equals((string) $stored[$id], $hash)) {
                $sentIds[$id] = true;
                foreach ($parts as $part) {
                    $payload[] = $part;
                }
            }
        }
        return array('payload' => $payload, 'hashes' => $hashes, 'markers' => $acceptedMarkers, 'record_counts' => $recordCounts, 'sent_ids' => array_keys($sentIds));
    }

    private function changedProducts(array $products, bool $force, array $markers = array()): array
    {
        $payload = array();
        $hashes = array();
        $acceptedMarkers = array();
        $recordCounts = array();
        $sentIds = array();
        $stored = $this->storedHashes();
        foreach ($products as $product) {
            $id = (string) ($product['id'] ?? '');
            if ($id === '') {
                continue;
            }
            $key = 'product:'.$id;
            $hash = $this->batcher->productHash($product);
            $hashes[$key] = $hash;
            $acceptedMarkers[$key] = $markers[$id] ?? null;
            $variationIds = isset($product['variation_ids']) && is_array($product['variation_ids']) ? $product['variation_ids'] : array_column((array) ($product['variations'] ?? array()), 'id');
            $recordCounts[$key] = 1 + count(array_unique(array_map('strval', $variationIds)));
            if ($force || !isset($stored[$key]) || !hash_equals((string) $stored[$key], $hash)) {
                $payload[] = $product;
                $sentIds[$key] = true;
            }
        }
        return array('payload' => $payload, 'hashes' => $hashes, 'markers' => $acceptedMarkers, 'record_counts' => $recordCounts, 'sent_ids' => array_keys($sentIds));
    }

    private function sendWithRetry(float $started, int $limit, callable $call): array
    {
        try {
            $result = $call();
        } catch (\Throwable $exception) {
            $result = array('status' => 0, 'body' => array('error' => 'connection_error'), 'retry_after' => 0);
        }
        if ((int) ($result['status'] ?? 0) === 429) {
            // failure() persists Retry-After; the adapter scheduler will enqueue a new attempt later.
            return $result;
        }
        return $result;
    }

    private function failure(string $error, array $result): array
    {
        $status = (int) ($result['status'] ?? 0);
        $bodyCode = $result['body']['code'] ?? null;
        $clientError = is_string($bodyCode) && preg_match('/^[a-z0-9_]+$/i', $bodyCode) ? $bodyCode : null;
        if ($status === 429) {
            $delay = max(30, (int) ($result['retry_after'] ?? ($result['body']['retry_after'] ?? 30)));
            $this->rememberBackoff($delay, 'rate_limited');
            return array('ok' => false, 'error' => 'rate_limited', 'status' => $status, 'next_attempt_at' => gmdate('c', time() + $delay));
        }
        if ($status === 401) {
            $reported = $clientError ?: 'reconnect';
            $this->storeSyncError($reported, null);
            return array('ok' => false, 'error' => $reported, 'status' => 401);
        }
        if ($status === 0 || $status >= 500) {
            $state = $this->host->settingGet('sync_backoff', array());
            $attempt = min(10, (int) (is_array($state) ? ($state['attempt'] ?? 0) : 0) + 1);
            $delay = min(1800, 30 * (2 ** ($attempt - 1)));
            $this->rememberBackoff($delay, 'server_or_connection_error', $attempt);
            return array('ok' => false, 'error' => $error, 'status' => $status, 'next_attempt_at' => gmdate('c', time() + $delay));
        }
        $reported = in_array($status, array(403, 422), true) && $clientError ? $clientError : $error;
        $this->storeSyncError($reported, null);
        return array('ok' => false, 'error' => $reported, 'status' => $status);
    }

    private function rememberBackoff(int $seconds, string $error, int $attempt = 0): void
    {
        $next = gmdate('c', time() + max(1, $seconds));
        $this->host->settingPut('sync_backoff', array('attempt' => $attempt, 'next_attempt_at' => $next, 'error' => $error));
        $this->storeSyncError($error, $next);
    }

    private function storeSyncError(string $error, ?string $next): void
    {
        $this->host->settingPut('sync_state', array('last_run' => gmdate('c'), 'next_run' => $next, 'running' => false, 'error' => $error));
    }

    private function successful(array $result): bool
    {
        return (int) ($result['status'] ?? 0) >= 200 && (int) ($result['status'] ?? 0) < 300;
    }

    private function hasRejected($body): bool
    {
        if (!is_array($body)) {
            return false;
        }
        foreach ((array) ($body['results'] ?? array()) as $result) {
            if (is_array($result) && ($result['status'] ?? '') === 'rejected') {
                return true;
            }
        }
        return false;
    }

    private function storedHashes(): array
    {
        $hashes = $this->host->settingGet('sync_hashes', array());
        return is_array($hashes) ? $hashes : array();
    }

    private function storedMarkers(): array
    {
        $markers = $this->host->settingGet('sync_markers', array());
        return is_array($markers) ? $markers : array();
    }

    private function storedOmissions(): array
    {
        $omitted = $this->host->settingGet('sync_omitted', array());
        $omitted = is_array($omitted) ? $omitted : array();
        return array(
            'pages' => array_fill_keys(array_map('strval', (array) ($omitted['pages'] ?? array())), true),
            'products' => array_fill_keys(array_map('strval', (array) ($omitted['products'] ?? array())), true),
        );
    }

    private function saveOmissions(array $pages, array $products): void
    {
        $this->host->settingPut('sync_omitted', array(
            'pages' => array_values(array_map('strval', array_keys($pages))),
            'products' => array_values(array_map('strval', array_keys($products))),
        ));
    }

    private function hadSentIds(bool $products): bool
    {
        $hashes = $this->host->settingGet('sync_hashes', array());
        if (!is_array($hashes)) {
            return false;
        }
        foreach (array_keys($hashes) as $id) {
            if ((strpos((string) $id, 'product:') === 0) === $products) {
                return true;
            }
        }
        return false;
    }

    private function dropBeforeSend(bool $products, array $ids, bool $dropHash): void
    {
        if (!$ids) return;
        $hashes = $this->storedHashes();
        $markers = $this->storedMarkers();
        $counts = $this->storedRecordCounts();
        foreach ($ids as $id) {
            $key = $products ? (string) $id : (string) $id;
            unset($markers[$key]);
            if ($dropHash) {
                unset($hashes[$key], $counts[$key]);
            }
        }
        $this->host->settingPut('sync_markers', $markers);
        if ($dropHash) {
            $this->host->settingPut('sync_hashes', $hashes);
            $this->host->settingPut('sync_record_counts', $counts);
        }
    }

    private function markAccepted(bool $products, array $hashes, array $markers, array $counts): void
    {
        $storedHashes = $this->storedHashes();
        $storedMarkers = $this->storedMarkers();
        $storedCounts = $this->storedRecordCounts();
        foreach ($hashes as $id => $hash) {
            $storedHashes[$id] = $hash;
            $storedCounts[$id] = (int) ($counts[$id] ?? 1);
            if (isset($markers[$id]) && $markers[$id] !== null) {
                $storedMarkers[$id] = (string) $markers[$id];
            } else {
                unset($storedMarkers[$id]);
            }
        }
        $this->host->settingPut('sync_hashes', $storedHashes);
        $this->host->settingPut('sync_markers', $storedMarkers);
        $this->host->settingPut('sync_record_counts', $storedCounts);
    }

    private function keepKindData(bool $products, array $keep): void
    {
        $hashes = $this->storedHashes();
        $markers = $this->storedMarkers();
        $counts = $this->storedRecordCounts();
        foreach (array($hashes, $markers, $counts) as $index => $unused) {
            $map = $index === 0 ? $hashes : ($index === 1 ? $markers : $counts);
            foreach (array_keys($map) as $id) {
                $isProduct = strpos((string) $id, 'product:') === 0;
                if ($isProduct !== $products) continue;
                $root = $isProduct ? substr((string) $id, 8) : (string) $id;
                if (!isset($keep[$root])) unset($map[$id]);
            }
            if ($index === 0) $hashes = $map;
            elseif ($index === 1) $markers = $map;
            else $counts = $map;
        }
        $this->host->settingPut('sync_hashes', $hashes);
        $this->host->settingPut('sync_markers', $markers);
        $this->host->settingPut('sync_record_counts', $counts);
    }

    private function storedIdsDiffer(bool $products, array $current): bool
    {
        $stored = array();
        foreach (array_keys($this->storedHashes()) as $id) {
            $isProduct = strpos((string) $id, 'product:') === 0;
            if ($isProduct !== $products) continue;
            $root = $isProduct ? substr((string) $id, 8) : (string) $id;
            $stored[$root] = true;
        }
        if (count($stored) !== count($current)) return true;
        foreach ($current as $id => $present) if (!isset($stored[(string) $id])) return true;
        return false;
    }

    private function storedRecordCounts(): array
    {
        $counts = $this->host->settingGet('sync_record_counts', array());
        return is_array($counts) ? $counts : array();
    }

    private function storedKindCount(bool $products): int
    {
        $count = 0;
        foreach (array_keys($this->storedHashes()) as $id) {
            if ((strpos((string) $id, 'product:') === 0) === $products) $count++;
        }
        return $count;
    }

    private function storedRecordCount(bool $products, array $current): int
    {
        $hashes = $this->storedHashes();
        $counts = $this->storedRecordCounts();
        $expected = 0;
        foreach ($current as $id => $present) {
            $key = $products ? 'product:'.(string) $id : (string) $id;
            if (isset($hashes[$key])) $expected += max(1, (int) ($counts[$key] ?? 1));
        }
        return $expected;
    }

    private function exportFingerprint(array $options): string
    {
        $value = array('pages' => $options['pages'] ?? array(), 'products' => $options['products'] ?? array());
        $this->sortFingerprint($value);
        $json = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        return hash('sha256', is_string($json) ? $json : '{}');
    }

    private function sortFingerprint(array &$value): void
    {
        foreach ($value as &$item) if (is_array($item)) $this->sortFingerprint($item);
        unset($item);
        if (array_keys($value) !== range(0, count($value) - 1)) ksort($value);
    }

    private function reconcileDue(array $schedule, string $key): bool
    {
        if (empty($schedule[$key])) return true;
        $last = strtotime((string) $schedule[$key]);
        return $last === false || $last <= time() - 7 * 86400;
    }

    private function rememberReconcile(string $key): void
    {
        $schedule = $this->host->settingGet('sync_reconcile_at', array());
        $schedule = is_array($schedule) ? $schedule : array();
        $schedule[$key] = gmdate('c');
        $this->host->settingPut('sync_reconcile_at', $schedule);
    }

    private function productPayloadIdsFromIds(array $ids): array
    {
        return array_map(function ($id) { return 'product:'.(string) $id; }, $ids);
    }

    /**
     * Everything exported has been accepted by now, so fewer records on the server mean the local hashes describe
     * documents it lost (a removal by an older version, another chat linked). The next run sends them all again.
     */
    private function remoteBehind($body, string $field, int $expected): bool
    {
        return is_array($body) && isset($body[$field]) && is_numeric($body[$field]) && (int) $body[$field] < $expected;
    }

    private function productCap(): int
    {
        $cap = 500;
        $status = $this->host->settingGet('products_status', array());
        if (is_array($status) && isset($status['limits']['max_products']) && is_numeric($status['limits']['max_products'])) {
            $cap = min($cap, max(0, (int) $status['limits']['max_products']));
        }
        return $cap;
    }

    private function productIds(array $products): array
    {
        $ids = array();
        foreach ($products as $product) {
            $id = (string) ($product['id'] ?? '');
            if ($id === '') {
                continue;
            }
            $ids[] = $id;
            $variationIds = $product['variation_ids'] ?? array_column((array) ($product['variations'] ?? array()), 'id');
            foreach ((array) $variationIds as $variation) {
                if ((string) $variation !== '') {
                    $ids[] = $id.'#'.(string) $variation;
                }
            }
        }
        return array_values(array_unique($ids));
    }

    private function productPayloadIds(array $products): array
    {
        $ids = array();
        foreach ($products as $product) {
            if (isset($product['id'])) {
                $ids[] = 'product:'.(string) $product['id'];
            }
        }
        return array_values(array_unique($ids));
    }

    private function remaining(float $started, int $limit): int
    {
        return max(0, $limit - (int) (microtime(true) - $started));
    }
}
