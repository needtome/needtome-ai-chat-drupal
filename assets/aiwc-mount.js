/* Mounts the bundled AI Worker admin UI without inline code. */
(function () {
  'use strict';

  function mountConfiguredElements() {
    var elements = document.querySelectorAll('[data-aiwc-config]');
    var admin = window.AIWorkerChatAdmin;
    if (!admin || typeof admin.mount !== 'function') return;
    Array.prototype.forEach.call(elements, function (element) {
      try {
        var config = JSON.parse(element.getAttribute('data-aiwc-config') || '{}');
        if (config && typeof config === 'object' && !Array.isArray(config)) admin.mount(element, config);
      } catch (error) {
        // Invalid host markup is ignored; the adapter owns the configuration.
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountConfiguredElements, { once: true });
  } else {
    mountConfiguredElements();
  }
}());
