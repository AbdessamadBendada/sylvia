/* Digit Finance — motion engine, Divi-native build.
 *
 * Goes in: Divi > Theme Options > Integration > "Add code to the < body >"
 * wrapped in <script> tags. NOT a Code module.
 *
 * Differs from the static site's inline script (index.html 2381-2564) in that
 * it keys off CSS classes only. The original relied on data-* attributes
 * (data-observe, data-reveal, data-word-reveal, data-scroll-reveal, data-count,
 * data-prefix, data-suffix) which would each have to be hand-added to every
 * Divi module. Classes are set once per module in Advanced > Attributes.
 *
 * Every lookup is guarded: this script loads site-wide, so it must be inert on
 * pages that have none of these sections.
 */
(function () {
  "use strict";

  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- helpers ------------------------------------------------------- */

  function all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* Splits an element's text into per-word spans for the cascade effects. */
  function splitWords(el, className, withDelay) {
    var sentence = el.textContent.trim().replace(/\s+/g, " ");
    el.setAttribute("aria-label", sentence);
    el.innerHTML = sentence
      .split(" ")
      .map(function (word, i) {
        var delay = withDelay ? ' style="--delay:' + i * 28 + 'ms"' : "";
        return (
          '<span class="' + className + '" aria-hidden="true"' + delay + ">" +
          word + "&nbsp;</span>"
        );
      })
      .join("");
    return all("." + className, el);
  }

  /* "€250M+" -> { prefix: "€", target: 250, suffix: "M+" }
     "14 yrs" -> { prefix: "",  target: 14,  suffix: " yrs" }
     Replaces the old data-count / data-prefix / data-suffix attributes. */
  function parseMetric(text) {
    var m = /^(\D*?)(\d+)(.*)$/.exec(text.trim());
    if (!m) return null;
    return { prefix: m[1], target: parseInt(m[2], 10), suffix: m[3] };
  }

  function animateCount(el) {
    if (el.dataset.counted || reduced) return;
    var parsed = parseMetric(el.textContent);
    if (!parsed) return;
    el.dataset.counted = "true";
    var start = performance.now();
    var duration = 1100;

    (function frame(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent =
        parsed.prefix + Math.round(parsed.target * eased) + parsed.suffix;
      if (p < 1) requestAnimationFrame(frame);
    })(start);
  }

  /* ---- hero ----------------------------------------------------------- */

  /* Divi generates the section/row wrappers, so they carry no class of
     ours. Derive them from the module content instead of hand-adding a
     class to every container in the builder. */
  var heroPanel = document.querySelector(".digit-hero-panel");
  var heroStage = heroPanel ? heroPanel.closest(".et_pb_row") : null;
  var heroQuote = document.querySelector(".digit-hero-panel blockquote");

  if (heroQuote) splitWords(heroQuote, "reveal-word", true);

  /* Scopes the page-level background/typography to pages that actually
     have this layout, so the rule cannot leak site-wide. */
  if (heroPanel || document.querySelector(".digit-statement-copy")) {
    document.body.classList.add("digit-page");
  }

  /* ---- statement scroll cascade --------------------------------------- */

  var copy = document.querySelector(".digit-statement-copy");
  var statement = copy ? copy.closest(".et_pb_section") : null;
  var metrics = document.querySelector(".digit-metrics");
  var words = [];

  if (copy) words = splitWords(copy, "scroll-word", false);

  var ticking = false;

  function updateStatement() {
    if (!statement || !words.length) return;
    var rect = statement.getBoundingClientRect();
    var range = Math.max(statement.offsetHeight - innerHeight, 1);
    var progress = Math.min(Math.max(-rect.top / range, 0), 1);
    var wordProgress = Math.min(progress / 0.74, 1);

    words.forEach(function (word, i) {
      var pos = words.length > 1 ? i / (words.length - 1) : 0;
      var reveal = Math.min(Math.max((wordProgress - pos * 0.72) / 0.28, 0), 1);
      word.style.setProperty("--word-opacity", (0.14 + reveal * 0.86).toFixed(3));
      word.style.setProperty("--word-y", (1 - reveal) * 0.15 + "em");
      word.style.setProperty("--word-scale", (0.986 + reveal * 0.014).toFixed(3));
    });

    if (metrics) {
      var mr = Math.min(Math.max((progress - 0.82) / 0.18, 0), 1);
      metrics.style.setProperty("--metrics-opacity", mr.toFixed(3));
      metrics.style.setProperty("--metrics-y", (1 - mr) * 18 + "px");
      if (progress >= 0.82) all(".digit-metric strong", metrics).forEach(animateCount);
    }
    ticking = false;
  }

  function requestStatement() {
    if (ticking || reduced) return;
    requestAnimationFrame(updateStatement);
    ticking = true;
  }

  /* ---- reveal targets -------------------------------------------------- */

  var revealTargets = all(
    ".digit-hero-stage, .digit-hero-meta, .digit-hero-title, .digit-section-label, .digit-metrics"
  );

  if (reduced) {
    words.forEach(function (w) {
      w.style.setProperty("--word-opacity", "1");
      w.style.setProperty("--word-y", "0em");
      w.style.setProperty("--word-scale", "1");
    });
    if (metrics) {
      metrics.style.setProperty("--metrics-opacity", "1");
      metrics.style.setProperty("--metrics-y", "0px");
    }
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
    document.body.classList.add("ready");
  } else {
    updateStatement();
    addEventListener("scroll", requestStatement, { passive: true });
    addEventListener("resize", requestStatement);
    requestAnimationFrame(function () { document.body.classList.add("ready"); });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    revealTargets.forEach(function (el) {
      /* .digit-metrics is driven by scroll progress, not by intersection --
         observing it too would fade it in early and desync the counters. */
      if (el !== metrics) observer.observe(el);
    });

    if (heroStage) observer.observe(heroStage);
  }
})();
