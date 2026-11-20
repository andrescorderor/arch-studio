import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MessageCircle, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useSiteData } from '../lib/useSiteData';

interface Props {
  isOpen: boolean;
  context?: string;
  onClose: () => void;
}

const inputCls =
  'min-h-12 w-full rounded-xl border border-[#d6d2cb] bg-white px-4 py-3 text-sm text-[#33363b] placeholder:text-[#8c9098] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20';

export function ContactModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();
  const toast = useToast();
  const { settings } = useSiteData();
  const [replyContact, setReplyContact] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const valid = () => {
    if (!replyContact.trim() || !subject.trim() || !message.trim()) {
      toast.error(t('cta.required'));
      return false;
    }
    return true;
  };

  const sendEmail = () => {
    if (!valid()) return;
    const body = `${t('cta.replyContact')}: ${replyContact.trim()}\n\n${message.trim()}`;
    window.location.href = `mailto:${settings.email}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`;
    toast.info(t('cta.opened'));
    onClose();
  };

  const sendWhatsapp = () => {
    if (!valid()) return;
    const text = `${t('cta.replyContact')}: ${replyContact.trim()}\n\n${t('cta.subject')}: ${subject.trim()}\n\n${t('cta.message')}: ${message.trim()}`;
    window.open(
      `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
    toast.info(t('cta.opened'));
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cta-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9998] flex items-end justify-center bg-[#33363b]/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-[#e6e3de] bg-[#faf9f7] text-[#33363b] shadow-2xl sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#e6e3de] px-5 py-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[.2em] text-[var(--primary)]">
              Medelsa · León, Guanajuato
            </p>
            <h2 id="cta-title" className="mt-1 text-xl font-medium text-[#33363b]">
              {t('cta.modalTitle')}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label={t('nav.close')}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[#e6e3de] bg-white text-[#6b7078] hover:text-[#33363b]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#33363b]">
              {t('cta.replyContact')}
            </span>
            <input
              value={replyContact}
              onChange={(e) => setReplyContact(e.target.value)}
              placeholder={t('cta.replyPlaceholder')}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#33363b]">
              {t('cta.subject')}
            </span>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t('cta.subjectPlaceholder')}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#33363b]">
              {t('cta.message')}
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('cta.messagePlaceholder')}
              rows={5}
              className={`${inputCls} resize-y`}
            />
          </label>
        </div>

        <div className="flex shrink-0 flex-col gap-2.5 border-t border-[#e6e3de] bg-white p-4 sm:flex-row sm:justify-end">
          {settings.emailEnabled && (
            <button
              onClick={sendEmail}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#33363b] bg-white px-5 text-xs font-medium uppercase tracking-wide text-[#33363b] transition-colors hover:bg-[#33363b] hover:text-white"
            >
              <Mail className="h-4 w-4" /> {t('cta.byEmail')}
            </button>
          )}
          {settings.whatsappEnabled && (
            <button
              onClick={sendWhatsapp}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-5 text-xs font-medium uppercase tracking-wide text-white transition-all hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" /> {t('cta.byWhatsapp')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
