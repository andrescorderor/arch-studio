# Cuestionario de Negocio y Checklist de Contenidos

Este documento concentra las preguntas estratégicas pendientes por responder (por parte de Andrés o directamente del cliente) y el inventario exacto de insumos necesarios para rellenar el sitio web con coherencia comercial absoluta ($0\text{ USD}$ en costos de infraestructura, cero textos mock).

---

## 1. Preguntas Pendientes para el Cliente / Andrés

### A. Identidad y Marca
1. **Nombre comercial y registro:** ¿Cuál es el nombre exacto de la firma de arquitectura y cómo debe figurar legalmente (ej. S.A. de C.V., Studio, Taller)?
2. **Propuesta de valor y filosofía de diseño:** ¿Cuál es el manifiesto o enfoque rector del despacho? (Ej. bioclimática, tectónica contemporánea, minimalismo mexicano, arquitectura de paisaje o residencial de lujo).
3. **Nombre y segmentación de los 3 Portafolios:**
   - ¿Qué nombre y concepto tiene cada uno de los 3 portafolios? (Ej. *Residencial Premium*, *Corporativo/Comercial*, *Urbanismo/Intervención Paisajística*).
   - ¿A qué perfil de cliente va dirigido cada portafolio en particular?

### B. Canales de Contacto y Atención Inmediata
1. **WhatsApp de contacto directo:** ¿Cuál es el número telefónico oficial con lada internacional para vincular al botón flotante de WhatsApp?
2. **Correo de recepción de prospectos:** ¿A qué dirección de correo corporativa llegarán las alertas y solicitudes del formulario?
3. **Mensaje predeterminado de WhatsApp:** ¿Qué texto inicial debe abrirse según la página donde esté el usuario? (Ej. *"Hola, estoy explorando el portafolio [Nombre] y me gustaría agendar una reunión preliminar."*).

### C. Estrategia Multilingüe (Español, Inglés y Japonés)
1. **Traducciones oficiales:** ¿El cliente proporcionará las traducciones profesionales de textos clave y nombres de proyectos en Japonés e Inglés, o se generará una primera propuesta que ellos validarán?
2. **Tipografía para Japonés:** ¿Prefieren una estética de tipografía Sans-Serif moderna (Noto Sans JP) o Serif editorial tradicional (Shippori Mincho / Noto Serif JP)?

### D. Gestión de Blogs y Panel de Administración
1. **Usuarios de acceso:** ¿Quiénes tendrán credenciales de acceso al panel de edición del blog (nombre y correo para dar de alta en Supabase Auth)?
2. **Categorías del blog:** ¿Se organizarán por temáticas (ej. *Procesos de Obra*, *Teoría y Ensayos*, *Noticias y Premios*, *Sostenibilidad*)?

### E. Cumplimiento Legal (México - LFPDPPP)
1. **Aviso de Privacidad:** ¿El cliente cuenta con un Aviso de Privacidad formal, o se redacta la plantilla estándar en cumplimiento con la *Ley Federal de Protección de Datos Personales en Posesión de los Particulares*?
2. **Ubicación física:** ¿Se requiere mostrar dirección física en mapa o únicamente ciudad y estado de base de operaciones?

---

## 2. Checklist de Insumos y Contenidos Requeridos

### A. Portafolios y Obras (Por cada uno de los 3 portafolios)
* [ ] **Nombre y descripción conceptual** del estilo/mercado de cada portafolio (1 a 2 párrafos).
* [ ] **Ficha técnica mínima de cada proyecto:**
  * Nombre de la obra.
  * Ubicación (Ciudad, País).
  * Año de finalización / Estado (Construido, En proceso, Concurso).
  * Metros cuadrados construidos ($m^2$).
  * Créditos de fotografía de arquitectura.
  * Memoria descriptiva breve (concepto, materiales, reto estructural).
* [ ] **Fotografía de arquitectura en alta resolución:**
  * Fotografía de portada / hero (mínimo 2400px ancho, horizontal).
  * Galería de detalle y planos/diagramas axonométricos (en formato JPG/PNG/WebP optimizado).

### B. Nosotros / Perfil del Estudio
* [ ] Semblanza de los socios fundadores / directores de taller (fotografía profesional en escala de grises o tono cálido neutro + biografía corta).
* [ ] Declaración de misión, visión y enfoque técnico.
* [ ] Cifras de impacto o métricas clave (ej. $+12$ años de trayectoria, $+85,000\ m^2$ proyectados, premios acumulados).

### C. Menciones, Publicaciones y Concursos
* [ ] Lista de premios y reconocimientos (Año, Certamen, Categoría, Proyecto galardonado).
* [ ] Revistas, libros o portales donde han sido publicados (ej. ArchDaily, Designboom, Arquine, AD México) con enlaces externos.
* [ ] Exposiciones o conferencias impartidas.

### D. Artículos de Lanzamiento del Blog
* [ ] 2 a 3 artículos iniciales completos para no lanzar el blog vacío (Título, resumen, cuerpo con formato enriquecido, fecha de publicación, imagen destacada).


---

## 3. Pendientes técnicos y de configuración (actualizado)

### Para Andrés
- [ ] **Correo(s) administrador(es)** del panel del blog (se crean en Firebase Authentication y se autorizan en `firestore.rules`).
- [ ] Activar en Firebase: **Authentication → Email/Password**, **Firestore Database** y, en *Authentication → Settings → User actions*, **desactivar el registro de usuarios** (solo el administrador crea cuentas).
- [ ] Publicar reglas de seguridad de Firestore (`firestore.rules`): el modo de prueba queda abierto a cualquiera y caduca a los 30 días.
- [ ] **Revocar el token de GitHub** compartido en el chat y generar uno nuevo.
- [ ] Decidir dominio (`.mx` / `.com`): costo anual → requiere tu aprobación.

### Para el cliente
- [ ] Nombre comercial, logotipo y branding definitivo.
- [ ] **WhatsApp, teléfono y correo reales** (hoy hay datos genéricos en `src/config/site.ts`).
- [ ] Dirección/ciudad que se mostrará públicamente.
- [ ] Obras reales por portafolio, con fotos propias, fichas técnicas y créditos de fotografía.
- [ ] Textos de *Nosotros*: socios, biografías, filosofía.
- [ ] Premios, publicaciones y concursos reales (hoy hay entradas genéricas de muestra).
- [ ] Revisión legal del Aviso de Privacidad (LFPDPPP).
- [ ] Traducciones EN/JA validadas por el cliente (hoy son traducciones base).
