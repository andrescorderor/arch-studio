// Datos de contacto y marca centralizados. Se sobreescriben con variables VITE_* al conocer los datos reales del cliente.
export const SITE = {
  name: import.meta.env.VITE_SITE_NAME || 'Estudio Tectónico',
  url: import.meta.env.VITE_SITE_URL || 'https://arch-studio-app.web.app',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'contacto@estudiotectonico.mx',
  whatsapp: import.meta.env.VITE_CONTACT_WHATSAPP || '524770000000',
  phoneLabel: import.meta.env.VITE_CONTACT_PHONE_LABEL || '+52 477 000 0000',
  city: 'León, Guanajuato, México',
  ogImage: '/images/hero.png',
};

export const LANGS = ['es', 'en', 'ja'] as const;
export type Lang = (typeof LANGS)[number];

