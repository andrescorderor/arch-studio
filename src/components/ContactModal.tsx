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
      className="fixed inset-0 z-[9998] flex items-end justify-center bg-[#18181b]/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
    >
      <div onClick={(e) => e.stopPropagation()} className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-[#e4e4e7] bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#e4e4e7] px-5 py-4">
          <div>
            <h2 id="cta-title" className="text-base font-medium text-[#18181b]">{t('cta.modalTitle')}</h2>
            <p className="mt-1 text-xs text-[#71717a]">{t('cta.modalText')}</p>
          </div>
          <button onClick={onClose} aria-label={t('nav.close')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#18181b]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('cta.subject')}</span>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="min-h-[44px] w-full rounded-lg border border-[#d4d4d8] bg-[#fafaf9] px-3 text-sm text-[#18181b] focus:border-[#9a6b3b] focus:outline-none" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('cta.message')}</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className="min-h-[140px] w-full resize-y rounded-lg border border-[#d4d4d8] bg-[#fafaf9] p-3 text-sm text-[#18181b] focus:border-[#9a6b3b] focus:outline-none" />
          </label>
        </div>

        <div className="flex shrink-0 flex-col gap-3 border-t border-[#e4e4e7] bg-[#fafaf9] p-4 sm:flex-row sm:justify-end">
          <button onClick={sendEmail} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#d4d4d8] bg-white px-4 text-sm font-medium text-[#18181b] hover:bg-[#f4f4f5]">
            <Mail className="h-4 w-4 text-[#9a6b3b]" /> {t('cta.byEmail')}
          </button>
          <button onClick={sendWhatsapp} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#18181b] px-4 text-sm font-semibold text-white hover:bg-[#27272a]">
            <MessageCircle className="h-4 w-4 text-[#4ade80]" /> {t('cta.byWhatsapp')}
          </button>
        </div>
      </div>
    </div>
  );
}
