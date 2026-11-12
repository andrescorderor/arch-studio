# Manual del blog (panel `/admin`)

## 1. Entrar
1. En el navbar, clic en **Acceso**.
2. Escribe tu **correo** y **contraseña** → **Ingresar**.
3. Para salir: **Cerrar sesión** (arriba a la derecha del panel).

> Solo los correos autorizados por el despacho pueden editar. Las cuentas se crean en Firebase Authentication.

## 2. Lista de artículos
Cada fila muestra posición, título, categoría, fecha y estado (**Publicado** / **Borrador**).

| Botón | Acción |
|---|---|
| ▲ ▼ | Cambiar el orden en que aparece en el sitio |
| ✏️ | Editar |
| 🗑️ | Eliminar (con **Deshacer** unos segundos) |

## 3. Crear o editar
1. **Nuevo artículo** (o ✏️).
2. Elige el idioma con las pestañas **ES / EN / JA**. El título en **español** es obligatorio; los otros idiomas, si faltan, muestran el español.
3. Completa **Título, Categoría, Fecha, Resumen**.
4. **Imagen de portada**: pega la URL de la imagen.
5. **Contenido** con la barra de formato:

| Control | Uso |
|---|---|
| **B** / *I* / U | Negrita, cursiva, subrayado |
| H2 / H3 | Título / subtítulo |
| ¶ | Párrafo normal |
| Lista · Cita | Viñetas · cita destacada |
| Fuente | Sans · Serif · Mono |
| ↶ ↷ | Deshacer / rehacer |

6. Marca **Publicado** para que sea visible; desmárcalo para dejarlo como borrador.
7. **Guardar**.

## 4. Reordenar
Usa ▲ ▼. El cambio se guarda al instante y se refleja en `/blog` y en el inicio.

## 5. Eliminar
🗑️ → confirmar → aparece **Deshacer**. Pasados unos segundos ya no se puede recuperar.

## 6. Si algo falla
| Mensaje | Qué hacer |
|---|---|
| Correo o contraseña incorrectos | Verifica datos; pide restablecer la cuenta |
| No se pudo guardar | Revisa conexión y que tu correo esté autorizado |
| No hay conexión con la base de datos | Avisar al equipo técnico |
