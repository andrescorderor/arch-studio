import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { SafeImage } from '../components/SafeImage';
import { loc, normalizePortfolioId } from '../data/content';
import { useSiteData } from '../lib/useSiteData';
import { SITE } from '../config/site';

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { portfolios, projects, settings } = useSiteData();
  const [activePortfolioId, setActivePortfolioId] = useState<string>('');
  const [slideIdx, setSlideIdx] = useState(0);
  const [mobileScrollRatio, setMobileScrollRatio] = useState(0.08);
  const touchStartX = useRef<number | null>(null);

  const selectedPortfolio =
    portfolios.find((p) => normalizePortfolioId(p.id) === normalizePortfolioId(activePortfolioId)) || portfolios[0];
  const selectedSlug = normalizePortfolioId(selectedPortfolio?.id);
  const activeProjects = projects.filter((p) => normalizePortfolioId(p.portfolio) === selectedSlug);
  const currentProject = activeProjects[slideIdx] || activeProjects[0];
  const featuredProject = projects[0];
  const topMentions = (settings.mentions || []).filter((m) => m.title.trim()).slice(0, 4);

  const stepSlide = (dir: number) => {
    if (!activeProjects.length) return;
    setSlideIdx((prev) => (prev + dir + activeProjects.length) % activeProjects.length);
  };

  return (
    <>
      <Seo
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ArchitecturalFirm',
          name: SITE.name,
          url: SITE.url,
          email: settings.email,
          telephone: settings.phone,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'León',
            addressRegion: 'Guanajuato',
            addressCountry: 'MX',
          },
          image: SITE.ogImage,
        }}
      />

      {/* HERO MONUMENTAL (fotografía protagonista estilo OH Architecture) */}
      <section id="top" aria-labelledby="hero-title" className="relative flex min-h-svh flex-col text-[#faf9f7]">
        <div className="absolute inset-0 overflow-hidden">
          <SafeImage
            src="/images/hero.png"
            alt={t('hero.tagline')}
            className="animate-hero-zoom h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#33363b]/75 via-[#33363b]/20 to-[#33363b]/25"
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-screen-2xl flex-1 flex-col justify-between px-5 pb-8 pt-36 md:px-7 md:pt-44">
          {featuredProject && (
            <div className="animate-rise mt-auto mb-auto hidden grid-cols-4 items-center gap-8 border-y border-white/35 py-3 text-xs font-medium uppercase tracking-wide text-[#faf9f7] [animation-delay:400ms] md:grid">
              <span>({t('hero.feature')})</span>
              <span>{loc(featuredProject.title, lang)} · México</span>
              <span className="tabular-nums">{featuredProject.year}</span>
              <Link
                to={`/portafolios/${normalizePortfolioId(featuredProject.portfolio)}/${featuredProject.id}`}
                className="group flex items-center justify-self-end gap-3"
              >
                <span className="underline decoration-white/50 underline-offset-4 transition-colors group-hover:text-[var(--primary-on-dark)] group-hover:decoration-[var(--primary-on-dark)]">
                  {t('portfolios.viewProject')}
                </span>
                <span aria-hidden="true" className="h-2 w-2 rounded-full border border-current" />
              </Link>
            </div>
          )}

          <div className="mt-auto flex flex-col gap-8">
            <div className="animate-rise flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#faf9f7]">
              <span>{t('hero.badge')}</span>
              <span aria-hidden="true" className="h-5 w-px bg-white/70" />
              <span className="text-white/80">{t('hero.discipline')}</span>
            </div>

            <h1
              id="hero-title"
              className="animate-rise text-[clamp(4rem,17vw,15rem)] font-extralight uppercase leading-[0.82] text-[#faf9f7] [animation-delay:120ms]"
            >
              {lang === 'ja' ? (
                <>
                  {t('hero.titleA')}
                  <span className="font-display italic text-[var(--primary-on-dark)]">と</span>
                  {t('hero.titleB')}
                </>
              ) : (
                <>
                  {t('hero.titleA')}{' '}
                  <span className="font-display italic text-[var(--primary-on-dark)]">&amp;</span>{' '}
                  {t('hero.titleB')}
                </>
              )}
            </h1>

            <div className="animate-rise flex flex-col justify-between gap-8 [animation-delay:240ms] md:flex-row md:items-end">
              <p className="max-w-2xl text-xl font-normal leading-tight tracking-tight text-[#faf9f7] text-pretty md:text-3xl">
                {t('hero.tagline')}
              </p>
              <div className="flex items-end justify-between gap-8 text-xs font-medium uppercase tracking-wide text-white/85 md:flex-col md:items-end">
                <span>{SITE.coords}</span>
                <Link
                  to="/portafolios"
                  className="text-[#faf9f7] transition-colors hover:text-[var(--primary-on-dark)]"
                >
                  {t('hero.scroll')} ↓
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 — RESUMEN / SLIDER DE PROYECTOS POR CATEGORÍA */}
      <section aria-labelledby="home-portfolio-title" className="mx-auto max-w-screen-2xl px-5 py-24 md:px-7 md:py-36">
        <div className="flex flex-col justify-between gap-6 border-t border-[#e6e3de] pt-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[.24em] text-[var(--primary)]">
              01 — {t('home.featuredBadge')}
            </p>
            <h2
              id="home-portfolio-title"
              className="mt-4 text-[clamp(3rem,10vw,7.5rem)] font-medium leading-[.86] tracking-[-.06em] text-[#33363b]"
            >
              {t('home.portfoliosTitle')}
              <span className="text-[var(--primary)]">.</span>
            </h2>
          </div>
          <Link
            to="/portafolios"
            className="w-fit shrink-0 border-b border-[#33363b] pb-2 text-xs font-medium uppercase tracking-wide text-[#33363b] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            {t('home.viewCatalog')} ↗
          </Link>
        </div>

        {/* Pestañas de categoría */}
        <div role="tablist" aria-label={t('nav.portfolios')} className="mt-10 flex flex-wrap gap-6 border-b border-[#e6e3de]">
          {portfolios.map((pf) => {
            const isAct = normalizePortfolioId(pf.id) === selectedSlug;
            return (
              <button
                key={pf.id}
                type="button"
                role="tab"
                aria-selected={isAct}
                onClick={() => {
                  setActivePortfolioId(pf.id);
                  setSlideIdx(0);
                }}
                className={`min-h-12 border-b-2 pb-4 text-sm font-medium transition-colors ${
                  isAct
                    ? 'border-[var(--primary)] text-[#33363b]'
                    : 'border-transparent text-[#6b7078] hover:text-[#33363b]'
                }`}
              >
                {loc(pf.name, lang)}
              </button>
            );
          })}
        </div>

        {/* Carrusel móvil con peek lateral + barra de progreso */}
        <div className="mt-8 md:hidden">
          <div
            onScroll={(e) => {
              const el = e.currentTarget;
              const max = el.scrollWidth - el.clientWidth;
              setMobileScrollRatio(max > 0 ? Math.max(0.08, el.scrollLeft / max) : 1);
            }}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 pr-5 [scrollbar-width:none]"
          >
            {activeProjects.map((proj, idx) => (
              <article key={proj.id} className="group w-[84vw] shrink-0 snap-start sm:w-[68vw]">
                <Link
                  to={`/portafolios/${selectedSlug}/${proj.id}`}
                  aria-label={`${t('portfolios.viewProject')} ${loc(proj.title, lang)}`}
                  className="relative block aspect-[4/5] overflow-hidden rounded-xl border border-[#e6e3de] bg-[#f2f0ec]"
                >
                  <img
                    src={proj.coverImage}
                    alt={loc(proj.title, lang)}
                    data-curtain-reveal="true"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-[var(--ease-tectonic)] group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="flex items-baseline justify-between gap-4 border-b border-[#e6e3de] py-4">
                  <div>
                    <p className="font-mono text-[10px] text-[#6b7078]">
                      {String(idx + 1).padStart(2, '0')} / {String(activeProjects.length).padStart(2, '0')}
                    </p>
                    <h3 className="mt-1 text-xl font-medium tracking-tight text-[#33363b]">
                      {loc(proj.title, lang)}
                    </h3>
                    <p className="mt-1 text-xs text-[#6b7078]">{loc(proj.location, lang)}</p>
                  </div>
                  <span className="font-mono text-xs text-[#6b7078]">{proj.year}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-4 h-px w-full overflow-hidden bg-[#e6e3de]">
            <span
              className="block h-full origin-left bg-[var(--primary)] transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${mobileScrollRatio})` }}
            />
          </div>
        </div>

        {/* Vista Desktop & Tablet del Slider */}
        {selectedPortfolio && (
          <div className="mt-8 hidden gap-6 md:grid md:grid-cols-12">
            <div
              className="relative min-h-72 overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#f2f0ec] md:col-span-8 md:aspect-[16/9]"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                const endX = e.changedTouches[0]?.clientX;
                if (touchStartX.current !== null && endX !== undefined && Math.abs(endX - touchStartX.current) > 48) {
                  stepSlide(endX < touchStartX.current ? 1 : -1);
                }
                touchStartX.current = null;
              }}
            >
              <Link
                to={
                  currentProject
                    ? `/portafolios/${selectedSlug}/${currentProject.id}`
                    : `/portafolios/${selectedSlug}`
                }
                data-cursor="view"
                className="absolute inset-0 block"
              >
                <img
                  key={currentProject?.id || selectedSlug}
                  src={currentProject?.coverImage || selectedPortfolio.coverImage || '/images/hero.png'}
                  alt={currentProject ? loc(currentProject.title, lang) : loc(selectedPortfolio.name, lang)}
                  data-curtain-reveal="true"
                  className="h-full w-full object-cover transition-transform duration-700"
                />
              </Link>
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                <button
                  type="button"
                  aria-label={t('portfolios.previous')}
                  onClick={() => stepSlide(-1)}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/50 bg-[#33363b]/80 text-xl text-white backdrop-blur transition-colors hover:bg-[var(--primary)]"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label={t('portfolios.next')}
                  onClick={() => stepSlide(1)}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/50 bg-[#33363b]/80 text-xl text-white backdrop-blur transition-colors hover:bg-[var(--primary)]"
                >
                  →
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between border-t border-[#e6e3de] py-4 md:col-span-4 md:py-5">
              <div>
                <p className="font-mono text-xs text-[var(--primary)]">
                  0{portfolios.findIndex((x) => normalizePortfolioId(x.id) === selectedSlug) + 1} / 0{portfolios.length} ·{' '}
                  {String(activeProjects.length).padStart(2, '0')} {t('nav.worksCount')}
                </p>
                <h3 className="mt-5 text-3xl font-medium tracking-tight text-[#33363b]">
                  {currentProject ? loc(currentProject.title, lang) : loc(selectedPortfolio.name, lang)}
                </h3>
                {currentProject && (
                  <p className="mt-2 text-sm text-[#6b7078]">
                    {loc(currentProject.location, lang)} · {currentProject.areaM2} {t('portfolios.areaUnit')} · {currentProject.year}
                  </p>
                )}
                <p className="mt-5 text-sm leading-relaxed text-[#6b7078]">
                  {currentProject ? loc(currentProject.summary, lang) : loc(selectedPortfolio.desc, lang)}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <Link
                  to={`/portafolios/${selectedSlug}`}
                  className="inline-flex min-h-12 w-fit items-center gap-3 border-b border-[#e6e3de] pb-2 text-xs font-medium uppercase tracking-wide text-[#33363b] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  {t('home.explorePortfolio')} <span aria-hidden="true">↗</span>
                </Link>
                <div className="flex items-center gap-2" aria-label="Seleccionar proyecto">
                  {activeProjects.map((proj, idx) => (
                    <button
                      key={proj.id}
                      type="button"
                      aria-label={`${loc(proj.title, lang)}`}
                      onClick={() => setSlideIdx(idx)}
                      className={`h-3 rounded-full transition-all ${
                        idx === slideIdx ? 'w-8 bg-[var(--primary)]' : 'w-3 bg-[#e6e3de] hover:bg-[var(--primary)]/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 02 — EL ESTUDIO (RESUMEN BREVE) */}
      <section aria-labelledby="home-studio-title" className="mx-auto max-w-screen-2xl px-5 pb-24 md:px-7 md:pb-36">
        <div className="grid gap-10 border-t border-[#e6e3de] pt-5 md:grid-cols-12">
          <p className="text-xs font-medium uppercase tracking-[.24em] text-[var(--primary)] md:col-span-3">
            02 — {t('nav.about')}
          </p>
          <div className="grid gap-10 md:col-span-9 md:grid-cols-12 md:items-center">
            <div className="space-y-5 md:col-span-7">
              <h2
                id="home-studio-title"
                className="text-3xl font-medium leading-[1.05] tracking-[-.04em] text-[#33363b] md:text-5xl"
              >
                {t('home.practiceHeadline')} {t('home.practiceHighlight')}
              </h2>
              <p className="text-base leading-relaxed text-[#6b7078] text-pretty">
                {(loc(settings.aboutText, lang) || t('home.practiceBody')).split('\n\n')[0]}
              </p>
              <Link
                to="/nosotros"
                className="inline-flex min-h-11 items-center gap-2 border-b border-[#33363b] pb-1.5 text-xs font-medium uppercase tracking-wide text-[#33363b] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                {t('home.meetStudio')} ↗
              </Link>
            </div>
            <Link
              to="/nosotros"
              data-cursor="view"
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#faf9f7] md:col-span-5"
            >
              <img
                src={settings.aboutImage || '/images/studio.png'}
                alt="Medelsa Estudio"
                data-curtain-reveal="true"
                className="h-full w-full object-cover transition-transform duration-1000 ease-[var(--ease-tectonic)] group-hover:scale-[1.03]"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* 03 — MENCIONES, PUBLICACIONES Y CONCURSOS (PREVIEW EN HOME) */}
      <section aria-labelledby="home-mentions-title" className="mx-auto max-w-screen-2xl px-5 pb-28 md:px-7 md:pb-40">
        <div className="grid gap-8 border-t border-[#e6e3de] pt-5 md:grid-cols-12">
          <p className="text-xs font-medium uppercase tracking-[.24em] text-[var(--primary)] md:col-span-3">
            03 — {t('awards.badge')}
          </p>
          <div className="md:col-span-9">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2
                id="home-mentions-title"
                className="max-w-3xl text-4xl font-medium leading-[.98] tracking-[-.05em] text-[#33363b] md:text-6xl"
              >
                {t('awards.title')}.
              </h2>
              <Link
                to="/menciones"
                className="w-fit shrink-0 border-b border-[#33363b] pb-2 text-xs font-medium uppercase tracking-wide text-[#33363b] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                {t('home.viewTrajectory')} ↗
              </Link>
            </div>

            <ol className="mt-8 border-t border-[#e6e3de]">
              {topMentions.map((m) => (
                <li key={m.id}>
                  <Link
                    to={m.href || '/menciones'}
                    className="group grid grid-cols-[3.5rem_1fr] items-start gap-4 border-b border-[#e6e3de] py-5 transition-colors duration-300 hover:bg-[var(--primary)]/[.04] md:grid-cols-[4.5rem_8.5rem_1fr_auto] md:items-center md:gap-5 md:px-3"
                  >
                    <span className="font-mono text-xs tabular-nums text-[#6b7078]">{m.year}</span>
                    <span className="inline-flex min-h-7 w-fit items-center rounded-full bg-[var(--primary)]/10 px-3 text-[10px] font-medium uppercase tracking-[.14em] text-[var(--primary)]">
                      {m.type}
                    </span>
                    <div className="col-span-2 min-w-0 md:col-span-1">
                      <p className="text-base leading-snug text-[#33363b] transition-colors group-hover:text-[var(--primary)] md:text-lg">
                        {m.title}
                      </p>
                      <p className="mt-1 text-xs text-[#6b7078]">{m.source}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="hidden text-sm text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1 md:block"
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
