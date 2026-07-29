import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * FluidText – Splits text into individual characters that organically
 * displace away from the mouse cursor, creating a living text effect.
 */
export default function FluidText({ children, className, as: Tag = 'span' }) {
  const containerRef = useRef(null);
  const charsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const velocitiesRef = useRef([]);

  const INFLUENCE_RADIUS = 120;
  const MAX_DISPLACEMENT = 25;
  const SPRING = 0.08;
  const DAMPING = 0.75;

  const splitText = useCallback((node) => {
    const processNode = (n, key = 0) => {
      if (typeof n === 'string') {
        const chars = n.split('');
        const total = chars.length;
        return chars.map((char, i) => {
          const uniqueKey = `${key}-${i}`;
          return (
            <span
              key={uniqueKey}
              data-fluid-char
              style={{
                display: 'inline-block',
                transition: 'none',
                whiteSpace: char === ' ' ? 'pre' : undefined,
                '--char-index': i,
                '--total-chars': total,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
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
        
        // Clone the element but with split children
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    // Listen on the herroBanner parent for wider mouse tracking
    const heroParent = container.closest('.herroBanner') || container.parentElement;
    heroParent.addEventListener('mousemove', handleMouseMove);
    heroParent.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      const chars = container.querySelectorAll('[data-fluid-char]');
      if (!charsRef.current.length || charsRef.current.length !== chars.length) {
        charsRef.current = Array.from(chars);
        velocitiesRef.current = Array.from(chars).map(() => ({ x: 0, y: 0, currentX: 0, currentY: 0 }));
      }

      const mouse = mouseRef.current;
      const containerRect = container.getBoundingClientRect();

      charsRef.current.forEach((charEl, i) => {
        const vel = velocitiesRef.current[i];
        const rect = charEl.getBoundingClientRect();
        const charX = rect.left - containerRect.left + rect.width / 2;
        const charY = rect.top - containerRect.top + rect.height / 2;

        const dx = charX - mouse.x;
        const dy = charY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = 0;
        let targetY = 0;

        if (dist < INFLUENCE_RADIUS && dist > 0) {
          const force = (1 - dist / INFLUENCE_RADIUS);
          const strength = force * force * MAX_DISPLACEMENT;
          targetX = (dx / dist) * strength;
          targetY = (dy / dist) * strength;
        }

        // Spring physics for smooth organic motion
        vel.x += (targetX - vel.currentX) * SPRING;
        vel.y += (targetY - vel.currentY) * SPRING;
        vel.x *= DAMPING;
        vel.y *= DAMPING;
        vel.currentX += vel.x;
        vel.currentY += vel.y;

        // Small threshold to avoid unnecessary transforms
        if (Math.abs(vel.currentX) > 0.1 || Math.abs(vel.currentY) > 0.1) {
          charEl.style.transform = `translate(${vel.currentX}px, ${vel.currentY}px)`;
        } else {
          vel.currentX = 0;
          vel.currentY = 0;
          charEl.style.transform = '';
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      heroParent.removeEventListener('mousemove', handleMouseMove);
      heroParent.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [splitChildren]);

  return (
    <Tag ref={containerRef} className={className} style={{ position: 'relative' }}>
      {splitChildren}
    </Tag>
  );
}
