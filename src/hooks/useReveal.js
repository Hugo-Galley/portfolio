import { useEffect } from 'react';

const BLOCKS = [
  '.about-photo',
  '.about-body',
  '.xp-row',
  '.os-lead',
  '.os-list li',
  '.project-row',
  '.contact-panel',
].join(',');
const HEADS = '.section-head';

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/*
 * Scroll-linked depth effect, computed in JS so it behaves the same in every browser
 * (the CSS scroll-driven version left blocks half transparent in Firefox).
 *  - entering: a block rises from behind (perspective, rotateX, depth) and fades in,
 *    reaching its final state once ~28% of its journey through the viewport is done
 *  - leaving through the top: it tips back slightly, but stays fully opaque
 *  - section titles rise and sharpen (blur -> none)
 * Nothing is touched without JS, in the pre-rendered HTML or with reduced motion.
 */
export default function useReveal() {
  useEffect(() => {
    if (navigator.webdriver || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const blocks = [...document.querySelectorAll(BLOCKS)];
    const heads = [...document.querySelectorAll(HEADS)];
    const all = [...blocks, ...heads];
    blocks.forEach((el) => {
      el.style.transformOrigin = '50% 100%';
      el.style.willChange = 'transform, opacity';
    });
    heads.forEach((el) => { el.style.willChange = 'transform, opacity, filter'; });

    let raf = null;
    const update = () => {
      raf = null;
      const vh = window.innerHeight || 800;
      // read everything first, then write (no layout thrashing)
      const rects = all.map((el) => el.getBoundingClientRect());

      all.forEach((el, i) => {
        const { top, height } = rects[i];
        const h = Math.max(height, 1);
        // like CSS "entry 0% -> cover 28%": 0 when the top touches the bottom edge
        const enter = clamp01((vh - top) / (0.28 * (vh + h)));

        if (i >= blocks.length) {
          // section title: rise + un-blur
          const k = 1 - enter;
          el.style.opacity = enter.toFixed(3);
          el.style.transform = k ? `translate3d(0, ${(40 * k).toFixed(1)}px, 0)` : '';
          el.style.filter = k > 0.01 ? `blur(${(8 * k).toFixed(2)}px)` : '';
          return;
        }

        // like CSS "exit 20% -> 100%": starts once the block's top has left the screen
        const exit = clamp01((-top / h - 0.2) / 0.8);
        const k = 1 - enter;
        const y = 80 * k - 20 * exit;
        const z = -140 * k - 120 * exit;
        const rx = 14 * k - 8 * exit;
        el.style.opacity = enter.toFixed(3);
        el.style.transform = k || exit
          ? `perspective(1400px) translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg)`
          : '';
      });
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    // the page grows when images/lazy parts load
    const ro = new ResizeObserver(kick);
    ro.observe(document.body);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      ro.disconnect();
      all.forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
        el.style.filter = '';
        el.style.transformOrigin = '';
        el.style.willChange = '';
      });
    };
  }, []);
}
