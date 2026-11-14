import { useTranslation } from 'react-i18next';
import { Mail, MessageCircle } from 'lucide-react';
import { SITE } from '../config/site';
import { useContact } from '../context/ContactContext';
import { SafeImage } from './SafeImage';

/** Dock flotante presente en todas las páginas: contextualiza la consulta con la obra activa. */
export function FloatingContactBar() {
  const { t } = useTranslation();
  const { open, pageContext, pageImage } = useContact();
  const thumb = pageImage || SITE.ogImage;

  return (
    <aside
      aria-label={t('cta.title')}
      style={{ zIndex: 9990 }}
      className="fixed bottom-3 right-3 z-50 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#18181b]/95 p-2 text-white shadow-xl shadow-[#18181b]/25 backdrop-blur-xl md:bottom-5 md:right-5"
    >
      <div className="hidden items-center gap-3 pr-2 sm:flex" aria-live="polite">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#27272a]">
          <SafeImage
            src={thumb}
            alt=""
            className="h-full w-full object-cover transition-opacity duration-500"
          />
        </div>
        <div className="flex flex-col gap-0.5 leading-tight">
          <span className="text-[10px] font-medium uppercase tracking-wide text-white/60">
            {pageContext ? t('cta.contextSubject', { context: '' }).replace(':', '') : t('cta.title')}
          </span>
          <span className="max-w-36 truncate text-sm text-white">
            {pageContext || t('cta.subtitle')}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => open(pageContext)}
        aria-label={t('cta.open')}
        className="h-11 rounded-xl bg-[#9a6b3b] px-4 text-xs font-medium uppercase tracking-wide text-white transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:brightness-110 active:scale-[.98]"
      >
        {t('cta.open')}
      </button>

      <a
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('cta.quickWhatsapp')}
        title={t('cta.quickWhatsapp')}
        className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white transition-colors hover:bg-[#9a6b3b]"
      >
        <MessageCircle className="h-4 w-4" />
      </a>

      <a
        href={`mailto:${SITE.email}`}
        aria-label={t('cta.quickEmail')}
        title={t('cta.quickEmail')}
        className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white transition-colors hover:bg-[#9a6b3b]"
      >
        <Mail className="h-4 w-4" />
      </a>
    </aside>
  );
}
