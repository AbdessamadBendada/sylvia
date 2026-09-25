(function () {
  'use strict';

  if (!document.documentElement.classList.contains('dfd-preloading')) return;

  var overlay = document.getElementById('dfd-preloader');
  var image = overlay && overlay.querySelector('img');
  var finished = false;
  var timers = [];

  function finish() {
    if (finished) return;
    finished = true;
    timers.forEach(window.clearTimeout);
    overlay.classList.add('is-done');
    document.documentElement.classList.remove('dfd-preloading');
    document.dispatchEvent(new CustomEvent('dfd:preloader-finished'));
    window.setTimeout(function () { overlay.remove(); }, 520);
  }

  function start() {
    overlay.classList.add('is-playing');
    timers.push(window.setTimeout(finish, 3180));
  }

  timers.push(window.setTimeout(finish, 5000));
  image.addEventListener('error', finish, { once: true });
  if (image.complete) start();
  else image.addEventListener('load', start, { once: true });
}());
