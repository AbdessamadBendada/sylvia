(function () {
  "use strict";

  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var shouldRun = false;

  try {
    shouldRun = !reduced && window.sessionStorage.getItem("df-preloaded") !== "1";
    if (shouldRun) {
      window.sessionStorage.setItem("df-preloaded", "1");
      root.classList.add("df-preloading");
    }
  } catch (error) {
    shouldRun = false;
  }

  if (!shouldRun) {
    return;
  }

  function setup() {
    var overlay = document.querySelector(".df-preloader");
    var image = overlay && overlay.querySelector("img");

    if (!overlay || !image) {
      root.classList.remove("df-preloading");
      return;
    }

    var finished = false;
    var timeout;

    function finish() {
      if (finished) {
        return;
      }
      finished = true;
      window.clearTimeout(timeout);
      overlay.classList.add("is-done");
      document.body.classList.remove("df-ready");
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          document.body.classList.add("df-ready");
        });
      });
      window.setTimeout(function () {
        root.classList.remove("df-preloading");
        overlay.remove();
      }, 520);
    }

    function start() {
      overlay.classList.add("is-playing");
      window.setTimeout(finish, 3180);
    }

    timeout = window.setTimeout(finish, 5000);
    image.addEventListener("error", finish, { once: true });

    if (image.complete) {
      start();
    } else {
      image.addEventListener("load", start, { once: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }
})();
