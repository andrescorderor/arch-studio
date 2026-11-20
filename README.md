# Medelsa — sitio web de despacho de arquitectura (León, Gto. · Todo México)

Sitio comercial para **Medelsa**: portafolios segmentados por categoría (`/residencial`, `/corporativo`, `/espacio-publico`), blog administrable con fotos internas, menciones/publicaciones/concursos, configuración total desde `/admin`, 3 idiomas (ES/EN/JA con `Noto Sans JP`) y bloque de contacto destacado al final de todas las páginas. Infraestructura **$0 USD** (Firebase Spark).

**Versión:** 0.5.0 · **Stack:** React 19 + Vite + TypeScript + Tailwind v4 + React Router + Firebase (Firestore/Auth/Hosting) + TipTap.

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
- [docs/05_solicitud_material_cliente.md](docs/05_solicitud_material_cliente.md)
- [AGENTS.md](AGENTS.md) — reglas y checklist por cambio

## Changelog
- **0.5.0** — Integración completa del demo de **Medelsa** (León, Gto.): paleta Verde Olivo (`#3d5a47` / `#93b59e`) y gris grafito (`#33363b`, 0% negro), cortina inicial (`ArchitecturalPreloader`), barra de progreso de lectura, *Image Curtain Reveal*, navbar flotante con indicador deslizante y drawer móvil/tablet a pantalla completa, bloque de contacto `#33363b` con tarjeta clara de 3 campos (Teléfono/correo, Asunto, Mensaje) en todas las páginas, vista previa de Menciones en Home, `/menciones` pulida con métricas y filtros, y 4ª pestaña **Configuración del sitio** en `/admin` (color de acento en vivo, switches de canales, Nosotros y Menciones en Firestore).
- **0.4.0** — Integración completa de la interfaz arquitectónica editorial (inspirada en el prototipo v0): cursor físico interactivo (`CustomCursor`), Hero monumental con zoom tectónico, mega-menú hover con miniaturas en Portafolios, 3 layouts segmentados interactivos con *"Referenciar en consulta"*, bloque Despacho y Método 01—04, dock flotante con vista previa de obra y footer monumental con acceso exclusivo a `/admin`.
- **0.3.0** — Tema claro/blanco con negros muy oscuros (`#18181b`), menú hover en Portafolios, acceso `/admin` movido exclusivamente al footer, CRUD completo de Portafolios y Proyectos en `/admin`, subida de imágenes con compresión gratuita a Firestore ($0 USD), loader animado para blogs, eliminación de categoría/borrador en blogs y simplificación de `/nosotros`.
- **0.2.0** — Rutas reales (React Router), 3 portafolios con diseño propio, CTA con asunto/mensaje por correo o WhatsApp, Nosotros, Aviso de privacidad, i18n completo incl. contenido, blog con editor TipTap multilenguaje y login Firebase Auth, SEO por página, menú móvil, reglas de Firestore.
- **0.1.0** — Estructura inicial.
