import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE, LANGS } from '../config/site';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: 'website' | 'article';
  jsonLd?: object;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const sel = `link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ''}`;
  let el = document.head.querySelector<HTMLLinkElement>(sel);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

/** SEO por página: título, descripción, Open Graph, canonical, hreflang, lang y JSON-LD. */
export function Seo({ title, description, image, path = '/', type = 'website', jsonLd }: SeoProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const url = `${SITE.url}${path}`;
    document.documentElement.lang = lang;
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image || SITE.ogImage);
    setMeta('property', 'og:locale', lang === 'ja' ? 'ja_JP' : lang === 'en' ? 'en_US' : 'es_MX');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setLink('canonical', url);
    LANGS.forEach((l) => setLink('alternate', url, l));

    const id = 'jsonld-page';
    document.getElementById(id)?.remove();
    if (jsonLd) {
      const s = document.createElement('script');
      s.id = id;
      s.type = 'application/ld+json';
      s.text = JSON.stringify(jsonLd);
      document.head.appendChild(s);
    }
  }, [title, description, image, path, type, lang, jsonLd]);

  return null;
}
