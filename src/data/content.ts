import type { Lang } from '../config/site';

export type LText = Record<Lang, string>;
export type PortfolioId = string;
export type PortfolioLayout = 'editorial' | 'technical' | 'organic';

export const loc = (t: LText | undefined, lang: string): string =>
  (t && (t[lang as Lang] || t.es)) || '';

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

export interface AwardItem {
  year: number;
  type: 'award' | 'publication' | 'competition';
  title: LText;
  institution: LText;
  project: LText;
}

export const INITIAL_PORTFOLIOS: PortfolioItem[] = [
  {
    id: 'residential',
    orderIndex: 1,
    accent: '#9a6b3b',
    layoutStyle: 'editorial',
    tag: { es: 'Portafolio 01', en: 'Portfolio 01', ja: '作品集 01' },
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
    id: 'commercial',
    orderIndex: 2,
    accent: '#3b6790',
    layoutStyle: 'technical',
    tag: { es: 'Portafolio 02', en: 'Portfolio 02', ja: '作品集 02' },
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
    id: 'civic',
    orderIndex: 3,
    accent: '#526e5b',
    layoutStyle: 'organic',
    tag: { es: 'Portafolio 03', en: 'Portfolio 03', ja: '作品集 03' },
    name: { es: 'Espacio público y paisaje', en: 'Public space & landscape', ja: '公共空間・ランドスケープ' },
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
    id: 'casa-basalto', portfolio: 'residential', orderIndex: 1, year: 2025, areaM2: 640,
    title: { es: 'Casa Basalto', en: 'Casa Basalto', ja: 'Casa Basalto' },
    location: { es: 'Valle de Bravo, México', en: 'Valle de Bravo, Mexico', ja: 'メキシコ、バジェ・デ・ブラボ' },
    summary: {
      es: 'Una secuencia de patios de concreto abraza la pendiente y enmarca el paisaje del bosque mediante muros de piedra volcánica.',
      en: 'A sequence of concrete courtyards embraces the slope and frames the forest landscape through volcanic stone walls.',
      ja: 'コンクリートの中庭が斜面を包み、森の景色を切り取る住宅。',
    },
    materials: { es: 'Piedra volcánica · Concreto aparente · Madera de encino', en: 'Volcanic stone · Exposed concrete · Oak', ja: '火山岩・打ち放しコンクリート・オーク材' },
    coverImage: '/images/res-1.png',
    gallery: ['/images/res-1.png', '/images/res-2.png'],
  },
  {
    id: 'casa-caliza', portfolio: 'residential', orderIndex: 2, year: 2024, areaM2: 480,
    title: { es: 'Casa Caliza', en: 'Casa Caliza', ja: 'Casa Caliza' },
    location: { es: 'San Miguel de Allende, México', en: 'San Miguel de Allende, Mexico', ja: 'メキシコ、サン・ミゲル・デ・アジェンデ' },
    summary: {
      es: 'Un hogar monolítico organizado alrededor de una chimenea de piedra caliza y una sola entrada de luz cenital.',
      en: 'A monolithic home organised around a limestone fireplace and a single source of zenithal daylight.',
      ja: '一枚岩の石灰岩暖炉と光のスリットを中心に構成した、塊のような住まい。',
    },
    materials: { es: 'Piedra caliza · Concreto pigmentado · Acero', en: 'Limestone · Pigmented concrete · Steel', ja: '石灰岩・着色コンクリート・鋼材' },
    coverImage: '/images/res-2.png',
    gallery: ['/images/res-2.png', '/images/res-3.png'],
  },
  {
    id: 'refugio-duna', portfolio: 'residential', orderIndex: 3, year: 2023, areaM2: 920,
    title: { es: 'Refugio Duna', en: 'Refugio Duna', ja: 'Refugio Duna' },
    location: { es: 'Todos Santos, México', en: 'Todos Santos, Mexico', ja: 'メキシコ、トドス・サントス' },
    summary: {
      es: 'Tres planos horizontales de piedra y concreto se apoyan sobre la duna costera y elevan la casa sobre la arena.',
      en: 'Three horizontal planes of stone and concrete settle into the coastal dune, lifting the house above the sand.',
      ja: '海岸の砂丘に置かれた三つの水平な石とコンクリートの量塊。',
    },
    materials: { es: 'Concreto playero · Piedra local · Madera tropical', en: 'Coastal concrete · Local stone · Tropical timber', ja: 'コンクリート・地元石材・木材' },
    coverImage: '/images/res-3.png',
    gallery: ['/images/res-3.png'],
  },
  {
    id: 'torre-origen', portfolio: 'commercial', orderIndex: 4, year: 2025, areaM2: 18400,
    title: { es: 'Torre Origen', en: 'Torre Origen', ja: 'Torre Origen' },
    location: { es: 'Ciudad de México, México', en: 'Mexico City, Mexico', ja: 'メキシコシティ' },
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
    id: 'foro-norte', portfolio: 'commercial', orderIndex: 5, year: 2024, areaM2: 7200,
    title: { es: 'Foro Norte', en: 'Foro Norte', ja: 'Foro Norte' },
    location: { es: 'Monterrey, México', en: 'Monterrey, Mexico', ja: 'メキシコ、モンテレイ' },
    summary: {
      es: 'Una cubierta de gran claro protege el vestíbulo y extiende la plaza pública hacia el escenario.',
      en: 'A long-span canopy shelters the foyer and extends the public plaza towards the stage.',
      ja: '大スパンの庇がホワイエを守り、広場を舞台へとつなぐ公演施設。',
    },
    materials: { es: 'Acero estructural · Concreto · Madera acústica', en: 'Structural steel · Concrete · Acoustic timber', ja: '構造鋼・コンクリート・音響木材' },
    coverImage: '/images/corp-2.png',
    gallery: ['/images/corp-2.png'],
  },
  {
    id: 'casa-club', portfolio: 'commercial', orderIndex: 6, year: 2023, areaM2: 1150,
    title: { es: 'Casa Club', en: 'Casa Club', ja: 'Casa Club' },
    location: { es: 'Ciudad de México, México', en: 'Mexico City, Mexico', ja: 'メキシコシティ' },
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
    id: 'biblioteca-lumen', portfolio: 'civic', orderIndex: 7, year: 2026, areaM2: 9800,
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
    id: 'andador-rio', portfolio: 'civic', orderIndex: 8, year: 2024, areaM2: 3400,
    title: { es: 'Andador del Río', en: 'Andador del Río', ja: 'Andador del Río' },
    location: { es: 'Querétaro, México', en: 'Querétaro, Mexico', ja: 'メキシコ、ケレタロ' },
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
    id: 'pabellon-memoria', portfolio: 'civic', orderIndex: 9, year: 2022, areaM2: 1600,
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
    id: 'tectonica-materia', slug: 'tectonica-de-la-materia', orderIndex: 1, publishedAt: '2026-03-15',
    coverImage: '/images/res-1.png',
    title: { es: 'Tectónica de la materia: concreto y luz cenital', en: 'Tectonics of matter: concrete and zenithal light', ja: '素材のテクトニクス：コンクリートと天窓の光' },
    excerpt: {
      es: 'Una reflexión sobre el peso constructivo y cómo la incisión solar transforma la experiencia del espacio habitable.',
      en: 'A reflection on constructive weight and how solar incision transforms the experience of living space.',
      ja: '構築の重みと、光の切り込みが居住空間の体験をどう変えるかについての考察。',
    },
    contentHtml: {
      es: '<h2>La gravedad como lenguaje</h2><p>La arquitectura trasciende el dibujo cuando la materia responde al peso y a la atmósfera local.</p><h3>La luz como material</h3><p>Una abertura cenital convierte el muro en un instrumento que <strong>mide el tiempo</strong>.</p>',
      en: '<h2>Gravity as language</h2><p>Architecture transcends drawing when matter responds to weight and local atmosphere.</p><h3>Light as material</h3><p>A zenithal opening turns the wall into an instrument that <strong>measures time</strong>.</p>',
      ja: '<h2>言語としての重力</h2><p>素材が重さと土地の空気に応えるとき、建築は図面を超えます。</p><h3>素材としての光</h3><p>天窓は壁を<strong>時間を測る道具</strong>に変えます。</p>',
    },
  },
  {
    id: 'eficiencia-pasiva', slug: 'eficiencia-pasiva-residencial', orderIndex: 2, publishedAt: '2026-02-10',
    coverImage: '/images/studio.png',
    title: { es: 'Eficiencia pasiva en la residencia contemporánea', en: 'Passive efficiency in the contemporary home', ja: '現代住宅におけるパッシブ設計' },
    excerpt: {
      es: 'Análisis de asoleamiento y confort higrotérmico en climas templados sin climatización mecánica.',
      en: 'Analysis of solar exposure and hygrothermal comfort in temperate climates without mechanical cooling.',
      ja: '機械空調に頼らない温暖地での日射と温熱快適性の分析。',
    },
    contentHtml: {
      es: '<h2>Orientación y masa térmica</h2><p>Los muros dobles de piedra amortiguan la oscilación térmica entre el día y la noche.</p>',
      en: '<h2>Orientation and thermal mass</h2><p>Double stone walls dampen the thermal swing between day and night.</p>',
      ja: '<h2>方位と熱容量</h2><p>二重の石壁が昼夜の温度変動を和らげます。</p>',
    },
  },
];

export const INITIAL_AWARDS: AwardItem[] = [
  { year: 2025, type: 'award',
    title: { es: 'Medalla de plata en bienal de arquitectura', en: 'Silver medal at architecture biennial', ja: '建築ビエンナーレ銀賞' },
    institution: { es: 'Bienal Nacional de Arquitectura', en: 'National Architecture Biennial', ja: '全国建築ビエンナーレ' },
    project: { es: 'Casa Cantera', en: 'Quarry House', ja: 'カンテラの家' } },
  { year: 2024, type: 'publication',
    title: { es: 'Obra destacada del año', en: 'Featured project of the year', ja: '今年の注目作品' },
    institution: { es: 'Publicación especializada en arquitectura', en: 'Architecture trade publication', ja: '建築専門誌' },
    project: { es: 'Pabellón y Mirador Bioclimático', en: 'Bioclimatic Pavilion and Lookout', ja: '環境配慮型パビリオンと展望台' } },
  { year: 2023, type: 'competition',
    title: { es: 'Primer lugar en concurso de espacio cívico', en: 'First prize in civic space competition', ja: '公共空間コンペ1位' },
    institution: { es: 'Concurso Nacional de Espacio Cívico', en: 'National Civic Space Competition', ja: '全国公共空間コンペ' },
    project: { es: 'Parque Lineal Río', en: 'River Linear Park', ja: 'リバー・リニアパーク' } },
];
