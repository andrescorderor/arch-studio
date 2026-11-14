import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { SafeImage } from '../components/SafeImage';
import { BlogLoader } from '../components/BlogLoader';
import { useContact } from '../context/ContactContext';
import { loc, type ArchitecturalProject } from '../data/content';
import { usePublicBlogs } from '../lib/usePublicBlogs';
import { useSiteData } from '../lib/useSiteData';
import { SITE } from '../config/site';

function ProjectTechCard({ project, num, className = '' }: { project: ArchitecturalProject; num: string; className?: string }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { pageContext, setPageContext } = useContact();
  const title = loc(project.title, lang);
  const isSelected = pageContext === title;

  return (
    <div className={`flex flex-col gap-6 rounded-2xl border border-[#e6e3de] bg-[#faf9f7] p-6 shadow-2xl shadow-[#18181b]/5 md:p-7 ${className}`}>
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#65656a]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#9a6b3b]" />
            {loc(project.location, lang)}
          </p>
          <Link to={`/portafolios/${project.portfolio}/${project.id}`} className="text-3xl font-medium tracking-tight text-[#18181b] transition-colors hover:text-[#9a6b3b] md:text-4xl">
            {title}
          </Link>
        </div>
        <span className="font-mono text-xs text-[#65656a]">({num})</span>
      </div>

      <p className="text-sm leading-relaxed text-[#65656a] text-pretty">{loc(project.summary, lang)}</p>

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#e6e3de] font-mono text-xs">
        <div className="flex flex-col gap-1.5 bg-[#f1efeb] p-3">
          <dt className="uppercase tracking-wider text-[#65656a]">{t('portfolios.location')}</dt>
          <dd className="text-[#18181b]">{loc(project.location, lang)}</dd>
        </div>
        <div className="flex flex-col gap-1.5 bg-[#f1efeb] p-3">
          <dt className="uppercase tracking-wider text-[#65656a]">{t('portfolios.area')}</dt>
          <dd className="text-[#18181b]">{project.areaM2} {t('portfolios.areaUnit')}</dd>
        </div>
        <div className="flex flex-col gap-1.5 bg-[#f1efeb] p-3">
          <dt className="uppercase tracking-wider text-[#65656a]">{t('portfolios.year')}</dt>
          <dd className="text-[#18181b]">{project.year}</dd>
        </div>
        <div className="flex flex-col gap-1.5 bg-[#f1efeb] p-3">
          <dt className="uppercase tracking-wider text-[#65656a]">{t('portfolios.materials')}</dt>
          <dd className="truncate text-[#18181b]">{loc(project.materials, lang)}</dd>
        </div>
      </dl>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPageContext(title, project.coverImage)}
          aria-pressed={isSelected}
          className={`group flex flex-1 items-center justify-between rounded-full px-5 py-3 text-xs font-medium uppercase tracking-wide transition-colors ${
            isSelected
              ? 'bg-[#9a6b3b] text-white'
              : 'bg-[#f1efeb] text-[#18181b] hover:bg-[#9a6b3b] hover:text-white'
          }`}
        >
          <span>{isSelected ? t('portfolios.referenced') : t('portfolios.reference')}</span>
          <span aria-hidden="true" className={`h-2 w-2 rounded-full border border-current ${isSelected ? 'bg-current' : ''}`} />
        </button>
        <Link
          to={`/portafolios/${project.portfolio}/${project.id}`}
          aria-label={t('portfolios.viewProject')}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#e6e3de] bg-white text-[#18181b] transition-colors hover:border-[#9a6b3b] hover:text-[#9a6b3b]"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { setPageContext } = useContact();
  const { blogs, loading: blogsLoading } = usePublicBlogs();
  const { portfolios, projects } = useSiteData();
  const [activePortfolioId, setActivePortfolioId] = useState<string>('');
  const carouselRef = useRef<HTMLDivElement>(null);

  const selectedPortfolio = portfolios.find((p) => p.id === activePortfolioId) || portfolios[0];
  const activeProjects = projects.filter((p) => p.portfolio === selectedPortfolio?.id);
  const featuredProject = projects[0];

  const scrollCarousel = (dir: number) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir * (0.78 * carouselRef.current.clientWidth),
      behavior: 'smooth',
    });
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
          email: SITE.email,
          telephone: SITE.phoneLabel,
          address: { '@type': 'PostalAddress', addressLocality: 'León', addressRegion: 'Guanajuato', addressCountry: 'MX' },
          image: SITE.ogImage,
        }}
      />

      {/* HERO MONUMENTAL */}
      <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[92svh] flex-col overflow-hidden bg-white">
        <div className="absolute inset-0 overflow-hidden">
          <SafeImage
            src="/images/hero.png"
            alt={t('hero.tagline')}
            className="animate-hero-zoom h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/40" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-screen-2xl flex-1 flex-col justify-between px-5 pb-10 pt-24 md:px-7 md:pt-32">
          {featuredProject && (
            <div className="animate-rise mt-auto mb-auto hidden grid-cols-4 items-center gap-8 border-y border-[#e6e3de] py-3 text-xs font-medium uppercase tracking-wide text-[#18181b] [animation-delay:350ms] md:grid">
              <span>({t('hero.feature')})</span>
              <span>{loc(featuredProject.title, lang)} · {loc(featuredProject.location, lang)}</span>
              <span className="tabular-nums">{featuredProject.year}</span>
              <Link
                to={`/portafolios/${featuredProject.portfolio}/${featuredProject.id}`}
                className="group flex items-center justify-self-end gap-3"
              >
                <span className="underline decoration-[#e6e3de] underline-offset-4 transition-colors group-hover:text-[#9a6b3b] group-hover:decoration-[#9a6b3b]">
                  {t('portfolios.viewProject')}
                </span>
                <span aria-hidden="true" className="h-2 w-2 rounded-full border border-current" />
              </Link>
            </div>
          )}

          <div className="mt-auto flex flex-col gap-6 pt-12">
            <div className="animate-rise flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#18181b]">
              <span>{t('hero.badge')}</span>
              <span aria-hidden="true" className="h-5 w-px bg-[#e6e3de]" />
              <span className="text-[#65656a]">{t('hero.discipline')}</span>
            </div>

            <h1 id="hero-title" className="animate-rise text-[16vw] font-extralight uppercase leading-[0.82] tracking-[-0.04em] text-[#18181b] [animation-delay:120ms] md:text-[10.5vw]">
              {lang === 'ja' ? (
                <>
                  {t('hero.titleA')}<span className="font-display italic text-[#9a6b3b]">と</span>{t('hero.titleB')}
                </>
              ) : (
                <>
                  {t('hero.titleA')} <span className="font-display italic text-[#9a6b3b]">&amp;</span> {t('hero.titleB')}
                </>
              )}
            </h1>

            <div className="animate-rise flex flex-col justify-between gap-8 [animation-delay:240ms] md:flex-row md:items-end">
              <p className="max-w-2xl text-xl font-normal leading-tight tracking-tight text-[#18181b] text-pretty md:text-3xl">
                {t('hero.tagline')}
              </p>
              <div className="flex items-end justify-between gap-8 text-xs font-medium uppercase tracking-wide text-[#65656a] md:flex-col md:items-end">
                <span>{t('hero.coords')}</span>
                <a href="#work" className="text-[#18181b] transition-colors hover:text-[#9a6b3b]">
                  {t('hero.scroll')} ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTAFOLIOS SEGMENTADOS INTERACTIVOS */}
      <section id="work" aria-labelledby="work-title" className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-5 md:px-7">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[.24em] text-[#9a6b3b]">
                {t('home.portfoliosBadge')}
              </p>
              <h2 id="work-title" className="text-[14vw] font-medium uppercase leading-[.82] tracking-[-0.04em] text-[#18181b] md:text-[10vw]">
                {t('home.portfoliosTitle')}
              </h2>
            </div>
            <span className="hidden pb-2 text-xs uppercase tracking-wide text-[#65656a] md:block">
              {t('home.portfoliosScale')}
            </span>
          </div>

          <div role="tablist" aria-label={t('nav.portfolios')} className="mt-12 grid grid-cols-1 gap-2 md:mt-16 md:grid-cols-3">
            {portfolios.map((pf, idx) => {
              const active = pf.id === selectedPortfolio?.id;
              return (
                <button
                  key={pf.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActivePortfolioId(pf.id);
                    setPageContext(loc(pf.name, lang), pf.coverImage);
                  }}
                  className={`group flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-colors duration-500 ${
                    active
                      ? 'bg-[#18181b] text-white'
                      : 'border border-[#e6e3de] bg-[#faf9f7] text-[#65656a] hover:text-[#18181b]'
                  }`}
                >
                  <span className={`font-mono text-xs ${active ? 'text-[#d4a373]' : 'text-[#9a6b3b]'}`}>
                    0{idx + 1}.
                  </span>
                  <span className="text-sm font-medium">{loc(pf.name, lang)}</span>
                  <span className="ml-auto transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </button>
              );
            })}
          </div>

          {selectedPortfolio && (
            <div className="mt-9 flex flex-wrap items-end justify-between gap-6 md:ml-[33.3%]">
              <p className="max-w-2xl text-xl leading-snug tracking-tight text-[#18181b] text-pretty md:text-2xl">
                {loc(selectedPortfolio.desc, lang)}
              </p>
              <Link
                to={`/portafolios/${selectedPortfolio.id}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#e6e3de] px-5 text-xs font-medium uppercase tracking-wider text-[#18181b] transition-colors hover:border-[#9a6b3b] hover:text-[#9a6b3b]"
              >
                {t('home.explorePortfolio')} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Render dinámico según el estilo del portafolio elegido */}
        {selectedPortfolio && (
          <div className="animate-rise mt-16 md:mt-24">
            {selectedPortfolio.layoutStyle === 'editorial' && (
              <div className="flex flex-col gap-24 md:gap-32">
                {activeProjects.map((proj, idx) => {
                  const num = String(idx + 1).padStart(2, '0');
                  const isOffset = idx % 3 === 1;
                  const isLeft = idx % 3 === 2;

                  if (isOffset) {
                    return (
                      <article key={proj.id} className="mx-auto grid w-full max-w-screen-2xl grid-cols-12 gap-y-8 px-5 md:gap-x-6 md:px-7">
                        <div className="col-span-12 flex flex-col justify-between gap-10 md:col-span-5 lg:col-span-4">
                          <span aria-hidden="true" className="block text-[30vw] font-extralight leading-[0.75] tracking-[-0.06em] text-[#9a6b3b] md:text-[13vw]">
                            {num}
                          </span>
                          <ProjectTechCard project={proj} num={num} />
                        </div>
                        <div className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
                          <Link to={`/portafolios/${proj.portfolio}/${proj.id}`} data-cursor="view" className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[#faf9f7]">
                            <SafeImage src={proj.coverImage} alt={loc(proj.title, lang)} className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-tectonic)] group-hover:scale-[1.06]" />
                          </Link>
                        </div>
                      </article>
                    );
                  }

                  return (
                    <article key={proj.id} className="w-full">
                      <div className={`mx-auto flex max-w-screen-2xl px-5 md:px-7 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                        <span aria-hidden="true" className="relative z-10 -mb-[0.12em] block text-[30vw] font-extralight leading-[0.75] tracking-[-0.06em] text-[#9a6b3b] md:text-[13vw]">
                          {num}
                        </span>
                      </div>
                      <div className="mx-auto max-w-screen-2xl px-5 md:px-7">
                        <Link to={`/portafolios/${proj.portfolio}/${proj.id}`} data-cursor="view" className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#faf9f7] md:aspect-[21/9]">
                          <SafeImage src={proj.coverImage} alt={loc(proj.title, lang)} className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-tectonic)] group-hover:scale-[1.06]" />
                        </Link>
                      </div>
                      <div className="mx-auto grid max-w-screen-2xl grid-cols-12 px-5 md:px-7">
                        <ProjectTechCard
                          project={proj}
                          num={num}
                          className={`relative z-10 col-span-12 mt-6 md:col-span-6 md:-mt-44 lg:col-span-4 ${
                            isLeft ? 'md:col-start-2' : 'md:col-start-7 lg:col-start-8'
                          }`}
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {selectedPortfolio.layoutStyle === 'technical' && (
              <div className="mx-auto max-w-screen-2xl px-5 md:px-7">
                <div className="mb-7 hidden grid-cols-12 border-b border-[#e6e3de] pb-3 font-mono text-[10px] uppercase tracking-wider text-[#65656a] md:grid">
                  <span className="col-span-5">{t('portfolios.colProject')}</span>
                  <span className="col-span-3">{t('portfolios.colLocation')}</span>
                  <span className="col-span-2">{t('portfolios.colArea')}</span>
                  <span className="col-span-2 text-right">{t('portfolios.colYear')}</span>
                </div>
                <div className="flex flex-col">
                  {activeProjects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      onClick={() => setPageContext(loc(proj.title, lang), proj.coverImage)}
                      className="group relative grid cursor-pointer grid-cols-12 items-center gap-y-4 border-b border-[#e6e3de] py-6 text-left transition-colors hover:bg-[#faf9f7] md:gap-4 md:py-8"
                    >
                      <span className="col-span-1 font-mono text-xs text-[#9a6b3b]">0{idx + 1}</span>
                      <div className="col-span-11 flex flex-col md:col-span-4">
                        <Link to={`/portafolios/${proj.portfolio}/${proj.id}`} className="text-2xl font-medium tracking-tight text-[#18181b] transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                          {loc(proj.title, lang)}
                        </Link>
                        <span className="mt-1 text-xs text-[#65656a]">{loc(proj.materials, lang)}</span>
                      </div>
                      <span className="col-span-6 col-start-2 text-sm text-[#18181b] md:col-span-3 md:col-start-auto">
                        {loc(proj.location, lang)}
                      </span>
                      <span className="col-span-3 font-mono text-xs text-[#18181b] md:col-span-2">
                        {proj.areaM2} {t('portfolios.areaUnit')}
                      </span>
                      <span className="col-span-2 text-right font-mono text-xs text-[#65656a]">{proj.year}</span>
                      <span aria-hidden="true" className="pointer-events-none absolute right-16 top-1/2 z-20 hidden h-36 w-56 -translate-y-1/2 scale-95 overflow-hidden rounded-xl opacity-0 shadow-xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 md:block">
                        <SafeImage src={proj.coverImage} alt="" className="h-full w-full object-cover" />
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-xs text-[#65656a]">{t('portfolios.cue')}</p>
              </div>
            )}

            {selectedPortfolio.layoutStyle === 'organic' && (
              <div className="relative">
                <div ref={carouselRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 [scrollbar-width:none] md:px-7">
                  {activeProjects.map((proj, idx) => (
                    <article key={proj.id} className="group relative min-w-[88vw] snap-center md:min-w-[70vw] xl:min-w-[62vw]">
                      <Link
                        to={`/portafolios/${proj.portfolio}/${proj.id}`}
                        onClick={() => setPageContext(loc(proj.title, lang), proj.coverImage)}
                        data-cursor="view"
                        className="block w-full text-left"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#f1efeb]">
                          <SafeImage
                            src={proj.coverImage}
                            alt={loc(proj.title, lang)}
                            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-tectonic)] group-hover:scale-[1.04]"
                          />
                          <span className="absolute left-5 top-5 rounded-full bg-white/85 px-4 py-2 font-mono text-xs text-[#18181b] backdrop-blur">
                            0{idx + 1} / 0{activeProjects.length}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4 py-4">
                          <div>
                            <h3 className="text-xl font-medium text-[#18181b] md:text-3xl">{loc(proj.title, lang)}</h3>
                            <p className="mt-1 text-sm text-[#65656a]">{loc(proj.location, lang)}</p>
                          </div>
                          <span className="font-mono text-xs text-[#65656a]">
                            {proj.areaM2} {t('portfolios.areaUnit')} · {proj.year}
                          </span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
                <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-5 md:px-7">
                  <span className="text-xs uppercase tracking-wide text-[#65656a]">{t('portfolios.drag')}</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-label={t('portfolios.previous')}
                      onClick={() => scrollCarousel(-1)}
                      className="grid h-11 w-11 place-items-center rounded-full border border-[#e6e3de] text-[#18181b] transition-colors hover:bg-[#18181b] hover:text-white"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      aria-label={t('portfolios.next')}
                      onClick={() => scrollCarousel(1)}
                      className="grid h-11 w-11 place-items-center rounded-full border border-[#e6e3de] text-[#18181b] transition-colors hover:bg-[#18181b] hover:text-white"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* EL DESPACHO / MANIFIESTO */}
      <section id="practice" aria-labelledby="practice-title" className="mx-auto max-w-screen-2xl px-5 py-24 md:px-7 md:py-36">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-[#65656a]">
          <span>{t('home.practiceEyebrow')}</span>
          <span>{t('hero.coords')}</span>
        </div>

        <h2 id="practice-title" className="mt-9 text-[12vw] font-medium uppercase leading-[.9] tracking-[-.05em] text-[#18181b] md:text-[8.5vw]">
          {t('home.practiceHeadline')}<br />
          <span className="font-extralight text-[#9a6b3b]">{t('home.practiceHighlight')}</span>
        </h2>

        <div className="mt-14 grid grid-cols-12 gap-y-10 md:mt-20 md:gap-x-6">
          <figure data-cursor="view" className="group relative col-span-12 aspect-[4/3] overflow-hidden rounded-2xl bg-[#faf9f7] md:col-span-5 md:col-start-2 md:aspect-[3/2]">
            <SafeImage
              src="/images/studio.png"
              alt={t('home.practiceHeadline')}
              className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-tectonic)] group-hover:scale-[1.04]"
            />
          </figure>
          <div className="col-span-12 flex flex-col justify-center gap-5 md:col-span-5 md:col-start-8">
            <p className="text-xl leading-snug tracking-tight text-[#18181b] text-pretty md:text-2xl">
              {t('home.practiceBody')}
            </p>
            <p className="text-sm leading-relaxed text-[#65656a] text-pretty">
              {t('home.practiceDetail')}
            </p>
            <Link to="/nosotros" className="inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#9a6b3b] hover:text-[#18181b]">
              {t('nav.about')} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-3 md:mt-36 md:grid-cols-3">
          {[
            ['01', t('home.p1Title'), t('home.p1Text')],
            ['02', t('home.p2Title'), t('home.p2Text')],
            ['03', t('home.p3Title'), t('home.p3Text')],
          ].map(([num, title, text], idx) => (
            <article
              key={num}
              className={`flex flex-col justify-between gap-12 rounded-2xl border border-[#e6e3de] bg-[#faf9f7] p-6 md:min-h-80 md:p-8 ${
                idx === 1 ? 'md:translate-y-12' : idx === 2 ? 'md:translate-y-24' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-[#65656a]">(0{idx + 1} / 03)</span>
                <span className="font-mono text-4xl text-[#9a6b3b]">{num}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-medium tracking-tight text-[#18181b]">{title}</h3>
                <p className="text-sm leading-relaxed text-[#65656a] text-pretty">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MÉTODO 01—04 */}
      <section id="method" aria-labelledby="method-title" className="px-3 py-12 md:mt-16 md:px-4">
        <div className="mx-auto max-w-screen-2xl rounded-3xl border border-[#e6e3de] bg-[#faf9f7] px-5 py-16 md:px-10 md:py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[#9a6b3b]">
                {t('home.methodEyebrow')}
              </p>
              <h2 id="method-title" className="max-w-2xl text-4xl font-medium leading-[1.02] text-[#18181b] text-balance md:text-6xl">
                {t('home.methodTitle')}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-wide text-[#65656a]">01—04</span>
          </div>

          <ol className="mt-16 grid grid-cols-1 gap-3 md:mt-24 md:grid-cols-4">
            {[
              ['I', t('home.m1Title'), t('home.m1Text')],
              ['II', t('home.m2Title'), t('home.m2Text')],
              ['III', t('home.m3Title'), t('home.m3Text')],
              ['IV', t('home.m4Title'), t('home.m4Text')],
            ].map(([roman, title, text], idx) => (
              <li
                key={roman}
                className="group flex min-h-72 flex-col justify-between gap-10 rounded-2xl bg-[#f1efeb] p-6 transition-colors duration-500 hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#65656a]">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#9a6b3b]" />
                    (0{idx + 1} / 04)
                  </span>
                  <span className="font-mono text-3xl text-[#9a6b3b]">{roman}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-medium tracking-tight text-[#18181b]">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#65656a] text-pretty">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* BLOG / BITÁCORA RECIENTE */}
      <section className="mx-auto max-w-screen-2xl px-5 py-20 md:px-7 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[.24em] text-[#9a6b3b]">{t('home.journalBadge')}</span>
            <h2 className="text-3xl font-medium tracking-tight text-[#18181b] sm:text-5xl">{t('home.journalTitle')}</h2>
          </div>
          <Link to="/blog" className="inline-flex min-h-[44px] items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#9a6b3b] hover:text-[#18181b]">
            {t('home.viewAll')} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {blogsLoading ? (
          <BlogLoader count={2} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.slice(0, 2).map((b) => (
              <Link key={b.id} to={`/blog/${b.slug}`} className="group rounded-2xl border border-[#e6e3de] bg-[#faf9f7] p-6 transition hover:border-[#9a6b3b]/50 hover:bg-white">
                <div className="font-mono text-xs text-[#65656a]">{b.publishedAt}</div>
                <h3 className="font-display mt-3 text-2xl font-normal text-[#18181b] transition-colors group-hover:text-[#9a6b3b]">
                  {loc(b.title, lang)}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[#65656a]">{loc(b.excerpt, lang)}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
