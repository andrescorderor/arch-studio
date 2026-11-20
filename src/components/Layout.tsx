import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from './Navbar';
import { FloatingContactBar } from './FloatingContactBar';
import { CustomCursor } from './CustomCursor';
import { ArchitecturalPreloader } from './ArchitecturalPreloader';
import { ReadingProgress } from './ReadingProgress';
import { ContactFormCard } from './ContactFormCard';
import { useSiteData } from '../lib/useSiteData';
import { SITE } from '../config/site';

export function Layout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { settings } = useSiteData();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  // Image Curtain Reveal observer
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('img[data-curtain-reveal]').forEach((el) => el.classList.add('is-revealed'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('img[data-curtain-reveal]').forEach((img) => img.classList.add('is-revealed'));
            if (entry.target.matches('img[data-curtain-reveal]')) {
              entry.target.classList.add('is-revealed');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const scan = () => {
      document.querySelectorAll('img[data-curtain-reveal]:not(.is-revealed)').forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          img.classList.add('is-revealed');
        } else {
          obs.observe(img);
        }
      });
    };

    scan();
    const mut = new MutationObserver(scan);
    mut.observe(document.querySelector('main') ?? document.body, { childList: true, subtree: true });
    return () => {
      obs.disconnect();
      mut.disconnect();
    };
  }, [pathname]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const showFooterForm = pathname !== '/contacto' && pathname !== '/admin';

  return (
    <div className="min-h-screen bg-white text-[#33363b] selection:bg-[var(--primary)] selection:text-white">
      <ArchitecturalPreloader />
      <ReadingProgress />
      <CustomCursor />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded focus:bg-[#33363b] focus:px-3 focus:py-2 focus:text-white"
      >
        {t('nav.skip')}
      </a>

      <Navbar />

      <main id="main">
        <div key={pathname} className="page-enter">
          <Outlet />
        </div>
      </main>

      {/* Sección de contacto final visualmente destacada en gris grafito #33363b (cero negro) */}
      <footer id="contact" aria-labelledby="contact-title" className="border-t border-[#4b4f56] bg-[#33363b] text-[#f5f3ef]">
        <div className="mx-auto max-w-screen-2xl px-5 pb-28 pt-16 md:px-7 md:pb-20 md:pt-24">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="text-xs font-medium uppercase tracking-[.24em] text-[var(--primary-on-dark)]">
              Medelsa. · León, Guanajuato
            </p>
            <p className="text-xs uppercase tracking-wide text-[#c5c3bf]">
              {t('footer.availability')}
            </p>
          </div>

          <h2
            id="contact-title"
            className="mt-8 text-[clamp(3.25rem,13vw,10.5rem)] font-medium uppercase leading-[.82] tracking-[-.06em] text-[#f5f3ef]"
          >
            {t('footer.letsTalk')}
            <span className="text-[var(--primary-on-dark)]">.</span>
          </h2>

          <div className="mt-12 grid grid-cols-12 gap-y-10 md:mt-16 md:gap-x-8">
            <div className={`col-span-12 flex flex-col justify-between gap-8 ${showFooterForm ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
              <div>
                {settings.emailEnabled && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="w-fit text-xl text-[#f5f3ef] underline decoration-[#62666c] underline-offset-8 transition-colors hover:text-[var(--primary-on-dark)] hover:decoration-[var(--primary-on-dark)] md:text-2xl"
                  >
                    {settings.email}
                  </a>
                )}

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <address className="flex flex-col gap-1 text-sm not-italic leading-relaxed text-[#f5f3ef]">
                    <span className="mb-1 text-xs font-medium uppercase tracking-wide text-[#c5c3bf]">
                      {t('footer.studio')}
                    </span>
                    <span className="text-[#f5f3ef]/90">{settings.location}</span>
                    <span className="text-[#c5c3bf]">{settings.phone}</span>
                    <span className="font-mono text-xs text-[#c5c3bf]">{SITE.coords}</span>
                  </address>

                  <div className="flex flex-col gap-1 text-sm">
                    <span className="mb-1 text-xs font-medium uppercase tracking-wide text-[#c5c3bf]">
                      {t('footer.direct')}
                    </span>
                    {settings.whatsappEnabled && (
                      <a
                        href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f5f3ef]/90 transition-colors hover:text-[var(--primary-on-dark)]"
                      >
                        WhatsApp ↗
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={scrollTop}
                      className="mt-3 w-fit text-left text-xs uppercase tracking-wide text-[#c5c3bf] transition-colors hover:text-[var(--primary-on-dark)]"
                    >
                      {t('footer.backToTop')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {showFooterForm && (
              <div className="col-span-12 lg:col-span-7">
                <ContactFormCard />
              </div>
            )}
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#4b4f56] pt-6 text-xs text-[#c5c3bf]">
            <p>© 2026 Medelsa. · Derechos reservados / All rights reserved / 全著作権所有</p>
            <div className="flex items-center gap-6">
              <span>León, Guanajuato · México</span>
              <Link to="/aviso-de-privacidad" className="transition-colors hover:text-white">
                {t('footer.privacy')}
              </Link>
              {/* Acceso al panel exclusivamente desde el footer */}
              <Link to="/admin" className="transition-colors hover:text-white">
                {t('footer.adminAccess')}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <FloatingContactBar />
    </div>
  );
}
