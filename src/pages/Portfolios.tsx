import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { SafeImage } from '../components/SafeImage';
import { PageHeader, Section } from '../components/PageBits';
import { useContact, usePageContext } from '../context/ContactContext';
import { INITIAL_PROJECTS, PORTFOLIOS, loc } from '../data/content';
import type { ArchitecturalProject, PortfolioId } from '../data/content';

const isPid = (v?: string): v is PortfolioId => PORTFOLIOS.some((p) => p.id === v);

export function PortfoliosIndex() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t('seo.portfolios.title')} description={t('seo.portfolios.description')} path="/portafolios" />
      <PageHeader badge={t('nav.portfolios')} title={t('home.portfoliosTitle')} subtitle={t('home.portfoliosText')} />
      <Section>
        <div className="space-y-6">
          {PORTFOLIOS.map((p, i) => {
            const cover = INITIAL_PROJECTS.find((x) => x.portfolio === p.id)!;
            return (
              <Link key={p.id} to={`/portafolios/${p.id}`} className="group grid overflow-hidden rounded-2xl border border-[#23232b] bg-[#18181c] transition hover:border-[#3d3d4c] md:grid-cols-2">
                <div className="aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[320px]">
                  <SafeImage alt="" src={cover.coverImage} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center gap-3 p-8">
                  <span className="font-display text-7xl font-light" style={{ color: p.accent }}>0{i + 1}</span>
                  <h2 className="text-2xl font-light text-white">{t(`portfolios.${p.id}.name`)}</h2>
                  <p className="text-sm text-[#9b9ba8]">{t(`portfolios.${p.id}.desc`)}</p>
                  <p className="text-xs uppercase tracking-wider text-[#6e6e7a]">{t(`portfolios.${p.id}.client`)}</p>
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

/** 01 Residencial — editorial cálido: bloques alternados a sangre con tipografía serif. */
function ResidentialLayout({ projects, lang }: { projects: ArchitecturalProject[]; lang: string }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-24">
      {projects.map((p, i) => (
        <Link key={p.id} to={`/portafolios/residential/${p.id}`} className={`group grid items-center gap-8 md:grid-cols-12 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
          <div className="aspect-[4/3] overflow-hidden rounded-sm md:col-span-8"><SafeImage alt={loc(p.title, lang)} src={p.coverImage} className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105" /></div>
          <div className="space-y-3 md:col-span-4">
            <span className="font-mono text-xs text-[#d4a373]">{String(i + 1).padStart(2, '0')} — {p.year}</span>
            <h2 className="font-display text-4xl font-light leading-tight text-white group-hover:text-[#d4a373]">{loc(p.title, lang)}</h2>
            <p className="text-sm text-[#9b9ba8]">{loc(p.summary, lang)}</p>
            <p className="font-mono text-xs text-[#6e6e7a]">{loc(p.location, lang)} · {p.areaM2.toLocaleString(lang)} {t('portfolios.areaUnit')}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

/** 02 Corporativo — técnico/brutalista: tabla de datos con vista previa al pasar el cursor. */
function CommercialLayout({ projects, lang }: { projects: ArchitecturalProject[]; lang: string }) {
  const { t } = useTranslation();
  return (
    <div className="divide-y divide-[#2a2a34] border-y border-[#2a2a34]">
      {projects.map((p, i) => (
        <Link key={p.id} to={`/portafolios/commercial/${p.id}`} className="group grid items-center gap-4 py-8 transition hover:bg-[#18181c] md:grid-cols-[80px_1fr_220px_160px_180px] md:px-4">
          <span className="font-mono text-3xl text-[#8fb4d9]">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h2 className="text-2xl font-light uppercase tracking-wide text-white sm:text-3xl">{loc(p.title, lang)}</h2>
            <p className="mt-1 text-xs text-[#9b9ba8]">{loc(p.summary, lang)}</p>
          </div>
          <dl className="font-mono text-xs text-[#9b9ba8]"><dt className="text-[#6e6e7a]">{t('portfolios.location')}</dt><dd className="text-white">{loc(p.location, lang)}</dd></dl>
          <dl className="font-mono text-xs text-[#9b9ba8]"><dt className="text-[#6e6e7a]">{t('portfolios.area')}</dt><dd className="text-white">{p.areaM2.toLocaleString(lang)} {t('portfolios.areaUnit')} · {p.year}</dd></dl>
          <div className="aspect-[16/10] overflow-hidden bg-[#18181c] md:opacity-60 md:transition md:group-hover:opacity-100"><SafeImage alt={loc(p.title, lang)} src={p.coverImage} className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" /></div>
        </Link>
      ))}
    </div>
  );
}

/** 03 Espacio público — orgánico: carrusel horizontal de tarjetas grandes. */
function CivicLayout({ projects, lang }: { projects: ArchitecturalProject[]; lang: string }) {
  const { t } = useTranslation();
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12">
      {projects.map((p) => (
        <Link key={p.id} to={`/portafolios/civic/${p.id}`} className="group relative min-h-[520px] w-[85vw] max-w-[560px] shrink-0 snap-center overflow-hidden rounded-[2rem] bg-[#18181c]">
          <SafeImage alt={loc(p.title, lang)} src={p.coverImage} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 space-y-2 p-7">
            <span className="rounded-full border border-[#9bb88a]/60 px-3 py-1 font-mono text-[11px] text-[#9bb88a]">{p.areaM2.toLocaleString(lang)} {t('portfolios.areaUnit')}</span>
            <h2 className="font-display text-3xl font-light text-white">{loc(p.title, lang)}</h2>
            <p className="text-xs text-[#b4b4c0]">{loc(p.location, lang)} · {p.year}</p>
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
  usePageContext(isPid(pid) ? t(`portfolios.${pid}.name`) : undefined);
  if (!isPid(pid)) return <Navigate to="/portafolios" replace />;

  const accent = PORTFOLIOS.find((p) => p.id === pid)!.accent;
  const projects = INITIAL_PROJECTS.filter((p) => p.portfolio === pid);
  const others = PORTFOLIOS.filter((p) => p.id !== pid);

  return (
    <>
      <Seo title={`${t(`portfolios.${pid}.name`)} | ${t('brand.title')}`} description={t(`portfolios.${pid}.desc`)} path={`/portafolios/${pid}`} />
      <PageHeader badge={t(`portfolios.${pid}.tag`)} title={t(`portfolios.${pid}.name`)} subtitle={t(`portfolios.${pid}.desc`)} accent={accent} />
      <Section>
        {projects.length === 0 ? <p className="text-[#9b9ba8]">{t('portfolios.empty')}</p> :
          pid === 'residential' ? <ResidentialLayout projects={projects} lang={lang} /> :
          pid === 'commercial' ? <CommercialLayout projects={projects} lang={lang} /> :
          <CivicLayout projects={projects} lang={lang} />}
      </Section>
      <Section className="border-t border-[#23232b] bg-[#141418]">
        <p className="mb-4 text-xs uppercase tracking-widest text-[#9b9ba8]">{t('portfolios.otherPortfolios')}</p>
        <div className="flex flex-wrap gap-3">
          {others.map((o) => (
            <Link key={o.id} to={`/portafolios/${o.id}`} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#2e2e38] px-5 text-sm text-white hover:border-[#444452]" style={{ borderColor: undefined }}>
              <span style={{ color: o.accent }}>●</span> {t(`portfolios.${o.id}.name`)}
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
  const project = INITIAL_PROJECTS.find((p) => p.id === projectId && p.portfolio === pid);
  usePageContext(project ? loc(project.title, lang) : undefined);
  if (!project || !isPid(pid)) return <Navigate to="/portafolios" replace />;
  const accent = PORTFOLIOS.find((p) => p.id === pid)!.accent;
  const title = loc(project.title, lang);

  return (
    <>
      <Seo title={`${title} | ${t('brand.title')}`} description={loc(project.summary, lang)} image={project.coverImage} path={`/portafolios/${pid}/${project.id}`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CreativeWork', name: title, description: loc(project.summary, lang), image: project.coverImage, dateCreated: String(project.year), locationCreated: loc(project.location, lang) }} />
      <div className="aspect-[16/9] max-h-[75vh] w-full overflow-hidden bg-[#18181c]"><SafeImage alt={title} src={project.coverImage} className="h-full w-full object-cover" /></div>
      <Section>
        <Link to={`/portafolios/${pid}`} className="mb-8 inline-flex min-h-[44px] items-center text-xs uppercase tracking-wider text-[#9b9ba8] hover:text-white">← {t('portfolios.back')}</Link>
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>{t(`portfolios.${pid}.tag`)}</span>
            <h1 className="font-display text-4xl font-light text-white sm:text-6xl">{title}</h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#b4b4c0]">{loc(project.summary, lang)}</p>
            <button onClick={() => open(title)} className="inline-flex min-h-[44px] items-center rounded-xl px-6 text-xs font-semibold uppercase tracking-widest text-[#121214]" style={{ background: accent }}>{t('portfolios.consultProject')}</button>
          </div>
          <dl className="h-fit divide-y divide-[#2a2a34] rounded-2xl border border-[#2a2a34] bg-[#18181c] text-sm">
            {[
              [t('portfolios.location'), loc(project.location, lang)],
              [t('portfolios.year'), String(project.year)],
              [t('portfolios.area'), `${project.areaM2.toLocaleString(lang)} ${t('portfolios.areaUnit')}`],
              [t('portfolios.materials'), loc(project.materials, lang)],
            ].map(([k, v]) => (
              <div key={k} className="p-4"><dt className="font-mono text-[11px] uppercase tracking-wider text-[#6e6e7a]">{k}</dt><dd className="mt-1 text-white">{v}</dd></div>
            ))}
          </dl>
        </div>
        {project.gallery.length > 1 && (
          <div className="mt-16">
            <h2 className="mb-4 text-xs uppercase tracking-widest text-[#9b9ba8]">{t('portfolios.gallery')}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((g) => (<div key={g} className="aspect-[4/3] overflow-hidden rounded-xl bg-[#18181c]"><SafeImage alt={title} src={g} className="h-full w-full object-cover" /></div>))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
