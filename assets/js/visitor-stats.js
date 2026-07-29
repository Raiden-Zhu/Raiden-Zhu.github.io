;(function() {
  'use strict';

  var siteCodePattern = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
  var formattedCountPattern = /^(?:0|[1-9]\d{0,2}(?:,\d{3})*)$/;

  function isValidDate(value) {
    var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) return false;

    var date = new Date(value + 'T00:00:00Z');
    return date.getUTCFullYear() === Number(match[1]) &&
      date.getUTCMonth() + 1 === Number(match[2]) &&
      date.getUTCDate() === Number(match[3]);
  }

  function normalizeCount(value) {
    if (typeof value === 'number') {
      return Number.isSafeInteger(value) && value >= 0 ? value.toLocaleString('en-US') : null;
    }

    if (typeof value !== 'string') return null;

    var count = value.trim();
    return count.length <= 31 && formattedCountPattern.test(count) ? count : null;
  }

  function requestCount(endpoint, options, retries) {
    return window.fetch(endpoint.toString(), options)
      .then(function(response) {
        if (!response.ok) throw new Error('Visitor count request failed');
        return response.json();
      })
      .catch(function(error) {
        if (retries <= 0 || (options.signal && options.signal.aborted)) throw error;
        return new Promise(function(resolve) {
          window.setTimeout(resolve, 350);
        }).then(function() {
          return requestCount(endpoint, options, retries - 1);
        });
      });
  }

  function renderStats(stats) {
    var countNode = stats.querySelector('[data-visitor-count]');
    var siteCode = stats.getAttribute('data-site-code') || '';
    var collectionStart = stats.getAttribute('data-collection-start') || '';

    if (!countNode || !siteCodePattern.test(siteCode) || !isValidDate(collectionStart)) return;
    if (!window.fetch || !window.URL) return;

    var controller = window.AbortController ? new window.AbortController() : null;
    var timeout = controller ? window.setTimeout(function() { controller.abort(); }, 6000) : null;
    var endpoint = new window.URL(
      'https://' + siteCode + '.goatcounter.com/counter/' + encodeURIComponent('/') + '.json'
    );
    endpoint.searchParams.set('start', collectionStart);
    endpoint.searchParams.set('end', '9999-12-31');

    countNode.setAttribute('aria-busy', 'true');
    countNode.textContent = 'Loading count...';

    var requestOptions = {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      referrerPolicy: 'no-referrer'
    };
    if (controller) requestOptions.signal = controller.signal;

    requestCount(endpoint, requestOptions, 1)
      .then(function(data) {
        var count = normalizeCount(data && data.count);
        if (count === null) throw new Error('Visitor count response was invalid');
        countNode.textContent = count;
      })
      .catch(function() {
        countNode.textContent = 'Visit statistics';
      })
      .then(function() {
        if (timeout !== null) window.clearTimeout(timeout);
        countNode.removeAttribute('aria-busy');
      });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-visitor-stats]'), renderStats);
})();
