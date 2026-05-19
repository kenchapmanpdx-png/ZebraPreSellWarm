/* client/src/components/TiltCard.tsx
 *
 * Reusable wrapper that adds a subtle 3D tilt-toward-cursor effect to
 * any card. Hover-only - no scroll-driven motion - so it's safe for
 * vestibular-sensitive users. Respects prefers-reduced-motion at the
 * OS level via framer-motion's useReducedMotion hook (when set, the
 * mousemove listener is never attached, so the card stays flat).
 */
import React, { useRef, useEffect, ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees on either axis. Default 8. */
  intensity?: number;
  /** Render an animated sheen sweep on hover. Default true. */
  shine?: boolean;
  /** Optional inline style passed through to the wrapper. */
  style?: React.CSSProperties;
};

export default function TiltCard({
  children,
  className = '',
  intensity = 8,
  shine = true,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let nextRx = 0;
    let nextRy = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      nextRx = (py - 0.5) * -intensity * 2;
      nextRy = (px - 0.5) * intensity * 2;
      if (!active) {
        active = true;
        rafId = requestAnimationFrame(apply);
      }
    };

    const apply = () => {
      el.style.transform = `perspective(1500px) rotateX(${nextRx.toFixed(2)}deg) rotateY(${nextRy.toFixed(2)}deg) translateZ(0)`;
      active = false;
    };

    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      active = false;
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion, intensity]);

  return (
    <div
      ref={ref}
      className={`tilt-card-wrapper ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
      {shine && !prefersReducedMotion && (
        <span
          aria-hidden="true"
          className="tilt-card-shine"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.7s ease',
            mixBlendMode: 'overlay',
            borderRadius: 'inherit',
          }}
        />
      )}
      <style>{`
        .tilt-card-wrapper:hover .tilt-card-shine { transform: translateX(100%); }
      `}</style>
    </div>
  );
}
