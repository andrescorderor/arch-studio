import { useTranslation } from 'react-i18next';
import { Mail, MessageCircle, PenLine } from 'lucide-react';
import { SITE } from '../config/site';
import { useContact } from '../context/ContactContext';

/** CTA presente en TODAS las páginas: abre el modal con asunto y mensaje (por correo o WhatsApp). */
export function FloatingContactBar() {
  const { t } = useTranslation();
  const { open, pageContext } = useContact();

  return (
    <aside aria-label={t('cta.title')} style={{ zIndex: 9990 }}
      className="fixed bottom-4 left-4 right-4 flex items-center justify-between gap-2 rounded-2xl border border-[#d4d4d8] bg-[#18181b]/95 p-2 shadow-[0_12px_36px_rgba(24,24,27,0.28)] backdrop-blur-md sm:left-auto sm:right-6 sm:bottom-6 sm:gap-3 sm:pl-4">
      <div className="hidden flex-col pr-3 sm:flex">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-white">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#4ade80]" aria-hidden />{t('cta.title')}
        </span>
        <span className="text-[10px] text-[#a1a1aa]">{t('cta.subtitle')}</span>
      </div>
      <button onClick={() => open(pageContext)} className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#d4a373] px-4 text-xs font-semibold uppercase tracking-wider text-[#141418] hover:bg-[#c29263] sm:flex-none">
        <PenLine className="h-4 w-4" /> {t('cta.open')}
      </button>
      <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={t('cta.quickWhatsapp')} title={t('cta.quickWhatsapp')}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#3f3f46] bg-[#27272a] text-[#4ade80] hover:bg-[#3f3f46]">
        <MessageCircle className="h-5 w-5" />
      </a>
      <a href={`mailto:${SITE.email}`} aria-label={t('cta.quickEmail')} title={t('cta.quickEmail')}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#3f3f46] bg-[#27272a] text-[#d4a373] hover:bg-[#3f3f46]">
        <Mail className="h-5 w-5" />
      </a>
    </aside>
  );
}
