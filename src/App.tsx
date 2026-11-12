import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { FloatingContactBar } from './components/FloatingContactBar';
import { AdminModal } from './components/AdminModal';
import {
  INITIAL_PROJECTS,
  INITIAL_BLOGS,
  INITIAL_AWARDS,
} from './data/content';
import type { ArchitecturalProject, BlogPost } from './data/content';
import { ArrowUpRight } from 'lucide-react';
import './i18n';

export function App() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'es');
  const [activeSection, setActiveSection] = useState('home');
  const [selectedPortfolio, setSelectedPortfolio] = useState<'all' | 'residential' | 'commercial' | 'civic'>('all');
  
  // Estado de Contenidos Autónomos
  const [projects] = useState<ArchitecturalProject[]>(INITIAL_PROJECTS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Cambio de Idioma
  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
  };

  // Filtrado de portafolios
  const filteredProjects = selectedPortfolio === 'all'
    ? projects
    : projects.filter((p) => p.portfolioCategory === selectedPortfolio);

  // Navegación por ancla
  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121214] text-[#f4f4f6] selection:bg-[#d4a373] selection:text-[#121214]">
      {/* Barra de Navegación Superior */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenAdminModal={() => setIsAdminOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Hero Section: Enfoque Editorial & Arquitectura de Impacto */}
      <section id="home" className="relative min-h-[85vh] flex flex-col justify-end px-4 sm:px-6 lg:px-12 pb-16 pt-28 border-b border-[#23232b]">
        {/* Fondo con imagen arquitectónica oscurecida */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/60 to-transparent z-0" />

        <div className="relative z-10 max-w-5xl space-y-6">
          <span className="inline-block text-xs font-mono tracking-[0.3em] uppercase text-[#d4a373]">
            Taller de Arquitectura · México
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.08] text-white">
            {t('hero.tagline')}
          </h1>
          <p className="text-sm sm:text-base text-[#9b9ba8] max-w-2xl font-light leading-relaxed">
            Exploramos el equilibrio entre la gravedad constructiva, la eficiencia bioclimática pasiva y la atmósfera de la luz. Diseñado para clientes que demandan rigor técnico y distinción espacial.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => handleNavigate('portfolios')}
              className="inline-flex items-center gap-2 bg-[#f4f4f6] hover:bg-white text-[#121214] px-6 py-3.5 rounded-xl text-xs uppercase font-medium tracking-widest transition-all min-h-[44px]"
            >
              <span>{t('hero.exploreWork')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#1a1a20] hover:bg-[#222228] text-white border border-[#2e2e38] px-6 py-3.5 rounded-xl text-xs uppercase font-medium tracking-widest transition-all min-h-[44px]"
            >
              <span>{t('hero.quickContact')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Sección: Los 3 Portafolios Segmentados */}
      <section id="portfolios" className="py-24 px-4 sm:px-6 lg:px-12 border-b border-[#23232b]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono tracking-widest text-[#d4a373] uppercase">
                {t('portfolios.title')}
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
                Portafolios Segmentados por Mercado
              </h2>
              <p className="text-xs sm:text-sm text-[#9b9ba8]">
                {t('portfolios.subtitle')}
              </p>
            </div>

            {/* Filtro de Pestañas de Portafolio */}
            <div className="flex items-center gap-2 p-1 bg-[#18181c] border border-[#2e2e38] rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'Ver Todo' },
                { id: 'residential', label: '01. Residencial' },
                { id: 'commercial', label: '02. Corporativo' },
                { id: 'civic', label: '03. Paisaje & Ciudad' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPortfolio(tab.id as any)}
                  className={`px-3.5 py-2 rounded-lg text-xs tracking-wider transition-all min-h-[44px] whitespace-nowrap ${
                    selectedPortfolio === tab.id
                      ? 'bg-[#2a2a34] text-white shadow-md'
                      : 'text-[#9b9ba8] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grilla de Proyectos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative bg-[#18181c] border border-[#23232b] rounded-2xl overflow-hidden hover:border-[#3d3d4c] transition-all flex flex-col"
              >
                {/* Imagen con Aspect Ratio Arquitectónico */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#121214]">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-[#121214]/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase font-mono tracking-wider text-[#d4a373] border border-[#2a2a34]">
                    {project.portfolioCategory === 'residential' && 'Portafolio 01'}
                    {project.portfolioCategory === 'commercial' && 'Portafolio 02'}
                    {project.portfolioCategory === 'civic' && 'Portafolio 03'}
                  </div>
                </div>

                {/* Metadatos y Ficha Técnica */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#9b9ba8] font-mono">
                      <span>{project.location}</span>
                      <span>{project.year} · {project.areaM2} m²</span>
                    </div>
                    <h3 className="text-lg font-light text-white group-hover:text-[#d4a373] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#9b9ba8] line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#23232b] flex items-center justify-between text-xs text-[#9b9ba8]">
                    <span className="text-[10px] font-mono">Foto: {project.photographer}</span>
                    <span className="text-[#d4a373] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {t('portfolios.viewProject')} →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sección: Menciones, Publicaciones y Concursos */}
      <section id="awards" className="py-24 px-4 sm:px-6 lg:px-12 border-b border-[#23232b] bg-[#141418]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#d4a373] uppercase">
              {t('awards.title')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              Premios, Bienales & Prensa Internacional
            </h2>
            <p className="text-xs sm:text-sm text-[#9b9ba8]">
              {t('awards.subtitle')}
            </p>
          </div>

          <div className="divide-y divide-[#23232b] border-t border-b border-[#23232b]">
            {INITIAL_AWARDS.map((item, idx) => (
              <div
                key={idx}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-sm font-mono text-[#d4a373] w-12 shrink-0">
                    {item.year}
                  </span>
                  <div>
                    <h4 className="text-base font-light text-white group-hover:text-[#d4a373] transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-xs text-[#9b9ba8]">
                      {item.institution} — Obra: {item.project}
                    </span>
                  </div>
                </div>

                {item.externalUrl && (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#9b9ba8] hover:text-white min-h-[44px] shrink-0"
                  >
                    <span>Ver Publicación</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección: Blog & Cuaderno de Taller */}
      <section id="journal" className="py-24 px-4 sm:px-6 lg:px-12 border-b border-[#23232b]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex items-end justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-widest text-[#d4a373] uppercase">
                {t('blog.title')}
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
                Ensayos Teóricos y Bitácora de Obra
              </h2>
              <p className="text-xs sm:text-sm text-[#9b9ba8]">
                {t('blog.subtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="p-6 bg-[#18181c] border border-[#23232b] rounded-2xl hover:border-[#3d3d4c] transition-all space-y-4"
              >
                <div className="flex items-center justify-between text-xs text-[#9b9ba8] font-mono">
                  <span className="text-[#d4a373]">{post.category}</span>
                  <span>{post.publishedAt}</span>
                </div>
                <h3 className="text-xl font-light text-white hover:text-[#d4a373] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[#9b9ba8] leading-relaxed">
                  {post.excerpt}
                </p>
                <button className="text-xs uppercase tracking-wider text-[#d4a373] inline-flex items-center gap-1 pt-2 min-h-[44px]">
                  <span>{t('blog.readMore')}</span> →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sección: Contacto Directo */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-12 border-b border-[#23232b] bg-[#141418]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-xs font-mono tracking-[0.25em] text-[#d4a373] uppercase">
            Iniciemos una conversación
          </span>
          <h2 className="text-3xl sm:text-5xl font-extralight text-white tracking-tight">
            ¿Preparando una nueva obra o intervención?
          </h2>
          <p className="text-sm text-[#9b9ba8] max-w-xl mx-auto leading-relaxed">
            Atendemos proyectos de escala residencial, corporativa y pública en todo México. Agenda una llamada de diagnóstico o envíanos un mensaje directo.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="mailto:contacto@estudiotectonico.mx"
              className="bg-[#d4a373] hover:bg-[#c29263] text-[#121214] font-medium px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all min-h-[44px] inline-flex items-center justify-center"
            >
              contacto@estudiotectonico.mx
            </a>
            <a
              href="https://wa.me/524770000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1f2d24] hover:bg-[#283c30] text-[#4ade80] border border-[#2f4f38] px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all min-h-[44px] inline-flex items-center justify-center"
            >
              WhatsApp Directo
            </a>
          </div>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="py-12 px-4 sm:px-6 lg:px-12 text-center text-xs text-[#6e6e7a] border-t border-[#1e1e24]">
        <p>© 2026 Estudio Tectónico. Todos los derechos reservados. Desarrollado bajo estándares de arquitectura y sostenibilidad.</p>
      </footer>

      {/* Barra de Contacto Flotante Ubicua */}
      <FloatingContactBar currentContext={selectedPortfolio} />

      {/* Modal de Administración de Blogs */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        posts={blogs}
        onSavePost={(saved) => {
          setBlogs((prev) => {
            const exists = prev.find((p) => p.id === saved.id);
            if (exists) {
              return prev.map((p) => (p.id === saved.id ? saved : p));
            }
            return [saved, ...prev];
          });
        }}
        onDeletePost={(id) => {
          setBlogs((prev) => prev.filter((p) => p.id !== id));
        }}
        onReorderPosts={(reordered) => setBlogs(reordered)}
      />
    </div>
  );
}

export default App;
