import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { SafeImage } from '../components/SafeImage';
import { Section } from '../components/PageBits';
import { useContact } from '../context/ContactContext';
import { INITIAL_PROJECTS, PORTFOLIOS, loc } from '../data/content';
import { usePublicBlogs } from '../lib/usePublicBlogs';
import { SITE } from '../config/site';

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { open } = useContact();
  const { blogs } = usePublicBlogs();
  const featured = [INITIAL_PROJECTS[0], INITIAL_PROJECTS[2], INITIAL_PROJECTS[4]];

  return (
    <>
      <Seo title={t('seo.home.title')} description={t('seo.home.description')} path="/"
        jsonLd={{ '@context': 'https://schema.org', '@type': 'ArchitecturalFirm', name: SITE.name, url: SITE.url, email: SITE.email, telephone: SITE.phoneLabel, address: { '@type': 'PostalAddress', addressLocality: 'León', addressRegion: 'Guanajuato', addressCountry: 'MX' }, image: SITE.ogImage }} />

      <section className="relative flex min-h-[88vh] flex-col justify-end border-b border-[#23232b] px-4 pb-16 pt-28 sm:px-6 lg:px-12">
        <SafeImage alt="" src={SITE.ogImage} className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/70 to-[#121214]/20" />
        <div className="relative mx-auto w-full max-w-7xl space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4a373]">{t('hero.badge')}</span>
          <h1 className="font-display max-w-5xl text-5xl font-light leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">{t('hero.tagline')}</h1>
          <p className="max-w-2xl text-sm font-light leading-relaxed text-[#b4b4c0] sm:text-base">{t('hero.description')}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/portafolios" className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#f4f4f6] px-6 text-xs font-medium uppercase tracking-widest text-[#121214] hover:bg-white">{t('hero.explore')}<ArrowUpRight className="h-4 w-4" /></Link>
            <button onClick={() => open()} className="inline-flex min-h-[44px] items-center rounded-xl border border-[#2e2e38] bg-[#1a1a20] px-6 text-xs font-medium uppercase tracking-widest text-white hover:bg-[#222228]">{t('hero.talk')}</button>
          </div>
        </div>
      </section>

      <Section className="border-b border-[#23232b]">
        <div className="mb-12 max-w-2xl space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#d4a373]">{t('home.portfoliosBadge')}</span>
          <h2 className="font-display text-3xl font-light text-white sm:text-5xl">{t('home.portfoliosTitle')}</h2>
          <p className="text-sm text-[#9b9ba8]">{t('home.portfoliosText')}</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#23232b] bg-[#23232b] md:grid-cols-3">
          {PORTFOLIOS.map((p, i) => {
            const cover = INITIAL_PROJECTS.find((x) => x.portfolio === p.id)!;
            return (
              <Link key={p.id} to={`/portafolios/${p.id}`} className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden bg-[#18181c] p-6">
                <SafeImage alt="" src={cover.coverImage} className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/50 to-transparent" />
                <div className="relative space-y-2">
                  <span className="font-display text-6xl font-light" style={{ color: p.accent }}>0{i + 1}</span>
                  <h3 className="text-xl font-light text-white">{t(`portfolios.${p.id}.name`)}</h3>
                  <p className="text-xs text-[#b4b4c0]">{t(`portfolios.${p.id}.client`)}</p>
                  <span className="inline-flex min-h-[44px] items-center gap-1 text-xs uppercase tracking-wider" style={{ color: p.accent }}>{t('home.explorePortfolio')} <ArrowUpRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section className="border-b border-[#23232b] bg-[#141418]">
        <div className="mb-10 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#d4a373]">{t('home.featuredBadge')}</span>
          <h2 className="font-display text-3xl font-light text-white sm:text-5xl">{t('home.featuredTitle')}</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((p, i) => (
            <Link key={p.id} to={`/portafolios/${p.portfolio}/${p.id}`} className={`group block ${i === 1 ? 'md:mt-16' : ''}`}>
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#18181c]">
                <SafeImage alt={loc(p.title, lang)} src={p.coverImage} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-light text-white group-hover:text-[#d4a373]">{loc(p.title, lang)}</h3>
                <span className="font-mono text-[11px] text-[#9b9ba8]">{p.year}</span>
              </div>
              <p className="text-xs text-[#9b9ba8]">{loc(p.location, lang)}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="border-b border-[#23232b]">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#d4a373]">{t('home.journalBadge')}</span>
            <h2 className="font-display text-3xl font-light text-white sm:text-5xl">{t('home.journalTitle')}</h2>
          </div>
          <Link to="/blog" className="inline-flex min-h-[44px] items-center gap-1 text-xs uppercase tracking-wider text-[#d4a373] hover:text-white">{t('home.viewAll')} <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {blogs.slice(0, 2).map((b) => (
            <Link key={b.id} to={`/blog/${b.slug}`} className="group rounded-2xl border border-[#23232b] bg-[#18181c] p-6 transition hover:border-[#3d3d4c]">
              <div className="flex justify-between font-mono text-xs text-[#9b9ba8]"><span className="text-[#d4a373]">{loc(b.category, lang)}</span><span>{b.publishedAt}</span></div>
              <h3 className="font-display mt-3 text-2xl font-light text-white group-hover:text-[#d4a373]">{loc(b.title, lang)}</h3>
              <p className="mt-2 text-sm text-[#9b9ba8]">{loc(b.excerpt, lang)}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-[#141418] text-center">
        <h2 className="font-display mx-auto max-w-3xl text-3xl font-light text-white sm:text-5xl">{t('home.ctaTitle')}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[#9b9ba8]">{t('home.ctaText')}</p>
        <button onClick={() => open()} className="mt-8 inline-flex min-h-[44px] items-center rounded-xl bg-[#d4a373] px-8 text-xs font-semibold uppercase tracking-widest text-[#121214] hover:bg-[#c29263]">{t('cta.open')}</button>
      </Section>
    </>
  );
}
