# Manual del panel CMS (`/admin`)

## 1. Entrar
1. Baja al **pie de página (footer)** y haz clic en **Admin** (en el navbar no aparece para mantenerlo limpio).
2. Escribe tu **correo** y **contraseña** → **Ingresar**.
3. Para salir: **Cerrar sesión** (arriba a la derecha del panel).

> Solo los correos autorizados por el despacho pueden editar. Las cuentas se crean en Firebase Authentication.

## 2. Pestañas del panel
El panel cuenta con tres secciones conectadas a la base de datos gratuita (Firestore):
- **Blogs:** artículos y ensayos del despacho.
- **Portafolios:** categorías principales (aparecen en el menú desplegable de *Portafolios* y en `/portafolios`).
- **Proyectos:** obras individuales asociadas a cada portafolio.

## 3. Acciones en las listas
Cada fila muestra posición y título.

| Botón | Acción |
|---|---|
| ▲ ▼ | Cambiar el orden en que aparece en el sitio |
| ✏️ | Editar |
| 🗑️ | Eliminar (con **Deshacer** unos segundos) |

## 4. Crear o editar un artículo (Blog)
1. **Nuevo artículo** (o ✏️).
2. Elige el idioma con las pestañas **ES / EN / JA**. El título en **español** es obligatorio; los otros idiomas, si faltan, muestran el español.
3. Completa **Título, Fecha y Resumen**.
4. **Imagen de portada**: haz clic en **Subir imagen** y selecciona un archivo desde tu computadora o teléfono. Se comprime automáticamente para guardarse sin costo en Firestore.
5. **Contenido** con la barra de formato:

| Control | Uso |
|---|---|
| **B** / *I* / U | Negrita, cursiva, subrayado |
| H2 / H3 | Título / subtítulo |
| ¶ | Párrafo normal |
| Lista · Cita | Viñetas · cita destacada |
| Fuente | Sans · Serif · Mono |
| ↶ ↷ | Deshacer / rehacer |

6. **Guardar** (todos los artículos guardados se publican directamente en `/blog`).

## 5. Crear o editar Portafolios y Proyectos
- **Portafolios:** define nombre, subtítulo, descripción (ES/EN/JA), imagen de portada (subida de archivo) y **Estilo visual** (`Editorial`, `Técnico` u `Orgánico`).
- **Proyectos:** selecciona el **Portafolio** al que pertenece, título, ubicación, año, superficie (m²), memoria descriptiva, materiales (ES/EN/JA), imagen de portada y galería (subida de archivos).

## 6. Reordenar y Eliminar
- Usa ▲ ▼ para reordenar; el cambio se guarda al instante en el sitio.
- 🗑️ → confirmar → aparece **Deshacer**. Pasados unos segundos ya no se puede recuperar.

## 7. Si algo falla
| Mensaje | Qué hacer |
|---|---|
| Correo o contraseña incorrectos | Verifica datos; pide restablecer la cuenta |
| No se pudo guardar | Revisa conexión y que tu correo esté autorizado |
| Imagen demasiado pesada | Usa una imagen menor o recórtala (el sistema la comprime a < 900 KB) |
| No hay conexión con la base de datos | Avisar al equipo técnico |
