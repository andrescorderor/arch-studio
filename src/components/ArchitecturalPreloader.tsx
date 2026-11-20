import { useEffect, useState } from 'react';

/** Cortina inicial editorial con el nombre Medelsa., contador 00→100 y apertura hacia arriba. */
export function ArchitecturalPreloader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = window.setTimeout(() => setMounted(false), 180);
      return () => window.clearTimeout(t);
    }
    const start = performance.now();
    const interval = window.setInterval(() => {
      const pct = Math.min(100, Math.round(((performance.now() - start) / 1400) * 100));
      setProgress(pct);
    }, 16);
    const tExit = window.setTimeout(() => {
      setProgress(100);
      setExiting(true);
    }, 1450);
    const tUnmount = window.setTimeout(() => setMounted(false), 2180);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(tExit);
      window.clearTimeout(tUnmount);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-label="Medelsa. — León, México"
      role="status"
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#33363b] text-[#f5f3ef] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="w-[min(90vw,1280px)]">
        <div className="flex flex-col justify-between gap-10 border-b border-white/20 pb-5 sm:flex-row sm:items-end sm:pb-7">
          <div className="overflow-hidden">
            <p className="intro-title text-[clamp(3.25rem,14vw,12rem)] font-medium leading-[.8] tracking-[-.09em]">
              Medelsa<span className="text-[var(--primary-on-dark)]">.</span>
            </p>
          </div>
          <div className="flex items-end justify-between gap-8 font-mono text-[10px] uppercase tracking-[.18em] text-white/60 sm:min-w-48 sm:pb-2">
            <span>León, México</span>
            <span aria-hidden="true" className="text-2xl tabular-nums tracking-[-.06em] text-white">
              {String(progress).padStart(2, '0')}
            </span>
          </div>
        </div>
        <div
          className="mt-3 h-px origin-left bg-[var(--primary-on-dark)] transition-transform duration-100"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  );
}
