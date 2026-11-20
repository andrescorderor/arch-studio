import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { Seo } from '../components/Seo';
import { BlogLoader } from '../components/BlogLoader';
import { ContactFormCard } from '../components/ContactFormCard';
import { loc, type MentionCategory } from '../data/content';
import { usePublicBlogs } from '../lib/usePublicBlogs';
import { useSiteData } from '../lib/useSiteData';
import { SITE } from '../config/site';

/** Nosotros: imagen principal editable desde /admin + párrafos editoriales a 2 columnas estilo v0. */
export function About() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { settings } = useSiteData();
  const rawText = loc(settings.aboutText, lang) || `${t('about.p1')}\n\n${t('about.p2')}\n\n${t('about.p3')}`;
  const paragraphs = rawText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <Seo title={t('seo.about.title')} description={t('seo.about.description')} path="/nosotros" />
      <section className="mx-auto max-w-screen-2xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <p className="text-xs font-medium tracking-[.12em] text-[var(--primary)]">
          Medelsa. · León, Guanajuato
        </p>
        <h1 className="mt-5 text-[clamp(3.5rem,16vw,13rem)] font-medium uppercase leading-[.82] tracking-[-.06em] text-[#33363b]">
          {t('nav.about')}
          <span className="text-[var(--primary)]">.</span>
        </h1>

        <div
          data-cursor="view"
          className="relative mt-10 aspect-[16/8] overflow-hidden bg-[#f2f0ec] md:mt-16"
        >
          <img
            alt="Estudio de arquitectura Medelsa en León, Guanajuato"
            src={settings.aboutImage || '/images/studio.png'}
            data-curtain-reveal="true"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-12">
          {paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? 'text-xl leading-relaxed text-[#33363b] md:text-2xl'
                  : 'text-sm leading-relaxed text-[#6b7078] md:col-start-2'
              }
            >
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}

const MENTION_FILTERS: Array<'Todos' | MentionCategory> = ['Todos', 'Premios', 'Publicaciones', 'Concursos'];
const FALLBACK_IMAGES = ['/images/res-1.png', '/images/civic-1.png', '/images/corp-1.png'];

/** Menciones, Publicaciones y Concursos (con métricas, obra en prensa destacada, filtros y vista previa 1:1 con v0). */
export function Awards() {
  const { t } = useTranslation();
  const { settings } = useSiteData();
  const [filter, setFilter] = useState<'Todos' | MentionCategory>('Todos');

  const sorted = useMemo(
    () =>
      (settings.mentions || [])
        .filter((m) => m.title.trim())
        .slice()
        .sort((a, b) => Number(b.year) - Number(a.year)),
    [settings.mentions]
  );

  const filtered = sorted.filter((m) => filter === 'Todos' || m.type === filter);
  const featured = sorted[0];
  const counts = (['Premios', 'Publicaciones', 'Concursos'] as MentionCategory[]).map((type) => ({
    type,
    count: sorted.filter((m) => m.type === type).length,
  }));

  return (
    <>
      <Seo title={t('seo.awards.title')} description={t('seo.awards.description')} path="/menciones" />
      <section className="mx-auto max-w-screen-2xl px-5 pb-32 pt-36 md:px-7 md:pt-44">
        <div className="grid gap-10 border-b border-[#e6e3de] pb-12 md:grid-cols-12 md:items-end md:gap-6 md:pb-16">
          <div className="md:col-span-8">
            <p className="text-xs font-medium tracking-[.12em] text-[var(--primary)]">
              Medelsa. · {t('awards.badge')}
            </p>
            <h1 className="mt-5 text-[clamp(3.5rem,14vw,10rem)] font-medium uppercase leading-[.86] tracking-[-.07em] text-[#33363b]">
              {t('nav.awards')}
              <span className="text-[var(--primary)]">.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#6b7078]">{t('awards.subtitle')}</p>
          </div>

          <dl className="grid grid-cols-3 gap-4 md:col-span-4 md:gap-5">
            {counts.map(({ type, count }) => (
              <div key={type} className="border-t border-[#e6e3de] pt-3">
                <dd className="font-mono text-3xl tracking-tight text-[#33363b] md:text-4xl">
                  {String(count).padStart(2, '0')}
                </dd>
                <dt className="mt-2 text-[10px] font-medium uppercase leading-tight tracking-[.12em] text-[#6b7078]">
                  {type}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Bloque destacado: Obra en prensa / Reconocimiento principal */}
        {featured && (
          <article className="grid overflow-hidden border-b border-[#e6e3de] py-8 md:grid-cols-2 md:gap-10 md:py-12">
            <Link
              to={featured.href || '/portafolios/residencial/casa-basalto'}
              data-cursor="view"
              className="group relative block min-h-64 overflow-hidden bg-[#faf9f7] md:min-h-[24rem]"
            >
              <img
                src={featured.image || '/images/res-1.png'}
                alt={featured.title}
                data-curtain-reveal="true"
                className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-tectonic)] group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-[#33363b]/80 px-3 py-2 text-[10px] font-medium uppercase tracking-[.16em] text-white backdrop-blur">
                Obra en prensa · {featured.type}
              </span>
            </Link>

            <div className="flex flex-col justify-between pt-6 md:py-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[.2em] text-[var(--primary)]">
                  01 — Reconocimiento destacado
                </p>
                <h2 className="mt-4 text-3xl font-medium leading-[1.05] tracking-tight text-[#33363b] md:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-4 font-mono text-xs text-[#6b7078]">
                  {featured.source} · {featured.year}
                </p>
              </div>

              <div className="mt-8">
                <Link
                  to={featured.href || '/portafolios/residencial/casa-basalto'}
                  className="inline-flex min-h-12 items-center gap-3 border-b border-[#33363b] pb-2 text-xs font-medium uppercase tracking-wide text-[#33363b] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  Ver proyecto premiado <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Filtros en píldoras */}
        <div role="tablist" aria-label="Filtrar menciones por tipo" className="mt-10 flex flex-wrap items-center gap-2">
          {MENTION_FILTERS.map((cat) => {
            const active = filter === cat;
            const total = cat === 'Todos' ? sorted.length : sorted.filter((m) => m.type === cat).length;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(cat)}
                className={`min-h-11 rounded-full border px-4 text-xs font-medium uppercase tracking-wide transition-colors ${
                  active
                    ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                    : 'border-[#e6e3de] bg-[#faf9f7] text-[#6b7078] hover:border-[var(--primary)] hover:text-[#33363b]'
                }`}
              >
                {cat}{' '}
                <span className="ml-1 font-mono text-[10px] opacity-75">({total})</span>
              </button>
            );
          })}
        </div>

        {/* Listado cronológico con vista previa flotante en hover */}
        <ol className="mt-4 border-t border-[#e6e3de]">
          {filtered.map((m, idx) => {
            const thumb = m.image || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
            return (
              <li key={m.id}>
                <Link
                  to={m.href || '/portafolios/residencial/casa-basalto'}
                  className="group relative grid grid-cols-1 gap-3 border-b border-[#e6e3de] py-7 transition-colors duration-300 hover:bg-[var(--primary)]/[.04] sm:grid-cols-[5rem_8rem_minmax(0,1fr)_2rem] sm:items-center sm:gap-5 sm:px-3"
                >
                  <span className="font-mono text-sm tabular-nums text-[#6b7078]">{m.year}</span>
                  <span className="inline-flex min-h-7 w-fit items-center rounded-full bg-[var(--primary)]/10 px-3 text-[10px] font-medium uppercase tracking-[.14em] text-[var(--primary)]">
                    {m.type}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-medium leading-snug tracking-tight text-[#33363b] transition-colors group-hover:text-[var(--primary)] md:text-2xl">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#6b7078]">{m.source}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="justify-self-end text-lg text-[#6b7078] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--primary)]"
                  >
                    ↗
                  </span>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-12 top-1/2 z-10 hidden h-28 w-44 -translate-y-1/2 translate-x-2 overflow-hidden border border-[#e6e3de] bg-[#faf9f7] opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block"
                  >
                    <img src={thumb} alt="" className="h-full w-full object-cover" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}

/** Blog: listado sin categorías y lectura con fotos dentro del artículo, alineado 1:1 con v0. */
export function Blog() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { blogs, loading } = usePublicBlogs();

  return (
    <>
      <Seo title={t('seo.blog.title')} description={t('seo.blog.description')} path="/blog" />
      <section className="mx-auto max-w-screen-2xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <p className="text-xs font-medium tracking-[.12em] text-[var(--primary)]">
          Medelsa. · {t('blog.badge')}
        </p>
        <h1 className="mt-5 text-[clamp(4rem,18vw,14rem)] font-medium uppercase leading-[.8] tracking-[-.06em] text-[#33363b]">
          {t('nav.journal')}
          <span className="text-[var(--primary)]">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#6b7078]">{t('blog.subtitle')}</p>

        {loading ? (
          <div className="mt-16 md:mt-24">
            <BlogLoader count={2} />
          </div>
        ) : blogs.length === 0 ? (
          <p className="mt-16 text-[#6b7078]">{t('blog.empty')}</p>
        ) : (
          <div className="mt-16 grid gap-x-5 gap-y-14 md:mt-24 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b, idx) => (
              <article key={b.id}>
                <Link to={`/blog/${b.slug}`} data-cursor="view" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#faf9f7]">
                    <img
                      alt={loc(b.title, lang)}
                      src={b.coverImage}
                      data-curtain-reveal="true"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#33363b]/75 px-3 py-1.5 font-mono text-[10px] text-[#f5f3ef] backdrop-blur">
                      {String(idx + 1).padStart(2, '0')} / {String(blogs.length).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-xs text-[#6b7078]">{b.publishedAt}</p>
                  <h2 className="mt-2 text-2xl font-medium leading-tight tracking-tight text-[#33363b] transition-colors group-hover:text-[var(--primary)] md:text-3xl">
                    {loc(b.title, lang)}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b7078]">{loc(b.excerpt, lang)}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[var(--primary)]">
                    {t('blog.readMore')} <span aria-hidden="true">↗</span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { blogs, loading } = usePublicBlogs();
  const post = blogs.find((b) => b.slug === slug);

  if (loading && !post) {
    return (
      <section className="mx-auto max-w-screen-2xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <BlogLoader count={1} />
      </section>
    );
  }
  if (!post) {
    return (
      <section className="mx-auto max-w-screen-2xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <p className="text-[#6b7078]">{t('blog.notFound')}</p>
        <Link to="/blog" className="mt-6 inline-flex min-h-12 items-center text-sm text-[var(--primary)]">
          ← {t('blog.back')}
        </Link>
      </section>
    );
  }

  const html = DOMPurify.sanitize(loc(post.contentHtml, lang));
  const title = loc(post.title, lang);

  return (
    <>
      <Seo
        title={`${title} — Medelsa.`}
        description={loc(post.excerpt, lang)}
        image={post.coverImage}
        type="article"
        path={`/blog/${post.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          datePublished: post.publishedAt,
          image: post.coverImage,
          author: { '@type': 'Organization', name: SITE.name },
        }}
      />
      <article className="mx-auto max-w-screen-2xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <Link
          to="/blog"
          className="inline-flex min-h-12 items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#6b7078] transition-colors hover:text-[var(--primary)]"
        >
          ← {t('nav.journal')}
        </Link>

        <div className="mt-10 max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[.2em] text-[var(--primary)]">
            {post.publishedAt}
          </p>
          <h1 className="mt-5 text-5xl font-medium leading-[.95] tracking-[-.05em] text-[#33363b] md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[#6b7078]">{loc(post.excerpt, lang)}</p>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-[#faf9f7]">
            <img alt={title} src={post.coverImage} data-curtain-reveal="true" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <div className="prose-arch" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="mt-16 border-t border-[#e6e3de] pt-8">
            <Link
              to="/blog"
              className="inline-flex min-h-12 items-center gap-3 text-xs font-medium uppercase tracking-wide text-[#33363b] transition-colors hover:text-[var(--primary)]"
            >
              <span aria-hidden="true">←</span> {t('blog.back')}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

/** Contacto: datos del despacho + formulario protagonista en contenedor grafito #33363b 1:1 con v0. */
export function Contact() {
  const { t } = useTranslation();
  const { settings } = useSiteData();

  return (
    <>
      <Seo title={t('seo.contact.title')} description={t('seo.contact.description')} path="/contacto" />
      <section className="mx-auto max-w-screen-2xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <div className="max-w-4xl">
          <p className="text-xs font-medium tracking-[.12em] text-[var(--primary)]">
            Medelsa. · León, Guanajuato
          </p>
          <h1 className="mt-5 text-[clamp(4rem,18vw,14rem)] font-medium uppercase leading-[.82] tracking-[-.06em] text-[#33363b]">
            {t('nav.contact')}
            <span className="text-[var(--primary)]">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#6b7078]">{t('contact.description')}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-6">
          <address className="flex flex-col gap-5 border-t border-[#e6e3de] pt-6 text-sm not-italic leading-relaxed lg:col-span-3">
            <div>
              <p className="text-xs font-medium tracking-[.12em] text-[#6b7078]">Medelsa. · Despacho</p>
              <p className="mt-2 font-medium text-[#33363b]">{settings.location}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[.2em] text-[#6b7078]">{t('contact.phone')}</p>
              <a
                href={`tel:${settings.phone}`}
                className="mt-2 inline-flex min-h-10 items-center font-medium text-[#33363b] transition-colors hover:text-[var(--primary)]"
              >
                {settings.phone}
              </a>
            </div>

            {settings.emailEnabled && (
              <div>
                <p className="text-xs font-medium uppercase tracking-[.2em] text-[#6b7078]">{t('contact.email')}</p>
                <a
                  href={`mailto:${settings.email}`}
                  className="mt-2 inline-flex min-h-10 items-center font-medium text-[#33363b] transition-colors hover:text-[var(--primary)]"
                >
                  {settings.email}
                </a>
              </div>
            )}

            {settings.whatsappEnabled && (
              <div>
                <p className="text-xs font-medium uppercase tracking-[.2em] text-[#6b7078]">WhatsApp</p>
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-10 items-center font-medium text-[#33363b] transition-colors hover:text-[var(--primary)]"
                >
                  +{settings.whatsapp} ↗
                </a>
              </div>
            )}

            <p className="mt-auto font-mono text-xs text-[#6b7078]">{SITE.coords}</p>
          </address>

          <div className="rounded-2xl bg-[#33363b] p-3 shadow-xl sm:p-5 lg:col-span-9">
            <ContactFormCard />
          </div>
        </div>
      </section>
    </>
  );
}

export function Privacy() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t('seo.privacy.title')} description={t('seo.privacy.description')} path="/aviso-de-privacidad" />
      <section className="mx-auto max-w-3xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <p className="text-xs font-medium uppercase tracking-[.2em] text-[var(--primary)]">{t('footer.privacy')}</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-[#33363b] sm:text-5xl">{t('privacy.title')}</h1>
        <p className="mt-2 text-xs text-[#6b7078]">{t('privacy.updated')}</p>

        <div className="mt-10 space-y-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n}>
              <h2 className="text-lg font-medium text-[#33363b]">{t(`privacy.s${n}Title`)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7078]">{t(`privacy.s${n}Text`)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
