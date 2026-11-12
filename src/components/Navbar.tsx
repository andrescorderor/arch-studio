import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface NavbarProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  onOpenAdminModal: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenAdminModal,
  activeSection,
  onNavigate,
}) => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#121214]/85 border-b border-[#23232b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logotipo del Estudio */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left group flex flex-col justify-center focus:outline-none"
        >
          <span className="text-lg sm:text-xl font-light tracking-[0.25em] uppercase text-white group-hover:text-[#d4a373] transition-colors">
            ESTUDIO TECTÓNICO
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9b9ba8]">
            Arquitectura & Ciudad
          </span>
        </button>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest text-[#9b9ba8]">
          <button
            onClick={() => onNavigate('portfolios')}
            className={`hover:text-white transition-colors min-h-[44px] flex items-center ${activeSection === 'portfolios' ? 'text-white border-b border-[#d4a373]' : ''}`}
          >
            {t('nav.portfolios')}
          </button>
          <button
            onClick={() => onNavigate('awards')}
            className={`hover:text-white transition-colors min-h-[44px] flex items-center ${activeSection === 'awards' ? 'text-white border-b border-[#d4a373]' : ''}`}
          >
            {t('nav.awards')}
          </button>
          <button
            onClick={() => onNavigate('journal')}
            className={`hover:text-white transition-colors min-h-[44px] flex items-center ${activeSection === 'journal' ? 'text-white border-b border-[#d4a373]' : ''}`}
          >
            {t('nav.journal')}
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`hover:text-white transition-colors min-h-[44px] flex items-center ${activeSection === 'contact' ? 'text-white border-b border-[#d4a373]' : ''}`}
          >
            {t('nav.contact')}
          </button>
        </nav>

        {/* Selector de Idioma & Acceso Admin */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-[#1a1a20] rounded-md border border-[#2e2e38] p-1">
            <Globe className="w-3.5 h-3.5 text-[#9b9ba8] ml-2 mr-1" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-transparent text-xs text-[#d4a373] font-mono tracking-wider focus:outline-none min-h-[38px] px-2"
              aria-label="Seleccionar idioma"
            >
              <option value="es" className="bg-[#18181c] text-white">ES</option>
              <option value="en" className="bg-[#18181c] text-white">EN</option>
              <option value="ja" className="bg-[#18181c] text-white">JA (日本語)</option>
            </select>
          </div>

          <button
            onClick={onOpenAdminModal}
            className="hidden sm:inline-flex items-center text-[11px] tracking-wider uppercase text-[#9b9ba8] hover:text-white px-3 py-2 rounded border border-[#2e2e38] hover:border-[#444452] transition-colors min-h-[44px]"
            title="Panel de redacción para arquitectos"
          >
            {t('nav.adminLogin')}
          </button>
        </div>
      </div>
    </header>
  );
};
