import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MessageCircle } from 'lucide-react';
import { useSiteData } from '../lib/useSiteData';

const inputCls =
  'min-h-12 rounded-xl border border-[#d6d2cb] bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-[#33363b] placeholder:text-[#8c9098] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20';

/** Tarjeta de formulario de contacto visible y ejecutable con Teléfono/Correo, Asunto y Mensaje. */
export function ContactFormCard() {
  const { t } = useTranslation();
  const { settings } = useSiteData();
  const [contact, setContact] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!contact.trim() || !subject.trim() || !message.trim()) {
      setError(t('cta.required'));
      return false;
    }
    setError('');
    return true;
  };

  const sendWhatsapp = () => {
    if (!validate()) return;
    const text = `${t('cta.replyContact')}: ${contact.trim()}\n\n${t('cta.subject')}: ${subject.trim()}\n\n${t('cta.message')}: ${message.trim()}`;
    window.open(
      `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const sendEmail = () => {
    if (!validate()) return;
    const body = `${t('cta.replyContact')}: ${contact.trim()}\n\n${message.trim()}`;
    window.location.href = `mailto:${settings.email}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`;
  };

  const hasChannels = settings.whatsappEnabled || settings.emailEnabled;

  return (
    <form
      aria-label={t('cta.formTitle')}
      onSubmit={(e) => e.preventDefault()}
      className="rounded-2xl border border-[#e6e3de] bg-[#faf9f7] p-5 text-[#33363b] shadow-2xl sm:p-6 md:p-8"
    >
      <h3 className="text-2xl font-medium tracking-tight text-[#33363b] md:text-3xl">
        {t('cta.formTitle')}
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#62666c]">
        {t('cta.formIntro')}
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wide text-[#33363b]">
          <span>{t('cta.replyContact')}</span>
          <input
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={t('cta.replyPlaceholder')}
            className={inputCls}
          />
        </label>

        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wide text-[#33363b]">
          <span>{t('cta.subject')}</span>
          <input
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={t('cta.subjectPlaceholder')}
            className={inputCls}
          />
        </label>

        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wide text-[#33363b] md:col-span-2">
          <span>{t('cta.message')}</span>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('cta.messagePlaceholder')}
            className={`${inputCls} resize-y`}
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-xs font-medium text-rose-700">
          {error}
        </p>
      )}

      {!hasChannels ? (
        <p className="mt-5 text-xs text-[#6b7078]">{t('cta.noChannels')}</p>
      ) : (
        <div className="mt-6 flex flex-wrap gap-3">
          {settings.whatsappEnabled && (
            <button
              type="button"
              onClick={sendWhatsapp}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-xs font-medium uppercase tracking-wide text-white transition-all hover:brightness-110 sm:flex-none"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t('cta.byWhatsapp')}</span>
            </button>
          )}
          {settings.emailEnabled && (
            <button
              type="button"
              onClick={sendEmail}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#33363b] bg-white px-6 py-3 text-xs font-medium uppercase tracking-wide text-[#33363b] transition-colors hover:bg-[#33363b] hover:text-white sm:flex-none"
            >
              <Mail className="h-4 w-4" />
              <span>{t('cta.byEmail')}</span>
            </button>
          )}
        </div>
      )}
    </form>
  );
}
