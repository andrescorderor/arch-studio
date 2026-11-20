import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, MessageCircle } from 'lucide-react';
import { useContact } from '../context/ContactContext';
import { useSiteData } from '../lib/useSiteData';

/** Dock flotante inteligente: se oculta en /contacto, /admin y cuando el footer entra en pantalla. */
export function FloatingContactBar() {
  const { t } = useTranslation();
  const { open } = useContact();
  const { settings } = useSiteData();
  const { pathname } = useLocation();
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footerEl = document.getElementById('contact');
    if (!footerEl || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        setFooterVisible(entries.some((e) => e.isIntersecting));
      },
      { threshold: 0.08 }
    );
    obs.observe(footerEl);
    return () => obs.disconnect();
  }, [pathname]);

  if (pathname === '/contacto' || pathname === '/admin') return null;

  return (
    <aside
      aria-label={t('cta.title')}
      style={{ zIndex: 9990 }}
      className={`fixed bottom-3 right-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#33363b]/95 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] text-[#f5f3ef] shadow-xl shadow-[#33363b]/25 backdrop-blur-xl transition-all duration-300 md:bottom-5 md:right-5 ${
        footerVisible ? 'pointer-events-none translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <button
        type="button"
        onClick={() => open()}
        aria-label={t('cta.open')}
        className="h-11 rounded-xl bg-[var(--primary)] px-4 text-[11px] font-medium uppercase tracking-wide text-white transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:brightness-110 active:scale-[.98] sm:px-5"
      >
        {t('cta.open')}
      </button>

      {settings.whatsappEnabled && (
        <a
          href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white/10 px-3 text-[#f5f3ef] transition-colors hover:bg-[var(--primary)] hover:text-white"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:text-[10px] sm:font-medium sm:uppercase sm:tracking-wide">
            WhatsApp
          </span>
        </a>
      )}

      {settings.emailEnabled && (
        <a
          href={`mailto:${settings.email}`}
          aria-label={t('cta.quickEmail')}
          title={t('cta.quickEmail')}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white/10 px-3 text-[#f5f3ef] transition-colors hover:bg-[var(--primary)] hover:text-white"
        >
          <Mail className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:text-[10px] sm:font-medium sm:uppercase sm:tracking-wide">
            {t('cta.quickEmail')}
          </span>
        </a>
      )}
    </aside>
  );
}
