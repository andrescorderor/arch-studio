import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Seo } from '../components/Seo';
import { SafeImage } from '../components/SafeImage';
import { PageHeader, Section } from '../components/PageBits';
import { BlogLoader } from '../components/BlogLoader';
import { useContact, usePageContext } from '../context/ContactContext';
import { INITIAL_AWARDS, loc } from '../data/content';
import { usePublicBlogs } from '../lib/usePublicBlogs';
import { SITE } from '../config/site';

/** Nosotros: imagen principal tipo hero + párrafos editoriales (se validará el contenido final con el cliente). */
export function About() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t('seo.about.title')} description={t('seo.about.description')} path="/nosotros" />
      <PageHeader badge={t('about.badge')} title={t('about.title')} />
      <div className="aspect-[21/9] max-h-[65vh] w-full overflow-hidden bg-[#e4e4e7]">
        <SafeImage alt={t('about.title')} src={SITE.ogImage} className="h-full w-full object-cover" />
      </div>
      <Section className="bg-white">
        <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-[#3f3f46] sm:text-lg">
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <p className="border-l-2 border-[#9a6b3b] pl-4 text-sm text-[#71717a]">{t('about.p3')}</p>
        </div>
      </Section>
    </>
  );
}

export function Awards() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <>
      <Seo title={t('seo.awards.title')} description={t('seo.awards.description')} path="/menciones" />
      <PageHeader badge={t('awards.badge')} title={t('awards.title')} subtitle={t('awards.subtitle')} />
      <Section className="bg-white">
        <div className="divide-y divide-[#e4e4e7] border-y border-[#e4e4e7]">
          {INITIAL_AWARDS.map((a, i) => (
            <div key={i} className="flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:gap-8">
              <span className="font-mono text-2xl text-[#9a6b3b] sm:w-24">{a.year}</span>
              <div className="flex-1">
                <h2 className="text-xl font-light text-[#18181b]">{loc(a.title, lang)}</h2>
                <p className="mt-1 text-sm text-[#52525b]">{loc(a.institution, lang)} — {t('awards.project')}: {loc(a.project, lang)}</p>
              </div>
              <span className="w-fit rounded-full border border-[#d4d4d8] px-3 py-1 text-[11px] uppercase tracking-wider text-[#52525b]">{t(`awards.types.${a.type}`)}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export function Blog() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { blogs, loading } = usePublicBlogs();
  return (
    <>
      <Seo title={t('seo.blog.title')} description={t('seo.blog.description')} path="/blog" />
      <PageHeader badge={t('blog.badge')} title={t('blog.title')} subtitle={t('blog.subtitle')} />
      <Section className="bg-white">
        {loading ? (
          <BlogLoader count={2} />
        ) : blogs.length === 0 ? (
          <p className="text-[#52525b]">{t('blog.empty')}</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {blogs.map((b) => (
              <Link key={b.id} to={`/blog/${b.slug}`} className="group overflow-hidden rounded-2xl border border-[#e4e4e7] bg-[#fafaf9] transition hover:border-[#a1a1aa]">
                <div className="aspect-[16/9] overflow-hidden bg-[#e4e4e7]"><SafeImage alt={loc(b.title, lang)} src={b.coverImage} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
                <div className="space-y-3 p-6">
                  <div className="font-mono text-xs text-[#71717a]">{b.publishedAt}</div>
                  <h2 className="font-display text-2xl font-light text-[#18181b] group-hover:text-[#9a6b3b]">{loc(b.title, lang)}</h2>
                  <p className="text-sm text-[#52525b]">{loc(b.excerpt, lang)}</p>
                  <span className="inline-flex min-h-[44px] items-center gap-1 text-xs uppercase tracking-wider text-[#9a6b3b]">{t('blog.readMore')} <ArrowUpRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { blogs, loading } = usePublicBlogs();
  const post = blogs.find((b) => b.slug === slug);
  usePageContext(post ? loc(post.title, lang) : undefined);

  if (loading && !post) {
    return (<Section className="bg-white"><BlogLoader count={1} /></Section>);
  }
  if (!post) {
    return (<Section className="bg-white"><p className="text-[#52525b]">{t('blog.notFound')}</p><Link to="/blog" className="mt-6 inline-flex min-h-[44px] items-center text-sm text-[#9a6b3b]">← {t('blog.back')}</Link></Section>);
  }
  const html = DOMPurify.sanitize(loc(post.contentHtml, lang));
  const title = loc(post.title, lang);
  return (
    <>
      <Seo title={`${title} | ${t('brand.title')}`} description={loc(post.excerpt, lang)} image={post.coverImage} type="article" path={`/blog/${post.slug}`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'Article', headline: title, datePublished: post.publishedAt, image: post.coverImage, author: { '@type': 'Organization', name: SITE.name } }} />
      <article className="bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex min-h-[44px] items-center text-xs uppercase tracking-wider text-[#52525b] hover:text-[#18181b]">← {t('blog.back')}</Link>
          <div className="mt-6 font-mono text-xs text-[#71717a]">{post.publishedAt}</div>
          <h1 className="font-display mt-3 text-4xl font-light leading-tight text-[#18181b] sm:text-6xl">{title}</h1>
          <div className="my-8 aspect-[16/9] overflow-hidden rounded-xl bg-[#f4f4f5]"><SafeImage alt={title} src={post.coverImage} className="h-full w-full object-cover" /></div>
          <div className="prose-arch" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>
    </>
  );
}

export function Contact() {
  const { t } = useTranslation();
  const { open } = useContact();
  const items = [
    { icon: Mail, label: t('contact.email'), value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MessageCircle, label: t('contact.whatsapp'), value: SITE.phoneLabel, href: `https://wa.me/${SITE.whatsapp}` },
    { icon: Phone, label: t('contact.phone'), value: SITE.phoneLabel, href: `tel:+${SITE.whatsapp}` },
    { icon: MapPin, label: t('contact.location'), value: SITE.city },
  ];
  return (
    <>
      <Seo title={t('seo.contact.title')} description={t('seo.contact.description')} path="/contacto" />
      <PageHeader badge={t('contact.badge')} title={t('contact.title')} subtitle={t('contact.description')}>
        <button onClick={() => open()} className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-[#18181b] px-8 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#27272a]">{t('contact.write')}</button>
      </PageHeader>
      <Section className="bg-white">
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(({ icon: Icon, label, value, href }) => {
            const body = (<><Icon className="h-5 w-5 text-[#9a6b3b]" aria-hidden /><div><p className="font-mono text-[11px] uppercase tracking-wider text-[#71717a]">{label}</p><p className="mt-1 text-[#18181b]">{value}</p></div></>);
            const cls = 'flex min-h-[44px] items-start gap-4 rounded-2xl border border-[#e4e4e7] bg-[#fafaf9] p-6';
            return href ? (<a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={`${cls} transition hover:border-[#a1a1aa]`}>{body}</a>) : (<div key={label} className={cls}>{body}</div>);
          })}
        </div>
      </Section>
    </>
  );
}

export function Privacy() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t('seo.privacy.title')} description={t('seo.privacy.description')} path="/aviso-de-privacidad" />
      <PageHeader badge={t('footer.privacy')} title={t('privacy.title')} subtitle={t('privacy.updated')} />
      <Section className="bg-white">
        <div className="max-w-3xl space-y-8">
          {[1, 2, 3, 4].map((n) => (<div key={n}><h2 className="text-lg font-medium text-[#18181b]">{t(`privacy.s${n}Title`)}</h2><p className="mt-2 text-sm leading-relaxed text-[#52525b]">{t(`privacy.s${n}Text`)}</p></div>))}
        </div>
      </Section>
    </>
  );
}
