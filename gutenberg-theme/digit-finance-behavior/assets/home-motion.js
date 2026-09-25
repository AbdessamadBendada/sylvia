(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onReady = (callback) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', callback, { once: true });
    else callback();
  };

  const addPreloader = () => {
    if (reducedMotion || !window.DigitFinanceMotion?.preloaderImage) return;
    try {
      if (sessionStorage.getItem('df-preloaded')) return;
      sessionStorage.setItem('df-preloaded', '1');
    } catch (_) {
      // Private browsing can deny sessionStorage. The safety timeout remains.
    }

    const overlay = document.createElement('div');
    overlay.id = 'df-preloader';
    overlay.setAttribute('aria-hidden', 'true');
    const image = document.createElement('img');
    image.alt = '';
    image.width = 832;
    image.height = 464;
    image.decoding = 'async';
    image.src = window.DigitFinanceMotion.preloaderImage;
    overlay.append(image);
    document.body.prepend(overlay);

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      overlay.classList.add('is-done');
      window.setTimeout(() => overlay.remove(), 550);
    };
    window.setTimeout(finish, 5000);
    image.addEventListener('error', finish, { once: true });
    image.addEventListener('load', () => window.setTimeout(finish, 3180), { once: true });
  };

  const prepareStatement = () => {
    const statement = document.querySelector('.df-statement-copy');
    const metrics = document.querySelector('.df-metrics');
    if (!statement || !metrics || reducedMotion || !('IntersectionObserver' in window)) return;

    const text = statement.textContent.trim().replace(/\s+/g, ' ');
    statement.setAttribute('aria-label', text);
    statement.textContent = '';
    text.split(' ').forEach((word) => {
      const span = document.createElement('span');
      span.className = 'df-motion-word';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = `${word} `;
      statement.append(span);
    });
    const words = [...statement.querySelectorAll('.df-motion-word')];
    const section = statement.closest('.df-statement');
    let ticking = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const range = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / range, 0), 1);
      const wordsProgress = Math.min(progress / .74, 1);
      words.forEach((word, index) => {
        const position = words.length > 1 ? index / (words.length - 1) : 0;
        const reveal = Math.min(Math.max((wordsProgress - position * .72) / .28, 0), 1);
        word.style.setProperty('--df-word-opacity', (.14 + reveal * .86).toFixed(3));
        word.style.setProperty('--df-word-y', `${(1 - reveal) * .15}em`);
        word.style.setProperty('--df-word-scale', (.986 + reveal * .014).toFixed(3));
      });
      const metricReveal = Math.min(Math.max((progress - .82) / .18, 0), 1);
      metrics.style.setProperty('--df-metrics-opacity', metricReveal.toFixed(3));
      metrics.style.setProperty('--df-metrics-y', `${(1 - metricReveal) * 18}px`);
      ticking = false;
    };
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
  };

  const prepareHero = () => {
    const hero = document.querySelector('.df-hero');
    const title = hero?.querySelector('.df-hero-title');
    if (!hero || !title || reducedMotion) return;
    const text = title.textContent.trim().replace(/\s+/g, ' ');
    const markup = title.innerHTML;
    title.setAttribute('aria-label', text);
    title.textContent = '';
    const line = document.createElement('span');
    line.className = 'df-motion-line';
    const word = document.createElement('span');
    word.className = 'df-motion-word';
    word.setAttribute('aria-hidden', 'true');
    word.innerHTML = markup;
    line.append(word);
    title.append(line);
    if (!('IntersectionObserver' in window)) { hero.classList.add('is-visible'); return; }
    new IntersectionObserver((entries, observer) => {
      if (!entries[0]?.isIntersecting) return;
      hero.classList.add('is-visible');
      observer.disconnect();
    }, { threshold: .15 }).observe(hero);
  };

  onReady(() => {
    addPreloader();
    prepareHero();
    prepareStatement();
  });
})();
