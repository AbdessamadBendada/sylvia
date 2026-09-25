(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function splitWords(element, className) {
    if (!element || element.dataset.dfSplit === "done") {
      return [];
    }

    var sentence = element.textContent.trim().replace(/\s+/g, " ");
    var words = sentence.split(" ");
    var fragment = document.createDocumentFragment();

    element.setAttribute("aria-label", sentence);
    words.forEach(function (word, index) {
      var span = document.createElement("span");
      span.className = className;
      span.setAttribute("aria-hidden", "true");
      span.textContent = word;
      fragment.appendChild(span);
      if (index < words.length - 1) {
        fragment.appendChild(document.createTextNode(" "));
      }
    });

    element.replaceChildren(fragment);
    element.dataset.dfSplit = "done";
    return Array.prototype.slice.call(element.querySelectorAll("." + className));
  }

  function wrapHeroTitle() {
    var title = document.querySelector(".df-hero-title");
    if (!title || title.dataset.dfWrapped === "done") {
      return;
    }

    var mask = document.createElement("span");
    var line = document.createElement("span");
    mask.className = "df-title-mask";
    line.className = "df-title-line";

    while (title.firstChild) {
      line.appendChild(title.firstChild);
    }
    mask.appendChild(line);
    title.appendChild(mask);
    title.dataset.dfWrapped = "done";
  }

  function animateCount(element) {
    if (!element || element.dataset.dfCounted === "done") {
      return;
    }

    var original = element.textContent.trim();
    var match = original.match(/^([^0-9]*)([0-9]+)(.*)$/);
    if (!match) {
      return;
    }

    element.dataset.dfCounted = "done";
    var prefix = match[1];
    var target = Number(match[2]);
    var suffix = match[3];

    if (reduced) {
      return;
    }

    var start = window.performance.now();
    var duration = 1100;

    function frame(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = prefix + Math.round(target * eased) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(frame);
      }
    }

    window.requestAnimationFrame(frame);
  }

  function initHero() {
    wrapHeroTitle();

    var stage = document.querySelector(".df-hero-stage");
    var quote = document.querySelector(".df-hero-quote p");
    var quoteWords = splitWords(quote, "df-reveal-word");

    quoteWords.forEach(function (word, index) {
      word.style.setProperty("--df-delay", index * 28 + "ms");
    });

    if (reduced || !("IntersectionObserver" in window)) {
      if (stage) {
        stage.classList.add("is-visible");
      }
      if (quote) {
        quote.classList.add("is-visible");
      }
      return;
    }

    var observer = new window.IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    if (stage) {
      observer.observe(stage);
    }
    if (quote) {
      observer.observe(quote);
    }
  }

  function initStatement() {
    var section = document.querySelector(".df-statement");
    var copy = section && section.querySelector(".df-statement-copy");
    var metrics = section && section.querySelector(".df-metrics");

    if (!section || !copy || !metrics) {
      return;
    }

    var words = splitWords(copy, "df-scroll-word");
    var counters = metrics.querySelectorAll(".df-metric-value");

    if (reduced) {
      words.forEach(function (word) {
        word.style.setProperty("--df-word-opacity", "1");
        word.style.setProperty("--df-word-y", "0");
        word.style.setProperty("--df-word-scale", "1");
      });
      metrics.style.setProperty("--df-metrics-opacity", "1");
      metrics.style.setProperty("--df-metrics-y", "0");
      return;
    }

    var ticking = false;

    function update() {
      var rect = section.getBoundingClientRect();
      var range = Math.max(section.offsetHeight - window.innerHeight, 1);
      var progress = Math.min(Math.max(-rect.top / range, 0), 1);
      var wordProgress = Math.min(progress / 0.74, 1);

      words.forEach(function (word, index) {
        var position = words.length > 1 ? index / (words.length - 1) : 0;
        var start = position * 0.72;
        var reveal = Math.min(Math.max((wordProgress - start) / 0.28, 0), 1);
        word.style.setProperty("--df-word-opacity", (0.14 + reveal * 0.86).toFixed(3));
        word.style.setProperty("--df-word-y", (1 - reveal) * 0.15 + "em");
        word.style.setProperty("--df-word-scale", (0.986 + reveal * 0.014).toFixed(3));
      });

      var metricsReveal = Math.min(Math.max((progress - 0.82) / 0.18, 0), 1);
      metrics.style.setProperty("--df-metrics-opacity", metricsReveal.toFixed(3));
      metrics.style.setProperty("--df-metrics-y", (1 - metricsReveal) * 18 + "px");

      if (progress >= 0.82) {
        counters.forEach(animateCount);
      }
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
  }

  function init() {
    initHero();
    initStatement();
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        document.body.classList.add("df-ready");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
