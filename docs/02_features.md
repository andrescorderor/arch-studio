# Features y características del sitio

> Estado: **✅ implementado** · **🟡 parcial** · **⏳ pendiente**

## Páginas (rutas propias, SEO por página)
| Ruta | Contenido | Estado |
|---|---|---|
| `/` | Hero, 3 portafolios, obra destacada, blog, CTA | ✅ |
| `/portafolios` | Índice de los 3 mercados | ✅ |
| `/portafolios/:id` | Portafolio con **diseño propio** (ver abajo) | ✅ |
| `/portafolios/:id/:proyecto` | Ficha: memoria, ubicación, año, m², materiales, galería | ✅ |
| `/nosotros` | Pilares, cifras | 🟡 textos genéricos (falta contenido del cliente) |
| `/menciones` | Premios, publicaciones, concursos | 🟡 datos de muestra genéricos |
| `/blog`, `/blog/:slug` | Listado y lectura | ✅ |
| `/contacto` | Correo, WhatsApp, teléfono, ubicación | 🟡 datos de contacto por confirmar |
| `/aviso-de-privacidad` | LFPDPPP (México) | 🟡 texto base, validar con el cliente |
| `/admin` | Panel del blog (login) | ✅ |

## 3 portafolios, 3 estilos
- **01 Residencial** — editorial cálido: bloques alternados, serif, acento arena.
- **02 Corporativo** — técnico: tabla de datos con vista previa, acento azul acero.
- **03 Espacio público** — orgánico: carrusel horizontal de tarjetas, acento verde salvia.

## CTA y contacto siempre visibles
- Dock flotante en **todas** las páginas: *Escribir mensaje* + WhatsApp + correo.
- *Escribir mensaje* abre un formulario con **asunto y cuerpo editables**; se envía por **correo** o **WhatsApp**.
- El mensaje se **prellena con el proyecto/portafolio/artículo** que se está viendo.
- Barra superior (escritorio), menú móvil y pie con datos de contacto.

## Idiomas (ES · EN · JA)
- Selector en navbar, persistente. **Toda** la interfaz y el contenido (proyectos, premios, blog) tienen versión en los 3 idiomas.
- Tipografía japonesa: Noto Sans/Serif JP.

## Blog y panel
- Login **correo + contraseña** (Firebase Auth) en el navbar → `/admin`.
- Crear, editar, **eliminar con deshacer**, **reordenar** (▲▼), publicar/borrador.
- Editor: negrita, cursiva, **subrayado**, título, subtítulo, lista, cita, **fuentes** (sans/serif/mono).
- Edición por idioma (pestañas ES/EN/JA).

## SEO
- Título, descripción, Open Graph, canonical, hreflang y `lang` por página.
- JSON-LD: `ArchitecturalFirm`, `CreativeWork`, `Article`.
- `robots.txt` (excluye `/admin`) y `sitemap.xml`.

## Calidad
- Responsivo con menú móvil · áreas táctiles ≥ 44 px · foco visible · `prefers-reduced-motion`.
- Sin `alert/confirm/prompt`: toasts y modales propios.
- Paleta grafito (sin negro plano #000).
- Carga inicial ~137 KB gzip; editor y Firestore se cargan bajo demanda.

## Pendiente
- ⏳ Contenido real del cliente (obras, fotos propias, textos, premios).
- ⏳ Branding final (logo, nombre, paleta, tipografías).
- ⏳ Diseño disruptivo definitivo (propuesta v0/Lovable).
- ⏳ Subida de imágenes desde el panel (requiere Storage = plan de pago; hoy se usa URL).
- ⏳ Proyectos y premios administrables desde el panel (hoy en código).
- ⏳ Analítica sin cookies.
