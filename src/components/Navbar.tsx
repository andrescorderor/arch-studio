import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Mail, Menu, MessageCircle, X } from 'lucide-react';
import { SITE, LANGS } from '../config/site';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/portafolios', label: t('nav.portfolios') },
    { to: '/nosotros', label: t('nav.about') },
    { to: '/menciones', label: t('nav.awards') },
    { to: '/blog', label: t('nav.journal') },
    { to: '/contacto', label: t('nav.contact') },
  ];

  const changeLang = (l: string) => { i18n.changeLanguage(l); localStorage.setItem('lang', l); };
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-[44px] items-center border-b text-xs uppercase tracking-widest transition-colors hover:text-white ${isActive ? 'border-[#d4a373] text-white' : 'border-transparent text-[#9b9ba8]'}`;

  const lang = (
    <label className="flex items-center gap-1 rounded-md border border-[#2e2e38] bg-[#1a1a20] px-2">
      <Globe className="h-3.5 w-3.5 text-[#9b9ba8]" aria-hidden />
      <span className="sr-only">{t('nav.language')}</span>
      <select value={i18n.language} onChange={(e) => changeLang(e.target.value)} className="min-h-[44px] cursor-pointer bg-transparent px-1 font-mono text-xs tracking-wider text-[#d4a373] focus:outline-none">
        {LANGS.map((l) => (<option key={l} value={l} className="bg-[#18181c] text-white">{l === 'ja' ? '日本語' : l.toUpperCase()}</option>))}
      </select>
    </label>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#23232b] bg-[#121214]/90 backdrop-blur-md">
      {/* Contacto siempre visible */}
      <div className="hidden border-b border-[#1e1e24] bg-[#0f0f11]/60 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-8 py-1 text-[11px] text-[#9b9ba8]">
          <a href={`mailto:${SITE.email}`} className="inline-flex min-h-[32px] items-center gap-1.5 hover:text-white"><Mail className="h-3 w-3 text-[#d4a373]" />{SITE.email}</a>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[32px] items-center gap-1.5 hover:text-white"><MessageCircle className="h-3 w-3 text-[#d4a373]" />{SITE.phoneLabel}</a>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={() => setOpen(false)} className="group flex flex-col justify-center">
          <span className="text-lg font-light uppercase tracking-[0.25em] text-white transition-colors group-hover:text-[#d4a373] sm:text-xl">{t('brand.title')}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9b9ba8]">{t('brand.subtitle')}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {links.map((l) => (<NavLink key={l.to} to={l.to} className={linkCls}>{l.label}</NavLink>))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">{lang}</div>
          <Link to="/admin" className="hidden min-h-[44px] items-center rounded border border-[#2e2e38] px-3 text-[11px] uppercase tracking-wider text-[#9b9ba8] transition-colors hover:border-[#444452] hover:text-white sm:inline-flex">
            {t('nav.login')}
          </Link>
          <button onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? t('nav.close') : t('nav.menu')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#2e2e38] text-white lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-[#23232b] bg-[#141418] px-4 py-4 lg:hidden" aria-label="Móvil">
          <div className="flex flex-col">
            {links.map((l) => (<NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className={linkCls}>{l.label}</NavLink>))}
            <Link to="/admin" onClick={() => setOpen(false)} className="flex min-h-[44px] items-center text-xs uppercase tracking-widest text-[#9b9ba8] hover:text-white">{t('nav.login')}</Link>
          </div>
          <div className="mt-4 flex items-center gap-3 sm:hidden">{lang}</div>
          <div className="mt-4 flex flex-col gap-1 border-t border-[#23232b] pt-4 text-sm text-[#9b9ba8]">
            <a href={`mailto:${SITE.email}`} className="flex min-h-[44px] items-center gap-2 hover:text-white"><Mail className="h-4 w-4 text-[#d4a373]" />{SITE.email}</a>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-2 hover:text-white"><MessageCircle className="h-4 w-4 text-[#d4a373]" />{SITE.phoneLabel}</a>
          </div>
        </nav>
      )}
    </header>
  );
}
