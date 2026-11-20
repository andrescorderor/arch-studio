import type { Lang } from '../config/site';

export type LText = Record<Lang, string>;
export type PortfolioId = string;
export type PortfolioLayout = 'editorial' | 'technical' | 'organic';

export const loc = (t: LText | undefined, lang: string): string =>
  (t && (t[lang as Lang] || t.es)) || '';

/** Mapea slugs en español/inglés hacia el id de portafolio y viceversa. */
export const PORTFOLIO_SLUG_TO_ID: Record<string, string> = {
  residencial: 'residencial',
  residential: 'residencial',
  corporativo: 'corporativo',
  commercial: 'corporativo',
  corporate: 'corporativo',
  'espacio-publico': 'espacio-publico',
  civic: 'espacio-publico',
  civico: 'espacio-publico',
};

export const normalizePortfolioId = (raw?: string): string =>
  (raw && (PORTFOLIO_SLUG_TO_ID[raw] || raw)) || 'residencial';

export interface PortfolioItem {
  id: string;
  orderIndex: number;
  accent: string;
  layoutStyle: PortfolioLayout;
  tag: LText;
  name: LText;
  desc: LText;
  client: LText;
  coverImage: string;
}

export interface ArchitecturalProject {
  id: string;
  portfolio: PortfolioId;
  orderIndex: number;
  title: LText;
  location: LText;
  year: number;
  areaM2: number;
  summary: LText;
  materials: LText;
  coverImage: string;
  gallery: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  publishedAt: string;
  orderIndex: number;
  coverImage: string;
  title: LText;
  excerpt: LText;
  contentHtml: LText;
}

export type MentionCategory = 'Premios' | 'Publicaciones' | 'Concursos';

export interface MentionItem {
  id: string;
  type: MentionCategory;
  title: string;
  source: string;
  year: string;
  href?: string;
  image?: string;
}

export interface SiteSettings {
  id: string;
  accentColor: string;
  whatsapp: string;
  email: string;
  phone: string;
  location: string;
  whatsappEnabled: boolean;
  emailEnabled: boolean;
  aboutImage: string;
  aboutText: LText;
  mentions: MentionItem[];
}

export const ACCENT_PRESETS: Array<{ label: string; color: string; onDark: string }> = [
  { label: 'Verde Olivo', color: '#3d5a47', onDark: '#93b59e' },
  { label: 'Azul Pizarra', color: '#2b4c65', onDark: '#8fb6d1' },
  { label: 'Terracota / Bronce', color: '#9a6b3b', onDark: '#d4a373' },
  { label: 'Grafito', color: '#52565c', onDark: '#b8bdc4' },
];

export function getOnDarkAccent(hex: string): string {
  const found = ACCENT_PRESETS.find((p) => p.color.toLowerCase() === hex.toLowerCase());
  return found ? found.onDark : '#93b59e';
}

export const INITIAL_PORTFOLIOS: PortfolioItem[] = [
  {
    id: 'residencial',
    orderIndex: 1,
    accent: '#3d5a47',
    layoutStyle: 'editorial',
    tag: { es: 'Categoría 01', en: 'Category 01', ja: 'カテゴリー 01' },
    name: { es: 'Residencial', en: 'Residential', ja: '住宅' },
    desc: {
      es: 'Casas y refugios concebidos como paisajes habitables: masa, sombra y materia responden a la luz y la topografía de cada lugar.',
      en: 'Houses and retreats conceived as inhabitable landscapes: mass, shade and material respond to each site’s light and topography.',
      ja: '住まいと別荘を、暮らせる風景として構想します。量塊、陰影、素材が土地の光と地形に応答します。',
    },
    client: {
      es: 'Para familias y desarrolladores residenciales',
      en: 'For families and residential developers',
      ja: '家族・住宅デベロッパー向け',
    },
    coverImage: '/images/res-1.png',
  },
  {
    id: 'corporativo',
    orderIndex: 2,
    accent: '#2b4c65',
    layoutStyle: 'editorial',
    tag: { es: 'Categoría 02', en: 'Category 02', ja: 'カテゴリー 02' },
    name: { es: 'Corporativo y comercial', en: 'Corporate & commercial', ja: '企業・商業' },
    desc: {
      es: 'Espacios de trabajo, hospitalidad y encuentro donde estructura, oficio y operación construyen una presencia perdurable.',
      en: 'Work, hospitality and gathering places where structure, craft and operation shape an enduring presence.',
      ja: '構造、職人技、運営が一体となり、長く使われる仕事・滞在・交流の場をつくります。',
    },
    client: {
      es: 'Para empresas, inversionistas y desarrolladores',
      en: 'For companies, investors and developers',
      ja: '企業・投資家・デベロッパー向け',
    },
    coverImage: '/images/corp-1.png',
  },
  {
    id: 'espacio-publico',
    orderIndex: 3,
    accent: '#3d5a47',
    layoutStyle: 'editorial',
    tag: { es: 'Categoría 03', en: 'Category 03', ja: 'カテゴリー 03' },
    name: { es: 'Espacio Público', en: 'Public Space', ja: '公共空間' },
    desc: {
      es: 'Equipamientos y espacios compartidos que conectan comunidades y permanecen más allá de un programa.',
      en: 'Public buildings and shared spaces that connect communities and outlast any single programme.',
      ja: '地域をつなぎ、用途を超えて受け継がれる公共建築と共有空間を提案します。',
    },
    client: {
      es: 'Para gobiernos, fundaciones y comunidades',
      en: 'For governments, foundations and communities',
      ja: '行政・財団・地域コミュニティ向け',
    },
    coverImage: '/images/civic-1.png',
  },
];

export const INITIAL_PROJECTS: ArchitecturalProject[] = [
  {
    id: 'casa-basalto', portfolio: 'residencial', orderIndex: 1, year: 2025, areaM2: 640,
    title: { es: 'Casa Basalto', en: 'Casa Basalto', ja: 'Casa Basalto' },
    location: { es: 'Valle de Bravo, México', en: 'Valle de Bravo, Mexico', ja: 'メキシコ、バジェ・デ・ブラボ' },
    summary: {
      es: 'Una secuencia de patios de concreto abraza la pendiente y enmarca el paisaje del bosque mediante muros de piedra volcánica.',
      en: 'A sequence of concrete courtyards embraces the slope and frames the forest landscape through volcanic stone walls.',
      ja: 'コンクリートの中庭が斜面を包み、森の景色を切り取る住宅。',
    },
    materials: { es: 'Piedra volcánica · Concreto aparente · Madera de encino', en: 'Volcanic stone · Exposed concrete · Oak', ja: '火山岩・打ち放しコンクリート・オーク材' },
    coverImage: '/images/res-1.png',
    gallery: ['/images/res-1.png', '/images/res-2.png', '/images/res-3.png'],
  },
  {
    id: 'casa-caliza', portfolio: 'residencial', orderIndex: 2, year: 2024, areaM2: 480,
    title: { es: 'Casa Caliza', en: 'Casa Caliza', ja: 'Casa Caliza' },
    location: { es: 'San Miguel de Allende, México', en: 'San Miguel de Allende, Mexico', ja: 'メキシコ、サン・ミゲル・デ・アジェンデ' },
    summary: {
      es: 'Un hogar monolítico organizado alrededor de una chimenea de piedra caliza y una sola entrada de luz cenital.',
      en: 'A monolithic home organised around a limestone fireplace and a single source of zenithal daylight.',
      ja: '一枚岩の石灰岩暖炉と光のスリットを中心に構成した、塊のような住まい。',
    },
    materials: { es: 'Piedra caliza · Concreto pigmentado · Acero', en: 'Limestone · Pigmented concrete · Steel', ja: '石灰岩・着色コンクリート・鋼材' },
    coverImage: '/images/res-2.png',
    gallery: ['/images/res-2.png', '/images/res-1.png'],
  },
  {
    id: 'refugio-duna', portfolio: 'residencial', orderIndex: 3, year: 2023, areaM2: 920,
    title: { es: 'Refugio Duna', en: 'Refugio Duna', ja: 'Refugio Duna' },
    location: { es: 'Todos Santos, México', en: 'Todos Santos, Mexico', ja: 'メキシコ、トドス・サントス' },
    summary: {
      es: 'Tres planos horizontales de piedra y concreto se apoyan sobre la duna costera y elevan la casa sobre la arena.',
      en: 'Three horizontal planes of stone and concrete settle into the coastal dune, lifting the house above the sand.',
      ja: '海岸の砂丘に置かれた三つの水平な石とコンクリートの量塊。',
    },
    materials: { es: 'Concreto playero · Piedra local · Madera tropical', en: 'Coastal concrete · Local stone · Tropical timber', ja: 'コンクリート・地元石材・木材' },
    coverImage: '/images/res-3.png',
    gallery: ['/images/res-3.png', '/images/res-2.png'],
  },
  {
    id: 'torre-origen', portfolio: 'corporativo', orderIndex: 4, year: 2025, areaM2: 18400,
    title: { es: 'Torre Origen', en: 'Torre Origen', ja: 'Torre Origen' },
    location: { es: 'León, Guanajuato, México', en: 'León, Guanajuato, Mexico', ja: 'メキシコ、レオン' },
    summary: {
      es: 'Atrio corporativo de doble altura con columnas de concreto y luz cenital que convierte el vestíbulo en una plaza interior.',
      en: 'Double-height corporate atrium with concrete columns and overhead daylight transforming the lobby into an interior plaza.',
      ja: 'コンクリートの吹き抜けが、ロビーを共有の室内広場へと変えるオフィスビル。',
    },
    materials: { es: 'Concreto armado · Vidrio de control solar · Acero', en: 'Reinforced concrete · Solar-control glass · Steel', ja: '鉄筋コンクリート・日射制御ガラス・鋼材' },
    coverImage: '/images/corp-1.png',
    gallery: ['/images/corp-1.png', '/images/corp-2.png'],
  },
  {
    id: 'foro-norte', portfolio: 'corporativo', orderIndex: 5, year: 2024, areaM2: 7200,
    title: { es: 'Foro Norte', en: 'Foro Norte', ja: 'Foro Norte' },
    location: { es: 'Monterrey, México', en: 'Monterrey, Mexico', ja: 'メキシコ、モンテレイ' },
    summary: {
      es: 'Una cubierta de gran claro protege el vestíbulo y extiende la plaza pública hacia el escenario.',
      en: 'A long-span canopy shelters the foyer and extends the public plaza towards the stage.',
      ja: '大スパンの庇がホワイエを守り、広場を舞台へとつなぐ公演施設。',
    },
    materials: { es: 'Acero estructural · Concreto · Madera acústica', en: 'Structural steel · Concrete · Acoustic timber', ja: '構造鋼・コンクリート・音響木材' },
    coverImage: '/images/corp-2.png',
    gallery: ['/images/corp-2.png', '/images/corp-3.png'],
  },
  {
    id: 'casa-club', portfolio: 'corporativo', orderIndex: 6, year: 2023, areaM2: 1150,
    title: { es: 'Casa Club', en: 'Casa Club', ja: 'Casa Club' },
    location: { es: 'Querétaro, México', en: 'Querétaro, Mexico', ja: 'メキシコ、ケレタロ' },
    summary: {
      es: 'Bóveda nervada de concreto, barra monolítica de piedra y materiales honestos para un espacio de hospitalidad.',
      en: 'A ribbed concrete vault, monolithic stone bar and honest materials give character to a hospitality gathering place.',
      ja: 'リブ天井と素材の誠実さが、人々の集う場所に個性を与える空間。',
    },
    materials: { es: 'Bóveda de concreto · Piedra recinto · Latón', en: 'Concrete vault · Basalt stone · Brass', ja: 'コンクリート・玄武岩・真鍮' },
    coverImage: '/images/corp-3.png',
    gallery: ['/images/corp-3.png'],
  },
  {
    id: 'biblioteca-lumen', portfolio: 'espacio-publico', orderIndex: 7, year: 2026, areaM2: 9800,
    title: { es: 'Biblioteca Lumen', en: 'Biblioteca Lumen', ja: 'Biblioteca Lumen' },
    location: { es: 'Puebla, México', en: 'Puebla, Mexico', ja: 'メキシコ、プエブラ' },
    summary: {
      es: 'Los vanos profundos modulan la luz mientras las amplias escalinatas se convierten en una sala de lectura abierta al barrio.',
      en: 'Deep-set openings temper daylight while broad public steps become an open reading room for the neighbourhood.',
      ja: '奥行きのある開口が光を整え、階段は開かれた読書室となる公共図書館。',
    },
    materials: { es: 'Concreto aparente · Madera certificada · Vidrio', en: 'Exposed concrete · Certified timber · Glass', ja: '打ち放しコンクリート・認証木材・ガラス' },
    coverImage: '/images/civic-1.png',
    gallery: ['/images/civic-1.png', '/images/civic-2.png'],
  },
  {
    id: 'andador-rio', portfolio: 'espacio-publico', orderIndex: 8, year: 2024, areaM2: 3400,
    title: { es: 'Andador del Río', en: 'Andador del Río', ja: 'Andador del Río' },
    location: { es: 'León, Guanajuato, México', en: 'León, Guanajuato, Mexico', ja: 'メキシコ、レオン' },
    summary: {
      es: 'Puente peatonal de concreto y plaza pública que conecta barrios y devuelve el borde del río a la ciudad.',
      en: 'Concrete pedestrian bridge and public plaza linking neighbourhoods and returning the river edge to the city.',
      ja: '歩行者の道が街区をつなぎ、川辺を再び街へとひらく公共空間。',
    },
    materials: { es: 'Concreto permeable · Vegetación nativa · Acero corten', en: 'Permeable concrete · Native planting · Corten steel', ja: '透水コンクリート・在来植栽・コルテン鋼' },
    coverImage: '/images/civic-2.png',
    gallery: ['/images/civic-2.png'],
  },
  {
    id: 'pabellon-memoria', portfolio: 'espacio-publico', orderIndex: 9, year: 2022, areaM2: 1600,
    title: { es: 'Pabellón de la Memoria', en: 'Pabellón de la Memoria', ja: 'Pabellón de la Memoria' },
    location: { es: 'Oaxaca, México', en: 'Oaxaca, Mexico', ja: 'メキシコ、オアハカ' },
    summary: {
      es: 'Columnata memorial de piedra caliza con luz rasante que marca un recorrido lento de sombra y contemplación.',
      en: 'Limestone memorial colonnade with raking light marking a slow passage through shade and contemplation.',
      ja: '石柱が、記憶と陰影、静かな思索のための道筋をつくる記念施設。',
    },
    materials: { es: 'Piedra caliza · Pavimento oscuro · Agua', en: 'Limestone · Dark stone paving · Water', ja: '石灰岩・暗色石敷き・水盤' },
    coverImage: '/images/civic-3.png',
    gallery: ['/images/civic-3.png'],
  },
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'materia-y-luz', slug: 'materia-y-luz', orderIndex: 1, publishedAt: '2026-09-18',
    coverImage: '/images/res-1.png',
    title: { es: 'Materia y luz: construir desde el silencio', en: 'Matter and light: building from silence', ja: '素材と光：静寂から築く' },
    excerpt: {
      es: 'Una reflexión sobre cómo la luz natural revela la textura y la escala de un espacio habitable.',
      en: 'A reflection on how natural light reveals the texture and scale of a living space.',
      ja: '自然光が居住空間の質感とスケールをいかに浮かび上がらせるかについての考察。',
    },
    contentHtml: {
      es: '<h2>La gravedad como lenguaje</h2><p>La arquitectura trasciende el dibujo cuando la materia responde al peso y a la atmósfera del sitio. En Medelsa concebimos cada muro como un filtro que ordena el silencio y acompaña la luz a lo largo del día.</p><img src="/images/res-2.png" alt="Interior con luz cenital" /><h3>La luz como material</h3><p>Una abertura cenital convierte el muro de piedra o concreto en un instrumento que <strong>mide el tiempo</strong>.</p><blockquote>La verdadera escala de una habitación se descubre en la penumbra que deja la luz al desplazarse.</blockquote>',
      en: '<h2>Gravity as language</h2><p>Architecture transcends drawing when matter responds to weight and local atmosphere. At Medelsa we conceive each wall as a filter that orders silence and guides daylight.</p><img src="/images/res-2.png" alt="Interior with zenithal light" /><h3>Light as material</h3><p>A zenithal opening turns the wall into an instrument that <strong>measures time</strong>.</p><blockquote>The true scale of a room is discovered in the shadow left by moving light.</blockquote>',
      ja: '<h2>言語としての重力</h2><p>素材が重さと土地の空気に応えるとき、建築は図面を超えます。</p><img src="/images/res-2.png" alt="天窓の光が差し込む室内" /><h3>素材としての光</h3><p>天窓は壁を<strong>時間を測る道具</strong>に変えます。</p><blockquote>空間の真のスケールは、移ろう光が残す陰影の中に現れます。</blockquote>',
    },
  },
  {
    id: 'un-estudio-abierto', slug: 'un-estudio-abierto', orderIndex: 2, publishedAt: '2026-07-02',
    coverImage: '/images/studio.png',
    title: { es: 'Un estudio abierto al paisaje', en: 'A studio open to the landscape', ja: '風景にひらかれたスタジオ' },
    excerpt: {
      es: 'El proceso de trabajo empieza compartiendo ideas, maquetas y preguntas alrededor de una mesa.',
      en: 'Our design process starts by sharing ideas, physical models and questions around a table.',
      ja: '私たちの設計プロセスは、ひとつのテーブルを囲んで模型と問いを共有することから始まります。',
    },
    contentHtml: {
      es: '<h2>Pensar con las manos</h2><p>Antes del plano definitivo, cada proyecto en Medelsa se prueba en maquetas físicas de trabajo donde estudiamos proporciones, sombras y topografía.</p><img src="/images/res-3.png" alt="Volúmenes en paisaje" /><p>Este diálogo entre dibujo, modelo y oficio constructivo permite que la obra pertenezca a su entorno desde el primer día.</p>',
      en: '<h2>Thinking with our hands</h2><p>Before final drawings, every commission at Medelsa is tested through physical working models where we study proportion, shadow and topography.</p><img src="/images/res-3.png" alt="Volumes in landscape" /><p>This dialogue between drawing, model and craft ensures the building belongs to its place from day one.</p>',
      ja: '<h2>手で考える</h2><p>最終図面の前に、すべてのプロジェクトを模型で検証し、比例と陰影、地形を確かめます。</p><img src="/images/res-3.png" alt="風景の中の量塊" />',
    },
  },
  {
    id: 'ciudad-como-umbral', slug: 'ciudad-como-umbral', orderIndex: 3, publishedAt: '2026-05-11',
    coverImage: '/images/civic-1.png',
    title: { es: 'La ciudad como umbral', en: 'The city as a threshold', ja: '閾としての都市' },
    excerpt: {
      es: 'Los espacios públicos y pórticos urbanos como lugares de encuentro, sombra y permanencia cívica.',
      en: 'Public spaces and urban porticos as places of gathering, shade and civic permanence.',
      ja: '集いと陰影、都市の記憶を育む公共空間とポルティコ。',
    },
    contentHtml: {
      es: '<h2>Habitar el espacio compartido</h2><p>Un edificio público debe ofrecer sombra, descanso y apertura antes incluso de cruzar su puerta.</p><img src="/images/civic-2.png" alt="Espacio público y andador" />',
      en: '<h2>Inhabiting shared space</h2><p>A public building should offer shade, rest and openness even before crossing its threshold.</p><img src="/images/civic-2.png" alt="Public realm walkway" />',
      ja: '<h2>共有空間に暮らす</h2><p>公共建築は、扉をくぐる前から日陰と安らぎ、開かれた場を街へ提供するべきです。</p><img src="/images/civic-2.png" alt="公共の歩道と広場" />',
    },
  },
];

export const INITIAL_SETTINGS: SiteSettings = {
  id: 'site',
  accentColor: '#3d5a47',
  whatsapp: '524770000000',
  email: 'hola@medelsa.mx',
  phone: '+52 477 000 0000',
  location: 'León, Guanajuato, México · Operación en todo México',
  whatsappEnabled: true,
  emailEnabled: true,
  aboutImage: '/images/studio.png',
  aboutText: {
    es: 'Medelsa es un despacho independiente de arquitectura con sede en León, Guanajuato. Trabajamos entre vivienda, espacios corporativos y proyectos públicos con una práctica rigurosa, material y profundamente atenta al contexto.\n\nCada encargo comienza escuchando: al sitio, a quienes lo habitan y a quienes lo harán posible. Colaboramos de cerca con clientes, ingenieros y constructores desde la primera conversación hasta la entrega.\n\nCreemos en una arquitectura honesta, capaz de construir pertenencia y permanecer en el tiempo.',
    en: 'Medelsa is an independent architecture practice based in León, Guanajuato, working across Mexico. We design homes, corporate spaces and public buildings through a rigorous, material-focused practice attentive to context.\n\nEvery commission begins with listening: to the site, to those who inhabit it and to those who will build it. We collaborate closely with clients, engineers and builders from the first conversation to completion.\n\nWe believe in honest architecture capable of creating belonging and enduring over time.',
    ja: 'Medelsaはメキシコ・レオンを拠点にメキシコ全土で活動する建築設計事務所です。住宅、企業空間、公共建築において、素材と文脈に深く向き合う設計を行っています。\n\nすべてのプロジェクトは、敷地、そこに暮らす人々、そして施工を担う人々の声に耳を傾けることから始まります。\n\n時間の経過とともに街と人に馴染み、長く愛される誠実な建築を目指しています。',
  },
  mentions: [
    {
      id: 'm-1',
      type: 'Premios',
      title: 'Obra residencial · Premio Nacional de Arquitectura',
      source: 'Federación de Colegios de Arquitectos de la República Mexicana',
      year: '2025',
      href: '/portafolios/residencial/casa-basalto',
      image: '/images/res-1.png',
    },
    {
      id: 'm-2',
      type: 'Premios',
      title: 'Dezeen Awards · Architecture Longlist',
      source: 'Dezeen · Londres',
      year: '2024',
      href: '/portafolios/residencial/casa-caliza',
      image: '/images/res-2.png',
    },
    {
      id: 'm-3',
      type: 'Publicaciones',
      title: 'Casa Basalto: una secuencia de patios entre el bosque',
      source: 'Revista Arquine · Edición impresa y digital',
      year: '2024',
      href: '/portafolios/residencial/casa-basalto',
      image: '/images/res-3.png',
    },
    {
      id: 'm-4',
      type: 'Publicaciones',
      title: 'Arquitectura tectónica en el Bajío: Medelsa',
      source: 'ArchDaily México',
      year: '2023',
      href: '/portafolios/corporativo/torre-origen',
      image: '/images/corp-1.png',
    },
    {
      id: 'm-5',
      type: 'Concursos',
      title: 'Finalista · Concurso Nacional para el Centro Cultural del Río',
      source: 'Secretaría de Cultura · México',
      year: '2023',
      href: '/portafolios/espacio-publico/biblioteca-lumen',
      image: '/images/civic-1.png',
    },
  ],
};
