/**
 * Digit Finance — motion engine.
 *
 * Every animation wrapper (.df-line, .df-word, .df-reveal-word) is injected
 * here at runtime rather than stored in the block markup. That is deliberate:
 * it means an editor can retype any heading in wp-admin without ever breaking
 * an animation, because there is no fragile nested markup to preserve.
 *
 * Everything below is null-guarded so a page that omits a section still runs.
 */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------------
   * Utilities
   * -------------------------------------------------------------------- */

  /**
   * Split an element's text into per-word spans, preserving inline markup
   * one level deep (the <em> in the hero title, the <strong> in the quote).
   */
  function splitWords(el, className) {
    if (!el || el.dataset.dfSplit === "done") {
      return [];
    }

    var words = [];

    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var parts = node.textContent.split(/(\s+)/);
        var frag = document.createDocumentFragment();

        parts.forEach(function (part) {
          if (!part) {
            return;
          }
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          var span = document.createElement("span");
          span.className = className;
          span.textContent = part;
          frag.appendChild(span);
          words.push(span);
        });

        el.replaceChild(frag, node);
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        node.classList.add(className);
        words.push(node);
      }
    });

    el.dataset.dfSplit = "done";
    return words;
  }

  /* ----------------------------------------------------------------------
   * Hero title — masked line reveal
   * -------------------------------------------------------------------- */

  function initHeroTitle() {
    var title = document.querySelector(".df-hero-title");
    if (!title || title.dataset.dfWrapped === "done") {
      return;
    }

    var line = document.createElement("span");
    line.className = "df-line";

    var word = document.createElement("span");
    word.className = "df-word";

    while (title.firstChild) {
      word.appendChild(title.firstChild);
    }

    line.appendChild(word);
    title.appendChild(line);
    title.dataset.dfWrapped = "done";
  }

  /* ----------------------------------------------------------------------
   * Word-by-word reveals
   * -------------------------------------------------------------------- */

  function initWordReveals() {
    document.querySelectorAll("[data-word-reveal]").forEach(function (el) {
      var words = splitWords(el, "df-reveal-word");

      words.forEach(function (wordEl, i) {
        wordEl.style.setProperty("--delay", i * 0.035 + "s");
      });
    });
  }

  /* ----------------------------------------------------------------------
   * Count-up metrics
   * -------------------------------------------------------------------- */

  function countUp(el) {
    if (el.dataset.dfCounted === "done") {
      return;
    }
    el.dataset.dfCounted = "done";

    var target = parseFloat(el.dataset.count);
    if (isNaN(target)) {
      return;
    }

    var prefix = el.dataset.prefix || "";
    var suffix = el.dataset.suffix || "";

    if (reduced) {
      el.textContent = prefix + target + suffix;
      return;
    }

    var duration = 1400;
    var start = performance.now();

    function frame(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);

      el.textContent = prefix + Math.round(target * eased) + suffix;

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  /* ----------------------------------------------------------------------
   * Scroll-driven statement
   * -------------------------------------------------------------------- */

  function initStatement() {
    var section = document.querySelector(".df-statement");
    var copy = section && section.querySelector("[data-scroll-reveal]");

    if (!section || !copy) {
      return;
    }

    var words = splitWords(copy, "df-reveal-word");
    var metrics = section.querySelectorAll("[data-count]");

    if (reduced) {
      words.forEach(function (w) {
        w.style.opacity = "1";
        w.style.transform = "none";
      });
      metrics.forEach(countUp);
      return;
    }

    var ticking = false;

    function update() {
      ticking = false;

      var rect = section.getBoundingClientRect();
      var total = rect.height - window.innerHeight;

      if (total <= 0) {
        return;
      }

      var progress = Math.min(Math.max(-rect.top / total, 0), 1);

      /* Words finish at 74%, then hold, then metrics land from 82%. */
      var wordProgress = Math.min(progress / 0.74, 1);
      var revealed = wordProgress * words.length;

      words.forEach(function (word, i) {
        var on = i < revealed;
        word.style.opacity = on ? "1" : "0.12";
        word.style.transform = on ? "translateY(0)" : "translateY(0.12em)";
      });

      if (progress >= 0.82) {
        metrics.forEach(countUp);
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ----------------------------------------------------------------------
   * Generic viewport reveals
   * -------------------------------------------------------------------- */

  function initObservers() {
    var targets = document.querySelectorAll("[data-reveal], [data-observe]");
    if (!targets.length) {
      return;
    }

    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------------------
   * Boot
   * -------------------------------------------------------------------- */

  function init() {
    initHeroTitle();
    initWordReveals();
    initStatement();
    initObservers();

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add("df-ready");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
