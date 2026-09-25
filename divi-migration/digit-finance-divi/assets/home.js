(function () {
  'use strict';

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character];
    });
  }

  function wordsFor(element, className) {
    if (!element || element.dataset.dfdWordsReady) return;
    var sentence = element.textContent.trim().replace(/\s+/g, ' ');
    element.setAttribute('aria-label', sentence);
    element.innerHTML = sentence.split(' ').map(function (word) {
      return '<span class="' + className + '" aria-hidden="true">' + escapeHtml(word) + '&nbsp;</span>';
    }).join('');
    element.dataset.dfdWordsReady = 'true';
  }

  function animateCount(element) {
    if (!element || element.dataset.done === 'true' || reducedMotion) return;
    element.dataset.done = 'true';
    var target = Number(element.dataset.count || 0);
    var prefix = element.dataset.prefix || '';
    var suffix = element.dataset.suffix || '';
    var start = performance.now();
    function frame(now) {
      var progress = Math.min((now - start) / 1100, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = prefix + Math.round(target * eased) + suffix;
      if (progress < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  function initStatement(statement) {
    var section = statement.closest('.statement');
    if (!section) return;
    var metrics = section.querySelector('.metrics');
    var words = Array.prototype.slice.call(statement.querySelectorAll('.scroll-word'));
    function update() {
      var rect = section.getBoundingClientRect();
      var range = Math.max(section.offsetHeight - window.innerHeight, 1);
      var progress = Math.min(Math.max(-rect.top / range, 0), 1);
      var wordProgress = Math.min(progress / .74, 1);
      words.forEach(function (word, index) {
        var position = words.length > 1 ? index / (words.length - 1) : 0;
        var start = position * .72;
        var reveal = Math.min(Math.max((wordProgress - start) / .28, 0), 1);
        word.style.setProperty('--word-opacity', (0.14 + reveal * .86).toFixed(3));
        word.style.setProperty('--word-y', ((1 - reveal) * .15).toFixed(3) + 'em');
        word.style.setProperty('--word-scale', (0.986 + reveal * .014).toFixed(3));
      });
      if (metrics) {
        var metricReveal = Math.min(Math.max((progress - .82) / .18, 0), 1);
        metrics.style.setProperty('--metrics-opacity', metricReveal.toFixed(3));
        metrics.style.setProperty('--metrics-y', ((1 - metricReveal) * 18).toFixed(1) + 'px');
        if (progress >= .82) metrics.querySelectorAll('[data-count]').forEach(animateCount);
      }
    }
    if (reducedMotion) {
      words.forEach(function (word) { word.style.setProperty('--word-opacity', '1'); word.style.setProperty('--word-y', '0em'); word.style.setProperty('--word-scale', '1'); });
      if (metrics) { metrics.style.setProperty('--metrics-opacity', '1'); metrics.style.setProperty('--metrics-y', '0px'); metrics.querySelectorAll('[data-count]').forEach(function (el) { el.dataset.done = 'true'; }); }
      return;
    }
    var ticking = false;
    function requestUpdate() { if (!ticking) { ticking = true; window.requestAnimationFrame(function () { update(); ticking = false; }); } }
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
  }

  function init() {
    if (document.documentElement.dataset.dfdMotionReady === 'true') return;
    document.documentElement.dataset.dfdMotionReady = 'true';
    function startHero() {
      document.body.classList.add('ready');
    }
    if (document.documentElement.classList.contains('dfd-preloading')) {
      document.addEventListener('dfd:preloader-finished', startHero, { once: true });
    } else {
      window.requestAnimationFrame(startHero);
    }
    document.querySelectorAll('[data-word-reveal]').forEach(function (element) { wordsFor(element, 'reveal-word'); });
    document.querySelectorAll('[data-scroll-reveal]').forEach(function (element) { wordsFor(element, 'scroll-word'); initStatement(element); });
    if (!window.IntersectionObserver) {
      document.querySelectorAll('[data-reveal], [data-word-reveal], [data-observe]').forEach(function (element) { element.classList.add('is-visible'); });
      return;
    }
    var observer = new window.IntersectionObserver(function (entries, io) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('[data-count]').forEach(animateCount);
        io.unobserve(entry.target);
      });
    }, { threshold: .18 });
    document.querySelectorAll('[data-reveal], [data-word-reveal], [data-observe]').forEach(function (element) { observer.observe(element); });
    if (reducedMotion) document.querySelectorAll('[data-reveal], [data-word-reveal], [data-observe]').forEach(function (element) { element.classList.add('is-visible'); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
