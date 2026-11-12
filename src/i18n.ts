import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      brand: {
        title: "ESTUDIO TECTÓNICO",
        subtitle: "Arquitectura & Ciudad",
      },
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
        badge: "Taller de Arquitectura · México",
        tagline: "Arquitectura de orden tectónico, materia y luz.",
        description: "Exploramos el equilibrio entre la gravedad constructiva, la eficiencia bioclimática pasiva y la atmósfera de la luz. Diseñado para clientes que demandan rigor técnico y distinción espacial.",
        exploreWork: "Explorar Portafolios",
        quickContact: "Iniciar Diálogo",
      },
      portfolios: {
        badge: "Tres Enfoques, Una Misma Precisión",
        sectionTitle: "Portafolios Segmentados por Mercado",
        subtitle: "Explora nuestra obra segmentada según el territorio, la escala y el uso del espacio.",
        tabs: {
          all: "Ver Todo",
          residential: "01. Residencial",
          commercial: "02. Corporativo",
          civic: "03. Paisaje & Ciudad",
        },
        viewProject: "Ver Detalle de Obra",
        photoCredit: "Foto:",
      },
      awards: {
        badge: "Reconocimientos, Prensa & Concursos",
        sectionTitle: "Premios, Bienales & Prensa Internacional",
        subtitle: "Distinciones nacionales e internacionales que avalan nuestra metodología.",
        viewPublication: "Ver Publicación",
        workLabel: "Obra:",
      },
      blog: {
        badge: "Cuaderno de Taller & Ensayos",
        sectionTitle: "Ensayos Teóricos y Bitácora de Obra",
        subtitle: "Investigación espacial, procesos de construcción y memorias teóricas.",
        readMore: "Leer artículo",
      },
      contact: {
        badge: "Iniciemos una conversación",
        title: "¿Preparando una nueva obra o intervención?",
        description: "Atendemos proyectos de escala residencial, corporativa y pública en todo México. Agenda una llamada de diagnóstico o envíanos un mensaje directo.",
        emailButton: "contacto@estudiotectonico.mx",
        whatsappButton: "WhatsApp Directo",
      },
      contactBar: {
        title: "¿Tienes un proyecto en mente?",
        subtitle: "Atención técnica inmediata",
        whatsappText: "WhatsApp",
        emailText: "Correo",
        defaultSubject: "Consulta de Proyecto Arquitectónico",
        defaultBody: "Hola, me interesa conversar sobre un nuevo proyecto de arquitectura.",
      },
      footer: {
        copyright: "© 2026 Estudio Tectónico. Todos los derechos reservados. Desarrollado bajo estándares de arquitectura y sostenibilidad.",
      },
      admin: {
        title: "Panel de Taller & Publicaciones",
        loginTitle: "Acceso de Edición",
        loginSubtitle: "Introduce tus credenciales para crear, editar o reorganizar los artículos del blog y ensayos de taller.",
        passwordLabel: "Clave de Acceso",
        passwordPlaceholder: "Introduce la contraseña...",
        submitLogin: "Ingresar al Gestor",
        closeModal: "Cerrar Ventana",
        errorAuth: "Contraseña incorrecta. Introduce una clave autorizada.",
      },
    },
  },
  en: {
    translation: {
      brand: {
        title: "TECTONIC STUDIO",
        subtitle: "Architecture & Urbanism",
      },
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
        badge: "Architecture Atelier · Mexico",
        tagline: "Architecture of tectonic discipline, materiality, and light.",
        description: "We explore balance across structural gravity, passive bioclimatic performance, and the atmosphere of natural light. Designed for patrons demanding technical rigor and spatial distinction.",
        exploreWork: "Explore Portfolios",
        quickContact: "Initiate Dialogue",
      },
      portfolios: {
        badge: "Three Angles, Single Precision",
        sectionTitle: "Portfolios Segmented by Market",
        subtitle: "Explore our work structured by territory, scale, and programmatic use.",
        tabs: {
          all: "View All",
          residential: "01. Residential",
          commercial: "02. Corporate",
          civic: "03. Landscape & Civic",
        },
        viewProject: "View Project Specs",
        photoCredit: "Photo:",
      },
      awards: {
        badge: "Recognitions, Press & Competitions",
        sectionTitle: "Honors, Biennales & International Press",
        subtitle: "National and international accolades affirming our design methodology.",
        viewPublication: "View Feature",
        workLabel: "Project:",
      },
      blog: {
        badge: "Studio Notebook & Essays",
        sectionTitle: "Theoretical Essays & Construction Log",
        subtitle: "Spatial research, construction processes, and theoretical discourse.",
        readMore: "Read essay",
      },
      contact: {
        badge: "Initiate Dialogue",
        title: "Planning a new building or intervention?",
        description: "We lead commissions across residential, corporate, and civic scales throughout Mexico and internationally. Schedule an introductory review or send an inquiry.",
        emailButton: "inquiry@estudiotectonico.mx",
        whatsappButton: "Direct WhatsApp",
      },
      contactBar: {
        title: "Planning a project?",
        subtitle: "Direct technical consultation",
        whatsappText: "WhatsApp",
        emailText: "Email",
        defaultSubject: "Architectural Project Inquiry",
        defaultBody: "Hello, I would like to schedule an introductory architectural review.",
      },
      footer: {
        copyright: "© 2026 Tectonic Studio. All rights reserved. Built under strict architectural and sustainability standards.",
      },
      admin: {
        title: "Studio Notebook CMS",
        loginTitle: "Author Authentication",
        loginSubtitle: "Provide credentials to publish, edit, or reorder architectural essays.",
        passwordLabel: "Access Key",
        passwordPlaceholder: "Enter passkey...",
        submitLogin: "Enter Console",
        closeModal: "Close Window",
        errorAuth: "Invalid passkey. Please provide authorized credentials.",
      },
    },
  },
  ja: {
    translation: {
      brand: {
        title: "テクトニック・スタジオ",
        subtitle: "建築・都市計画事務所",
      },
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
        badge: "建築設計事務所 · メキシコ",
        tagline: "構造美、素材感、そして光を紡ぐ建築。",
        description: "構造の重力、パッシブな環境共生、そして光の陰影が織りなす空間の均衡を追求します。高度な技術と空間の美を求めるクライアントのために。",
        exploreWork: "作品集を見る",
        quickContact: "対話を始める",
      },
      portfolios: {
        badge: "3つの領域、ゆるぎない精度",
        sectionTitle: "用途・市場別に構成された作品群",
        subtitle: "敷地、規模、空間用途ごとに最適化された建築プロジェクトのアーカイブ。",
        tabs: {
          all: "すべて",
          residential: "01. 高級住宅",
          commercial: "02. 商業・オフィス",
          civic: "03. 公共・都市景観",
        },
        viewProject: "作品詳細を見る",
        photoCredit: "撮影:",
      },
      awards: {
        badge: "受賞歴・メディア掲載・コンペ",
        sectionTitle: "国内外の受賞歴および建築メディア掲載",
        subtitle: "私たちの設計手法と実践を評価する数々の実績。",
        viewPublication: "掲載記事を見る",
        workLabel: "対象建築:",
      },
      blog: {
        badge: "スタジオノート & 論文",
        sectionTitle: "空間理論・現場ドキュメント",
        subtitle: "空間リサーチ、施工プロセス、理論的考察の記録。",
        readMore: "記事を読む",
      },
      contact: {
        badge: "対話の第一歩",
        title: "新たな建築・都市計画のご相談",
        description: "メキシコ全土および国際的な住宅・商業・公共プロジェクトを承っております。事前ヒアリングや技術相談はお気軽にご連絡ください。",
        emailButton: "メールで問い合わせる",
        whatsappButton: "WhatsAppで相談する",
      },
      contactBar: {
        title: "建築のご相談について",
        subtitle: "即時技術サポート対応",
        whatsappText: "WhatsApp",
        emailText: "メール",
        defaultSubject: "建築設計に関するお問い合わせ",
        defaultBody: "はじめまして。建築計画のご相談についてご連絡いたしました。",
      },
      footer: {
        copyright: "© 2026 テクトニック・スタジオ. All rights reserved. 建築的規律と持続可能性に基づき開発。",
      },
      admin: {
        title: "アトリエ執筆・記事管理コンソール",
        loginTitle: "認証ログイン",
        loginSubtitle: "建築論文およびレポートの作成、編集、並び替えを行うための認証。",
        passwordLabel: "アクセスキー",
        passwordPlaceholder: "パスワードを入力...",
        submitLogin: "管理画面へ入る",
        closeModal: "閉じる",
        errorAuth: "パスワードが正しくありません。正規のキーを入力してください。",
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
