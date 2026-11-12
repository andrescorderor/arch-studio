import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { ArrowUpRight, FlaskConical, HardHat, Leaf, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Seo } from '../components/Seo';
import { SafeImage } from '../components/SafeImage';
import { PageHeader, Section } from '../components/PageBits';
import { useContact, usePageContext } from '../context/ContactContext';
import { INITIAL_AWARDS, INITIAL_PROJECTS, loc } from '../data/content';
import { usePublicBlogs } from '../lib/usePublicBlogs';
import { SITE } from '../config/site';

export function About() {
  const { t } = useTranslation();
  const pillars = [
    { icon: FlaskConical, title: t('about.p1Title'), text: t('about.p1Text') },
    { icon: HardHat, title: t('about.p2Title'), text: t('about.p2Text') },
    { icon: Leaf, title: t('about.p3Title'), text: t('about.p3Text') },
  ];
  const m2 = INITIAL_PROJECTS.reduce((s, p) => s + p.areaM2, 0);
  const stats = [
    [String(INITIAL_PROJECTS.length), t('about.statsProjects')],
    [`${Math.round(m2 / 1000)}k+`, t('about.statsM2')],
    [String(INITIAL_AWARDS.length), t('awards.badge')],
  ];
  return (
    <>
      <Seo title={t('seo.about.title')} description={t('seo.about.description')} path="/nosotros" />
      <PageHeader badge={t('about.badge')} title={t('about.title')} subtitle={t('about.lead')} />
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-[#23232b] bg-[#18181c] p-7">
              <Icon className="h-7 w-7 text-[#d4a373]" aria-hidden />
              <h2 className="mt-5 text-xl font-light text-white">{title}</h2>
              <p className="mt-2 text-sm text-[#9b9ba8]">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 grid grid-cols-3 gap-4 border-y border-[#23232b] py-10 text-center">
          {stats.map(([n, l]) => (<div key={l}><p className="font-display text-4xl font-light text-[#d4a373] sm:text-6xl">{n}</p><p className="mt-1 text-[11px] uppercase tracking-wider text-[#9b9ba8] sm:text-xs">{l}</p></div>))}
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
      <Section>
        <div className="divide-y divide-[#23232b] border-y border-[#23232b]">
          {INITIAL_AWARDS.map((a, i) => (
            <div key={i} className="flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:gap-8">
              <span className="font-mono text-2xl text-[#d4a373] sm:w-24">{a.year}</span>
              <div className="flex-1">
                <h2 className="text-xl font-light text-white">{loc(a.title, lang)}</h2>
                <p className="mt-1 text-sm text-[#9b9ba8]">{loc(a.institution, lang)} — {t('awards.project')}: {loc(a.project, lang)}</p>
              </div>
              <span className="w-fit rounded-full border border-[#2e2e38] px-3 py-1 text-[11px] uppercase tracking-wider text-[#9b9ba8]">{t(`awards.types.${a.type}`)}</span>
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
      <Section>
        {loading && <p className="text-sm text-[#9b9ba8]">{t('common.loading')}</p>}
        {!loading && blogs.length === 0 && <p className="text-[#9b9ba8]">{t('blog.empty')}</p>}
        <div className="grid gap-8 md:grid-cols-2">
          {blogs.map((b) => (
            <Link key={b.id} to={`/blog/${b.slug}`} className="group overflow-hidden rounded-2xl border border-[#23232b] bg-[#18181c] transition hover:border-[#3d3d4c]">
              <div className="aspect-[16/9] overflow-hidden"><SafeImage alt={loc(b.title, lang)} src={b.coverImage} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
              <div className="space-y-3 p-6">
                <div className="flex justify-between font-mono text-xs text-[#9b9ba8]"><span className="text-[#d4a373]">{loc(b.category, lang)}</span><span>{b.publishedAt}</span></div>
                <h2 className="font-display text-2xl font-light text-white group-hover:text-[#d4a373]">{loc(b.title, lang)}</h2>
                <p className="text-sm text-[#9b9ba8]">{loc(b.excerpt, lang)}</p>
                <span className="inline-flex min-h-[44px] items-center gap-1 text-xs uppercase tracking-wider text-[#d4a373]">{t('blog.readMore')} <ArrowUpRight className="h-3.5 w-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
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

  if (!post) {
    return (<Section><p className="text-[#9b9ba8]">{loading ? t('common.loading') : t('blog.notFound')}</p><Link to="/blog" className="mt-6 inline-flex min-h-[44px] items-center text-sm text-[#d4a373]">← {t('blog.back')}</Link></Section>);
  }
  const html = DOMPurify.sanitize(loc(post.contentHtml, lang));
  const title = loc(post.title, lang);
  return (
    <>
      <Seo title={`${title} | ${t('brand.title')}`} description={loc(post.excerpt, lang)} image={post.coverImage} type="article" path={`/blog/${post.slug}`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'Article', headline: title, datePublished: post.publishedAt, image: post.coverImage, author: { '@type': 'Organization', name: SITE.name } }} />
      <article className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex min-h-[44px] items-center text-xs uppercase tracking-wider text-[#9b9ba8] hover:text-white">← {t('blog.back')}</Link>
          <div className="mt-6 flex justify-between font-mono text-xs text-[#9b9ba8]"><span className="text-[#d4a373]">{loc(post.category, lang)}</span><span>{post.publishedAt}</span></div>
          <h1 className="font-display mt-3 text-4xl font-light leading-tight text-white sm:text-6xl">{title}</h1>
          <div className="my-8 aspect-[16/9] overflow-hidden rounded-xl bg-[#18181c]"><SafeImage alt={title} src={post.coverImage} className="h-full w-full object-cover" /></div>
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
        <button onClick={() => open()} className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-[#d4a373] px-8 text-xs font-semibold uppercase tracking-widest text-[#121214] hover:bg-[#c29263]">{t('contact.write')}</button>
      </PageHeader>
      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(({ icon: Icon, label, value, href }) => {
            const body = (<><Icon className="h-5 w-5 text-[#d4a373]" aria-hidden /><div><p className="font-mono text-[11px] uppercase tracking-wider text-[#6e6e7a]">{label}</p><p className="mt-1 text-white">{value}</p></div></>);
            const cls = 'flex min-h-[44px] items-start gap-4 rounded-2xl border border-[#23232b] bg-[#18181c] p-6';
            return href ? (<a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={`${cls} transition hover:border-[#3d3d4c]`}>{body}</a>) : (<div key={label} className={cls}>{body}</div>);
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
      <Section>
        <div className="max-w-3xl space-y-8">
          {[1, 2, 3, 4].map((n) => (<div key={n}><h2 className="text-lg text-white">{t(`privacy.s${n}Title`)}</h2><p className="mt-2 text-sm leading-relaxed text-[#9b9ba8]">{t(`privacy.s${n}Text`)}</p></div>))}
        </div>
      </Section>
    </>
  );
}
