import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { loc, normalizePortfolioId } from '../data/content';
import type { ArchitecturalProject } from '../data/content';
import { useSiteData } from '../lib/useSiteData';

/** Catálogo independiente de Portafolios (/portafolios) para elegir a qué categoría entrar. */
export function PortfoliosIndex() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { portfolios, projects } = useSiteData();

  return (
    <>
      <Seo title={t('seo.portfolios.title')} description={t('seo.portfolios.description')} path="/portafolios" />
      <section className="mx-auto max-w-screen-2xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <div className="border-b border-[#e6e3de] pb-12 md:pb-16">
          <p className="text-xs font-medium uppercase tracking-[.2em] text-[var(--primary)]">
            Medelsa. · {t('home.featuredBadge')}
          </p>
          <h1 className="mt-5 text-[clamp(3.5rem,13vw,9.5rem)] font-medium leading-[.86] tracking-[-.07em] text-[#33363b]">
            {t('nav.portfolios')}
            <span className="text-[var(--primary)]">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#6b7078]">
            {t('home.portfoliosText')}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((p, i) => {
            const slug = normalizePortfolioId(p.id);
            const catProjects = projects.filter((x) => normalizePortfolioId(x.portfolio) === slug);
            const cover = p.coverImage || catProjects[0]?.coverImage || '/images/hero.png';
            return (
              <Link
                key={p.id}
                to={`/portafolios/${slug}`}
                data-cursor="view"
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#faf9f7] transition-all duration-500 hover:border-[var(--primary)]/50 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f2f0ec]">
                  <img
                    alt={loc(p.name, lang)}
                    src={cover}
                    data-curtain-reveal="true"
                    className="h-full w-full object-cover transition duration-1000 ease-[var(--ease-tectonic)] group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#33363b]/80 px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur">
                    0{i + 1} / 0{portfolios.length}
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] text-[#33363b] backdrop-blur">
                    {String(catProjects.length).padStart(2, '0')} {t('nav.worksCount')}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-medium tracking-tight text-[#33363b] group-hover:text-[var(--primary)]">
                        {loc(p.name, lang)}
                      </h2>
                      <ArrowUpRight className="h-5 w-5 text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="text-sm leading-relaxed text-[#6b7078]">{loc(p.desc, lang)}</p>
                  </div>
                  <p className="border-t border-[#e6e3de] pt-3 text-[11px] uppercase tracking-wider text-[#6b7078]">
                    {loc(p.client, lang)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

/** Estilo Editorial: bloques alternados con tipografía protagonista. */
function EditorialLayout({ projects, pid, lang }: { projects: ArchitecturalProject[]; pid: string; lang: string }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-24">
      {projects.map((p, i) => (
        <Link
          key={p.id}
          to={`/portafolios/${pid}/${p.id}`}
          className={`group grid items-center gap-8 md:grid-cols-12 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}
        >
          <div data-cursor="view" className="aspect-[4/3] overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#f2f0ec] md:col-span-8">
            <img
              alt={loc(p.title, lang)}
              src={p.coverImage}
              data-curtain-reveal="true"
              className="h-full w-full object-cover transition duration-[1200ms] ease-[var(--ease-tectonic)] group-hover:scale-[1.04]"
            />
          </div>
          <div className="space-y-3 md:col-span-4">
            <span className="font-mono text-xs text-[var(--primary)]">
              {String(i + 1).padStart(2, '0')} — {p.year}
            </span>
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-[#33363b] transition-colors group-hover:text-[var(--primary)] md:text-4xl">
              {loc(p.title, lang)}
            </h2>
            <p className="text-sm leading-relaxed text-[#6b7078]">{loc(p.summary, lang)}</p>
            <p className="font-mono text-xs text-[#6b7078]">
              {loc(p.location, lang)} · {p.areaM2.toLocaleString(lang)} {t('portfolios.areaUnit')}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

/** Estilo Técnico: matriz de datos con vista previa flotante al pasar el cursor. */
function TechnicalLayout({ projects, pid, lang }: { projects: ArchitecturalProject[]; pid: string; lang: string }) {
  const { t } = useTranslation();
  return (
    <div className="divide-y divide-[#e6e3de] border-y border-[#e6e3de]">
      {projects.map((p, i) => (
        <Link
          key={p.id}
          to={`/portafolios/${pid}/${p.id}`}
          className="group relative grid items-center gap-4 py-8 transition hover:bg-[#faf9f7] md:grid-cols-[70px_1fr_220px_150px_180px] md:px-4"
        >
          <span className="font-mono text-2xl text-[var(--primary)]">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-[#33363b] transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
              {loc(p.title, lang)}
            </h2>
            <p className="mt-1 text-xs text-[#6b7078]">{loc(p.materials, lang)}</p>
          </div>
          <dl className="font-mono text-xs text-[#6b7078]">
            <dt>{t('portfolios.location')}</dt>
            <dd className="text-[#33363b]">{loc(p.location, lang)}</dd>
          </dl>
          <dl className="font-mono text-xs text-[#6b7078]">
            <dt>{t('portfolios.area')}</dt>
            <dd className="text-[#33363b]">
              {p.areaM2.toLocaleString(lang)} {t('portfolios.areaUnit')} · {p.year}
            </dd>
          </dl>
          <div className="aspect-[16/10] overflow-hidden rounded-xl border border-[#e6e3de] bg-[#f2f0ec]">
            <img
              alt={loc(p.title, lang)}
              src={p.coverImage}
              data-curtain-reveal="true"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

/** Estilo Orgánico: carrusel horizontal de tarjetas grandes. */
function OrganicLayout({ projects, pid, lang }: { projects: ArchitecturalProject[]; pid: string; lang: string }) {
  const { t } = useTranslation();
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:-mx-6 sm:px-6">
      {projects.map((p, idx) => (
        <Link
          key={p.id}
          to={`/portafolios/${pid}/${p.id}`}
          data-cursor="view"
          className="group relative min-h-[480px] w-[85vw] max-w-[560px] shrink-0 snap-center overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#f2f0ec]"
        >
          <img
            alt={loc(p.title, lang)}
            src={p.coverImage}
            data-curtain-reveal="true"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#33363b]/85 via-[#33363b]/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 space-y-2 p-7 text-[#faf9f7]">
            <span className="rounded-full border border-white/40 bg-[#33363b]/60 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
              0{idx + 1} · {p.areaM2.toLocaleString(lang)} {t('portfolios.areaUnit')}
            </span>
            <h2 className="text-3xl font-medium tracking-tight text-white">{loc(p.title, lang)}</h2>
            <p className="text-xs text-[#e6e3de]">
              {loc(p.location, lang)} · {p.year}
            </p>
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
  const normalizedPid = normalizePortfolioId(pid);
  const portfolio = portfolios.find((p) => normalizePortfolioId(p.id) === normalizedPid);

  if (!loading && !portfolio) return <Navigate to="/portafolios" replace />;
  if (!portfolio) return null;

  const list = projects.filter((p) => normalizePortfolioId(p.portfolio) === normalizedPid);
  const others = portfolios.filter((p) => normalizePortfolioId(p.id) !== normalizedPid);

  return (
    <>
      <Seo
        title={`${loc(portfolio.name, lang)} — Medelsa.`}
        description={loc(portfolio.desc, lang)}
        path={`/portafolios/${normalizedPid}`}
      />
      <section className="mx-auto max-w-screen-2xl px-5 pb-24 pt-36 md:px-7 md:pt-44">
        <div className="border-b border-[#e6e3de] pb-12">
          <Link
            to="/portafolios"
            className="inline-flex min-h-11 items-center text-xs font-medium uppercase tracking-wider text-[#6b7078] hover:text-[var(--primary)]"
          >
            ← {t('portfolios.allPortfolios')}
          </Link>
          <p className="mt-4 text-xs font-medium uppercase tracking-[.2em] text-[var(--primary)]">
            {loc(portfolio.tag, lang)}
          </p>
          <h1 className="mt-3 text-[clamp(3rem,11vw,8.5rem)] font-medium leading-[.88] tracking-[-.06em] text-[#33363b]">
            {loc(portfolio.name, lang)}
            <span className="text-[var(--primary)]">.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6b7078]">{loc(portfolio.desc, lang)}</p>
        </div>

        <div className="mt-14">
          {list.length === 0 ? (
            <p className="text-[#6b7078]">{t('portfolios.empty')}</p>
          ) : portfolio.layoutStyle === 'editorial' ? (
            <EditorialLayout projects={list} pid={normalizedPid} lang={lang} />
          ) : portfolio.layoutStyle === 'technical' ? (
            <TechnicalLayout projects={list} pid={normalizedPid} lang={lang} />
          ) : (
            <OrganicLayout projects={list} pid={normalizedPid} lang={lang} />
          )}
        </div>

        <div className="mt-24 border-t border-[#e6e3de] pt-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#6b7078]">
            {t('portfolios.otherPortfolios')}
          </p>
          <div className="flex flex-wrap gap-3">
            {others.map((o) => {
              const oSlug = normalizePortfolioId(o.id);
              return (
                <Link
                  key={o.id}
                  to={`/portafolios/${oSlug}`}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#e6e3de] bg-[#faf9f7] px-6 text-sm font-medium text-[#33363b] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  <span className="text-[var(--primary)]">●</span> {loc(o.name, lang)}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export function ProjectPage() {
  const { pid, projectId } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { portfolios, projects, loading } = useSiteData();
  const normalizedPid = normalizePortfolioId(pid);
  const portfolio = portfolios.find((p) => normalizePortfolioId(p.id) === normalizedPid);
  const project = projects.find(
    (p) => p.id === projectId && normalizePortfolioId(p.portfolio) === normalizedPid
  );

  if (!loading && (!project || !portfolio)) return <Navigate to="/portafolios" replace />;
  if (!project || !portfolio) return null;

  const title = loc(project.title, lang);

  return (
    <>
      <Seo
        title={`${title} — Medelsa.`}
        description={loc(project.summary, lang)}
        image={project.coverImage}
        path={`/portafolios/${normalizedPid}/${project.id}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: title,
          description: loc(project.summary, lang),
          image: project.coverImage,
          dateCreated: String(project.year),
          locationCreated: loc(project.location, lang),
        }}
      />

      <section className="mx-auto max-w-screen-2xl px-5 pb-28 pt-32 md:px-7 md:pt-40">
        <Link
          to={`/portafolios/${normalizedPid}`}
          className="inline-flex min-h-11 items-center text-xs font-medium uppercase tracking-wider text-[#6b7078] hover:text-[var(--primary)]"
        >
          ← {loc(portfolio.name, lang)}
        </Link>

        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4 border-b border-[#e6e3de] pb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--primary)]">
              {loc(portfolio.name, lang)} · {project.year}
            </p>
            <h1 className="mt-3 text-[clamp(2.75rem,9vw,7rem)] font-medium leading-[.9] tracking-[-.05em] text-[#33363b]">
              {title}
              <span className="text-[var(--primary)]">.</span>
            </h1>
          </div>
          <p className="font-mono text-xs text-[#6b7078]">{loc(project.location, lang)}</p>
        </div>

        <div className="mt-8 aspect-[16/9] max-h-[75vh] w-full overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#f2f0ec]">
          <img
            alt={title}
            src={project.coverImage}
            data-curtain-reveal="true"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <h2 className="text-xs font-medium uppercase tracking-[.2em] text-[var(--primary)]">
              {t('admin.fSummary')}
            </h2>
            <p className="max-w-2xl text-xl leading-relaxed text-[#33363b]">{loc(project.summary, lang)}</p>
          </div>

          <dl className="h-fit divide-y divide-[#e6e3de] rounded-2xl border border-[#e6e3de] bg-[#faf9f7] text-sm">
            {[
              [t('portfolios.location'), loc(project.location, lang)],
              [t('portfolios.year'), String(project.year)],
              [t('portfolios.area'), `${project.areaM2.toLocaleString(lang)} ${t('portfolios.areaUnit')}`],
              [t('portfolios.materials'), loc(project.materials, lang)],
            ].map(([k, v]) => (
              <div key={k} className="p-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-[#6b7078]">{k}</dt>
                <dd className="mt-1 text-[#33363b]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {project.gallery.length > 1 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-[#6b7078]">
              {t('portfolios.gallery')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {project.gallery.map((g, i) => (
                <div
                  key={`${g}-${i}`}
                  className="aspect-[4/3] overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#f2f0ec]"
                >
                  <img
                    alt={`${title} ${i + 1}`}
                    src={g}
                    data-curtain-reveal="true"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
