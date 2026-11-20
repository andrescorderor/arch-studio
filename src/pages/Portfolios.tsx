import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { loc, normalizePortfolioId } from '../data/content';
import type { ArchitecturalProject } from '../data/content';
import { useSiteData } from '../lib/useSiteData';

/** Catálogo independiente de Portafolios (/portafolios) alineado 1:1 con el prototipo v0. */
export function PortfoliosIndex() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { portfolios, projects } = useSiteData();

  return (
    <>
      <Seo title={t('seo.portfolios.title')} description={t('seo.portfolios.description')} path="/portafolios" />
      <section className="mx-auto max-w-screen-2xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <p className="text-xs font-medium tracking-[.12em] text-[var(--primary)]">
          Medelsa. · {t('home.featuredBadge')}
        </p>
        <h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,16vw,13rem)] font-medium uppercase leading-[.82] tracking-[-.06em] text-[#33363b]">
          {t('nav.portfolios')}
          <span className="text-[var(--primary)]">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#6b7078]">
          {t('home.portfoliosText')}
        </p>

        <div className="mt-16 grid gap-5 md:mt-24 md:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((p, i) => {
            const slug = normalizePortfolioId(p.id);
            const catProjects = projects.filter((x) => normalizePortfolioId(x.portfolio) === slug);
            const cover = p.coverImage || catProjects[0]?.coverImage || '/images/hero.png';
            return (
              <Link
                key={p.id}
                to={`/portafolios/${slug}`}
                data-cursor="view"
                className={`group border-t border-[#e6e3de] pt-4 ${i === 1 ? 'lg:mt-16' : ''} ${i === 2 ? 'lg:mt-32' : ''}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden border border-[#e6e3de] bg-[#f2f0ec]">
                  <img
                    alt={loc(p.name, lang)}
                    src={cover}
                    data-curtain-reveal="true"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-[#6b7078]">
                      0{i + 1} / 0{portfolios.length}
                    </p>
                    <h2 className="mt-2 text-2xl font-medium tracking-tight text-[#33363b] transition-colors group-hover:text-[var(--primary)] md:text-3xl">
                      {loc(p.name, lang)}
                    </h2>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-xl text-[#33363b] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--primary)]"
                  >
                    ↗
                  </span>
                </div>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#6b7078]">{loc(p.desc, lang)}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

/** Retícula arquitectónica escalonada 2 columnas (diseño v0 por defecto). */
function EditorialLayout({ projects, pid, lang }: { projects: ArchitecturalProject[]; pid: string; lang: string }) {
  return (
    <div className="mt-16 grid gap-x-5 gap-y-14 md:grid-cols-2">
      {projects.map((p, idx) => (
        <article key={p.id} className={idx % 3 === 1 ? 'lg:mt-20' : ''}>
          <Link to={`/portafolios/${pid}/${p.id}`} data-cursor="view" className="group block">
            <div className="relative aspect-[4/3] overflow-hidden border border-[#e6e3de] bg-[#f2f0ec]">
              <img
                alt={loc(p.title, lang)}
                src={p.coverImage}
                data-curtain-reveal="true"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4 border-t border-[#e6e3de] pt-4">
              <div>
                <p className="font-mono text-xs text-[#6b7078]">
                  {String(idx + 1).padStart(2, '0')} / {p.year}
                </p>
                <h2 className="mt-1.5 text-2xl font-medium tracking-tight text-[#33363b] transition-colors group-hover:text-[var(--primary)] md:text-3xl">
                  {loc(p.title, lang)}
                </h2>
                <p className="mt-1 text-xs text-[#6b7078]">
                  {loc(p.materials, lang)} · {loc(p.location, lang)}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="text-xl text-[#33363b] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--primary)]"
              >
                ↗
              </span>
            </div>
          </Link>
        </article>
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
  const portfolioIdx = portfolios.findIndex((p) => normalizePortfolioId(p.id) === normalizedPid);
  const portfolio = portfolios[portfolioIdx];

  if (!loading && !portfolio) return <Navigate to="/portafolios" replace />;
  if (!portfolio) return null;

  const list = projects.filter((p) => normalizePortfolioId(p.portfolio) === normalizedPid);

  return (
    <>
      <Seo
        title={`${loc(portfolio.name, lang)} — Medelsa.`}
        description={loc(portfolio.desc, lang)}
        path={`/portafolios/${normalizedPid}`}
      />
      <section className="mx-auto max-w-screen-2xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <div className="border-b border-[#e6e3de] pb-10">
          <Link
            to="/portafolios"
            className="inline-flex min-h-12 items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#6b7078] transition-colors hover:text-[var(--primary)]"
          >
            ← {t('portfolios.allPortfolios')}
          </Link>
          <p className="mt-12 text-xs font-medium tracking-[.12em] text-[var(--primary)]">
            Medelsa. · 0{portfolioIdx + 1} / 0{portfolios.length}
          </p>
          <h1 className="mt-5 text-[clamp(3.5rem,16vw,13rem)] font-medium uppercase leading-[.82] tracking-[-.06em] text-[#33363b]">
            {loc(portfolio.name, lang)}
            <span className="text-[var(--primary)]">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#6b7078]">{loc(portfolio.desc, lang)}</p>
        </div>

        {list.length === 0 ? (
          <p className="mt-14 text-[#6b7078]">{t('portfolios.empty')}</p>
        ) : (
          <EditorialLayout projects={list} pid={normalizedPid} lang={lang} />
        )}
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

      <article className="mx-auto max-w-screen-2xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <Link
          to={`/portafolios/${normalizedPid}`}
          className="inline-flex min-h-12 items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#6b7078] transition-colors hover:text-[var(--primary)]"
        >
          ← {loc(portfolio.name, lang)}
        </Link>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="text-xs font-medium uppercase tracking-[.2em] text-[var(--primary)]">
              {loc(portfolio.name, lang)} · {project.year}
            </p>
            <h1 className="mt-4 text-[clamp(3.25rem,9vw,9rem)] font-medium leading-[.88] tracking-[-.06em] text-[#33363b]">
              {title}
              <span className="text-[var(--primary)]">.</span>
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-[#6b7078] md:col-span-3 md:col-start-10">
            {loc(project.summary, lang)}
          </p>
        </div>

        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#faf9f7] md:mt-16">
          <img
            alt={title}
            src={project.coverImage}
            data-curtain-reveal="true"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <div className="space-y-4 md:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[.2em] text-[#6b7078]">
              {t('admin.fSummary')}
            </p>
            <p className="text-lg leading-relaxed text-[#33363b] md:text-xl">{loc(project.summary, lang)}</p>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <p className="text-xs font-medium uppercase tracking-[.2em] text-[#6b7078]">Ficha técnica</p>
            <dl className="mt-4 divide-y divide-[#e6e3de] border-y border-[#e6e3de]">
              {[
                [t('portfolios.location'), loc(project.location, lang)],
                [t('portfolios.year'), String(project.year)],
                [t('portfolios.area'), `${project.areaM2} ${t('portfolios.areaUnit')}`],
                [t('portfolios.materials'), loc(project.materials, lang)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-4 text-sm">
                  <dt className="text-[#6b7078]">{k}</dt>
                  <dd className="text-right font-medium text-[#33363b]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {project.gallery.length > 0 && (
          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {project.gallery.map((g, i) => (
              <div
                key={`${g}-${i}`}
                className={`relative overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#faf9f7] ${
                  i === 0 ? 'aspect-[4/3] sm:col-span-2 md:aspect-[16/8]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  alt={`${title} — vista ${i + 1}`}
                  src={g}
                  data-curtain-reveal="true"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </article>
    </>
  );
}
