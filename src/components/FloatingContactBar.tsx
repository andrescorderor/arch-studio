import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Mail } from 'lucide-react';

interface FloatingContactBarProps {
  currentContext?: string;
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({ currentContext = 'General' }) => {
  const { t } = useTranslation();

  const whatsappNumber = "524770000000";
  const messageText = encodeURIComponent(
    `Hola Estudio Tectónico, me gustaría agendar una reunión o solicitar información técnica referente a: [${currentContext}].`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${messageText}`;
  
  const emailTo = "contacto@estudiotectonico.mx";
  const emailSubject = encodeURIComponent(t('contactBar.defaultSubject'));
  const emailBody = encodeURIComponent(
    `Estimado equipo de Estudio Tectónico,\n\nEstoy interesado en una consulta arquitectónica respecto al portafolio (${currentContext}).\n\nSaludos cordiales.`
  );
  const mailtoUrl = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <aside
      aria-label="Barra de contacto y atención rápida"
      style={{ zIndex: 9999 }}
      className="fixed bottom-6 right-6 flex items-center gap-3 bg-[#18181c] border-2 border-[#d4a373]/60 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-2xl px-5 py-3 max-w-lg"
    >
      <div className="flex flex-col pr-4 border-r border-[#2a2a34]">
        <span className="text-xs font-semibold text-white tracking-wide flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></span>
          {t('contactBar.title')}
        </span>
        <span className="text-[10px] text-[#9b9ba8]">
          {t('contactBar.subtitle')}
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Botón WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold px-4 py-2.5 rounded-xl text-xs tracking-wider transition-all min-h-[44px] shadow-lg"
          title="Abrir conversación en WhatsApp"
        >
          <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
          <span>{t('contactBar.whatsappText')}</span>
        </a>

        {/* Botón Correo */}
        <a
          href={mailtoUrl}
          className="inline-flex items-center justify-center gap-2 bg-[#2a2a32] hover:bg-[#343440] text-white border border-[#444452] px-4 py-2.5 rounded-xl text-xs font-medium tracking-wider transition-all min-h-[44px]"
          title="Enviar correo institucional"
        >
          <Mail className="w-4 h-4 shrink-0 text-[#d4a373]" />
          <span>{t('contactBar.emailText')}</span>
        </a>
      </div>
    </aside>
  );
};
