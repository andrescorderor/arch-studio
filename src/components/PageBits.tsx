import type { ReactNode } from 'react';

export function PageHeader({ badge, title, subtitle, accent = '#d4a373', children }: { badge: string; title: string; subtitle?: string; accent?: string; children?: ReactNode }) {
  return (
    <header className="border-b border-[#23232b] px-4 pb-14 pt-16 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-4">
        <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>{badge}</span>
        <h1 className="font-display max-w-4xl text-4xl font-light leading-tight tracking-tight text-white sm:text-6xl">{title}</h1>
        {subtitle && <p className="max-w-2xl text-sm text-[#9b9ba8] sm:text-base">{subtitle}</p>}
        {children}
      </div>
    </header>
  );
}

export const Section = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <section className={`px-4 py-16 sm:px-6 sm:py-24 lg:px-12 ${className}`}><div className="mx-auto max-w-7xl">{children}</div></section>
);
