import type { Lang } from '../config/site';

export type LText = Record<Lang, string>;
export type PortfolioId = 'residential' | 'commercial' | 'civic';

export const loc = (t: LText | undefined, lang: string): string =>
  (t && (t[lang as Lang] || t.es)) || '';

export interface ArchitecturalProject {
  id: string;
  portfolio: PortfolioId;
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
  category: LText;
  publishedAt: string;
  orderIndex: number;
  coverImage: string;
  isPublished: boolean;
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

const U = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PORTFOLIOS: { id: PortfolioId; accent: string }[] = [
  { id: 'residential', accent: '#d4a373' },
  { id: 'commercial', accent: '#8fb4d9' },
  { id: 'civic', accent: '#9bb88a' },
];

export const INITIAL_PROJECTS: ArchitecturalProject[] = [
  {
    id: 'casa-cantera', portfolio: 'residential', year: 2024, areaM2: 780,
    title: { es: 'Casa Cantera', en: 'Quarry House', ja: 'カンテラの家' },
    location: { es: 'Valle de Bravo, México', en: 'Valle de Bravo, Mexico', ja: 'メキシコ、バジェ・デ・ブラボ' },
    summary: {
      es: 'Residencia unifamiliar que dialoga con la topografía boscosa mediante muros de piedra volcánica y losas de concreto aparente.',
      en: 'Single-family residence in dialogue with the wooded topography through volcanic stone walls and exposed concrete slabs.',
      ja: '火山岩の壁と打ち放しコンクリートのスラブで、森の地形と対話する戸建住宅。',
    },
    materials: { es: 'Piedra volcánica · Concreto aparente · Madera de encino', en: 'Volcanic stone · Exposed concrete · Oak', ja: '火山岩・打ち放しコンクリート・オーク材' },
    coverImage: U('photo-1600585154340-be6161a56a0c'),
    gallery: [U('photo-1600585154340-be6161a56a0c'), U('photo-1600596542815-ffad4c1539a9')],
  },
  {
    id: 'casa-patio', portfolio: 'residential', year: 2023, areaM2: 420,
    title: { es: 'Casa Patio', en: 'Courtyard House', ja: '中庭の家' },
    location: { es: 'León, México', en: 'León, Mexico', ja: 'メキシコ、レオン' },
    summary: {
      es: 'Vivienda organizada alrededor de un patio central que regula la luz, la ventilación y la privacidad familiar.',
      en: 'A home organised around a central courtyard that regulates light, ventilation and family privacy.',
      ja: '中庭を中心に光・通風・プライバシーを調整する住宅。',
    },
    materials: { es: 'Tabique artesanal · Cantera rosa · Acero', en: 'Handmade brick · Pink quarry stone · Steel', ja: '手作りレンガ・ピンク石材・鋼材' },
    coverImage: U('photo-1480074568708-e7b720bb3f09'),
    gallery: [U('photo-1480074568708-e7b720bb3f09')],
  },
  {
    id: 'sede-basalto', portfolio: 'commercial', year: 2025, areaM2: 4500,
    title: { es: 'Sede Corporativa Basalto', en: 'Basalto Corporate Headquarters', ja: 'バサルト本社ビル' },
    location: { es: 'Ciudad de México, México', en: 'Mexico City, Mexico', ja: 'メキシコシティ' },
    summary: {
      es: 'Edificio de 9 niveles con fachada bioclimática de celosía cerámica que maximiza la ventilación pasiva y el confort lumínico.',
      en: 'Nine-storey building with a ceramic lattice bioclimatic façade maximising passive ventilation and daylight comfort.',
      ja: 'セラミック格子の環境配慮型ファサードで、通風と採光を最大化する9階建てオフィス。',
    },
    materials: { es: 'Celosía cerámica · Vidrio de control solar · Concreto', en: 'Ceramic lattice · Solar-control glass · Concrete', ja: 'セラミック格子・日射制御ガラス・コンクリート' },
    coverImage: U('photo-1486406146926-c627a92ad1ab'),
    gallery: [U('photo-1486406146926-c627a92ad1ab')],
  },
  {
    id: 'plaza-comercial', portfolio: 'commercial', year: 2022, areaM2: 12800,
    title: { es: 'Plaza Comercial Meridiano', en: 'Meridiano Retail Plaza', ja: 'メリディアーノ商業施設' },
    location: { es: 'Querétaro, México', en: 'Querétaro, Mexico', ja: 'メキシコ、ケレタロ' },
    summary: {
      es: 'Conjunto comercial con recorridos peatonales sombreados, flujo optimizado y fachadas de alta presencia de marca.',
      en: 'Retail complex with shaded pedestrian routes, optimised circulation and high brand-presence façades.',
      ja: '日陰の歩行動線と最適化された回遊性、ブランド力のあるファサードを備えた商業複合施設。',
    },
    materials: { es: 'Acero estructural · Vidrio · Aluminio', en: 'Structural steel · Glass · Aluminium', ja: '構造鋼・ガラス・アルミ' },
    coverImage: U('photo-1487958449943-2429e8be8625'),
    gallery: [U('photo-1487958449943-2429e8be8625')],
  },
  {
    id: 'pabellon-mirador', portfolio: 'civic', year: 2023, areaM2: 1200,
    title: { es: 'Pabellón y Mirador Bioclimático', en: 'Bioclimatic Pavilion and Lookout', ja: '環境配慮型パビリオンと展望台' },
    location: { es: 'Yucatán, México', en: 'Yucatán, Mexico', ja: 'メキシコ、ユカタン' },
    summary: {
      es: 'Intervención de bajo impacto que articula recorridos peatonales con madera certificada y tierra compactada local.',
      en: 'Low-impact intervention linking pedestrian routes with certified timber and local rammed earth.',
      ja: '認証木材と現地の版築土で歩行動線をつなぐ低負荷の公共介入。',
    },
    materials: { es: 'Madera certificada · Tierra compactada · Palma', en: 'Certified timber · Rammed earth · Palm', ja: '認証木材・版築土・ヤシ' },
    coverImage: U('photo-1513694203232-719a280e022f'),
    gallery: [U('photo-1513694203232-719a280e022f')],
  },
  {
    id: 'parque-lineal', portfolio: 'civic', year: 2024, areaM2: 38000,
    title: { es: 'Parque Lineal Río', en: 'River Linear Park', ja: 'リバー・リニアパーク' },
    location: { es: 'Guanajuato, México', en: 'Guanajuato, Mexico', ja: 'メキシコ、グアナファト' },
    summary: {
      es: 'Regeneración de un cauce urbano en parque lineal con ciclovía, humedales filtrantes y espacios de encuentro comunitario.',
      en: 'Regeneration of an urban watercourse into a linear park with cycle path, filtering wetlands and community spaces.',
      ja: '都市河川を自転車道・浄化湿地・コミュニティ空間を備えたリニアパークへ再生。',
    },
    materials: { es: 'Vegetación nativa · Concreto permeable · Acero corten', en: 'Native planting · Permeable concrete · Corten steel', ja: '在来植栽・透水コンクリート・コルテン鋼' },
    coverImage: U('photo-1449824913935-59a10b8d2000'),
    gallery: [U('photo-1449824913935-59a10b8d2000')],
  },
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'tectonica-materia', slug: 'tectonica-de-la-materia', orderIndex: 1, publishedAt: '2026-03-15', isPublished: true,
    coverImage: U('photo-1600585154340-be6161a56a0c', 1200),
    category: { es: 'Ensayo', en: 'Essay', ja: 'エッセイ' },
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
    id: 'eficiencia-pasiva', slug: 'eficiencia-pasiva-residencial', orderIndex: 2, publishedAt: '2026-02-10', isPublished: true,
    coverImage: U('photo-1600596542815-ffad4c1539a9', 1200),
    category: { es: 'Procesos de obra', en: 'Construction process', ja: '施工プロセス' },
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
