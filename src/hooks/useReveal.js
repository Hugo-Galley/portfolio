import { useEffect } from 'react';

const TARGETS = [
  '.section-head',
  '.about-photo',
  '.about-body',
  '.xp-row',
  '.os-lead',
  '.os-list li',
  '.project-row',
  '.contact-panel',
].join(',');

/*
 * Reveal-on-scroll, played once per block: it rises slightly and fades in, then stays
 * fully opaque for good (no fade-out when it leaves the screen).
 * Works the same in every browser (IntersectionObserver, no scroll-driven CSS).
 * Progressive enhancement: nothing is hidden unless this code runs, so the content is
 * always visible without JS, for reduced-motion users and in the pre-rendered HTML.
 * A data attribute is used (not a class) so React re-renders never wipe it.
 */
export default function useReveal() {
  useEffect(() => {
    if (
      navigator.webdriver ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const root = document.documentElement;
    const elements = [...document.querySelectorAll(TARGETS)];
    const show = (el) => el.setAttribute('data-reveal', 'in');

    const io = new IntersectionObserver(
      (entries) => {
        // stagger the blocks that enter together
        let i = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 80}ms`);
          i += 1;
          show(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    const vh = window.innerHeight;
    elements.forEach((el) => {
      const r = el.getBoundingClientRect();
      // already on screen when the page loads: show it straight away, no animation
      if (r.top < vh && r.bottom > 0) {
        el.setAttribute('data-reveal', 'in');
        return;
      }
      el.setAttribute('data-reveal', 'out');
      io.observe(el);
    });
    root.classList.add('reveal-ready');

    return () => {
      io.disconnect();
      root.classList.remove('reveal-ready');
      elements.forEach((el) => {
        el.removeAttribute('data-reveal');
        el.style.removeProperty('--reveal-delay');
      });
    };
  }, []);
}
