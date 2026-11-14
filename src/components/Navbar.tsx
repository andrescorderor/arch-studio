import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe, Mail, Menu, MessageCircle, X } from 'lucide-react';
import { SITE, LANGS } from '../config/site';
import { loc } from '../data/content';
import { useSiteData } from '../lib/useSiteData';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { portfolios } = useSiteData();
  const [open, setOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(false);

  const links = [
    { to: '/nosotros', label: t('nav.about') },
    { to: '/menciones', label: t('nav.awards') },
    { to: '/blog', label: t('nav.journal') },
    { to: '/contacto', label: t('nav.contact') },
  ];

  const changeLang = (l: string) => { i18n.changeLanguage(l); localStorage.setItem('lang', l); };
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-[44px] items-center border-b text-xs uppercase tracking-widest transition-colors hover:text-[#18181b] ${isActive ? 'border-[#9a6b3b] text-[#18181b] font-medium' : 'border-transparent text-[#52525b]'}`;

  const langPicker = (
    <label className="flex items-center gap-1 rounded-md border border-[#e4e4e7] bg-white px-2">
      <Globe className="h-3.5 w-3.5 text-[#71717a]" aria-hidden />
      <span className="sr-only">{t('nav.language')}</span>
      <select value={lang} onChange={(e) => changeLang(e.target.value)} className="min-h-[44px] cursor-pointer bg-transparent px-1 font-mono text-xs tracking-wider text-[#18181b] focus:outline-none">
        {LANGS.map((l) => (<option key={l} value={l} className="bg-white text-[#18181b]">{l === 'ja' ? '日本語' : l.toUpperCase()}</option>))}
      </select>
    </label>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e4e4e7] bg-[#fafaf9]/95 backdrop-blur-md">
      {/* Contacto siempre visible */}
      <div className="hidden border-b border-[#e4e4e7] bg-[#f4f4f5] lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-8 py-1 text-[11px] text-[#52525b]">
          <a href={`mailto:${SITE.email}`} className="inline-flex min-h-[32px] items-center gap-1.5 hover:text-[#18181b]"><Mail className="h-3 w-3 text-[#9a6b3b]" />{SITE.email}</a>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[32px] items-center gap-1.5 hover:text-[#18181b]"><MessageCircle className="h-3 w-3 text-[#9a6b3b]" />{SITE.phoneLabel}</a>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={() => setOpen(false)} className="group flex flex-col justify-center">
          <span className="text-lg font-light uppercase tracking-[0.25em] text-[#18181b] transition-colors group-hover:text-[#9a6b3b] sm:text-xl">{t('brand.title')}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#71717a]">{t('brand.subtitle')}</span>
        </Link>

        {/* Navegación Desktop (sin acceso admin; Portafolios con menú en hover) */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          <div
            className="relative"
            onMouseEnter={() => setHoverMenu(true)}
            onMouseLeave={() => setHoverMenu(false)}
          >
            <NavLink to="/portafolios" className={linkCls}>
              <span className="inline-flex items-center gap-1">
                {t('nav.portfolios')}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${hoverMenu ? 'rotate-180' : ''}`} />
              </span>
            </NavLink>
            {hoverMenu && (
              <div className="absolute left-0 top-full z-50 w-72 pt-2">
                <div className="overflow-hidden rounded-xl border border-[#e4e4e7] bg-white p-2 shadow-xl">
                  {portfolios.map((p, idx) => (
                    <Link
                      key={p.id}
                      to={`/portafolios/${p.id}`}
                      onClick={() => setHoverMenu(false)}
                      className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-xs text-[#18181b] transition hover:bg-[#f4f4f5]"
                    >
                      <span className="font-mono text-[11px]" style={{ color: p.accent }}>0{idx + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{loc(p.name, lang)}</p>
                        <p className="truncate text-[10px] text-[#71717a]">{loc(p.tag, lang)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {links.map((l) => (<NavLink key={l.to} to={l.to} className={linkCls}>{l.label}</NavLink>))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">{langPicker}</div>
          <button onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? t('nav.close') : t('nav.menu')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#e4e4e7] bg-white text-[#18181b] lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil (sin acceso admin; el acceso admin está en el footer) */}
      {open && (
        <nav className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-[#e4e4e7] bg-white px-4 py-4 lg:hidden" aria-label="Móvil">
          <div className="flex flex-col">
            <NavLink to="/portafolios" onClick={() => setOpen(false)} className={linkCls}>{t('nav.portfolios')}</NavLink>
            <div className="ml-4 flex flex-col border-l border-[#e4e4e7] pl-3">
              {portfolios.map((p) => (
                <Link key={p.id} to={`/portafolios/${p.id}`} onClick={() => setOpen(false)} className="flex min-h-[44px] items-center text-xs text-[#52525b] hover:text-[#18181b]">
                  {loc(p.name, lang)}
                </Link>
              ))}
            </div>
            {links.map((l) => (<NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className={linkCls}>{l.label}</NavLink>))}
          </div>
          <div className="mt-4 flex items-center gap-3 sm:hidden">{langPicker}</div>
          <div className="mt-4 flex flex-col gap-1 border-t border-[#e4e4e7] pt-4 text-sm text-[#52525b]">
            <a href={`mailto:${SITE.email}`} className="flex min-h-[44px] items-center gap-2 hover:text-[#18181b]"><Mail className="h-4 w-4 text-[#9a6b3b]" />{SITE.email}</a>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-2 hover:text-[#18181b]"><MessageCircle className="h-4 w-4 text-[#9a6b3b]" />{SITE.phoneLabel}</a>
          </div>
        </nav>
      )}
    </header>
  );
}
