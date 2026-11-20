# Propuesta Técnica y Comercial: Plataforma Digital — Medelsa

**Cliente:** Medelsa  
**Enfoque:** Creación desde cero de plataforma web comercial, portafolios por categoría y gestión autónoma  
**Infraestructura Recurrente:** **$0 USD / mes** _(Google Cloud & Firebase Spark Tier)_

---

## 1. Resumen Ejecutivo y Enfoque Estratégico

- **Objetivo de Negocio:** Crear desde cero la presencia digital de **Medelsa**, diseñada no solo como catálogo sino como una **herramienta comercial en vivo** para reuniones con inversionistas, desarrolladores y clientes privados.
- **Premisa de Costo Cero ($0 USD / mes):** Arquitectura montada sobre la capa gratuita perpetua de **Google Firebase (Firestore + Authentication + Hosting)** sin pagos mensuales de servidores VPS, licencias ni pausas por inactividad.
  - _Capacidad gratuita garantizada:_ 50,000 lecturas/día, 20,000 escrituras/día y **1 GB de almacenamiento en Firestore**. Gracias a la compresión automática de imágenes en navegador (~150–350 KB por foto), el sistema puede almacenar **más de 2,500 fotografías** sin costo alguno de almacenamiento en la nube.
- **KPIs Comerciales:**
  - **Contacto Directo:** Envío inmediato de consultas por los canales definidos por el cliente.
  - **Retención en Reuniones:** Visualización ágil y elegante en computadoras, tablets y teléfonos.
  - **Performance:** Carga rápida de fotografías optimizadas.
  - **Alcance Internacional:** Navegación trilingüe (Español, Inglés y Japonés).

---

## 2. Portafolios por Categoría & Modo Presentación

### 3 Categorías Iniciales\*

> _Nota: Las categorías estan pendientes de definir con el cliente_

### Ficha por Obra

- Desglose técnico-artístico adaptable según el material que proporcione el cliente: memoria descriptiva, ficha técnica ($m^2$, año, ubicación, materiales) y galería fotográfica.

---

## 3. Motor de Contacto Directo: CTA Persistente

- **Botón Flotante Omnipresente:** Visible en todas las secciones del sitio.
- **Formulario Base en Todas las Páginas:** Visible y ejecutable al final de cada página (además del acceso flotante), con campos editables de **Teléfono o correo de contacto**, **Asunto** y **Descripción / Mensaje**, enviando la información directamente al canal o canales que el cliente defina > _Nota: WhatsApp, correo electrónico o ambos; por confirmar con el cliente_.

---

## 4. Sistema de Administración Total (CMS) en Google Firestore

> _Se contempla autonomía total de configuración como alcance completo; tras revisarlo con el cliente se podrán recortar módulos que no necesite y ajustar el costo final._

- **Acceso Privado (`/admin`):** Inicio de sesión protegido.
- **Módulos Administrables:**
  - **Categorías (Portafolios):** Crear, editar, eliminar y reordenar cada categoría.
  - **Obras & Proyectos:** Agrupación por categoría, carga directa de archivos de imagen (con compresión gratuita automática), ficha técnica y reordenamiento prioritario.
  - **Blog / Ensayos:** Editor de texto enriquecido (títulos, subtítulos, negritas, cursivas, subrayado, citas, fuentes e **inserción directa de fotografías dentro del artículo**) y ordenamiento manual.
    - _Propósito e impacto en el sitio:_ Muestra el criterio, procesos constructivos y autoridad arquitectónica de **Medelsa** para generar confianza frente a clientes e inversionistas, además de mantener el sitio activo para mejorar el **posicionamiento en Google (SEO)** y atraer nuevos prospectos.
  - **Configuración de Contacto y Sitio:** Edición directa del número de WhatsApp receptor, correo(s) de destino, teléfono, ubicación del cliente, textos institucionales (_Nosotros_) y menciones/premios.

---

## 5. Internacionalización Trilingüe Nativa (ES / EN / JA)

- **Conmutación Instantánea:** Cambio de idioma en tiempo real (Español, Inglés y Japonés).
- **Tipografía Japonesa Balanceada:** Fuentes optimizadas (_Noto Sans JP_ / _Noto Serif JP_) para lectura armónica.
- **Base de Datos Multilingüe:** Campos independientes por idioma en Firestore.

---

## 6. Arquitectura Tecnológica & Cero Costos Cloud ($0 USD)

- **Frontend:** React + Vite + TypeScript + Tailwind CSS.
- **Base de Datos & Autenticación:** Google Cloud Firestore y Firebase Auth (Plan Spark $0 USD perpetuo).
- **Almacenamiento Multimedia ($0 USD):** Compresión automática en el navegador guardada directo en Firestore, evitando el costo de Cloud Storage de pago.
- **Hosting & SSL:** Firebase Hosting con CDN global y certificado SSL incluido ($0 USD).

---

## 7. Metodología de Entrega y Cronograma

| Fase                                         | Duración      | Entregables Clave                                                         |
| :------------------------------------------- | :------------ | :------------------------------------------------------------------------ |
| **Fase 1: Identidad Digital y Estructura**   | 1 semana      | Arquitectura de información, diseño editorial y plantillas maestras.      |
| **Fase 2: Frontend & Motor Trilingüe**       | 2 semanas     | Maquetación responsiva, portafolios por categoría e i18n (ES/EN/JA).      |
| **Fase 3: CMS Total en Firebase & Contacto** | 2 semanas     | Panel de administración de categorías, obras, blog y canales de contacto. |
| **Fase 4: Carga, Pruebas y Go-Live**         | 1 semana      | Carga de obras base, optimización de velocidad, dominio y entrega.        |
| **TOTAL**                                    | **6 semanas** | **Puesta en marcha productiva llave en mano.**                            |

- **Garantía Post-Lanzamiento:** 3 semanas de soporte y ajustes menores incluidos. _Nota: Cambios robustos o fuera de alcance se evalúan por horas para definir si entran en soporte o se cotizan aparte._

---

## 8. Modelo Comercial, Inversión y Condiciones

### A. Plataforma Base + CMS de Blogs _(Mínimo Requerido)_

| Concepto                               | Alcance Técnico                                                                                                                                                                                                           |    Inversión    |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------: |
| **Plataforma Web Base + CMS de Blogs** | Portafolios (3 categorías), ficha de obra, Nosotros, Menciones, CTA de contacto, Motor Trilingüe (ES/EN/JA), SEO, Despliegue Cloud ($0 USD) y panel `/admin` con editor enriquecido (fotos internas y portada) para Blogs | **$22,000 MXN** |

### B. Módulos Configurables Opcionales _(para Autonomía Total)_

| Módulo Adicional                           | Alcance Técnico                                                                                          | Costo por Módulo |
| :----------------------------------------- | :------------------------------------------------------------------------------------------------------- | :--------------: |
| **1. Gestión de Obras y Proyectos**        | Alta, edición, carga de fotos optimizadas y reordenamiento de proyectos desde `/admin`                   |   +$3,500 MXN    |
| **2. Gestión de Categorías (Portafolios)** | Crear, editar, eliminar categorías y elegir estilo visual desde `/admin`                                 |   +$2,500 MXN    |
| **3. Configuración de Contacto y Sitio**   | Editar WhatsApp receptor, correo(s) de destino, teléfono, ubicación, Nosotros y Menciones desde `/admin` |   +$2,000 MXN    |
| **SUBTOTAL MÓDULOS OPCIONALES**            | **Autonomía completa de administración**                                                                 | **+$8,000 MXN**  |

### Inversión Total

- **Proyecto Completo (Autonomía Total):** **$30,000 MXN** _(+ IVA si aplica)_
- **Versión Esencial (Solo CMS de Blogs):** **$22,000 MXN** _(+ IVA si aplica)_ — _Si el cliente decide prescindir de alguno de los módulos opcionales, se descuenta exactamente el monto indicado en la tabla B._
- **Carga Inicial de Obras (sin Gestor de Proyectos):** Incluye sin costo adicional la optimización y carga inicial de **hasta 5 proyectos por categoría** _(15 proyectos totales sobre 3 categorías)_. Proyectos adicionales o actualizaciones posteriores sin el módulo _Gestión de Obras_ se cotizan por separado.
- **Costo de Mantenimiento de Servidores:** **$0 USD / mes** _(Plan gratuito Spark de Google Firebase)_.
- **Dominio Web (`.com` / `.mx`):** Costo externo estimado de **$300 – $950 MXN/año** _(esquema de pago mensual o anual según proveedor y extensión; sujeto a disponibilidad)_.

### Esquema de Pagos

- **30%** Anticipo al inicio del proyecto _(ej. $9,000 MXN en versión completa / $6,600 MXN en versión esencial)_.
- **70%** Contra entrega y confirmación formal de funcionamiento _(ej. $21,000 MXN / $15,400 MXN)_.
