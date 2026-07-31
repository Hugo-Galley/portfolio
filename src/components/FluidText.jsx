import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * FluidText – Splits text into individual characters that organically
 * displace away from the mouse cursor, creating a living text effect.
 */
export default function FluidText({ children, className, as: Tag = 'span' }) {
  const containerRef = useRef(null);
  const charsRef = useRef([]);
  const charPosRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const velocitiesRef = useRef([]);
  const isAnimatingRef = useRef(false);

  const INFLUENCE_RADIUS = 120;
  const MAX_DISPLACEMENT = 25;
  const SPRING = 0.08;
  const DAMPING = 0.75;

  const splitText = useCallback((node) => {
    const processNode = (n, key = 0) => {
      if (typeof n === 'string') {
        const words = n.split(/(\s+)/);
        let charCounter = 0;
        return words.map((word, wordIdx) => {
          if (/^\s+$/.test(word)) {
            return <span key={`s-${key}-${wordIdx}`}>{word}</span>;
          }
          const chars = word.split('');
          return (
            <span
              key={`w-${key}-${wordIdx}`}
              style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            >
              {chars.map((char, i) => {
                const charIdx = charCounter++;
                return (
                  <span
                    key={`c-${key}-${wordIdx}-${i}`}
                    data-fluid-char
                    style={{
                      display: 'inline-block',
                      transition: 'none',
                      '--char-index': charIdx,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        });
      }

      if (n && n.type === 'br') {
        return <br key={`br-${key}`} />;
      }

      if (n && n.props && n.props.children) {
        const inner = Array.isArray(n.props.children)
          ? n.props.children.flatMap((child, i) => processNode(child, `${key}-${i}`))
          : processNode(n.props.children, `${key}-c`);
        
        const { children: _, ...restProps } = n.props;
        return (
          <n.type key={`el-${key}`} {...restProps}>
            {inner}
          </n.type>
        );
      }

      return n;
    };

    if (Array.isArray(node)) {
      return node.flatMap((child, i) => processNode(child, i));
    }
    return processNode(node, 0);
  }, []);

  const [splitChildren, setSplitChildren] = useState(() => splitText(children));

  useEffect(() => {
    setSplitChildren(splitText(children));
  }, [children, splitText]);

  // Recalculate character base positions (without triggering reflow inside RAF)
  const updateCharPositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const chars = container.querySelectorAll('[data-fluid-char]');
    charsRef.current = Array.from(chars);
    
    charPosRef.current = charsRef.current.map((charEl) => {
      // Temporarily remove transform to measure natural position
      const prevTransform = charEl.style.transform;
      charEl.style.transform = '';
      const rect = charEl.getBoundingClientRect();
      charEl.style.transform = prevTransform;

      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      };
    });

    if (velocitiesRef.current.length !== charsRef.current.length) {
      velocitiesRef.current = charsRef.current.map(() => ({ x: 0, y: 0, currentX: 0, currentY: 0 }));
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateCharPositions();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateCharPositions);
    }

    window.addEventListener('resize', updateCharPositions);

    const startAnimation = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const animate = () => {
        const mouse = mouseRef.current;
        let activeMotion = false;

        charsRef.current.forEach((charEl, i) => {
          const pos = charPosRef.current[i];
          const vel = velocitiesRef.current[i];
          if (!pos || !vel) return;

          const dx = pos.x - mouse.x;
          const dy = pos.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let targetX = 0;
          let targetY = 0;

          if (dist < INFLUENCE_RADIUS && dist > 0) {
            const force = (1 - dist / INFLUENCE_RADIUS);
            const strength = force * force * MAX_DISPLACEMENT;
            targetX = (dx / dist) * strength;
            targetY = (dy / dist) * strength;
          }

          vel.x += (targetX - vel.currentX) * SPRING;
          vel.y += (targetY - vel.currentY) * SPRING;
          vel.x *= DAMPING;
          vel.y *= DAMPING;
          vel.currentX += vel.x;
          vel.currentY += vel.y;

          if (Math.abs(vel.currentX) > 0.05 || Math.abs(vel.currentY) > 0.05 || targetX !== 0 || targetY !== 0) {
            charEl.style.transform = `translate3d(${vel.currentX.toFixed(2)}px, ${vel.currentY.toFixed(2)}px, 0)`;
            activeMotion = true;
          } else if (vel.currentX !== 0 || vel.currentY !== 0) {
            vel.currentX = 0;
            vel.currentY = 0;
            charEl.style.transform = '';
          }
        });

        if (activeMotion || mouse.x > -9000) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          isAnimatingRef.current = false;
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      startAnimation();
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const heroParent = container.closest('.herroBanner') || container.parentElement;
    heroParent.addEventListener('mousemove', handleMouseMove, { passive: true });
    heroParent.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('resize', updateCharPositions);
      heroParent.removeEventListener('mousemove', handleMouseMove);
      heroParent.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      isAnimatingRef.current = false;
    };
  }, [splitChildren, updateCharPositions]);

  return (
    <Tag ref={containerRef} className={className} style={{ position: 'relative' }}>
      {splitChildren}
    </Tag>
  );
}
