import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Mail } from 'lucide-react';

interface FloatingContactBarProps {
  currentContext?: string; // Contexto de portafolio o página activa
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({ currentContext = 'General' }) => {
  const { t } = useTranslation();

  // WhatsApp oficial con mensaje contextual
  const whatsappNumber = "524770000000"; // Configurable en variables o perfil
  const messageText = encodeURIComponent(
    `Hola Estudio Tectónico, me gustaría agendar una reunión o solicitar información técnica referente a: [${currentContext}].`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${messageText}`;
  
  // Correo con asunto y cuerpo predefinido
  const emailTo = "contacto@estudiotectonico.mx";
  const emailSubject = encodeURIComponent(t('contactBar.defaultSubject'));
  const emailBody = encodeURIComponent(
    `Estimado equipo de Estudio Tectónico,\n\nEstoy interesado en una consulta arquitectónica respecto al portafolio (${currentContext}).\n\nSaludos cordiales.`
  );
  const mailtoUrl = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <aside
      aria-label="Barra de contacto y atención rápida"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center justify-between sm:justify-end gap-3 bg-[#18181c]/95 border border-[#2e2e38] shadow-2xl backdrop-blur-md rounded-2xl px-4 py-2.5 max-w-md"
    >
      <div className="flex flex-col pr-3 border-r border-[#2a2a34] hidden xs:block">
        <span className="text-[11px] font-medium text-white tracking-wide">
          {t('contactBar.title')}
        </span>
        <span className="text-[10px] text-[#9b9ba8]">
          Atención técnica inmediata
        </span>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {/* Botón WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#1f2d24] hover:bg-[#283c30] text-[#4ade80] border border-[#2f4f38] px-3.5 py-2 rounded-xl text-xs font-medium tracking-wider transition-all min-h-[44px]"
          title="Abrir conversación en WhatsApp"
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* Botón Correo */}
        <a
          href={mailtoUrl}
          className="inline-flex items-center justify-center gap-2 bg-[#222228] hover:bg-[#2c2c34] text-white border border-[#343440] px-3.5 py-2 rounded-xl text-xs font-medium tracking-wider transition-all min-h-[44px]"
          title="Enviar correo institucional"
        >
          <Mail className="w-4 h-4 shrink-0 text-[#d4a373]" />
          <span className="hidden sm:inline">Correo</span>
        </a>
      </div>
    </aside>
  );
};
