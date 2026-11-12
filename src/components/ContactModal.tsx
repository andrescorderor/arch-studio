import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MessageCircle, X } from 'lucide-react';
import { SITE } from '../config/site';
import { useToast } from '../context/ToastContext';

interface Props { isOpen: boolean; context?: string; onClose: () => void }

export function ContactModal({ isOpen, context, onClose }: Props) {
  const { t, i18n } = useTranslation();
  const toast = useToast();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setSubject(context ? t('cta.contextSubject', { context }) : t('cta.defaultSubject'));
    setMessage(context ? t('cta.contextBody', { context }) : t('cta.defaultBody'));
  }, [isOpen, context, i18n.language, t]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const valid = () => {
    if (!subject.trim() || !message.trim()) { toast.error(t('cta.required')); return false; }
    return true;
  };

  const sendEmail = () => {
    if (!valid()) return;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    toast.info(t('cta.opened'));
    onClose();
  };
  const sendWhatsapp = () => {
    if (!valid()) return;
    const text = `${subject}\n\n${message}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    toast.info(t('cta.opened'));
    onClose();
  };

  return (
    <div
      role="dialog" aria-modal="true" aria-labelledby="cta-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-[9998] flex items-end justify-center bg-[#0e0e10]/70 p-0 backdrop-blur-md sm:items-center sm:p-4"
    >
      <div onClick={(e) => e.stopPropagation()} className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-[#2e2e38] bg-[#18181c] shadow-2xl sm:rounded-2xl">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#2a2a34] px-5 py-4">
          <div>
            <h2 id="cta-title" className="text-base font-medium text-white">{t('cta.modalTitle')}</h2>
            <p className="mt-1 text-xs text-[#9b9ba8]">{t('cta.modalText')}</p>
          </div>
          <button onClick={onClose} aria-label={t('nav.close')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#9b9ba8] hover:bg-[#222228] hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wider text-[#9b9ba8]">{t('cta.subject')}</span>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="min-h-[44px] w-full rounded-lg border border-[#2e2e38] bg-[#121214] px-3 text-sm text-white focus:border-[#d4a373] focus:outline-none" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wider text-[#9b9ba8]">{t('cta.message')}</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className="min-h-[140px] w-full resize-y rounded-lg border border-[#2e2e38] bg-[#121214] p-3 text-sm text-white focus:border-[#d4a373] focus:outline-none" />
          </label>
        </div>

        <div className="flex shrink-0 flex-col gap-3 border-t border-[#2a2a34] bg-[#141418] p-4 sm:flex-row sm:justify-end">
          <button onClick={sendEmail} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#444452] bg-[#2a2a32] px-4 text-sm font-medium text-white hover:bg-[#343440]">
            <Mail className="h-4 w-4 text-[#d4a373]" /> {t('cta.byEmail')}
          </button>
          <button onClick={sendWhatsapp} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#d4a373] px-4 text-sm font-semibold text-[#121214] hover:bg-[#c29263]">
            <MessageCircle className="h-4 w-4" /> {t('cta.byWhatsapp')}
          </button>
        </div>
      </div>
    </div>
  );
}
