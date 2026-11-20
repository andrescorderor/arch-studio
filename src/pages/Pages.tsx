import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { BlogLoader } from '../components/BlogLoader';
import { ContactFormCard } from '../components/ContactFormCard';
import { loc, type MentionCategory } from '../data/content';
import { usePublicBlogs } from '../lib/usePublicBlogs';
import { useSiteData } from '../lib/useSiteData';
import { SITE } from '../config/site';

/** Nosotros: imagen principal editable desde /admin + párrafos editoriales. */
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
        <div className="border-b border-[#e6e3de] pb-12">
          <p className="text-xs font-medium uppercase tracking-[.2em] text-[var(--primary)]">
            Medelsa. · León, Guanajuato
          </p>
          <h1 className="mt-5 text-[clamp(3.5rem,13vw,9.5rem)] font-medium leading-[.86] tracking-[-.07em] text-[#33363b]">
            {t('nav.about')}
            <span className="text-[var(--primary)]">.</span>
          </h1>
        </div>

        <div
          data-cursor="view"
          className="mt-10 aspect-[21/9] max-h-[65vh] w-full overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#f2f0ec]"
        >
          <img
            alt={t('about.title')}
            src={settings.aboutImage || '/images/studio.png'}
            data-curtain-reveal="true"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-6 text-lg leading-relaxed text-[#4b4f56]">
          {paragraphs.map((p, idx) => (
            <p key={idx} className={idx === 0 ? 'text-xl font-normal text-[#33363b] md:text-2xl' : ''}>
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

/** Menciones, Publicaciones y Concursos (con métricas, obra en prensa destacada, filtros y vista previa). */
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
            <p className="text-xs font-medium uppercase tracking-[.16em] text-[var(--primary)]">
              Medelsa. · {t('awards.badge')}
            </p>
            <h1 className="mt-5 text-[clamp(3.5rem,13vw,9.5rem)] font-medium leading-[.86] tracking-[-.07em] text-[#33363b]">
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
              className="group relative block min-h-64 overflow-hidden rounded-2xl bg-[#faf9f7] md:min-h-[24rem]"
            >
              <img
                src={featured.image || '/images/res-1.png'}
                alt={featured.title}
                data-curtain-reveal="true"
                className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-tectonic)] group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-[#33363b]/80 px-3 py-2 text-[10px] font-medium uppercase tracking-[.16em] text-white backdrop-blur">
                Obra en prensa · Reconocimiento principal
              </span>
            </Link>

            <div className="mt-6 flex flex-col justify-between md:mt-0 md:py-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[#6b7078]">{featured.year}</span>
                  <span className="inline-flex min-h-7 items-center rounded-full bg-[var(--primary)]/10 px-3 text-[10px] font-medium uppercase tracking-[.14em] text-[var(--primary)]">
                    {featured.type}
                  </span>
                </div>
                <h2 className="text-3xl font-medium leading-tight tracking-tight text-[#33363b] md:text-4xl">
                  {featured.title}
                </h2>
                <p className="text-base text-[#6b7078]">{featured.source}</p>
              </div>

              <Link
                to={featured.href || '/portafolios/residencial/casa-basalto'}
                className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 border-b border-[#33363b] pb-2 text-xs font-medium uppercase tracking-wide text-[#33363b] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                Leer publicación o ver proyecto ↗
              </Link>
            </div>
          </article>
        )}

        {/* Filtros en píldoras */}
        <div role="tablist" aria-label="Filtrar menciones" className="mt-10 flex flex-wrap gap-2">
          {MENTION_FILTERS.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(cat)}
                className={`min-h-11 rounded-full border px-5 text-xs font-medium uppercase tracking-wide transition-colors ${
                  active
                    ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                    : 'border-[#e6e3de] bg-[#faf9f7] text-[#6b7078] hover:border-[var(--primary)] hover:text-[#33363b]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Listado cronológico con vista previa flotante en hover */}
        <ol className="mt-8 divide-y divide-[#e6e3de] border-y border-[#e6e3de]">
          {filtered.map((m, idx) => {
            const thumb = m.image || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
            return (
              <li key={m.id}>
                <Link
                  to={m.href || '/portafolios/residencial/casa-basalto'}
                  className="group relative grid grid-cols-12 items-center gap-y-3 py-6 transition-colors hover:bg-[#faf9f7] md:gap-4 md:px-4 md:py-8"
                >
                  <span className="col-span-2 font-mono text-xs text-[var(--primary)] md:col-span-1">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="col-span-4 font-mono text-sm text-[#6b7078] md:col-span-1">{m.year}</span>
                  <div className="col-span-6 md:col-span-2">
                    <span className="inline-flex min-h-7 items-center rounded-full bg-[var(--primary)]/10 px-3 text-[10px] font-medium uppercase tracking-[.14em] text-[var(--primary)]">
                      {m.type}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <h3 className="text-xl font-medium tracking-tight text-[#33363b] transition-colors group-hover:text-[var(--primary)] md:text-2xl">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#6b7078]">{m.source}</p>
                  </div>
                  <span className="col-span-12 hidden justify-self-end text-sm text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1 md:col-span-1 md:block">
                    ↗
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-14 top-1/2 z-20 hidden h-28 w-44 -translate-y-1/2 scale-95 overflow-hidden rounded-xl border border-[#e6e3de] opacity-0 shadow-xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 lg:block"
                  >
                    <img src={thumb} alt="" className="h-full w-full object-cover" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}

/** Blog: listado sin categorías y lectura con fotos dentro del artículo. */
export function Blog() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { blogs, loading } = usePublicBlogs();

  return (
    <>
      <Seo title={t('seo.blog.title')} description={t('seo.blog.description')} path="/blog" />
      <section className="mx-auto max-w-screen-2xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <div className="border-b border-[#e6e3de] pb-12">
          <p className="text-xs font-medium uppercase tracking-[.2em] text-[var(--primary)]">
            Medelsa. · {t('blog.badge')}
          </p>
          <h1 className="mt-5 text-[clamp(3.5rem,13vw,9.5rem)] font-medium leading-[.86] tracking-[-.07em] text-[#33363b]">
            {t('nav.journal')}
            <span className="text-[var(--primary)]">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#6b7078]">{t('blog.subtitle')}</p>
        </div>

        <div className="mt-12">
          {loading ? (
            <BlogLoader count={2} />
          ) : blogs.length === 0 ? (
            <p className="text-[#6b7078]">{t('blog.empty')}</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((b) => (
                <Link
                  key={b.id}
                  to={`/blog/${b.slug}`}
                  data-cursor="view"
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#faf9f7] transition hover:border-[var(--primary)]/50 hover:shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#f2f0ec]">
                    <img
                      alt={loc(b.title, lang)}
                      src={b.coverImage}
                      data-curtain-reveal="true"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                    <div className="space-y-2">
                      <div className="font-mono text-xs text-[#6b7078]">{b.publishedAt}</div>
                      <h2 className="text-2xl font-medium leading-snug tracking-tight text-[#33363b] transition-colors group-hover:text-[var(--primary)]">
                        {loc(b.title, lang)}
                      </h2>
                      <p className="text-sm leading-relaxed text-[#6b7078]">{loc(b.excerpt, lang)}</p>
                    </div>
                    <span className="inline-flex min-h-11 items-center gap-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                      {t('blog.readMore')} <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
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
      <section className="mx-auto max-w-3xl px-5 py-36">
        <BlogLoader count={1} />
      </section>
    );
  }
  if (!post) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-36">
        <p className="text-[#6b7078]">{t('blog.notFound')}</p>
        <Link to="/blog" className="mt-6 inline-flex min-h-11 items-center text-sm text-[var(--primary)]">
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
      <article className="mx-auto max-w-3xl px-5 pb-28 pt-32 sm:px-6 md:pt-40">
        <Link
          to="/blog"
          className="inline-flex min-h-11 items-center text-xs font-medium uppercase tracking-wider text-[#6b7078] hover:text-[var(--primary)]"
        >
          ← {t('blog.back')}
        </Link>
        <div className="mt-6 font-mono text-xs text-[#6b7078]">{post.publishedAt}</div>
        <h1 className="mt-3 text-4xl font-medium leading-tight tracking-tight text-[#33363b] sm:text-5xl">
          {title}
        </h1>
        <div className="my-8 aspect-[16/9] overflow-hidden rounded-2xl border border-[#e6e3de] bg-[#f2f0ec]">
          <img alt={title} src={post.coverImage} data-curtain-reveal="true" className="h-full w-full object-cover" />
        </div>
        <div className="prose-arch" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </>
  );
}

/** Contacto: datos del despacho + formulario protagonista en <main> (sin duplicar en footer). */
export function Contact() {
  const { t } = useTranslation();
  const { settings } = useSiteData();

  return (
    <>
      <Seo title={t('seo.contact.title')} description={t('seo.contact.description')} path="/contacto" />
      <section className="mx-auto max-w-screen-2xl px-5 pb-28 pt-36 md:px-7 md:pt-44">
        <div className="border-b border-[#e6e3de] pb-12">
          <p className="text-xs font-medium uppercase tracking-[.2em] text-[var(--primary)]">
            León, Guanajuato · Todo México
          </p>
          <h1 className="mt-5 text-[clamp(3.5rem,13vw,9.5rem)] font-medium leading-[.86] tracking-[-.07em] text-[#33363b]">
            {t('nav.contact')}
            <span className="text-[var(--primary)]">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#6b7078]">{t('contact.description')}</p>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-y-10 md:gap-x-10">
          <div className="col-span-12 space-y-6 lg:col-span-5">
            {settings.emailEnabled && (
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[#6b7078]">{t('contact.email')}</p>
                <a
                  href={`mailto:${settings.email}`}
                  className="mt-1 inline-block text-xl font-medium text-[#33363b] underline decoration-[#e6e3de] underline-offset-8 hover:text-[var(--primary)]"
                >
                  {settings.email}
                </a>
              </div>
            )}

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#6b7078]">{t('contact.phone')}</p>
              <p className="mt-1 text-lg text-[#33363b]">{settings.phone}</p>
            </div>

            {settings.whatsappEnabled && (
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[#6b7078]">WhatsApp</p>
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-lg font-medium text-[var(--primary)] hover:underline"
                >
                  WhatsApp ↗
                </a>
              </div>
            )}

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#6b7078]">{t('contact.location')}</p>
              <p className="mt-1 text-base text-[#33363b]">{settings.location}</p>
              <p className="mt-1 font-mono text-xs text-[#6b7078]">{SITE.coords}</p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
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
