# Propuesta Técnica y Comercial: Plataforma Digital de Cierre Comercial

**Cliente:** Despacho de Arquitectura & Urbanismo  
**Enfoque:** Herramienta interactiva de ventas en vivo, portafolios segmentados y gestión autónoma  
**Infraestructura Recurrente:** **$0 USD / mes** (Google Cloud & Firebase Spark Tier)  

---

## 1. Resumen Ejecutivo y Enfoque Estratégico

* **Objetivo de Negocio:** Transformar el sitio web de un simple catálogo pasivo en un **activo comercial de cierre de ventas en vivo** para reuniones con inversionistas, desarrolladores y clientes privados.
* **Premisa de Costo Cero ($0 USD):** Arquitectura montada sobre la capa perpetua de **Google Firebase (Firestore + Hosting + Cloud Storage)**. Sin pagos mensuales de servidores VPS ni suscripciones a CMS de terceros.
* **KPIs Comerciales:**
  * **Conversión Directa:** Clics a WhatsApp y correo con atribución automática de proyecto.
  * **Retención Ejecutiva:** Tiempo de permanencia en láminas de alta resolución en juntas presenciales.
  * **Performance (Core Web Vitals):** Carga ultrarrápida de fotografías en formatos optimizados (WebP / AVIF).
  * **Alcance Global:** Navegación trilingüe segmentada para mercado nacional, anglosajón y asiático.

---

## 2. Arquitectura de Portafolios Segmentados & Modo Presentación

### Los 3 Portafolios de Especialidad
1. **Portafolio 01 · Residencial de Alta Gama:** Materialidad, atmósferas, privacidad y exclusividad.
2. **Portafolio 02 · Corporativo & Comercial:** Eficiencia de $m^2$, retorno de inversión, flujo y presencia institucional.
3. **Portafolio 03 · Espacio Público & Equipamiento:** Escala cívica, impacto social, diseño bioclimático y regeneración urbana.

### Modo Presentación en Vivo
* Interfaz limpia a pantalla completa optimizada para pantallas táctiles en sala de juntas o videollamadas.
* Desglose técnico-artístico por obra: memoria descriptiva, diagramas axonométricos, planimetría limpia y ficha técnica completa ($m^2$, año, ubicación, fotografía de autor).

---

## 3. Motor de Captación Rápida: CTA Persistente Contextual

* **Botón Flotante Omnipresente:** Visible en todo momento con contraste ergonómico ($> 44\text{px}$) sin interferir con la fotografía.
* **Enrutamiento Inteligente con Atribución:**
  * Al hacer clic dentro de una obra específica (ej. *"Residencia Bosques"*), el sistema abre WhatsApp con el mensaje precargado:
    > *«Hola, estuve revisando el proyecto "Residencia Bosques" en su portafolio y me gustaría agendar una reunión para cotizar un proyecto residencial de similar escala...»*
  * **Beneficio:** El arquitecto identifica de inmediato qué obra y qué mercado despertó el interés del cliente antes de responder.

---

## 4. Sistema de Publicaciones Autónomo (CMS) en Google Firestore

* **Acceso Privado (`/admin`):** Autenticación segura mediante Google Auth / Correo corporativo.
* **Módulos del Gestor:**
  * **Obras & Proyectos:** Carga de fotografías en alta resolución, asignación de portafolio y reordenamiento prioritario.
  * **Ensayos Teóricos & Bitácora de Taller:** Editor de texto enriquecido (H1-H3, negritas, citas, bloques de análisis).
  * **Menciones, Concursos & Premios:** Registro cronológico de reconocimientos, bienales y enlaces a prensa especializada (*ArchDaily*, *Arquine*).

---

## 5. Internacionalización Trilingüe Nativa (ES / EN / JA)

* **Conmutación Instantánea:** Cambio de idioma en tiempo real sin recargar la página ni perder la posición de lectura.
* **Tipografía Japonesa Balanceada:** Integración de fuentes optimizadas (*Noto Sans JP* / *Zen Kaku Gothic*) para renderizado armónico de kanji, hiragana y katakana.
* **Base de Datos Multilingüe:** Estructura en Firestore con campos separados por idioma (`title_es`, `title_en`, `title_ja`) para control narrativo total.

---

## 6. Arquitectura Tecnológica & Cero Costos Cloud ($0 USD)

* **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS (renderizado ultraligero y seguro).
* **Base de Datos & Backend:** Google Cloud Firestore (Plan Spark perpetuo: 50,000 lecturas y 20,000 escrituras diarias).
* **Almacenamiento Multimedia:** Google Firebase Storage (5 GB libres con compresión automática).
* **Despliegue & CDN:** Firebase Hosting con CDN perimetral global y certificado SSL Wildcard incluido ($0 USD).

---

## 7. Perfiles de Acceso y Experiencia de Usuario

* **Público / Clientes / Inversionistas:** Acceso libre de alta fidelidad, navegación fluida, soporte táctil universal y tiempos de respuesta inmediatos.
* **Arquitecto / Administrador:** Acceso protegido para dar de alta obras, editar memorias y reorganizar artículos sin tocar código.

---

## 8. Metodología de Entrega y Cronograma

| Fase | Duración | Entregables Clave |
| :--- | :--- | :--- |
| **Fase 1: Identidad Digital y Wireframes** | 2 semanas | Arquitectura de información, diseño editorial y plantillas maestras. |
| **Fase 2: Frontend & Motor Trilingüe** | 3 semanas | Maquetación responsiva, vistas de los 3 portafolios e i18n (ES/EN/JA). |
| **Fase 3: CMS en Firebase & Motor Comercial** | 2 semanas | Panel de administración de obras/ensayos, enlaces WhatsApp y Firestore. |
| **Fase 4: Carga, Pruebas y Go-Live** | 1 semana | Carga de obras base, optimización de velocidad (Lighthouse 95+), dominio y entrega. |
| **TOTAL** | **8 semanas** | **Puesta en marcha productiva llave en mano.** |

* **Garantía Post-Lanzamiento:** 3 semanas de soporte técnico y ajustes finos incluidos tras la liberación.

---

## 9. Modelo Comercial, Inversión y Condiciones

### Inversión por Módulo de Software

| Módulo | Alcance Técnico | Inversión Estimada |
| :--- | :--- | :--- |
| **1. Arquitectura de Portafolios (3 Líneas)** | Residencial, Corporativo y Espacio Público con modo presentación | $X,XXX |
| **2. Motor Comercial y WhatsApp Contextual** | CTA persistente y generador de mensajes con atribución de obra | $X,XXX |
| **3. CMS Autónomo en Google Firebase** | Panel privado para obras, ensayos teóricos y prensa/premios | $X,XXX |
| **4. Motor Trilingüe Nativo (ES / EN / JA)** | Diccionarios, tipografía japonesa y base multilingüe en Firestore | $X,XXX |
| **5. Optimización Visual y Despliegue Cloud** | CDN global, compresión de fotos y configuración $0 USD | $X,XXX |
| **TOTAL DESARROLLO DE PLATAFORMA** | **Proyecto Integral Llave en Mano** | **$XX,XXX + IVA** |

* **Costo de Mantenimiento de Servidores:** **$0 USD / mes** (Alojado en el Free Tier de Google Firebase).

### Esquema de Pagos
* **40%** Anticipo al inicio del proyecto.
* **30%** Al finalizar la integración del CMS y portafolios (Fase 3).
* **30%** Contra entrega y liberación formal en el dominio del cliente (Fase 4).

---

## 10. Supuestos, Requisitos y Exclusiones

* **Requisitos del Cliente:** Fotografías de autor en alta resolución, memorias descriptivas iniciales y visto bueno de textos en inglés y japonés.
* **Exclusiones:** Compra anual del dominio web (ej. `.com` o `.mx`), sesiones de fotografía física en obra y elaboración de renders 3D (el despacho aporta sus visualizaciones terminadas).
