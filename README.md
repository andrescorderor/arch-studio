# Estudio Tectónico — sitio web de despacho de arquitectura

Sitio comercial para un despacho de arquitectura en México: 3 portafolios segmentados por mercado, blog administrable, 3 idiomas (ES/EN/JA) y CTA de contacto permanente. Infraestructura **$0 USD** (Firebase Spark).

**Versión:** 0.2.0 · **Stack:** React 19 + Vite + TypeScript + Tailwind v4 + React Router + Firebase (Firestore/Auth/Hosting) + TipTap.

## Comandos
```bash
npm install
npm run dev      # desarrollo
npm run build    # tsc + vite build (obligatorio antes de subir)
```

## Configuración
Copia `.env.example` a `.env.local` con las claves de Firebase. Datos de contacto y marca: `src/config/site.ts` (o variables `VITE_CONTACT_*`).

## Seguridad de Firestore
Publica `firestore.rules` (consola de Firebase → Firestore → Reglas) y agrega los correos administradores en `isAdmin()`.

## Documentación
- [docs/01_cuestionario_y_contenidos.md](docs/01_cuestionario_y_contenidos.md)
- [docs/02_features.md](docs/02_features.md)
- [docs/03_manual_blog.md](docs/03_manual_blog.md)
- [docs/04_propuesta_comercial.md](docs/04_propuesta_comercial.md)
- [AGENTS.md](AGENTS.md) — reglas y checklist por cambio

## Changelog
- **0.2.0** — Rutas reales (React Router), 3 portafolios con diseño propio, CTA con asunto/mensaje por correo o WhatsApp, Nosotros, Aviso de privacidad, i18n completo incl. contenido, blog con editor TipTap multilenguaje y login Firebase Auth, SEO por página, menú móvil, reglas de Firestore.
- **0.1.0** — Estructura inicial.
