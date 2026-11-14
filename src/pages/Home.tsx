import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { SafeImage } from '../components/SafeImage';
import { Section } from '../components/PageBits';
import { BlogLoader } from '../components/BlogLoader';
import { useContact } from '../context/ContactContext';
import { loc } from '../data/content';
import { usePublicBlogs } from '../lib/usePublicBlogs';
import { useSiteData } from '../lib/useSiteData';
import { SITE } from '../config/site';

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { open } = useContact();
  const { blogs, loading: blogsLoading } = usePublicBlogs();
  const { portfolios, projects } = useSiteData();
  const featured = projects.slice(0, 3);

  return (
    <>
      <Seo title={t('seo.home.title')} description={t('seo.home.description')} path="/"
        jsonLd={{ '@context': 'https://schema.org', '@type': 'ArchitecturalFirm', name: SITE.name, url: SITE.url, email: SITE.email, telephone: SITE.phoneLabel, address: { '@type': 'PostalAddress', addressLocality: 'León', addressRegion: 'Guanajuato', addressCountry: 'MX' }, image: SITE.ogImage }} />

      <section className="relative flex min-h-[85vh] flex-col justify-end border-b border-[#e4e4e7] bg-[#f4f4f2] px-4 pb-16 pt-28 sm:px-6 lg:px-12">
        <SafeImage alt="" src={SITE.ogImage} className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf9] via-[#fafaf9]/75 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#9a6b3b]">{t('hero.badge')}</span>
          <h1 className="font-display max-w-5xl text-5xl font-light leading-[1.05] tracking-tight text-[#18181b] sm:text-7xl lg:text-8xl">{t('hero.tagline')}</h1>
          <p className="max-w-2xl text-sm font-normal leading-relaxed text-[#52525b] sm:text-base">{t('hero.description')}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/portafolios" className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#18181b] px-6 text-xs font-medium uppercase tracking-widest text-white hover:bg-[#27272a]">{t('hero.explore')}<ArrowUpRight className="h-4 w-4" /></Link>
            <button onClick={() => open()} className="inline-flex min-h-[44px] items-center rounded-xl border border-[#d4d4d8] bg-white px-6 text-xs font-medium uppercase tracking-widest text-[#18181b] hover:bg-[#f4f4f5]">{t('hero.talk')}</button>
          </div>
        </div>
      </section>

      <Section className="border-b border-[#e4e4e7] bg-white">
        <div className="mb-12 max-w-2xl space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#9a6b3b]">{t('home.portfoliosBadge')}</span>
          <h2 className="font-display text-3xl font-light text-[#18181b] sm:text-5xl">{t('home.portfoliosTitle')}</h2>
          <p className="text-sm text-[#52525b]">{t('home.portfoliosText')}</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#e4e4e7] bg-[#e4e4e7] md:grid-cols-3">
          {portfolios.map((p, i) => {
            const cover = p.coverImage || projects.find((x) => x.portfolio === p.id)?.coverImage || SITE.ogImage;
            return (
              <Link key={p.id} to={`/portafolios/${p.id}`} className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden bg-[#f4f4f5] p-6">
                <SafeImage alt="" src={cover} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181b]/85 via-[#18181b]/35 to-transparent" />
                <div className="relative space-y-2">
                  <span className="font-display text-6xl font-light text-white/90">0{i + 1}</span>
                  <h3 className="text-xl font-light text-white">{loc(p.name, lang)}</h3>
                  <p className="text-xs text-[#e4e4e7]">{loc(p.client, lang)}</p>
                  <span className="inline-flex min-h-[44px] items-center gap-1 text-xs uppercase tracking-wider text-[#d4a373]">{t('home.explorePortfolio')} <ArrowUpRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section className="border-b border-[#e4e4e7] bg-[#fafaf9]">
        <div className="mb-10 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#9a6b3b]">{t('home.featuredBadge')}</span>
          <h2 className="font-display text-3xl font-light text-[#18181b] sm:text-5xl">{t('home.featuredTitle')}</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((p, i) => (
            <Link key={p.id} to={`/portafolios/${p.portfolio}/${p.id}`} className={`group block ${i === 1 ? 'md:mt-16' : ''}`}>
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#e4e4e7]">
                <SafeImage alt={loc(p.title, lang)} src={p.coverImage} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-normal text-[#18181b] group-hover:text-[#9a6b3b]">{loc(p.title, lang)}</h3>
                <span className="font-mono text-[11px] text-[#71717a]">{p.year}</span>
              </div>
              <p className="text-xs text-[#52525b]">{loc(p.location, lang)}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="border-b border-[#e4e4e7] bg-white">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#9a6b3b]">{t('home.journalBadge')}</span>
            <h2 className="font-display text-3xl font-light text-[#18181b] sm:text-5xl">{t('home.journalTitle')}</h2>
          </div>
          <Link to="/blog" className="inline-flex min-h-[44px] items-center gap-1 text-xs uppercase tracking-wider text-[#9a6b3b] hover:text-[#18181b]">{t('home.viewAll')} <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </div>
        {blogsLoading ? <BlogLoader count={2} /> : (
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.slice(0, 2).map((b) => (
              <Link key={b.id} to={`/blog/${b.slug}`} className="group rounded-2xl border border-[#e4e4e7] bg-[#fafaf9] p-6 transition hover:border-[#a1a1aa]">
                <div className="font-mono text-xs text-[#71717a]">{b.publishedAt}</div>
                <h3 className="font-display mt-3 text-2xl font-light text-[#18181b] group-hover:text-[#9a6b3b]">{loc(b.title, lang)}</h3>
                <p className="mt-2 text-sm text-[#52525b]">{loc(b.excerpt, lang)}</p>
              </Link>
            ))}
          </div>
        )}
      </Section>

      <Section className="bg-[#f4f4f5] text-center">
        <h2 className="font-display mx-auto max-w-3xl text-3xl font-light text-[#18181b] sm:text-5xl">{t('home.ctaTitle')}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[#52525b]">{t('home.ctaText')}</p>
        <button onClick={() => open()} className="mt-8 inline-flex min-h-[44px] items-center rounded-xl bg-[#18181b] px-8 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#27272a]">{t('cta.open')}</button>
      </Section>
    </>
  );
}
