import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe, Mail, Menu, MessageCircle, X } from 'lucide-react';
import { SITE, LANGS } from '../config/site';
import { loc } from '../data/content';
import { useSiteData } from '../lib/useSiteData';
import { SafeImage } from './SafeImage';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { portfolios, projects } = useSiteData();
  const [open, setOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/nosotros', label: t('nav.about') },
    { to: '/menciones', label: t('nav.awards') },
    { to: '/blog', label: t('nav.journal') },
    { to: '/contacto', label: t('nav.contact') },
  ];

  const changeLang = (l: string) => {
    i18n.changeLanguage(l);
    localStorage.setItem('lang', l);
  };

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-[44px] items-center text-xs font-medium uppercase tracking-wide transition-colors hover:text-[#9a6b3b] ${
      isActive ? 'text-[#9a6b3b]' : 'text-[#18181b]'
    }`;

  const langPicker = (
    <label className="flex items-center gap-1.5 rounded-full border border-[#e6e3de] bg-white/90 px-3 transition-colors hover:border-[#9a6b3b]">
      <Globe className="h-3.5 w-3.5 text-[#9a6b3b]" aria-hidden />
      <span className="sr-only">{t('nav.language')}</span>
      <select
        value={lang}
        onChange={(e) => changeLang(e.target.value)}
        className="min-h-[40px] cursor-pointer bg-transparent pr-1 font-mono text-xs uppercase tracking-wider text-[#18181b] focus:outline-none"
      >
        {LANGS.map((l) => (
          <option key={l} value={l} className="bg-white text-[#18181b]">
            {l === 'ja' ? '日本語' : l.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        scrolled
          ? 'border-b border-[#e6e3de] bg-white/90 shadow-sm backdrop-blur-xl'
          : 'border-b border-[#e6e3de]/60 bg-white/80 backdrop-blur-md'
      }`}
    >
      {/* Contacto siempre visible arriba en escritorio */}
      <div className="hidden border-b border-[#e6e3de]/70 bg-[#faf9f7] lg:block">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-end gap-6 px-7 py-1 text-[11px] text-[#65656a]">
          <a href={`mailto:${SITE.email}`} className="inline-flex min-h-[28px] items-center gap-1.5 transition-colors hover:text-[#18181b]">
            <Mail className="h-3 w-3 text-[#9a6b3b]" />
            {SITE.email}
          </a>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[28px] items-center gap-1.5 transition-colors hover:text-[#18181b]">
            <MessageCircle className="h-3 w-3 text-[#9a6b3b]" />
            {SITE.phoneLabel}
          </a>
        </div>
      </div>

      <div className={`mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-5 transition-all duration-500 md:px-7 ${scrolled ? 'py-2.5' : 'py-4'}`}>
        <Link to="/" onClick={() => setOpen(false)} className="group flex items-baseline gap-1">
          <span className={`font-medium leading-none tracking-[-0.06em] text-[#18181b] transition-all duration-500 ${scrolled ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
            {t('brand.title').split(' ')[0]}
            <span className="text-[#9a6b3b]">.</span>
          </span>
        </Link>

        {/* Navegación Desktop: sin acceso admin; Portafolios con mega-menú en hover */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          <div
            className="relative py-1"
            onMouseEnter={() => setHoverMenu(true)}
            onMouseLeave={() => setHoverMenu(false)}
          >
            <NavLink to="/portafolios" className={linkCls}>
              <span className="inline-flex items-center gap-1.5">
                {t('nav.portfolios')}
                <ChevronDown className={`h-3.5 w-3.5 text-[#9a6b3b] transition-transform duration-300 ${hoverMenu ? 'rotate-180' : ''}`} />
              </span>
            </NavLink>

            <div
              role="group"
              aria-label={t('nav.portfolios')}
              className={`absolute left-1/2 top-full z-50 w-[min(720px,85vw)] -translate-x-1/2 pt-2 transition-all duration-300 ${
                hoverMenu ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible translate-y-2 opacity-0'
              }`}
            >
              <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[#e6e3de] bg-white/95 p-3 shadow-2xl backdrop-blur-xl">
                {portfolios.map((p, idx) => {
                  const firstProj = projects.find((pr) => pr.portfolio === p.id);
                  const thumb = p.coverImage || firstProj?.coverImage || SITE.ogImage;
                  return (
                    <Link
                      key={p.id}
                      to={`/portafolios/${p.id}`}
                      onClick={() => setHoverMenu(false)}
                      className="group/item rounded-xl p-2 transition-colors hover:bg-[#f1efeb]"
                    >
                      <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg bg-[#f1efeb]">
                        <SafeImage
                          src={thumb}
                          alt={loc(p.name, lang)}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover/item:scale-105"
                        />
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-mono text-[10px] text-[#9a6b3b]">0{idx + 1}.</span>
                        <span className="truncate text-xs font-medium text-[#18181b]">{loc(p.name, lang)}</span>
                      </div>
                      <span className="mt-1 block truncate text-[10px] text-[#65656a]">
                        {firstProj ? `${loc(firstProj.title, lang)} · ${loc(firstProj.location, lang)}` : loc(p.client, lang)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkCls}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block">{langPicker}</div>
          <Link
            to="/contacto"
            className="hidden rounded-full bg-[#18181b] px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#9a6b3b] lg:inline-flex"
          >
            {t('nav.contact')}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t('nav.close') : t('nav.menu')}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[#e6e3de] bg-white text-[#18181b] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil (sin acceso admin) */}
      {open && (
        <div className="border-t border-[#e6e3de] bg-white px-5 pb-6 pt-3 lg:hidden">
          <nav className="flex flex-col" aria-label="Móvil">
            <NavLink to="/portafolios" onClick={() => setOpen(false)} className="flex min-h-[44px] items-center border-b border-[#e6e3de] text-sm font-medium text-[#18181b]">
              {t('nav.portfolios')}
            </NavLink>
            <div className="border-b border-[#e6e3de] py-2 pl-3">
              {portfolios.map((p, idx) => (
                <Link
                  key={p.id}
                  to={`/portafolios/${p.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[40px] items-center gap-2 text-xs text-[#65656a] hover:text-[#18181b]"
                >
                  <span className="font-mono text-[#9a6b3b]">0{idx + 1}.</span>
                  <span>{loc(p.name, lang)}</span>
                </Link>
              ))}
            </div>
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center border-b border-[#e6e3de] text-sm text-[#52525b]"
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            {langPicker}
            <div className="flex gap-2">
              <a href={`mailto:${SITE.email}`} className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#e6e3de] px-4 text-xs text-[#18181b]">
                <Mail className="h-3.5 w-3.5 text-[#9a6b3b]" />{t('cta.quickEmail')}
              </a>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[#18181b] px-4 text-xs text-white">
                <MessageCircle className="h-3.5 w-3.5 text-[#d4a373]" />WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
