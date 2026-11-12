(function(){'use strict';
function bootLoader(win) {
  const doc = win.document;
  const tag = doc.currentScript && doc.currentScript.hasAttribute('data-aiworker-chat-options')
    ? doc.currentScript
    : doc.querySelector('script[data-aiworker-chat-options]');
  let config = {};
  try {
    config = tag ? JSON.parse(tag.getAttribute('data-aiworker-chat-options')) : (win.AIWorkerChatOptions || {});
  } catch (_) {}
  if (!config || typeof config !== 'object' || Array.isArray(config)) config = {};

  // Keep the integration's existing HTTPS-only base rule and base-path Trusted Types boundary.
  let base = 'https://kra.name/app';
  try {
    const parsed = new URL(String(config.base || ''));
    if (parsed.protocol === 'https:' && !parsed.username && !parsed.password) base = parsed.href.replace(/\/$/, '');
  } catch (_) {}
  const version = config.widget_version || Math.floor(Date.now() / 86400000);
  const list = Array.isArray(config.chats) ? config.chats : [config];
  const seen = new Set();
  const states = [];
  let replaying = false;
  let policy;
  let policyTried = false;
  let policyFailed = false;
  let winner = null;

  list.forEach((options) => {
    if (!options || typeof options !== 'object' || !/^wk_[A-Za-z0-9]{24}$/.test(String(options.key || '')) || seen.has(options.key)) return;
    seen.add(options.key);
    const state = { options, key: options.key, order: parseInt(options.stack_order, 10) || 0, started: false, ready: false, waiting: [] };
    states.push(state);
    if (options.greet_popup === true || options.greet_popup === 1 || options.greet_popup === '1') {
      if (!winner || state.order < winner.order) winner = state;
    }
  });

  function versionFor(options) {
    const value = String(config.widget_version || options.widget_version || version);
    return /^[A-Za-z0-9._-]{1,40}$/.test(value) ? value : String(Math.floor(Date.now() / 86400000));
  }

  function start(state, done) {
    if (state.ready) { if (done) done(); return; }
    if (done) state.waiting.push(done);
    if (state.started) return;
    state.started = true;
    const options = state.options;
    const script = doc.createElement('script');
    script.async = true;
    const url = base + '/widget.js?v=' + encodeURIComponent(versionFor(options));
    try {
      if (policyFailed) throw new TypeError('policy unavailable');
      if (!policyTried) {
        policyTried = true;
        policy = win.trustedTypes && win.trustedTypes.createPolicy
          ? win.trustedTypes.createPolicy('aiworker-chat-loader', {
            createScriptURL(value) {
              const candidate = new URL(String(value), base);
              const allowed = new URL(base + '/');
              if (candidate.protocol !== 'https:' || candidate.origin !== allowed.origin || !candidate.pathname.startsWith(allowed.pathname) || candidate.username || candidate.password) {
                throw new TypeError('Unexpected AI Worker script URL');
              }
              return candidate.href;
            }
          })
          : null;
      }
      script.src = policy ? policy.createScriptURL(url) : url;
    } catch (_) {
      policyFailed = true;
      state.started = false;
      return;
    }

    const nonce = (tag && (tag.nonce || tag.getAttribute('nonce'))) || '';
    if (nonce) script.setAttribute('nonce', nonce);
    script.setAttribute('data-key', state.key);
    script.setAttribute('data-lang', String(options.lang || config.lang || 'auto'));
    script.setAttribute('data-theme', String(options.theme || 'classic'));
    script.setAttribute('data-color', /^#[0-9a-fA-F]{6}$/.test(options.color || '') ? options.color : '#4f46e5');
    if (/^(light|dim|dark|auto)$/.test(options.scheme || '')) script.setAttribute('data-scheme', options.scheme);
    if (/^(left|right)$/.test(options.position || '')) script.setAttribute('data-position', options.position);
    if (options.theme === 'inline') {
      if (/^[.]?[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(options.mount || '')) script.setAttribute('data-mount', options.mount);
      if (/^\d{2,4}$/.test(String(options.height || ''))) script.setAttribute('data-height', String(options.height));
    }
    const colors = [];
    if (options.colors && typeof options.colors === 'object') {
      Object.keys(options.colors).forEach((name) => {
        const value = String(options.colors[name] || '');
        const accentTextMode = name === 'accent_text' && ['auto', 'light', 'dark'].includes(value);
        if (/^[a-z_]+$/.test(name) && (accentTextMode || /^#[0-9a-fA-F]{6}$/.test(value))) colors.push(name + ':' + value);
      });
    }
    if (colors.length) script.setAttribute('data-colors', colors.join(';'));
    const offsetX = options.offset_x ?? options.siteOffsetX;
    const offsetY = options.offset_y ?? options.siteOffsetY;
    if (/^-?\d{1,3}$/.test(String(offsetX ?? ''))) script.setAttribute('data-site-offset-x', String(offsetX));
    if (/^-?\d{1,3}$/.test(String(offsetY ?? ''))) script.setAttribute('data-site-offset-y', String(offsetY));
    script.setAttribute('data-voice', options.voice ? '1' : '0');
    script.setAttribute('data-rating', options.rating === false || options.rating === 0 || options.rating === '0' ? '0' : '1');
    const privacy = safeHttp(options.privacy_url || options.privacyUrl);
    if (privacy) script.setAttribute('data-privacy-url', privacy);
    script.setAttribute('data-stack-order', String(state.order));
    if (options.stack === false || options.stack === 0 || options.stack === '0') script.setAttribute('data-stack', '0');
    if (winner) script.setAttribute('data-greet', state === winner ? '1' : '0');
    else if (options.greet_popup === false || options.greet_popup === 0 || options.greet_popup === '0') script.setAttribute('data-greet', '0');
    script.onload = () => {
      state.ready = true;
      const waiting = state.waiting;
      state.waiting = [];
      waiting.forEach((callback) => callback());
    };
    script.onerror = () => {
      state.started = false;
      if (script.parentNode) script.parentNode.removeChild(script);
    };
    (doc.body || doc.documentElement).appendChild(script);
  }

  function triggerKey(target) {
    while (target && target !== doc) {
      if (target.getAttribute) {
        const key = target.getAttribute('data-aiworker-chat');
        if (key) return key;
      }
      target = target.parentNode;
    }
    return '';
  }

  function open(key, original) {
    const selected = states.filter((state) => !key || state.key === key);
    if (!selected.length || selected.every((state) => state.ready)) return;
    if (original && original.stopImmediatePropagation) original.stopImmediatePropagation();
    let left = selected.length;
    selected.forEach((state) => start(state, () => {
      left -= 1;
      if (left) return;
      replaying = true;
      try { win.dispatchEvent(new win.CustomEvent('aiworker:open', key ? { detail: { key } } : {})); }
      finally { replaying = false; }
    }));
  }

  win.addEventListener('aiworker:open', (event) => {
    if (!replaying) open(event.detail && event.detail.key ? String(event.detail.key) : '', event);
  });
  win.addEventListener('click', (event) => {
    const key = triggerKey(event.target);
    if (key) open(key);
  }, true);

  const events = ['scroll', 'click', 'mousemove', 'touchstart', 'keydown'];
  function interaction(event) {
    if (triggerKey(event.target)) return;
    states.forEach((state) => { if (state.options.load === 'interaction') start(state); });
    events.forEach((name) => win.removeEventListener(name, interaction, true));
  }
  if (states.some((state) => state.options.load === 'interaction')) {
    events.forEach((name) => win.addEventListener(name, interaction, { capture: true, passive: true }));
  }
  states.forEach((state) => {
    const options = state.options;
    if (options.load === 'delay') win.setTimeout(() => start(state), Math.max(1, Math.min(120, parseInt(options.delay, 10) || 5)) * 1000);
    else if (options.load !== 'interaction') start(state);
  });
  return { start: (key) => { const state = states.find((item) => !key || item.key === key); if (state) start(state); }, base, version };
}

function safeHttp(value) {
  try {
    const url = new URL(String(value || ''));
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : '';
  } catch (_) { return ''; }
}

if(typeof window!=='undefined'&&window.document)bootLoader(window);
})();
