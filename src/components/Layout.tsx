import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock } from 'lucide-react';
import { Navbar } from './Navbar';
import { FloatingContactBar } from './FloatingContactBar';
import { CustomCursor } from './CustomCursor';
import { SITE } from '../config/site';

export function Layout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-white text-[#18181b] selection:bg-[#9a6b3b] selection:text-white">
      <CustomCursor />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded focus:bg-[#18181b] focus:px-3 focus:py-2 focus:text-white"
      >
        {t('nav.skip')}
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>

      <footer className="border-t border-[#e6e3de] bg-[#faf9f7]">
        <div className="mx-auto max-w-screen-2xl px-5 pb-28 pt-20 md:px-7 md:pb-24 md:pt-28">
          <div className="flex items-start justify-between gap-6">
            <p className="text-xs font-medium uppercase tracking-[.24em] text-[#9a6b3b]">
              {SITE.name} · {SITE.city}
            </p>
            <p className="text-xs uppercase tracking-wide text-[#65656a]">
              {t('footer.availability')}
            </p>
          </div>

          <p className="mt-10 text-[15vw] font-medium uppercase leading-[.82] tracking-[-.06em] text-[#18181b] md:text-[11vw]">
            {t('footer.letsTalk')}
            <span className="text-[#9a6b3b]">.</span>
          </p>

          <div className="mt-12 grid grid-cols-12 gap-y-10 md:mt-16 md:gap-x-6">
            <a
              href={`mailto:${SITE.email}`}
              className="col-span-12 w-fit text-xl text-[#18181b] underline decoration-[#e6e3de] underline-offset-8 transition-colors hover:text-[#9a6b3b] hover:decoration-[#9a6b3b] md:col-span-5 md:text-2xl"
            >
              {SITE.email}
            </a>

            <address className="col-span-6 flex flex-col gap-1 text-sm not-italic leading-relaxed text-[#18181b] md:col-span-3 md:col-start-7">
              <span className="mb-2 text-xs font-medium uppercase tracking-wide text-[#18181b]">
                {t('footer.studio')}
              </span>
              <span className="text-[#65656a]">{SITE.city}</span>
              <span className="font-mono text-xs text-[#65656a]">19°25′N 99°08′W</span>
            </address>

            <div className="col-span-6 flex flex-col gap-1 text-sm md:col-span-2">
              <span className="mb-2 text-xs font-medium uppercase tracking-wide text-[#18181b]">
                {t('footer.direct')}
              </span>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#65656a] transition-colors hover:text-[#18181b]"
              >
                WhatsApp · {SITE.phoneLabel}
              </a>
              <button
                type="button"
                onClick={scrollTop}
                className="mt-2 w-fit text-left text-xs uppercase tracking-wide text-[#65656a] transition-colors hover:text-[#9a6b3b]"
              >
                {t('footer.backToTop')}
              </button>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#e6e3de] pt-6 text-xs text-[#65656a]">
            <p>© {new Date().getFullYear()} {SITE.name}. {t('footer.rights')}</p>
            <div className="flex items-center gap-6">
              <Link to="/aviso-de-privacidad" className="transition-colors hover:text-[#18181b]">
                {t('footer.privacy')}
              </Link>
              {/* Acceso al panel de administración exclusivamente desde el footer */}
              <Link to="/admin" className="inline-flex items-center gap-1.5 text-[#65656a] transition-colors hover:text-[#18181b]">
                <Lock className="h-3.5 w-3.5" />
                <span>{t('footer.adminAccess')}</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <FloatingContactBar />
    </div>
  );
}
