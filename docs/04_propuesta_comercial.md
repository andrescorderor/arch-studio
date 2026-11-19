# Propuesta Técnica y Comercial: Plataforma Digital — Despacho Martínez

**Cliente:** Despacho Martínez *(nombre provisional)*  
**Enfoque:** Creación desde cero de plataforma web comercial, portafolios por categoría y gestión autónoma  
**Infraestructura Recurrente:** **$0 USD / mes** *(Google Cloud & Firebase Spark Tier)*  

---

## 1. Resumen Ejecutivo y Enfoque Estratégico

* **Objetivo de Negocio:** Crear desde cero la presencia digital del **Despacho Martínez**, diseñada no solo como catálogo sino como una **herramienta comercial en vivo** para reuniones con inversionistas, desarrolladores y clientes privados.
* **Premisa de Costo Cero ($0 USD / mes):** Arquitectura montada sobre la capa gratuita perpetua de **Google Firebase (Firestore + Authentication + Hosting)** sin pagos mensuales de servidores VPS, licencias ni pausas por inactividad.
  * *Capacidad gratuita garantizada:* 50,000 lecturas/día, 20,000 escrituras/día y **1 GB de almacenamiento en Firestore**. Gracias a la compresión automática de imágenes en navegador (~150–350 KB por foto), el sistema puede almacenar **más de 2,500 fotografías** sin costo alguno de almacenamiento en la nube.
* **KPIs Comerciales:**
  * **Contacto Directo:** Envío inmediato de consultas por los canales definidos por el despacho.
  * **Retención en Reuniones:** Visualización ágil y elegante en computadoras, tablets y teléfonos.
  * **Performance:** Carga ultrarrápida de fotografías optimizadas (WebP / JPEG).
  * **Alcance Internacional:** Navegación trilingüe (Español, Inglés y Japonés).

---

## 2. Portafolios por Categoría & Modo Presentación

### Categorías Iniciales *(sujetas a validación con el cliente)*
1. **Categoría 01 · Residencial:** Materialidad, atmósferas, privacidad y escala habitable.
2. **Categoría 02 · Corporativo & Comercial:** Eficiencia de $m^2$, retorno de inversión, flujo y presencia institucional.
3. **Categoría 03 · Espacio Público & Equipamiento:** Escala cívica, impacto social y diseño bioclimático.

> *Nota: Esta clasificación sirve como punto de partida y se aterrizará directamente con el Despacho Martínez.*

### Ficha por Obra
* Desglose técnico-artístico adaptable según el material que proporcione el cliente: memoria descriptiva, ficha técnica ($m^2$, año, ubicación, materiales) y galería fotográfica.

---

## 3. Motor de Contacto Directo: CTA Persistente

* **Botón Flotante Omnipresente:** Visible en todas las secciones del sitio sin interferir con la fotografía.
* **Formulario Base:** Campos simples y editables de **Asunto** y **Descripción / Mensaje**, enviando la información directamente al canal o canales que el despacho defina (WhatsApp, correo electrónico o ambos; por confirmar con el cliente).

---

## 4. Sistema de Administración Total (CMS) en Google Firestore

> *Se contempla autonomía total de configuración como alcance completo; tras revisarlo con el cliente se podrán recortar módulos que no necesite y ajustar el costo final.*

* **Acceso Privado (`/admin`):** Inicio de sesión protegido (Firebase Authentication) accesible discretamente desde el pie de página.
* **Módulos Administrables:**
  * **Categorías (Portafolios):** Crear, editar, eliminar, reordenar y elegir estilo visual de cada categoría.
  * **Obras & Proyectos:** Agrupación por categoría, carga directa de archivos de imagen (con compresión gratuita automática), ficha técnica y reordenamiento prioritario.
  * **Blog / Ensayos:** Editor de texto enriquecido (títulos, subtítulos, negritas, cursivas, subrayado, citas, fuentes) y ordenamiento manual.
  * **Configuración de Contacto y Sitio:** Edición directa del número de WhatsApp receptor, correo(s) de destino, teléfono, ubicación del despacho, textos institucionales (*Nosotros*) y menciones/premios.

---

## 5. Internacionalización Trilingüe Nativa (ES / EN / JA)

* **Conmutación Instantánea:** Cambio de idioma en tiempo real (Español, Inglés y Japonés) sin recargar la página.
* **Tipografía Japonesa Balanceada:** Fuentes optimizadas (*Noto Sans JP* / *Noto Serif JP*) para lectura armónica.
* **Base de Datos Multilingüe:** Campos independientes por idioma en Firestore.

---

## 6. Arquitectura Tecnológica & Cero Costos Cloud ($0 USD)

* **Frontend:** React + Vite + TypeScript + Tailwind CSS.
* **Base de Datos & Autenticación:** Google Cloud Firestore y Firebase Auth (Plan Spark $0 USD perpetuo).
* **Almacenamiento Multimedia ($0 USD):** Compresión automática en el navegador guardada directo en Firestore, evitando el costo de Cloud Storage de pago.
* **Hosting & SSL:** Firebase Hosting con CDN global y certificado SSL incluido ($0 USD).

---

## 7. Metodología de Entrega y Cronograma

| Fase | Duración | Entregables Clave |
| :--- | :--- | :--- |
| **Fase 1: Identidad Digital y Estructura** | 2 semanas | Arquitectura de información, diseño editorial y plantillas maestras. |
| **Fase 2: Frontend & Motor Trilingüe** | 3 semanas | Maquetación responsiva, portafolios por categoría e i18n (ES/EN/JA). |
| **Fase 3: CMS Total en Firebase & Contacto** | 2 semanas | Panel de administración de categorías, obras, blog y canales de contacto. |
| **Fase 4: Carga, Pruebas y Go-Live** | 1 semana | Carga de obras base, optimización de velocidad, dominio y entrega. |
| **TOTAL** | **8 semanas** | **Puesta en marcha productiva llave en mano.** |

* **Garantía Post-Lanzamiento:** 3 semanas de soporte técnico y ajustes finos incluidos tras la liberación. *Nota: Ajustes robustos, nuevas funcionalidades o cambios estructurales fuera de este alcance deberán evaluarse por horas para determinar si entran dentro del soporte o requieren un desarrollo adicional.*

---

## 8. Modelo Comercial, Inversión y Condiciones

### Inversión por Módulo *(ajustable si el cliente recorta configuración/autonomía)*

| Módulo | Alcance Técnico | Inversión Estimada |
| :--- | :--- | :--- |
| **1. Portafolios por Categoría** | Vistas diferenciadas por categoría y ficha por obra | $X,XXX |
| **2. Motor de Contacto Persistente** | Botón flotante y formulario base (Asunto + Descripción) hacia canales definidos | $X,XXX |
| **3. CMS Total en Google Firebase** | Gestión autónoma de categorías, obras, blog y configuración de contacto | $X,XXX |
| **4. Motor Trilingüe Nativo (ES / EN / JA)** | Interfaz, tipografía japonesa y base multilingüe en Firestore | $X,XXX |
| **5. Optimización Visual y Despliegue Cloud** | CDN global, compresión gratuita de fotos y configuración $0 USD | $X,XXX |
| **TOTAL DESARROLLO DE PLATAFORMA** | **Proyecto Integral Llave en Mano** | **$XX,XXX + IVA** |

* **Costo de Mantenimiento de Servidores:** **$0 USD / mes** (Plan gratuito Spark de Google Firebase).
* **Dominio Web:** Al no contar con dominio propio, se requerirá adquirir uno (ej. `.com` o `.mx`) con **costo anual estimado sujeto a disponibilidad** al momento del registro.

### Esquema de Pagos
* **30%** Anticipo al inicio del proyecto.
* **70%** Contra entrega y confirmación formal de funcionamiento.
