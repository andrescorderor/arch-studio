# Especificaciones y Reglas del Proyecto (Architecture Studio & Admin CMS)

Este documento define las directrices maestras, arquitectura, estándares de diseño y criterios obligatorios de entrega que Antigravity debe seguir estrictamente al desarrollar, modificar o integrar nuevas funcionalidades en este proyecto.

---

## 🧭 Directrices Maestras y Filosofía de Ingeniería

### REGLA 0: Mentalidad de Producción Real para Usuarios Finales (MANDATORIA)
**SIEMPRE trabajar como si esto fuera la versión productiva final que van a usar clientes reales y que pagan dinero, desde el primer día.**
1. **Cero textos de prueba visibles:** Queda estrictamente prohibido mostrar "demo", "ejemplo", "placeholder", "mock", "prueba" o "modo local" en interfaces de usuario final.
2. **Sin accesos de prueba o bypass de desarrollador expuestos:** La pantalla y el panel deben verse 100% como un software comercial terminado de clase ejecutiva.
3. **Datos y entidades con coherencia profesional:** Cualquier registro base, predeterminado o de ejemplo debe representar información realista, coherente y funcional (nombres de proyectos arquitectónicos verosímiles, fichas técnicas con $m^2$, locaciones reales y fotografías de alta calidad).
4. **Cada pantalla debe estar lista para operar:** Si el arquitecto o un cliente corporativo abre cualquier vista, debe ver un portafolio cinematográfico, coherente, pulido y robusto.

---

### REGLA 0.1: Costo $0 USD por Defecto y Alerta de Pago Obligatoria (MÁXIMA PRIORIDAD)
**SIEMPRE implementar la opción gratuita, funcional y con capacidad de escalar a futuro.**
1. **Costo $0 USD por defecto:** Todo componente, librería, servicio, base de datos y despliegue debe utilizar tiers gratuitos y código abierto (Vercel / Netlify Free, Supabase Free Tier, Resend Free Tier, GitHub Actions, Google Fonts / Fontsource).
2. **ALERTA DE PAGO OBLIGATORIA (MÁXIMA PRIORIDAD):**
   > [!CRITICAL]
   > **Si para cualquier funcionalidad, herramienta o servicio es necesario pagar algo o incurrir en costos recurrentes, SE LE DEBE INFORMAR A ANDRÉS CON MÁXIMA PRIORIDAD ANTES DE IMPLEMENTARLO O CONTRATARLO.** Jamás asumir o comprometer gasto alguno sin su aprobación explícita previa.

---

### REGLA 0.2: Regla de Cursor Interactivo Universal (MANDATORIA)
> [!CRITICAL]
> **Todo elemento clickeable (botones, enlaces `<a>`, selectores, tabs, tarjetas de portafolio con acción, checkboxes, switches y disparadores) DEBE mostrar `cursor: pointer !important` (`cursor-pointer`) al pasar el cursor por encima.** Jamás dejar un botón o tarjeta interactiva con el cursor por defecto (`default` / `auto`).

---

### REGLA 0.3: Prohibición Estricta de Diálogos Nativos del Navegador (`alert`, `confirm`, `prompt`)
**Queda estrictamente prohibido el uso de ventanas modales nativas del navegador (`alert()`, `confirm()`, `prompt()`).**
1. **Componentes In-App Estandarizados:** Todas las notificaciones de éxito, error, advertencia o confirmación deben renderizarse con la capa de interfaz estandarizada del proyecto:
   - Notificaciones y toasts accesibles (`toast.success()`, `toast.error()`, `toast.info()`).
   - Modales de confirmación interactivos in-app o confirmaciones con opción de Deshacer (`toast.undoable`).
2. **Cero Bloqueo de Hilo:** Las alertas in-app no congelan la ejecución de animaciones ni degradan la experiencia del usuario.

---

### REGLA 0.4: Prohibición Estricta de Palabras "iPad" o "Tablet/Tableta" en la Interfaz
**Queda terminantemente prohibido colocar explícitamente las palabras "iPad", "Tablet" o "Tableta" en la interfaz de usuario.**
- En su lugar, utilizar siempre términos profesionales neutros:
  - *Dispositivo móvil* o *Tu dispositivo*
  - *Pantalla táctil*
  - *Pantalla secundaria*

---

### REGLA 0.5: Higiene Visual Editorial y Uso de Tooltips Interactivos
**En todos los módulos, modales, formularios y tarjetas, queda prohibido incluir párrafos o textos explicativos permanentes largos que saturen visualmente la interfaz y resten pulcritud arquitectónica.**
1. **Consumo de Información Bajo Demanda:** Toda aclaración técnica o instrucción de cálculo debe ubicarse en tooltips discretos o iconos `(i)`.
2. **Botones Limpios de Acción Directa:** Los botones deben contener únicamente el verbo de acción conciso (ej. *Explorar Obra*, *Enviar Mensaje*, *Publicar*).
3. **Formularios Compactos y Elegantes:** Mantener etiquetas limpias y áreas de foco bien definidas.

---

### REGLA 0.6: Paleta Visual Arquitectónica (Prohibido Negro Plano `#000000`)
- **Fondo y Superficies Oscuras:** No usar `#000000` puro. Utilizar tonalidades carbón, grafito y basalto (`#121214`, `#161619`, `#1E1E23`).
- **Acentos y Contraste:** Uso de tonalidades piedra, caliza, arena suave y blanco roto (`#F5F5F7`, `#E5E5EA`) para evocar solidez constructiva y materialidad.

---

### REGLA 0.7: Persistencia y Cobertura Obligatoria de Contacto y CTA
- En **todas las páginas y vistas** debe existir un acceso visual inmediato y directo a los canales de contacto (correo y WhatsApp).
- El botón de WhatsApp y el formulario de contacto deben integrar el **asunto y mensaje contextual predefinido** dependiendo de la página o portafolio donde se encuentre el usuario.

---

### REGLA 0.8: Soporte Internacional (i18n: ES, EN, JA)
- Cada nuevo componente, vista o texto estático debe estar registrado en el diccionario multilingüe con sus respectivas traducciones para **Español**, **Inglés** y **Japonés**.
- La tipografía debe contemplar compatibilidad completa con kanji/hiragana/katakana sin distorsión de espaciado.

---

## 🎯 Criterios Obligatorios de Entrega en Cada Tarea

### 1. 📱 Responsividad Móvil y Ergonomía Táctil (WCAG 2.5.5 / 2.5.8)
- **Alturas Mínimas Táctiles:** Todo botón interactivo, selector, input y tab debe respetar una altura mínima táctil de 44px a 48px (`min-h-[44px]`).
- **Separación Táctil:** Espaciado mínimo de 8px a 12px (`gap-2` a `gap-3`) entre interactivos adyacentes.
- **Scroll Contenido:** Modales con `max-h-[85vh]` a `max-h-[90vh]` y scroll contenido.

### 2. 🏷️ Control de Versiones y Changelog Continuo
- Incrementar el número de versión (SemVer) al completar hitos y documentar las adiciones en `README.md`.

### 3. 🚀 Cero Fallos en Compilación
- Validar siempre con `npm run build` o `yarn build` (`tsc -b && vite build`) que no existan errores de TypeScript ni advertencias bloqueantes.

---

## 🛠️ Stack Tecnológico Oficial ($0 USD Baseline)

- **Frontend Core:** React 18 + Vite + TypeScript
- **Estilos & Tokens:** TailwindCSS + Vanilla CSS tokens
- **Filosofía UX Arquitectónica Disruptiva:** Inspirada en Archipelago (archipelago.eu) y OH Architecture (oharchitecture.com.au):
  - Grillas asimétricas e híbridas (no cards genéricas de e-commerce).
  - Tipografía sobredimensionada con numeración editorial romana / serial (`01 / 02 / 03`).
  - Navegación horizontal o scroll desacoplado (Split Screens interactivos).
  - Hover states con revelado de metadatos profundos (m2, año, tipología tectónica) y cursor reactivo.
- **Animaciones & Transiciones:** Framer Motion (revelados cinemáticos y transiciones arquitectónicas)
- **Editor Enriquecido:** TipTap / Lexical (ligero, altamente personalizable, soporte de negritas, títulos, variantes de fuente, listas)
- **Backend, Database & Auth:** Google Firebase Spark ($0): Firestore + Authentication (correo/contraseña) + Hosting. **Firebase/Cloud Storage NO se usa**: en proyectos nuevos exige plan de pago (aplicar alerta de costo antes de activarlo). Las imágenes se sirven por URL o desde `public/`.
- **Enrutamiento:** React Router (rutas reales para SEO). Firestore y el editor TipTap se cargan de forma diferida.
- **Backend, Auth & Database:** Supabase Free Tier (Auth para `/admin`, PostgreSQL para artículos/portafolios, Storage para imágenes)
- **Internacionalización:** i18next + react-i18next (ES, EN, JA)
- **Iconografía:** Lucide React / React Icons
- **Despliegue & CI/CD:** Netlify / Vercel (Free Tier) + GitHub Actions



---

## ✅ CHECKLIST OBLIGATORIO EN CADA CAMBIO (REGLA 0.9)

Antes de dar por terminada **cualquier** modificación, verificar y aplicar:

1. **i18n (ES/EN/JA):** ningún texto visible en el código; todo en `src/i18n.ts`. El contenido (`src/data/content.ts`, blog) también debe tener los 3 idiomas. Cambiar de idioma y revisar que nada quede en español.
2. **CTA y contacto:** el dock flotante y los datos de contacto deben seguir visibles en todas las páginas; el mensaje debe llevar el contexto (proyecto/portafolio/artículo).
3. **SEO:** cada página nueva usa `<Seo>` (título, descripción, canonical, JSON-LD si aplica) y se agrega a `public/sitemap.xml`. Páginas privadas con `noindex`.
4. **Responsividad y accesibilidad:** probar móvil/tablet/escritorio; táctiles ≥ 44 px, `cursor-pointer`, foco visible, `alt` en imágenes, contraste suficiente.
5. **Reglas de interfaz:** sin `alert/confirm/prompt`; sin negro plano (#000); sin textos de prueba/placeholder visibles; sin las palabras "iPad/Tablet".
6. **Datos coherentes:** nada inventado que parezca real (nombres de fotógrafos, premios o medios verdaderos). Contenido de muestra debe ser genérico y marcarse como pendiente en `docs/01`.
7. **Seguridad:** `firestore.rules` actualizado si cambia el modelo de datos; nunca guardar secretos ni tokens en el repo ni en commits; `.env.local` fuera de git.
8. **Costo $0:** si algo requiere pago o tarjeta (Storage, dominio, planes), **avisar a Andrés antes**.
9. **Rendimiento:** mantener carga diferida; revisar el tamaño del bundle en `npm run build`.
10. **Documentación sincronizada:** actualizar `docs/01_cuestionario_y_contenidos.md`, `docs/02_features.md`, `docs/03_manual_blog.md`, `docs/04_propuesta_comercial.md` y `README.md` según corresponda.
11. **Versión y changelog:** subir versión SemVer en `package.json` y registrar el cambio en `README.md`.
12. **Build y despliegue:** `npm run build` sin errores; commit semántico; `git push origin main`. No dejar cambios locales sin subir.
