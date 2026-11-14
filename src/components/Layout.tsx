import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Navbar } from './Navbar';
import { FloatingContactBar } from './FloatingContactBar';
import { SITE } from '../config/site';

export function Layout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#18181b] selection:bg-[#9a6b3b] selection:text-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded focus:bg-[#18181b] focus:px-3 focus:py-2 focus:text-white">{t('nav.skip')}</a>
      <Navbar />
      <main id="main"><Outlet /></main>
      <footer className="border-t border-[#e4e4e7] bg-[#f4f4f5] px-4 pb-28 pt-12 sm:px-6 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-light uppercase tracking-[0.25em] text-[#18181b]">{t('brand.title')}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#71717a]">{t('brand.subtitle')}</p>
          </div>
          <div className="space-y-1 text-sm text-[#52525b]">
            <p className="mb-2 text-xs uppercase tracking-widest text-[#18181b]">{t('footer.contactTitle')}</p>
            <a href={`mailto:${SITE.email}`} className="flex min-h-[44px] items-center gap-2 hover:text-[#18181b]"><Mail className="h-4 w-4 text-[#9a6b3b]" />{SITE.email}</a>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-2 hover:text-[#18181b]"><MessageCircle className="h-4 w-4 text-[#9a6b3b]" />{SITE.phoneLabel}</a>
            <p className="flex min-h-[32px] items-center gap-2"><MapPin className="h-4 w-4 text-[#9a6b3b]" />{SITE.city}</p>
          </div>
          <div className="text-sm text-[#52525b]">
            <Link to="/aviso-de-privacidad" className="flex min-h-[44px] items-center hover:text-[#18181b]">{t('footer.privacy')}</Link>
            {/* Acceso al panel de administración exclusivamente desde el footer */}
            <Link to="/admin" className="inline-flex min-h-[44px] items-center gap-1.5 text-xs text-[#71717a] hover:text-[#18181b]">
              <Lock className="h-3.5 w-3.5" />
              <span>{t('footer.adminAccess')}</span>
            </Link>
            <p className="mt-2 text-xs text-[#71717a]">© {new Date().getFullYear()} {SITE.name}. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
      <FloatingContactBar />
    </div>
  );
}
