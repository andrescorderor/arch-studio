import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { SafeImage } from '../components/SafeImage';
import { PageHeader, Section } from '../components/PageBits';
import { useContact, usePageContext } from '../context/ContactContext';
import { loc } from '../data/content';
import type { ArchitecturalProject } from '../data/content';
import { useSiteData } from '../lib/useSiteData';

export function PortfoliosIndex() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { portfolios, projects } = useSiteData();

  return (
    <>
      <Seo title={t('seo.portfolios.title')} description={t('seo.portfolios.description')} path="/portafolios" />
      <PageHeader badge={t('nav.portfolios')} title={t('home.portfoliosTitle')} subtitle={t('home.portfoliosText')} />
      <Section>
        <div className="space-y-6">
          {portfolios.map((p, i) => {
            const cover = p.coverImage || projects.find((x) => x.portfolio === p.id)?.coverImage || '';
            return (
              <Link key={p.id} to={`/portafolios/${p.id}`} className="group grid overflow-hidden rounded-2xl border border-[#e4e4e7] bg-white shadow-sm transition hover:border-[#a1a1aa] md:grid-cols-2">
                <div className="aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[320px]">
                  <SafeImage alt={loc(p.name, lang)} src={cover} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center gap-3 p-8">
                  <span className="font-display text-7xl font-light" style={{ color: p.accent }}>0{i + 1}</span>
                  <h2 className="text-2xl font-light text-[#18181b]">{loc(p.name, lang)}</h2>
                  <p className="text-sm text-[#52525b]">{loc(p.desc, lang)}</p>
                  <p className="text-xs uppercase tracking-wider text-[#71717a]">{loc(p.client, lang)}</p>
                  <span className="inline-flex min-h-[44px] items-center gap-1 text-xs uppercase tracking-wider" style={{ color: p.accent }}>{t('home.explorePortfolio')} <ArrowUpRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}

/** Estilo Editorial cálido: bloques alternados a sangre con tipografía serif. */
function EditorialLayout({ projects, pid, accent, lang }: { projects: ArchitecturalProject[]; pid: string; accent: string; lang: string }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-24">
      {projects.map((p, i) => (
        <Link key={p.id} to={`/portafolios/${pid}/${p.id}`} className={`group grid items-center gap-8 md:grid-cols-12 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
          <div className="aspect-[4/3] overflow-hidden rounded-sm bg-[#f4f4f5] md:col-span-8"><SafeImage alt={loc(p.title, lang)} src={p.coverImage} className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105" /></div>
          <div className="space-y-3 md:col-span-4">
            <span className="font-mono text-xs" style={{ color: accent }}>{String(i + 1).padStart(2, '0')} — {p.year}</span>
            <h2 className="font-display text-4xl font-light leading-tight text-[#18181b] group-hover:opacity-80">{loc(p.title, lang)}</h2>
            <p className="text-sm text-[#52525b]">{loc(p.summary, lang)}</p>
            <p className="font-mono text-xs text-[#71717a]">{loc(p.location, lang)} · {p.areaM2.toLocaleString(lang)} {t('portfolios.areaUnit')}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

/** Estilo Técnico: tabla de datos con vista previa al pasar el cursor. */
function TechnicalLayout({ projects, pid, accent, lang }: { projects: ArchitecturalProject[]; pid: string; accent: string; lang: string }) {
  const { t } = useTranslation();
  return (
    <div className="divide-y divide-[#e4e4e7] border-y border-[#e4e4e7]">
      {projects.map((p, i) => (
        <Link key={p.id} to={`/portafolios/${pid}/${p.id}`} className="group grid items-center gap-4 py-8 transition hover:bg-[#f4f4f5] md:grid-cols-[80px_1fr_220px_160px_180px] md:px-4">
          <span className="font-mono text-3xl" style={{ color: accent }}>{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h2 className="text-2xl font-light uppercase tracking-wide text-[#18181b] sm:text-3xl">{loc(p.title, lang)}</h2>
            <p className="mt-1 text-xs text-[#52525b]">{loc(p.summary, lang)}</p>
          </div>
          <dl className="font-mono text-xs text-[#71717a]"><dt>{t('portfolios.location')}</dt><dd className="text-[#18181b]">{loc(p.location, lang)}</dd></dl>
          <dl className="font-mono text-xs text-[#71717a]"><dt>{t('portfolios.area')}</dt><dd className="text-[#18181b]">{p.areaM2.toLocaleString(lang)} {t('portfolios.areaUnit')} · {p.year}</dd></dl>
          <div className="aspect-[16/10] overflow-hidden bg-[#e4e4e7] md:opacity-75 md:transition md:group-hover:opacity-100"><SafeImage alt={loc(p.title, lang)} src={p.coverImage} className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" /></div>
        </Link>
      ))}
    </div>
  );
}

/** Estilo Orgánico: carrusel horizontal de tarjetas grandes. */
function OrganicLayout({ projects, pid, lang }: { projects: ArchitecturalProject[]; pid: string; lang: string }) {
  const { t } = useTranslation();
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12">
      {projects.map((p) => (
        <Link key={p.id} to={`/portafolios/${pid}/${p.id}`} className="group relative min-h-[520px] w-[85vw] max-w-[560px] shrink-0 snap-center overflow-hidden rounded-[2rem] bg-[#e4e4e7]">
          <SafeImage alt={loc(p.title, lang)} src={p.coverImage} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181b]/90 via-[#18181b]/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 space-y-2 p-7">
            <span className="rounded-full border border-white/50 bg-[#18181b]/50 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-sm">{p.areaM2.toLocaleString(lang)} {t('portfolios.areaUnit')}</span>
            <h2 className="font-display text-3xl font-light text-white">{loc(p.title, lang)}</h2>
            <p className="text-xs text-[#e4e4e7]">{loc(p.location, lang)} · {p.year}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function PortfolioPage() {
  const { pid } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { portfolios, projects, loading } = useSiteData();
  const portfolio = portfolios.find((p) => p.id === pid);
  usePageContext(portfolio ? loc(portfolio.name, lang) : undefined);

  if (!loading && !portfolio) return <Navigate to="/portafolios" replace />;
  if (!portfolio) return null;

  const list = projects.filter((p) => p.portfolio === pid);
  const others = portfolios.filter((p) => p.id !== pid);

  return (
    <>
      <Seo title={`${loc(portfolio.name, lang)} | ${t('brand.title')}`} description={loc(portfolio.desc, lang)} path={`/portafolios/${pid}`} />
      <PageHeader badge={loc(portfolio.tag, lang)} title={loc(portfolio.name, lang)} subtitle={loc(portfolio.desc, lang)} accent={portfolio.accent} />
      <Section className="bg-white">
        {list.length === 0 ? <p className="text-[#52525b]">{t('portfolios.empty')}</p> :
          portfolio.layoutStyle === 'editorial' ? <EditorialLayout projects={list} pid={portfolio.id} accent={portfolio.accent} lang={lang} /> :
          portfolio.layoutStyle === 'technical' ? <TechnicalLayout projects={list} pid={portfolio.id} accent={portfolio.accent} lang={lang} /> :
          <OrganicLayout projects={list} pid={portfolio.id} lang={lang} />}
      </Section>
      <Section className="border-t border-[#e4e4e7] bg-[#f4f4f5]">
        <p className="mb-4 text-xs uppercase tracking-widest text-[#71717a]">{t('portfolios.otherPortfolios')}</p>
        <div className="flex flex-wrap gap-3">
          {others.map((o) => (
            <Link key={o.id} to={`/portafolios/${o.id}`} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#d4d4d8] bg-white px-5 text-sm text-[#18181b] hover:border-[#71717a]">
              <span style={{ color: o.accent }}>●</span> {loc(o.name, lang)}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

export function ProjectPage() {
  const { pid, projectId } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { open } = useContact();
  const { portfolios, projects, loading } = useSiteData();
  const portfolio = portfolios.find((p) => p.id === pid);
  const project = projects.find((p) => p.id === projectId && p.portfolio === pid);
  usePageContext(project ? loc(project.title, lang) : undefined);

  if (!loading && (!project || !portfolio)) return <Navigate to="/portafolios" replace />;
  if (!project || !portfolio) return null;

  const title = loc(project.title, lang);

  return (
    <>
      <Seo title={`${title} | ${t('brand.title')}`} description={loc(project.summary, lang)} image={project.coverImage} path={`/portafolios/${pid}/${project.id}`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CreativeWork', name: title, description: loc(project.summary, lang), image: project.coverImage, dateCreated: String(project.year), locationCreated: loc(project.location, lang) }} />
      <div className="aspect-[16/9] max-h-[75vh] w-full overflow-hidden bg-[#e4e4e7]"><SafeImage alt={title} src={project.coverImage} className="h-full w-full object-cover" /></div>
      <Section className="bg-white">
        <Link to={`/portafolios/${pid}`} className="mb-8 inline-flex min-h-[44px] items-center text-xs uppercase tracking-wider text-[#52525b] hover:text-[#18181b]">← {t('portfolios.back')}</Link>
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: portfolio.accent }}>{loc(portfolio.tag, lang)}</span>
            <h1 className="font-display text-4xl font-light text-[#18181b] sm:text-6xl">{title}</h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#52525b]">{loc(project.summary, lang)}</p>
            <button onClick={() => open(title)} className="inline-flex min-h-[44px] items-center rounded-xl px-6 text-xs font-semibold uppercase tracking-widest text-white" style={{ background: portfolio.accent }}>{t('portfolios.consultProject')}</button>
          </div>
          <dl className="h-fit divide-y divide-[#e4e4e7] rounded-2xl border border-[#e4e4e7] bg-[#fafaf9] text-sm">
            {[
              [t('portfolios.location'), loc(project.location, lang)],
              [t('portfolios.year'), String(project.year)],
              [t('portfolios.area'), `${project.areaM2.toLocaleString(lang)} ${t('portfolios.areaUnit')}`],
              [t('portfolios.materials'), loc(project.materials, lang)],
            ].map(([k, v]) => (
              <div key={k} className="p-4"><dt className="font-mono text-[11px] uppercase tracking-wider text-[#71717a]">{k}</dt><dd className="mt-1 text-[#18181b]">{v}</dd></div>
            ))}
          </dl>
        </div>
        {project.gallery.length > 1 && (
          <div className="mt-16">
            <h2 className="mb-4 text-xs uppercase tracking-widest text-[#71717a]">{t('portfolios.gallery')}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((g) => (<div key={g} className="aspect-[4/3] overflow-hidden rounded-xl bg-[#f4f4f5]"><SafeImage alt={title} src={g} className="h-full w-full object-cover" /></div>))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
