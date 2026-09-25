      // GUARD (Divi build): #year lives in the footer, which is not on the page
      // yet. Unguarded this throws on line 1 and nothing below ever runs.
      const yearEl = document.getElementById("year");
      if (yearEl) yearEl.textContent = new Date().getFullYear();

      const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

      document.querySelectorAll("[data-word-reveal]").forEach((element) => {
        const sentence = element.textContent.trim().replace(/\s+/g, " ");
        element.setAttribute("aria-label", sentence);
        element.innerHTML = sentence
          .split(" ")
          .map(
            (word, index) =>
              `<span class="reveal-word" aria-hidden="true" style="--delay:${index * 28}ms">${word}&nbsp;</span>`,
          )
          .join("");
      });

      // GUARD (Divi build): on a partial page the statement section may be absent.
      // Unguarded, .closest() on null throws and kills everything below it.
      const scrollStatement = document.querySelector("[data-scroll-reveal]");
      const scrollSection = scrollStatement?.closest(".statement") ?? null;
      const scrollMetrics = scrollSection?.querySelector(".metrics") ?? null;

      if (scrollStatement && scrollMetrics) {
        const scrollSentence = scrollStatement.textContent.trim().replace(/\s+/g, " ");
        scrollStatement.setAttribute("aria-label", scrollSentence);
        scrollStatement.innerHTML = scrollSentence
          .split(" ")
          .map((word) => `<span class="scroll-word" aria-hidden="true">${word}&nbsp;</span>`)
          .join("");
      }

      const scrollWords = [...(scrollStatement?.querySelectorAll(".scroll-word") ?? [])];
      let scrollTicking = false;

      function updateScrollStatement() {
        if (!scrollSection || !scrollMetrics) return;
        const rect = scrollSection.getBoundingClientRect();
        const range = Math.max(scrollSection.offsetHeight - innerHeight, 1);
        const progress = Math.min(Math.max(-rect.top / range, 0), 1);
        const wordProgress = Math.min(progress / 0.74, 1);

        scrollWords.forEach((word, index) => {
          const wordPosition = scrollWords.length > 1
            ? index / (scrollWords.length - 1)
            : 0;
          const start = wordPosition * 0.72;
          const reveal = Math.min(
            Math.max((wordProgress - start) / 0.28, 0),
            1,
          );
          word.style.setProperty("--word-opacity", (0.14 + reveal * 0.86).toFixed(3));
          word.style.setProperty("--word-y", `${(1 - reveal) * 0.15}em`);
          word.style.setProperty("--word-scale", (0.986 + reveal * 0.014).toFixed(3));
        });

        const metricsReveal = Math.min(Math.max((progress - 0.82) / 0.18, 0), 1);
        scrollMetrics.style.setProperty("--metrics-opacity", metricsReveal.toFixed(3));
        scrollMetrics.style.setProperty("--metrics-y", `${(1 - metricsReveal) * 18}px`);
        if (progress >= 0.82) {
          scrollMetrics.querySelectorAll("[data-count]").forEach(animateCount);
        }
        scrollTicking = false;
      }

      function requestScrollStatement() {
        if (scrollTicking || reducedMotion) return;
        requestAnimationFrame(updateScrollStatement);
        scrollTicking = true;
      }

      function animateCount(element) {
        if (element.dataset.done || reducedMotion) return;
        element.dataset.done = "true";
        const target = Number(element.dataset.count);
        const prefix = element.dataset.prefix || "";
        const suffix = element.dataset.suffix || "";
        const start = performance.now();
        const duration = 1100;

        function frame(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
      }

      if (reducedMotion) {
        scrollWords.forEach((word) => {
          word.style.setProperty("--word-opacity", "1");
          word.style.setProperty("--word-y", "0em");
          word.style.setProperty("--word-scale", "1");
        });
        scrollMetrics?.style.setProperty("--metrics-opacity", "1");
        scrollMetrics?.style.setProperty("--metrics-y", "0px");
        document.body.classList.add("ready");
        document
          .querySelectorAll("[data-reveal], [data-word-reveal], [data-observe]")
          .forEach((element) => element.classList.add("is-visible"));
      } else {
        updateScrollStatement();
        addEventListener("scroll", requestScrollStatement, { passive: true });
        addEventListener("resize", requestScrollStatement);
        requestAnimationFrame(() => document.body.classList.add("ready"));

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              entry.target
                .querySelectorAll("[data-count]")
                .forEach(animateCount);
              observer.unobserve(entry.target);
            });
          },
          { threshold: 0.18 },
        );

        document
          .querySelectorAll("[data-reveal], [data-word-reveal], [data-observe]")
          .forEach((element) => {
            if (element !== scrollMetrics) observer.observe(element);
          });
      }

      /* ================================================================
         OPTIONAL EDITORIAL MOTION SYSTEM
         Remove this block and its matching CSS block to disable it.
         ================================================================ */
      // Keep the optional motion layer disabled. The page already has its own
      // reveal observer above; enabling both systems can leave content hidden.

      const motionGroups = {
        heading: document.querySelectorAll(
          ".services-head h2, .editorial-heading, .about-title, .resource h2, .closing h2",
        ),
        rise: document.querySelectorAll(
          ".section-label, .services-head p, .about-intro, .about-body, .content-note, .resource-copy > p, .closing-row p",
        ),
        // The hero already has its own reveal through .hero-stage.is-visible.
        // Applying the second clip-path animation here could leave it fully
        // clipped in some browsers even though the image loaded correctly.
        image: document.querySelectorAll(".about-image"),
        line: document.querySelectorAll(".service, .closing-row"),
        stagger: document.querySelectorAll(
          ".process-grid, .quote-list, .logos-inner, .footer-grid, .resource-form",
        ),
        button: document.querySelectorAll(
          ".resource-form button, .closing-button",
        ),
      };

      motionGroups.heading.forEach((element) => element.classList.add("motion-heading"));
      motionGroups.rise.forEach((element) => element.classList.add("motion-rise"));
      motionGroups.image.forEach((element) => element.classList.add("motion-image"));
      motionGroups.line.forEach((element) => element.classList.add("motion-line"));
      motionGroups.stagger.forEach((element) => element.classList.add("motion-stagger"));
      motionGroups.button.forEach((element) => element.classList.add("motion-button"));
      // GUARD (Divi build): .about-pull lives in the About section, which does not
      // exist yet. Unguarded this throws and kills every listener below it.
      const aboutPull = document.querySelector(".about-pull");
      if (aboutPull) aboutPull.classList.add("motion-rise");

      const motionTargets = document.querySelectorAll(
        ".motion-rise, .motion-heading, .motion-image, .motion-line, .motion-stagger, .motion-button",
      );

      if (reducedMotion) {
        motionTargets.forEach((element) => element.classList.add("motion-visible"));
        document.body.classList.add("motion-started");
      } else {
        const motionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("motion-visible");
              motionObserver.unobserve(entry.target);
            });
          },
          { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
        );

        motionTargets.forEach((element) => motionObserver.observe(element));
        requestAnimationFrame(() =>
          requestAnimationFrame(() => document.body.classList.add("motion-started")),
        );
      }
