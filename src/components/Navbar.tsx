import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGS } from '../config/site';
import { loc, normalizePortfolioId } from '../data/content';
import { useSiteData } from '../lib/useSiteData';
import { SafeImage } from './SafeImage';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { pathname } = useLocation();
  const { portfolios, projects, settings } = useSiteData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setHoverMenu(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [langOpen]);

  const changeLang = (l: string) => {
    i18n.changeLanguage(l);
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
  };

  const links = [
    { to: '/nosotros', label: t('nav.about') },
    { to: '/menciones', label: t('nav.awards') },
    { to: '/blog', label: t('nav.journal') },
    { to: '/contacto', label: t('nav.contact') },
  ];

  const onDarkHero = pathname === '/' && !scrolled && !mobileOpen;

  const activeHref =
    hoveredHref ||
    (pathname.startsWith('/portafolios')
      ? '/portafolios'
      : links.find((l) => pathname.startsWith(l.to))?.to || null);

  const getUnderlineStyle = () => {
    if (!activeHref || !navRef.current) return { opacity: 0, width: 0, left: 0 };
    const el = Array.from(navRef.current.querySelectorAll<HTMLAnchorElement>('a[data-nav-item]')).find(
      (a) => a.getAttribute('href') === activeHref
    );
    if (!el) return { opacity: 0, width: 0, left: 0 };
    return {
      opacity: 1,
      left: `${el.offsetLeft}px`,
      width: `${el.offsetWidth}px`,
    };
  };

  const navItemCls = (href: string) => {
    const isAct = activeHref === href;
    return `text-xs font-medium uppercase tracking-wide transition-colors ${
      onDarkHero
        ? isAct
          ? 'text-[var(--primary-on-dark)]'
          : 'text-[#faf9f7] hover:text-[var(--primary-on-dark)]'
        : isAct
        ? 'text-[var(--primary)]'
        : 'text-[#33363b] hover:text-[var(--primary)]'
    }`;
  };

  const langNames: Array<[string, string]> = [
    ['es', 'Español'],
    ['en', 'English'],
    ['ja', '日本語'],
  ];

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-40 px-3 transition-all duration-500 ease-[var(--ease-tectonic)] sm:px-5 ${
          mobileOpen || scrolled ? 'pt-3' : 'pt-5'
        }`}
      >
        <div
          className={`pointer-events-auto relative mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-4 transition-[padding,border-radius,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-tectonic)] md:px-7 ${
            scrolled && !mobileOpen
              ? 'rounded-full border border-[#e6e3de]/80 bg-white/85 py-2.5 shadow-[0_12px_44px_-26px_rgba(51,54,59,.45)] backdrop-blur-xl'
              : 'py-2'
          } ${onDarkHero ? 'text-[#faf9f7]' : 'text-[#33363b]'}`}
        >
          {/* Marca Medelsa. (solo inicial mayúscula) */}
          <Link
            to="/"
            aria-label="Medelsa — inicio"
            onClick={() => setMobileOpen(false)}
            className={`relative z-[70] font-medium leading-none tracking-[-0.06em] transition-all duration-500 ease-[var(--ease-tectonic)] ${
              scrolled ? 'text-2xl' : 'text-3xl md:text-5xl'
            } ${mobileOpen || onDarkHero ? 'text-[#faf9f7]' : 'text-[#33363b]'}`}
          >
            Medelsa
            <span className={mobileOpen || onDarkHero ? 'text-[var(--primary-on-dark)]' : 'text-[var(--primary)]'}>
              .
            </span>
          </Link>

          {/* Navegación Desktop con indicador deslizante y mega-menú hover */}
          <nav
            ref={navRef}
            aria-label="Navegación principal"
            onMouseLeave={() => setHoveredHref(null)}
            className="relative hidden items-center gap-6 lg:flex"
          >
            <div
              className="group relative py-3"
              onMouseEnter={() => {
                setHoverMenu(true);
                setHoveredHref('/portafolios');
              }}
              onMouseLeave={() => setHoverMenu(false)}
            >
              <Link
                to="/portafolios"
                data-nav-item="true"
                aria-haspopup="true"
                aria-expanded={hoverMenu}
                onMouseEnter={() => setHoveredHref('/portafolios')}
                className={navItemCls('/portafolios')}
              >
                {t('nav.portfolios')}
                <span aria-hidden="true" className="ml-2">
                  ⌄
                </span>
              </Link>

              <div
                id="portfolio-menu"
                role="group"
                aria-label={t('nav.portfolios')}
                onMouseEnter={() => {
                  setHoverMenu(true);
                  setHoveredHref('/portafolios');
                }}
                onMouseLeave={() => setHoverMenu(false)}
                className={`absolute left-1/2 top-full z-50 w-[min(760px,85vw)] -translate-x-1/2 rounded-2xl border border-[#e6e3de]/80 bg-white/95 p-3 text-[#33363b] shadow-2xl backdrop-blur-xl transition-all duration-500 ease-[var(--ease-tectonic)] ${
                  hoverMenu ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible translate-y-2 opacity-0'
                }`}
              >
                <div className="grid grid-cols-3 gap-2">
                  {portfolios.map((pf, idx) => {
                    const slug = normalizePortfolioId(pf.id);
                    const catProjects = projects.filter((p) => normalizePortfolioId(p.portfolio) === slug);
                    const firstProj = catProjects[0];
                    const thumb = pf.coverImage || firstProj?.coverImage || '/images/hero.png';
                    return (
                      <Link
                        key={pf.id}
                        to={`/portafolios/${slug}`}
                        onClick={() => setHoverMenu(false)}
                        className="group/item rounded-xl p-2 transition-colors hover:bg-[#f2f0ec]"
                      >
                        <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg bg-[#f2f0ec]">
                          <SafeImage
                            src={thumb}
                            alt={loc(pf.name, lang)}
                            className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-tectonic)] group-hover/item:scale-105"
                          />
                          <span className="absolute bottom-2 right-2 rounded-full bg-[#33363b]/80 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur">
                            {String(catProjects.length).padStart(2, '0')} {t('nav.worksCount')}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[var(--primary)]">0{idx + 1}.</span>
                        <span className="ml-2 text-xs font-medium text-[#33363b]">{loc(pf.name, lang)}</span>
                        <span className="mt-1 block truncate text-[10px] text-[#6b7078]">
                          {firstProj ? `${loc(firstProj.title, lang)} · ${loc(firstProj.location, lang)}` : loc(pf.client, lang)}
                        </span>
                        <span
                          aria-hidden="true"
                          className="mt-3 block h-px origin-left scale-x-0 bg-[var(--primary)] transition-transform duration-500 ease-[var(--ease-tectonic)] group-hover/item:scale-x-100"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-nav-item="true"
                onMouseEnter={() => setHoveredHref(l.to)}
                className={navItemCls(l.to)}
              >
                {l.label}
              </Link>
            ))}

            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1 h-px bg-[var(--primary)] transition-all duration-500 ease-[var(--ease-tectonic)]"
              style={getUnderlineStyle()}
            />
          </nav>

          {/* Controles derecha: Selector de idioma + CTA sweep + Hamburguesa animada */}
          <div className="relative z-[70] flex items-center gap-2 sm:gap-3">
            <div ref={langRef} className={`relative ${mobileOpen ? 'hidden lg:block' : ''}`}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={langOpen}
                aria-label={t('nav.language')}
                onClick={() => setLangOpen((v) => !v)}
                className="flex min-h-11 items-center gap-2 rounded-full border border-[#e6e3de] bg-white/90 px-3.5 text-xs font-medium text-[#33363b] transition-colors hover:border-[var(--primary)]"
              >
                <span className="uppercase">{lang}</span>
                <span
                  aria-hidden="true"
                  className={`text-[var(--primary)] transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`}
                >
                  ⌄
                </span>
              </button>

              {langOpen && (
                <div
                  role="menu"
                  aria-label="Language"
                  className="animate-rise absolute right-0 top-[calc(100%+0.75rem)] z-50 w-52 rounded-xl border border-[#e6e3de] bg-[#faf9f7] p-2 text-[#33363b] shadow-2xl"
                >
                  <p className="px-3 pb-2 pt-1 text-[10px] font-medium uppercase tracking-[.2em] text-[#6b7078]">
                    Idioma · Language · 言語
                  </p>
                  {langNames.map(([code, label]) => (
                    <button
                      key={code}
                      type="button"
                      role="menuitemradio"
                      aria-checked={lang === code}
                      onClick={() => {
                        changeLang(code);
                        setLangOpen(false);
                      }}
                      className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition-colors hover:bg-[#f2f0ec] ${
                        lang === code ? 'text-[var(--primary)] font-medium' : 'text-[#33363b]'
                      }`}
                    >
                      <span>{label}</span>
                      <span className="font-mono text-[10px] uppercase text-[#6b7078]">{code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contacto"
              className="sweep-cta group hidden min-h-11 items-center gap-2 overflow-hidden rounded-full border border-transparent bg-[#33363b] px-5 py-3 text-xs font-medium text-[#faf9f7] transition-colors duration-500 sm:inline-flex"
            >
              <span className="relative z-[1]">{t('cta.open')}</span>
              <span
                aria-hidden="true"
                className="relative z-[1] text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </Link>

            {/* Botón hamburguesa con 2 líneas que mutan a X */}
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t('nav.close') : t('nav.menu')}
              onClick={() => setMobileOpen((v) => !v)}
              className={`relative grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
                mobileOpen
                  ? 'border-white/25 bg-white/10 text-[#faf9f7]'
                  : 'border-[#e6e3de] bg-white/90 text-[#33363b]'
              }`}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute inset-x-0 top-0 h-0.5 bg-current transition-transform duration-300 ${
                    mobileOpen ? 'translate-y-[5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 bg-current transition-transform duration-300 ${
                    mobileOpen ? '-translate-y-[5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Drawer Fullscreen Mobile & Tablet (< 1024px) en #33363b */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-[#33363b] px-5 pb-10 pt-24 text-[#f5f3ef] lg:hidden"
        >
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
            <div className="mobile-nav-item border-b border-white/15 pb-5">
              <Link
                to="/portafolios"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-14 items-center gap-4 py-2"
              >
                <span className="font-mono text-xs text-[var(--primary-on-dark)]">01</span>
                <span className="text-3xl font-light tracking-[-.04em]">{t('nav.portfolios')}</span>
              </Link>

              <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                {portfolios.map((pf, idx) => {
                  const slug = normalizePortfolioId(pf.id);
                  const catProjects = projects.filter((p) => normalizePortfolioId(p.portfolio) === slug);
                  const firstProj = catProjects[0];
                  const thumb = pf.coverImage || firstProj?.coverImage || '/images/hero.png';
                  return (
                    <Link
                      key={pf.id}
                      to={`/portafolios/${slug}`}
                      onClick={() => setMobileOpen(false)}
                      style={{ '--stagger': `${idx * 80}ms` } as React.CSSProperties}
                      className="mobile-nav-item group flex min-h-20 items-center gap-3 rounded-xl border border-white/10 p-2.5 transition-colors active:bg-white/10"
                    >
                      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/10">
                        <SafeImage src={thumb} alt="" className="h-full w-full object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm leading-tight">{loc(pf.name, lang)}</span>
                        <span className="mt-1 block font-mono text-[10px] text-white/50">
                          {String(catProjects.length).padStart(2, '0')} {t('nav.worksCount')}
                        </span>
                      </span>
                      <span className="font-mono text-[10px] text-[var(--primary-on-dark)]">0{idx + 1}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {links.map((l, idx) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                style={{ '--stagger': `${(idx + 1) * 80}ms` } as React.CSSProperties}
                className="mobile-nav-item flex min-h-14 items-center gap-4 border-b border-white/15 py-3"
              >
                <span className="font-mono text-xs text-[var(--primary-on-dark)]">0{idx + 2}</span>
                <span className="text-3xl font-light tracking-[-.04em]">{l.label}</span>
              </Link>
            ))}

            <div className="mobile-nav-item mt-8" style={{ '--stagger': '400ms' } as React.CSSProperties}>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[.2em] text-white/50">
                Idioma · Language · 言語
              </p>
              <div className="flex gap-2">
                {LANGS.map((code) => (
                  <button
                    key={code}
                    type="button"
                    aria-pressed={lang === code}
                    onClick={() => changeLang(code)}
                    className={`min-h-12 min-w-16 rounded-full border px-4 text-xs uppercase transition-colors ${
                      lang === code
                        ? 'border-[var(--primary-on-dark)] bg-[var(--primary-on-dark)] font-medium text-[#33363b]'
                        : 'border-white/20 text-white/75 hover:border-white/50'
                    }`}
                  >
                    {code === 'ja' ? '日本語' : code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="mobile-nav-item mt-auto flex flex-wrap gap-5 border-t border-white/15 pt-7"
              style={{ '--stagger': '480ms' } as React.CSSProperties}
            >
              {settings.whatsappEnabled && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 text-sm text-white/75 transition-colors hover:text-[var(--primary-on-dark)]"
                >
                  WhatsApp ↗
                </a>
              )}
              {settings.emailEnabled && (
                <a
                  href={`mailto:${settings.email}`}
                  className="min-h-11 text-sm text-white/75 transition-colors hover:text-[var(--primary-on-dark)]"
                >
                  {settings.email} ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
