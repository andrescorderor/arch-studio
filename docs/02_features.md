# Features y características del sitio

> Estado: **✅ implementado** · **🟡 parcial** · **⏳ pendiente**

## Páginas (rutas propias, SEO por página)
| Ruta | Contenido | Estado |
|---|---|---|
| `/` | Hero, 3 portafolios, obra destacada, blog, CTA | ✅ |
| `/portafolios` | Índice de los mercados/portafolios | ✅ |
| `/portafolios/:id` | Portafolio con **diseño propio** (editorial, técnico u orgánico) | ✅ |
| `/portafolios/:id/:proyecto` | Ficha: memoria, ubicación, año, m², materiales, galería | ✅ |
| `/nosotros` | Imagen principal (hero) + párrafos editoriales | 🟡 textos e imagen pendientes con el cliente |
| `/menciones` | Premios, publicaciones, concursos | 🟡 datos de muestra genéricos |
| `/blog`, `/blog/:slug` | Listado con skeleton animado y lectura | ✅ |
| `/contacto` | Correo, WhatsApp, teléfono, ubicación | 🟡 datos de contacto por confirmar |
| `/aviso-de-privacidad` | LFPDPPP (México) | 🟡 texto base, validar con el cliente |
| `/admin` | Panel CMS (Blogs, Portafolios y Proyectos) | ✅ |

## Navegación y tema visual
- **Tema claro / blanco** (`#fafaf9` / `#ffffff`) con textos y acentos en **negro muy oscuro** (`#18181b`, sin negro absoluto `#000000`).
- **Portafolios en hover** en el navbar (escritorio) con despliegue dinámico de los portafolios, y submenú en móvil.
- **Acceso al panel (`/admin`) únicamente en el footer**, fuera del navbar.

## Portafolios dinámicos (3 estilos base)
- **Editorial cálido** — bloques alternados, serif, acento bronce/arena.
- **Técnico** — tabla de datos con vista previa, acento azul acero.
- **Orgánico** — carrusel horizontal de tarjetas, acento verde salvia.
- Administrables desde `/admin` (crear, editar, eliminar con deshacer, reordenar).

## CTA y contacto siempre visibles
- Dock flotante en **todas** las páginas: *Escribir mensaje* + WhatsApp + correo.
- *Escribir mensaje* abre un formulario con **asunto y cuerpo editables**; se envía por **correo** o **WhatsApp**.
- El mensaje se **prellena con el proyecto/portafolio/artículo** que se está viendo.
- Barra superior (escritorio), menú móvil y pie con datos de contacto.

## Idiomas (ES · EN · JA)
- Selector en navbar, persistente. **Toda** la interfaz y el contenido (portafolios, proyectos, premios, blog) tienen versión en los 3 idiomas.
- Tipografía japonesa: Noto Sans/Serif JP.

## Panel CMS (`/admin`)
- Login **correo + contraseña** (Firebase Auth) desde el enlace en el footer → `/admin`.
- **3 pestañas administrables en Firestore ($0 USD):**
  - **Blogs:** crear, editar, eliminar con deshacer, reordenar (▲▼). Editor enriquecido (negrita, cursiva, subrayado, título, subtítulo, lista, cita, fuentes sans/serif/mono). Sin categoría ni borrador (publicación directa).
  - **Portafolios:** crear, editar, eliminar con deshacer, reordenar, elegir estilo visual (`editorial`, `technical`, `organic`).
  - **Proyectos:** crear, editar, eliminar con deshacer, reordenar dentro de cada portafolio (ficha técnica, memoria, materiales, portada y galería).
- **Subida de imágenes gratuita ($0 USD):** carga directa de archivos de imagen comprimidos automáticamente en el navegador (WebP/JPEG) y guardados en Firestore sin requerir Firebase Storage de pago.
- Edición por idioma (pestañas ES/EN/JA) y loader animado (`BlogLoader`).

## SEO
- Título, descripción, Open Graph, canonical, hreflang y `lang` por página.
- JSON-LD: `ArchitecturalFirm`, `CreativeWork`, `Article`.
- `robots.txt` (excluye `/admin`) y `sitemap.xml`.

## Calidad
- Responsivo con menú móvil · áreas táctiles ≥ 44 px · foco visible · `prefers-reduced-motion`.
- Sin `alert/confirm/prompt`: toasts y modales propios.
- Carga inicial optimizada; editor y Firestore se cargan bajo demanda.

## Pendiente
- ⏳ Contenido real del cliente (obras, fotos propias, textos, premios).
- ⏳ Branding final (logo, nombre, paleta, tipografías).
- ⏳ Diseño disruptivo definitivo (propuesta v0/Lovable).
- ⏳ Premios y menciones administrables desde el panel (hoy en código).
- ⏳ Analítica sin cookies.
