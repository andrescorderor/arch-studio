import { useEffect, useRef, useState } from 'react';

/** Cursor arquitectónico con interpolación física y expansión "VIEW" sobre obras. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<'default' | 'link' | 'view'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const el = e.target as HTMLElement | null;
      if (el?.closest('[data-cursor="view"]')) {
        setMode('view');
      } else if (el?.closest('a, button, [role="tab"], select')) {
        setMode('link');
      } else {
        setMode('default');
      }
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      const ease = reducedMotion ? 1 : 0.16;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[10000] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div ref={ringRef} className="absolute left-0 top-0 will-change-transform">
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-500 ease-[var(--ease-tectonic)] ${
            mode === 'view'
              ? 'h-24 w-24 border-[#9a6b3b] bg-[#9a6b3b]/90'
              : mode === 'link'
              ? 'h-12 w-12 border-[#9a6b3b]'
              : 'h-8 w-8 border-[#18181b]/35'
          }`}
        >
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.25em] text-white transition-opacity duration-300 ${
              mode === 'view' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            View
          </span>
        </div>
      </div>
      <div ref={dotRef} className="absolute left-0 top-0 will-change-transform">
        <div
          className={`h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9a6b3b] transition-opacity ${
            mode === 'view' ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
}
