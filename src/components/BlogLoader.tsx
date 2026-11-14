import { useTranslation } from 'react-i18next';

/** Loader animado arquitectónico para carga de blogs */
export function BlogLoader({ count = 2 }: { count?: number }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-8" aria-busy="true" aria-live="polite">
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#71717a]">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9a6b3b] opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#9a6b3b]" />
        </span>
        <span>{t('blog.loadingArticles')}</span>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-[#e4e4e7] bg-white shadow-sm">
            <div className="animate-shimmer aspect-[16/9] bg-[#f4f4f5]" />
            <div className="space-y-3 p-6">
              <div className="animate-shimmer h-3 w-24 rounded bg-[#e4e4e7]" />
              <div className="animate-shimmer h-7 w-4/5 rounded bg-[#e4e4e7]" />
              <div className="animate-shimmer h-4 w-full rounded bg-[#f4f4f5]" />
              <div className="animate-shimmer h-4 w-2/3 rounded bg-[#f4f4f5]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
