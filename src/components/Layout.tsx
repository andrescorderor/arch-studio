import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { Navbar } from './Navbar';
import { FloatingContactBar } from './FloatingContactBar';
import { SITE } from '../config/site';

export function Layout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);

  return (
    <div className="min-h-screen bg-[#121214] text-[#f4f4f6] selection:bg-[#d4a373] selection:text-[#121214]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded focus:bg-[#d4a373] focus:px-3 focus:py-2 focus:text-[#121214]">{t('nav.skip')}</a>
      <Navbar />
      <main id="main"><Outlet /></main>
      <footer className="border-t border-[#1e1e24] bg-[#0f0f11]/40 px-4 pb-28 pt-12 sm:px-6 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-light uppercase tracking-[0.25em] text-white">{t('brand.title')}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#9b9ba8]">{t('brand.subtitle')}</p>
          </div>
          <div className="space-y-1 text-sm text-[#9b9ba8]">
            <p className="mb-2 text-xs uppercase tracking-widest text-white">{t('footer.contactTitle')}</p>
            <a href={`mailto:${SITE.email}`} className="flex min-h-[44px] items-center gap-2 hover:text-white"><Mail className="h-4 w-4 text-[#d4a373]" />{SITE.email}</a>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-2 hover:text-white"><MessageCircle className="h-4 w-4 text-[#d4a373]" />{SITE.phoneLabel}</a>
            <p className="flex min-h-[32px] items-center gap-2"><MapPin className="h-4 w-4 text-[#d4a373]" />{SITE.city}</p>
          </div>
          <div className="text-sm text-[#9b9ba8]">
            <Link to="/aviso-de-privacidad" className="flex min-h-[44px] items-center hover:text-white">{t('footer.privacy')}</Link>
            <p className="mt-2 text-xs text-[#6e6e7a]">© {new Date().getFullYear()} {SITE.name}. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
      <FloatingContactBar />
    </div>
  );
}
