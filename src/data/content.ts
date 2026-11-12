export interface ArchitecturalProject {
  id: string;
  portfolioCategory: 'residential' | 'commercial' | 'civic';
  title: string;
  location: string;
  year: number;
  areaM2: number;
  summary: string;
  coverImage: string;
  gallery: string[];
  photographer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  orderIndex: number;
  coverImage: string;
  excerpt: string;
  contentHtml: string;
  isPublished: boolean;
}

export interface AwardItem {
  year: number;
  title: string;
  institution: string;
  project: string;
  type: 'award' | 'publication' | 'competition';
  externalUrl?: string;
}

// Datos iniciales de alta coherencia comercial (Cero "lorem ipsum" o placeholders)
export const INITIAL_PROJECTS: ArchitecturalProject[] = [
  {
    id: 'casa-cantera',
    portfolioCategory: 'residential',
    title: 'Casa Cantera & Luz',
    location: 'Valle de Bravo, México',
    year: 2024,
    areaM2: 780,
    summary: 'Residencia unifamiliar que dialoga con la topografía boscosa a través de muros de contención de piedra volcánica y losas flotadas de concreto aparente.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    ],
    photographer: 'César Béjar Estudio',
  },
  {
    id: 'torre-basalto',
    portfolioCategory: 'commercial',
    title: 'Sede Corporativa Basalto',
    location: 'Ciudad de México, México',
    year: 2025,
    areaM2: 4500,
    summary: 'Edificio corporativo de 9 niveles con fachada bioclimática de celosía cerámica extruida, maximizando ventilación pasiva y confort lumínico.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    ],
    photographer: 'Rafael Gamo',
  },
  {
    id: 'parque-cenote',
    portfolioCategory: 'civic',
    title: 'Pabellón y Mirador Bioclimático',
    location: 'Yucatán, México',
    year: 2023,
    areaM2: 1200,
    summary: 'Intervención de bajo impacto en entorno natural que articula recorridos peatonales mediante madera certificada y tierra compactada local.',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    ],
    photographer: 'Onnis Luque',
  },
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: '1',
    slug: 'tectonica-y-materia-mexicana',
    title: 'Tectónica de la Materia: El Concreto y la Luz Cenital',
    category: 'Ensayo Teórico',
    publishedAt: '2026-03-15',
    orderIndex: 1,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Una reflexión sobre la gravedad, el peso constructivo y cómo la incisión solar transforma la experiencia del espacio habitable contemporáneo.',
    contentHtml: '<h3>La Gravedad como Lenguaje</h3><p>La arquitectura trasciende el dibujo en el momento en que la materia responde al peso y a la atmósfera local...</p>',
    isPublished: true,
  },
  {
    id: '2',
    slug: 'estrategias-pasivas-residencial',
    title: 'Eficiencia Pasiva en la Residencia Contemporánea',
    category: 'Procesos de Obra',
    publishedAt: '2026-02-10',
    orderIndex: 2,
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Análisis de asoleamiento y confort higrotérmico aplicado en climas templados mexicanos sin recurrir a climatización mecánica.',
    contentHtml: '<h3>Orientación y Masa Térmica</h3><p>El uso de dobles muros de piedra caliza permite amortiguar la oscilación térmica entre el día y la noche...</p>',
    isPublished: true,
  },
];

export const INITIAL_AWARDS: AwardItem[] = [
  {
    year: 2025,
    title: 'Medalla de Plata en Bienal de Arquitectura Mexicana',
    institution: 'FCARM / CAM-SAM',
    project: 'Casa Cantera & Luz',
    type: 'award',
  },
  {
    year: 2024,
    title: 'Selección Oficial Obras del Año',
    institution: 'Revista Arquine / ArchDaily',
    project: 'Pabellón y Mirador Bioclimático',
    type: 'publication',
    externalUrl: 'https://archdaily.com',
  },
  {
    year: 2023,
    title: 'Primer Lugar Concurso Nacional de Espacio Cívico',
    institution: 'Secretaría de Desarrollo Urbano',
    project: 'Intervención Paisajística Peninsular',
    type: 'competition',
  },
];
