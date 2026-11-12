import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      nav: {
        home: "Inicio",
        portfolios: "Portafolios",
        studio: "Estudio",
        awards: "Menciones y Concursos",
        journal: "Publicaciones / Blog",
        contact: "Contacto",
        adminLogin: "Acceso Taller",
      },
      hero: {
        tagline: "Arquitectura de orden tectónico, materia y luz.",
        exploreWork: "Explorar Portafolios",
        quickContact: "Iniciar Diálogo",
      },
      portfolios: {
        title: "Tres Enfoques, Una Misma Precisión",
        subtitle: "Explora nuestra obra segmentada según el territorio, la escala y el uso del espacio.",
        portfolio1: {
          tag: "Portafolio 01",
          name: "Residencial de Autor",
          desc: "Vivienda unifamiliar de alta gama integrada con el paisaje y la luz natural.",
        },
        portfolio2: {
          tag: "Portafolio 02",
          name: "Corporativo & Espacios Comerciales",
          desc: "Edificios de oficinas y sedes de marca diseñados para la eficiencia y presencia institucional.",
        },
        portfolio3: {
          tag: "Portafolio 03",
          name: "Intervención Pública & Paisaje",
          desc: "Proyectos urbanísticos, espacio público y diseño bioclimático de escala cívica.",
        },
        viewProject: "Ver Detalle de Obra",
      },
      contactBar: {
        title: "¿Tienes un proyecto en mente?",
        callToAction: "Escríbenos directamente o agenda una conversación técnica.",
        whatsappText: "Mensaje por WhatsApp",
        emailText: "Enviar Correo",
        defaultSubject: "Consulta de Proyecto Arquitectónico",
        defaultBody: "Hola, me interesa conversar sobre un nuevo proyecto de arquitectura.",
      },
      blog: {
        title: "Cuaderno de Taller & Ensayos",
        subtitle: "Investigación espacial, procesos de construcción y memorias teóricas.",
        readMore: "Leer artículo",
      },
      awards: {
        title: "Reconocimientos, Prensa & Concursos",
        subtitle: "Distinciones nacionales e internacionales que avalan nuestra metodología.",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        portfolios: "Portfolios",
        studio: "Studio",
        awards: "Awards & Press",
        journal: "Journal / Blog",
        contact: "Contact",
        adminLogin: "Studio Login",
      },
      hero: {
        tagline: "Architecture of tectonic discipline, materiality, and light.",
        exploreWork: "Explore Portfolios",
        quickContact: "Initiate Dialogue",
      },
      portfolios: {
        title: "Three Angles, Single Precision",
        subtitle: "Explore our work segmented by territory, scale, and programmatic use.",
        portfolio1: {
          tag: "Portfolio 01",
          name: "Signature Residential",
          desc: "High-end bespoke residences integrated into the landscape and solar geometry.",
        },
        portfolio2: {
          tag: "Portfolio 02",
          name: "Corporate & Commercial Venues",
          desc: "Office headquarters and hospitality spaces designed for performance and brand identity.",
        },
        portfolio3: {
          tag: "Portfolio 03",
          name: "Public Space & Landscape",
          desc: "Civic-scale urban interventions and bioclimatic masterplans.",
        },
        viewProject: "View Project Specs",
      },
      contactBar: {
        title: "Planning a project?",
        callToAction: "Reach out directly or book a technical consultation.",
        whatsappText: "Message on WhatsApp",
        emailText: "Send Email",
        defaultSubject: "Architectural Project Inquiry",
        defaultBody: "Hello, I would like to schedule an introductory architectural review.",
      },
      blog: {
        title: "Studio Notebook & Essays",
        subtitle: "Spatial research, construction processes, and theoretical discourse.",
        readMore: "Read essay",
      },
      awards: {
        title: "Recognitions, Press & Competitions",
        subtitle: "National and international honors validating our design practice.",
      },
    },
  },
  ja: {
    translation: {
      nav: {
        home: "ホーム",
        portfolios: "作品集",
        studio: "スタジオ",
        awards: "受賞・掲載歴",
        journal: "ジャーナル",
        contact: "お問い合わせ",
        adminLogin: "管理ログイン",
      },
      hero: {
        tagline: "構造美、素材感、そして光を紡ぐ建築。",
        exploreWork: "作品集を見る",
        quickContact: "対話を始める",
      },
      portfolios: {
        title: "3つの領域、ゆるぎない精度",
        subtitle: "敷地、規模、空間用途ごとに最適化された建築作品群。",
        portfolio1: {
          tag: "ポートフォリオ 01",
          name: "特注住宅・邸宅",
          desc: "景観と自然光が調和する、唯一無二のハイエンド個人住宅。",
        },
        portfolio2: {
          tag: "ポートフォリオ 02",
          name: "商業施設・オフィス建築",
          desc: "高い機能性とブランドの存在感を兼ね備えた複合施設およびオフィス。",
        },
        portfolio3: {
          tag: "ポートフォリオ 03",
          name: "公共空間・ランドスケープ",
          desc: "都市の文脈と環境負荷低減を考慮した公共建築およびマスタープラン。",
        },
        viewProject: "作品詳細を見る",
      },
      contactBar: {
        title: "建築のご相談について",
        callToAction: "直接のご連絡、または技術相談の面談をご希望の方はこちらから。",
        whatsappText: "WhatsAppで相談",
        emailText: "メールで問い合わせ",
        defaultSubject: "建築設計に関するお問い合わせ",
        defaultBody: "はじめまして。建築計画のご相談についてご連絡いたしました。",
      },
      blog: {
        title: "スタジオノート & 論文",
        subtitle: "空間リサーチ、施工プロセス、理論的考察の記録。",
        readMore: "記事を読む",
      },
      awards: {
        title: "受賞歴・メディア掲載・コンペ",
        subtitle: "国内外で高く評価された実績と設計手法。",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
