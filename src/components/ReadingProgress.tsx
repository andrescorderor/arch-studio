import { useEffect, useState } from 'react';

/** Barra superior ultrafina de progreso de lectura. */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-[var(--primary)]"
      style={{ transform: `scaleX(${pct / 100})` }}
    />
  );
}
