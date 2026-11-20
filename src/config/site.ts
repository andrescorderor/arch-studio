// Datos de contacto y marca centralizados para Medelsa (León, Guanajuato · Todo México).
export const SITE = {
  name: import.meta.env.VITE_SITE_NAME || 'Medelsa',
  url: import.meta.env.VITE_SITE_URL || 'https://medelsa.mx',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'hola@medelsa.mx',
  whatsapp: import.meta.env.VITE_CONTACT_WHATSAPP || '524770000000',
  phoneLabel: import.meta.env.VITE_CONTACT_PHONE_LABEL || '+52 477 000 0000',
  city: 'León, Guanajuato, México · Operación en todo México',
  coords: '21°07′N · 101°41′W',
  ogImage: '/images/hero.png',
};

export const LANGS = ['es', 'en', 'ja'] as const;
export type Lang = (typeof LANGS)[number];
