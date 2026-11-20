import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowUp, ImagePlus, LogOut, Pencil, Plus, Trash2, X } from 'lucide-react';
import { Seo } from '../components/Seo';
import { RichTextEditor } from '../components/RichTextEditor';
import { BlogLoader } from '../components/BlogLoader';
import { SafeImage } from '../components/SafeImage';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { compressImageToDataUrl } from '../lib/imageUtils';
import {
  deleteBlog, getAllBlogs, reorderBlogs, saveBlog,
  deletePortfolio, getAllPortfolios, reorderPortfolios, savePortfolio,
  deleteProject, getAllProjects, reorderProjects, saveProject,
  saveSiteSettings,
} from '../lib/blogsService';
import {
  ACCENT_PRESETS,
  INITIAL_BLOGS,
  INITIAL_PORTFOLIOS,
  INITIAL_PROJECTS,
  loc,
  normalizePortfolioId,
} from '../data/content';
import type {
  ArchitecturalProject,
  BlogPost,
  MentionCategory,
  PortfolioItem,
  PortfolioLayout,
  SiteSettings,
} from '../data/content';
import { useSiteData } from '../lib/useSiteData';
import { LANGS } from '../config/site';
import type { Lang } from '../config/site';

type AdminTab = 'blogs' | 'portfolios' | 'projects' | 'settings';

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const emptyL = () => ({ es: '', en: '', ja: '' });

const emptyBlog = (n: number): BlogPost => ({
  id: crypto.randomUUID(), slug: '', orderIndex: n, coverImage: '',
  publishedAt: new Date().toISOString().slice(0, 10),
  title: emptyL(), excerpt: emptyL(), contentHtml: emptyL(),
});

const emptyPortfolio = (n: number): PortfolioItem => ({
  id: '', orderIndex: n, accent: '#3d5a47', layoutStyle: 'editorial',
  tag: emptyL(), name: emptyL(), desc: emptyL(), client: emptyL(), coverImage: '',
});

const emptyProject = (n: number, defaultPid: string): ArchitecturalProject => ({
  id: '', portfolio: defaultPid, orderIndex: n, year: new Date().getFullYear(), areaM2: 0,
  title: emptyL(), location: emptyL(), summary: emptyL(), materials: emptyL(), coverImage: '', gallery: [],
});

const inputCls = 'min-h-[44px] w-full rounded-xl border border-[#d6d2cb] bg-white px-3.5 text-sm text-[#33363b] focus:border-[var(--primary)] focus:outline-none';
const textCls = 'min-h-[90px] w-full resize-y rounded-xl border border-[#d6d2cb] bg-white p-3.5 text-sm text-[#33363b] focus:border-[var(--primary)] focus:outline-none';

function LangTabs({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const { t } = useTranslation();
  return (
    <div role="tablist" aria-label={t('admin.langTab')} className="flex gap-2">
      {LANGS.map((l) => (
        <button key={l} type="button" role="tab" aria-selected={lang === l} onClick={() => setLang(l)}
          className={`min-h-[44px] rounded-full border px-4 text-xs uppercase tracking-wider transition-colors ${lang === l ? 'border-[var(--primary)] bg-[var(--primary)] font-semibold text-white' : 'border-[#d6d2cb] bg-white text-[#6b7078] hover:text-[#33363b]'}`}>
          {l === 'ja' ? '日本語' : l}
        </button>
      ))}
    </div>
  );
}

function ImageUploadField({ label, value, onChange }: { label?: string; value: string; onChange: (dataUrl: string) => void }) {
  const { t } = useTranslation();
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const compressed = await compressImageToDataUrl(file);
      onChange(compressed);
    } catch (err) {
      const msg = (err as Error).message;
      toast.error(msg === 'IMAGE_TOO_LARGE' ? t('admin.errImageLarge') : t('admin.errImageType'));
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <span className="block text-xs font-medium uppercase tracking-wider text-[#6b7078]">{label || t('admin.fCoverUpload')}</span>
      <div className="flex flex-wrap items-center gap-4">
        {value && (
          <div className="h-20 w-32 overflow-hidden rounded-xl border border-[#e6e3de] bg-[#f2f0ec]">
            <SafeImage alt="" src={value} className="h-full w-full object-cover" />
          </div>
        )}
        <label className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#d6d2cb] bg-white px-4 text-xs font-medium text-[#33363b] transition-colors hover:border-[var(--primary)]">
          <ImagePlus className="h-4 w-4 text-[var(--primary)]" />
          <span>{busy ? t('admin.uploadCompressing') : value ? t('admin.uploadReplace') : t('admin.uploadChoose')}</span>
          <input type="file" accept="image/*" onChange={handleFile} disabled={busy} className="sr-only" />
        </label>
      </div>
      <p className="text-[11px] text-[#6b7078]">{t('admin.uploadHint')}</p>
    </div>
  );
}

function ModalShell({ title, onClose, onSave, saving, children }: { title: string; onClose: () => void; onSave: () => void; saving: boolean; children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <div role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#33363b]/60 p-0 backdrop-blur-sm sm:p-4">
      <div onClick={(e) => e.stopPropagation()} className="flex h-full max-h-[100vh] w-full max-w-3xl flex-col overflow-hidden border border-[#e6e3de] bg-[#faf9f7] shadow-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-[#e6e3de] bg-white px-5 py-3.5">
          <h2 className="text-base font-medium text-[#33363b]">{title}</h2>
          <button onClick={onClose} aria-label={t('nav.close')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[#6b7078] hover:bg-[#f2f0ec] hover:text-[#33363b]"><X className="h-5 w-5" /></button>
        </div>
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5">{children}</div>
        <div className="flex shrink-0 justify-between gap-3 border-t border-[#e6e3de] bg-white p-4">
          <button onClick={onClose} className="min-h-[44px] rounded-full border border-[#d6d2cb] bg-white px-5 text-xs font-medium text-[#6b7078] hover:text-[#33363b]">{t('admin.cancel')}</button>
          <button onClick={onSave} disabled={saving} className="min-h-[44px] rounded-full bg-[#33363b] px-6 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-[var(--primary)] disabled:opacity-60">{saving ? t('admin.saving') : t('admin.save')}</button>
        </div>
      </div>
    </div>
  );
}

/** Login limpio: sin la frase "El despacho, en tus manos." */
function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError('');
    try { await login(email.trim(), password); }
    catch (err) {
      const code = (err as { code?: string }).code ?? '';
      setError(code.includes('too-many') ? t('admin.errTooMany') : code.includes('invalid') || code.includes('user-not-found') || code.includes('wrong-password') ? t('admin.errInvalid') : t('admin.errGeneric'));
    } finally { setBusy(false); }
  };

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md items-center px-5 py-24">
      <form onSubmit={submit} className="w-full space-y-5 rounded-2xl border border-[#e6e3de] bg-[#faf9f7] p-8 shadow-sm">
        <div>
          <p className="text-2xl font-medium tracking-[-.06em] text-[#33363b]">Medelsa<span className="text-[var(--primary)]">.</span></p>
          <h1 className="mt-3 text-xl font-medium text-[#33363b]">{t('admin.loginTitle')}</h1>
          <p className="mt-1 text-xs text-[#6b7078]">{t('admin.loginText')}</p>
        </div>
        <label className="block"><span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#33363b]">{t('admin.email')}</span>
          <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></label>
        <label className="block"><span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#33363b]">{t('admin.password')}</span>
          <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} /></label>
        {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">{error}</p>}
        <button disabled={busy} className="min-h-12 w-full rounded-full bg-[#33363b] text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-[var(--primary)] disabled:opacity-60">{busy ? t('admin.signingIn') : t('admin.submit')}</button>
      </form>
    </div>
  );
}

function BlogEditor({ initial, isNew, onClose, onSaved }: { initial: BlogPost; isNew: boolean; onClose: () => void; onSaved: () => void }) {
  const { t } = useTranslation();
  const toast = useToast();
  const [post, setPost] = useState<BlogPost>(initial);
  const [lang, setLang] = useState<Lang>('es');
  const [saving, setSaving] = useState(false);
  const setL = (k: 'title' | 'excerpt' | 'contentHtml', v: string) => setPost((p) => ({ ...p, [k]: { ...p[k], [lang]: v } }));

  const save = async () => {
    if (!post.title.es.trim()) { toast.error(t('admin.errTitle')); setLang('es'); return; }
    setSaving(true);
    const toSave: BlogPost = { ...post, slug: post.slug.trim() || slugify(post.title.es) };
    try { await saveBlog(toSave); toast.success(t('admin.saved')); onSaved(); }
    catch { toast.error(t('admin.errSave')); }
    finally { setSaving(false); }
  };

  return (
    <ModalShell title={isNew ? t('admin.editorNew') : t('admin.editorEdit')} onClose={onClose} onSave={save} saving={saving}>
      <LangTabs lang={lang} setLang={setLang} />
      <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fTitle')}</span><input className={inputCls} value={post.title[lang]} onChange={(e) => setL('title', e.target.value)} /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fDate')}</span><input type="date" className={inputCls} value={post.publishedAt} onChange={(e) => setPost({ ...post, publishedAt: e.target.value })} /></label>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fSlug')}</span><input className={inputCls} value={post.slug} placeholder={slugify(post.title.es)} onChange={(e) => setPost({ ...post, slug: slugify(e.target.value) })} /></label>
      </div>
      <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fExcerpt')}</span><textarea rows={2} className={textCls} value={post.excerpt[lang]} onChange={(e) => setL('excerpt', e.target.value)} /></label>
      <ImageUploadField value={post.coverImage} onChange={(v) => setPost({ ...post, coverImage: v })} />
      <div>
        <span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fContent')}</span>
        <RichTextEditor key={lang} value={post.contentHtml[lang]} onChange={(h) => setL('contentHtml', h)} />
      </div>
    </ModalShell>
  );
}

function PortfolioEditor({ initial, isNew, onClose, onSaved }: { initial: PortfolioItem; isNew: boolean; onClose: () => void; onSaved: () => void }) {
  const { t } = useTranslation();
  const toast = useToast();
  const [item, setItem] = useState<PortfolioItem>(initial);
  const [lang, setLang] = useState<Lang>('es');
  const [saving, setSaving] = useState(false);
  const setL = (k: 'tag' | 'name' | 'desc' | 'client', v: string) => setItem((p) => ({ ...p, [k]: { ...p[k], [lang]: v } }));

  const save = async () => {
    if (!item.name.es.trim()) { toast.error(t('admin.errTitle')); setLang('es'); return; }
    setSaving(true);
    const toSave: PortfolioItem = { ...item, id: normalizePortfolioId(item.id.trim() || slugify(item.name.es)) };
    try { await savePortfolio(toSave); toast.success(t('admin.saved')); onSaved(); }
    catch { toast.error(t('admin.errSave')); }
    finally { setSaving(false); }
  };

  return (
    <ModalShell title={isNew ? t('admin.portfolioNew') : t('admin.portfolioEdit')} onClose={onClose} onSave={save} saving={saving}>
      <LangTabs lang={lang} setLang={setLang} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fName')}</span><input className={inputCls} value={item.name[lang]} onChange={(e) => setL('name', e.target.value)} /></label>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fTag')}</span><input className={inputCls} value={item.tag[lang]} onChange={(e) => setL('tag', e.target.value)} /></label>
      </div>
      <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fClient')}</span><input className={inputCls} value={item.client[lang]} onChange={(e) => setL('client', e.target.value)} /></label>
      <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fDesc')}</span><textarea rows={2} className={textCls} value={item.desc[lang]} onChange={(e) => setL('desc', e.target.value)} /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fLayout')}</span>
          <select className={inputCls} value={item.layoutStyle} onChange={(e) => setItem({ ...item, layoutStyle: e.target.value as PortfolioLayout })}>
            <option value="editorial">{t('admin.layouts.editorial')}</option>
            <option value="technical">{t('admin.layouts.technical')}</option>
            <option value="organic">{t('admin.layouts.organic')}</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fAccent')}</span>
          <input type="color" className="min-h-[44px] w-full rounded-xl border border-[#d6d2cb] bg-white p-1" value={item.accent} onChange={(e) => setItem({ ...item, accent: e.target.value })} />
        </label>
      </div>
      <ImageUploadField value={item.coverImage} onChange={(v) => setItem({ ...item, coverImage: v })} />
    </ModalShell>
  );
}

function ProjectEditor({ initial, isNew, portfolios, onClose, onSaved }: { initial: ArchitecturalProject; isNew: boolean; portfolios: PortfolioItem[]; onClose: () => void; onSaved: () => void }) {
  const { t } = useTranslation();
  const toast = useToast();
  const [proj, setProj] = useState<ArchitecturalProject>(initial);
  const [lang, setLang] = useState<Lang>('es');
  const [saving, setSaving] = useState(false);
  const setL = (k: 'title' | 'location' | 'summary' | 'materials', v: string) => setProj((p) => ({ ...p, [k]: { ...p[k], [lang]: v } }));

  const save = async () => {
    if (!proj.title.es.trim()) { toast.error(t('admin.errTitle')); setLang('es'); return; }
    setSaving(true);
    const id = proj.id.trim() || slugify(proj.title.es);
    const toSave: ArchitecturalProject = { ...proj, id, portfolio: normalizePortfolioId(proj.portfolio), gallery: proj.coverImage ? [proj.coverImage] : proj.gallery };
    try { await saveProject(toSave); toast.success(t('admin.saved')); onSaved(); }
    catch { toast.error(t('admin.errSave')); }
    finally { setSaving(false); }
  };

  return (
    <ModalShell title={isNew ? t('admin.projectNew') : t('admin.projectEdit')} onClose={onClose} onSave={save} saving={saving}>
      <LangTabs lang={lang} setLang={setLang} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fPortfolio')}</span>
          <select className={inputCls} value={normalizePortfolioId(proj.portfolio)} onChange={(e) => setProj({ ...proj, portfolio: e.target.value })}>
            {portfolios.map((pf) => (<option key={pf.id} value={normalizePortfolioId(pf.id)}>{loc(pf.name, lang) || pf.name.es}</option>))}
          </select>
        </label>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fTitle')}</span><input className={inputCls} value={proj.title[lang]} onChange={(e) => setL('title', e.target.value)} /></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fLocation')}</span><input className={inputCls} value={proj.location[lang]} onChange={(e) => setL('location', e.target.value)} /></label>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fYear')}</span><input type="number" className={inputCls} value={proj.year} onChange={(e) => setProj({ ...proj, year: Number(e.target.value) })} /></label>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fArea')}</span><input type="number" className={inputCls} value={proj.areaM2} onChange={(e) => setProj({ ...proj, areaM2: Number(e.target.value) })} /></label>
      </div>
      <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fMaterials')}</span><input className={inputCls} value={proj.materials[lang]} onChange={(e) => setL('materials', e.target.value)} /></label>
      <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">{t('admin.fSummary')}</span><textarea rows={3} className={textCls} value={proj.summary[lang]} onChange={(e) => setL('summary', e.target.value)} /></label>
      <ImageUploadField value={proj.coverImage} onChange={(v) => setProj({ ...proj, coverImage: v })} />
    </ModalShell>
  );
}

function SiteSettingsTab() {
  const { t } = useTranslation();
  const toast = useToast();
  const { settings, updateLocalSettings, refresh } = useSiteData();
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [editLang, setEditLang] = useState<Lang>('es');
  const [saving, setSaving] = useState(false);

  useEffect(() => { setDraft(settings); }, [settings]);

  const setField = <K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) => {
    const next = { ...draft, [k]: v };
    setDraft(next);
    if (k === 'accentColor') updateLocalSettings(next);
  };

  const handleSave = async () => {
    setSaving(true);
    const cleaned: SiteSettings = { ...draft, id: 'site', whatsapp: draft.whatsapp.replace(/\D/g, '') };
    updateLocalSettings(cleaned);
    try {
      await saveSiteSettings(cleaned);
      await refresh();
      toast.success(t('admin.saved'));
    } catch {
      toast.info(t('admin.savedLocal'));
    } finally {
      setSaving(false);
    }
  };

  const addMention = () => {
    setField('mentions', [...draft.mentions, { id: crypto.randomUUID(), type: 'Premios', title: '', source: '', year: String(new Date().getFullYear()), href: '' }]);
  };

  const updateMention = (idx: number, patch: Partial<SiteSettings['mentions'][number]>) => {
    const next = [...draft.mentions];
    next[idx] = { ...next[idx], ...patch };
    setField('mentions', next);
  };

  const removeMention = (idx: number) => {
    setField('mentions', draft.mentions.filter((_, i) => i !== idx));
  };

  return (
    <section className="space-y-10 rounded-2xl border border-[#e6e3de] bg-[#faf9f7] p-6 md:p-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[.2em] text-[var(--primary)]">Identidad, canales y contenido institucional</p>
        <h2 className="mt-2 text-2xl font-medium text-[#33363b]">{t('admin.tabs.settings')}</h2>
      </div>

      <div className="space-y-3 border-t border-[#e6e3de] pt-6">
        <span className="block text-xs font-medium uppercase tracking-wider text-[#33363b]">Color de acento del sitio</span>
        <div className="flex flex-wrap items-center gap-3">
          {ACCENT_PRESETS.map((p) => {
            const active = draft.accentColor.toLowerCase() === p.color.toLowerCase();
            return (
              <button key={p.color} type="button" onClick={() => setField('accentColor', p.color)}
                className={`inline-flex min-h-11 items-center gap-2.5 rounded-full border px-4 text-xs font-medium transition-all ${active ? 'border-[#33363b] bg-white text-[#33363b] shadow-sm' : 'border-[#d6d2cb] bg-white/60 text-[#6b7078] hover:text-[#33363b]'}`}>
                <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: p.color }} />
                <span>{p.label}</span>
              </button>
            );
          })}
          <label className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d6d2cb] bg-white px-3 text-xs text-[#6b7078]">
            <span>Personalizado</span>
            <input type="color" value={draft.accentColor} onChange={(e) => setField('accentColor', e.target.value)} className="h-6 w-8 border-0 bg-transparent p-0" />
          </label>
        </div>
      </div>

      <div className="space-y-5 border-t border-[#e6e3de] pt-6">
        <span className="block text-xs font-medium uppercase tracking-wider text-[#33363b]">Canales de recepción de consultas</span>
        <div className="flex flex-wrap gap-6">
          <label className="inline-flex min-h-11 items-center gap-2.5 text-sm text-[#33363b]">
            <input type="checkbox" checked={draft.whatsappEnabled} onChange={(e) => setField('whatsappEnabled', e.target.checked)} className="h-4 w-4 accent-[var(--primary)]" />
            <span>Recibir consultas por WhatsApp</span>
          </label>
          <label className="inline-flex min-h-11 items-center gap-2.5 text-sm text-[#33363b]">
            <input type="checkbox" checked={draft.emailEnabled} onChange={(e) => setField('emailEnabled', e.target.checked)} className="h-4 w-4 accent-[var(--primary)]" />
            <span>Recibir consultas por Correo electrónico</span>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">WhatsApp receptor</span><input className={inputCls} value={draft.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} /></label>
          <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">Correo destino</span><input type="email" className={inputCls} value={draft.email} onChange={(e) => setField('email', e.target.value)} /></label>
          <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">Teléfono público</span><input className={inputCls} value={draft.phone} onChange={(e) => setField('phone', e.target.value)} /></label>
          <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">Ubicación</span><input className={inputCls} value={draft.location} onChange={(e) => setField('location', e.target.value)} /></label>
        </div>
      </div>

      <div className="space-y-4 border-t border-[#e6e3de] pt-6">
        <span className="block text-xs font-medium uppercase tracking-wider text-[#33363b]">Sección Nosotros</span>
        <ImageUploadField label="Imagen principal (Hero) de Nosotros" value={draft.aboutImage} onChange={(v) => setField('aboutImage', v)} />
        <LangTabs lang={editLang} setLang={setEditLang} />
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wider text-[#6b7078]">Semblanza de Nosotros ({editLang.toUpperCase()} — separa párrafos con línea en blanco)</span>
          <textarea rows={6} className={textCls} value={draft.aboutText[editLang]} onChange={(e) => setField('aboutText', { ...draft.aboutText, [editLang]: e.target.value })} />
        </label>
      </div>

      <div className="space-y-4 border-t border-[#e6e3de] pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-[#33363b]">Menciones, premios y publicaciones</span>
          <button type="button" onClick={addMention} className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[#d6d2cb] bg-white px-4 text-xs font-medium uppercase tracking-wider text-[#33363b] hover:border-[var(--primary)]">
            <Plus className="h-3.5 w-3.5 text-[var(--primary)]" /> Agregar ítem
          </button>
        </div>

        <div className="divide-y divide-[#e6e3de] border-y border-[#e6e3de]">
          {draft.mentions.map((m, idx) => (
            <div key={m.id} className="grid gap-3 py-4 sm:grid-cols-2 lg:grid-cols-[130px_1.5fr_1.2fr_90px_1fr_auto]">
              <select value={m.type} onChange={(e) => updateMention(idx, { type: e.target.value as MentionCategory })} className={inputCls}>
                <option value="Premios">Premios</option>
                <option value="Publicaciones">Publicaciones</option>
                <option value="Concursos">Concursos</option>
              </select>
              <input placeholder="Título del reconocimiento" value={m.title} onChange={(e) => updateMention(idx, { title: e.target.value })} className={inputCls} />
              <input placeholder="Institución o medio" value={m.source} onChange={(e) => updateMention(idx, { source: e.target.value })} className={inputCls} />
              <input placeholder="Año" value={m.year} onChange={(e) => updateMention(idx, { year: e.target.value })} className={inputCls} />
              <input placeholder="Enlace (opcional)" value={m.href || ''} onChange={(e) => updateMention(idx, { href: e.target.value })} className={inputCls} />
              <button type="button" aria-label={t('admin.delete')} onClick={() => removeMention(idx)} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button type="button" onClick={() => void handleSave()} disabled={saving} className="min-h-12 rounded-full bg-[#33363b] px-7 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-[var(--primary)] disabled:opacity-60">
          {saving ? t('admin.saving') : 'Guardar configuración'}
        </button>
      </div>
    </section>
  );
}

function Dashboard() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const toast = useToast();
  const { logout, user } = useAuth();
  const { refresh } = useSiteData();
  const [tab, setTab] = useState<AdminTab>('blogs');
  const [loading, setLoading] = useState(true);

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [projects, setProjects] = useState<ArchitecturalProject[]>([]);

  const [editBlog, setEditBlog] = useState<{ item: BlogPost; isNew: boolean } | null>(null);
  const [editPortfolio, setEditPortfolio] = useState<{ item: PortfolioItem; isNew: boolean } | null>(null);
  const [editProject, setEditProject] = useState<{ item: ArchitecturalProject; isNew: boolean } | null>(null);
  const [toDelete, setToDelete] = useState<{ type: 'blogs' | 'portfolios' | 'projects'; id: string; title: string; backup: BlogPost | PortfolioItem | ArchitecturalProject } | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [b, pf, pr] = await Promise.all([getAllBlogs(), getAllPortfolios(), getAllProjects()]);
      setBlogs(b.length ? b : INITIAL_BLOGS);
      setPortfolios(pf.length ? pf : INITIAL_PORTFOLIOS);
      setProjects(pr.length ? pr : INITIAL_PROJECTS);
      await refresh();
    } catch {
      setBlogs(INITIAL_BLOGS);
      setPortfolios(INITIAL_PORTFOLIOS);
      setProjects(INITIAL_PROJECTS);
    } finally { setLoading(false); }
  }, [refresh]);

  useEffect(() => { void loadAll(); }, [loadAll]);

  const moveItem = async (type: 'blogs' | 'portfolios' | 'projects', i: number, d: -1 | 1) => {
    try {
      if (type === 'blogs') {
        const j = i + d; if (j < 0 || j >= blogs.length) return;
        const next = [...blogs]; [next[i], next[j]] = [next[j], next[i]];
        setBlogs(next); await reorderBlogs(next);
      } else if (type === 'portfolios') {
        const j = i + d; if (j < 0 || j >= portfolios.length) return;
        const next = [...portfolios]; [next[i], next[j]] = [next[j], next[i]];
        setPortfolios(next); await reorderPortfolios(next);
      } else {
        const j = i + d; if (j < 0 || j >= projects.length) return;
        const next = [...projects]; [next[i], next[j]] = [next[j], next[i]];
        setProjects(next); await reorderProjects(next);
      }
      await refresh();
      toast.success(t('admin.reordered'));
    } catch { toast.error(t('admin.errSave')); }
  };

  const confirmDelete = async () => {
    const target = toDelete; setToDelete(null);
    if (!target) return;
    try {
      if (target.type === 'blogs') {
        await deleteBlog(target.id);
        setBlogs((prev) => prev.filter((x) => x.id !== target.id));
        toast.undoable(t('admin.deleted'), t('admin.undo'), async () => { await saveBlog(target.backup as BlogPost); await loadAll(); toast.success(t('admin.restored')); });
      } else if (target.type === 'portfolios') {
        await deletePortfolio(target.id);
        setPortfolios((prev) => prev.filter((x) => x.id !== target.id));
        toast.undoable(t('admin.deleted'), t('admin.undo'), async () => { await savePortfolio(target.backup as PortfolioItem); await loadAll(); toast.success(t('admin.restored')); });
      } else {
        await deleteProject(target.id);
        setProjects((prev) => prev.filter((x) => x.id !== target.id));
        toast.undoable(t('admin.deleted'), t('admin.undo'), async () => { await saveProject(target.backup as ArchitecturalProject); await loadAll(); toast.success(t('admin.restored')); });
      }
      await refresh();
    } catch { toast.error(t('admin.errSave')); }
  };

  const seedCurrentTab = async () => {
    try {
      if (tab === 'blogs') { for (const b of INITIAL_BLOGS) await saveBlog(b); }
      else if (tab === 'portfolios') { for (const p of INITIAL_PORTFOLIOS) await savePortfolio(p); }
      else if (tab === 'projects') {
        if (portfolios.length === 0) { for (const pf of INITIAL_PORTFOLIOS) await savePortfolio(pf); }
        for (const pr of INITIAL_PROJECTS) await saveProject(pr);
      }
      await loadAll();
      toast.success(t('admin.saved'));
    } catch { toast.error(t('admin.errSave')); }
  };

  const availablePortfolios = portfolios.length > 0 ? portfolios : INITIAL_PORTFOLIOS;
  const activeList = tab === 'blogs' ? blogs : tab === 'portfolios' ? portfolios : projects;

  return (
    <div className="mx-auto max-w-5xl px-5 pb-28 pt-32 sm:px-7 md:pt-40">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#e6e3de] pb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[.2em] text-[var(--primary)]">Medelsa. · CMS</p>
          <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#33363b] sm:text-4xl">{t('admin.title')}</h1>
          <p className="mt-1 text-xs text-[#6b7078]">{user?.email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tab !== 'settings' && (
            <button
              onClick={() => {
                if (tab === 'blogs') setEditBlog({ item: emptyBlog(blogs.length + 1), isNew: true });
                else if (tab === 'portfolios') setEditPortfolio({ item: emptyPortfolio(portfolios.length + 1), isNew: true });
                else setEditProject({ item: emptyProject(projects.length + 1, normalizePortfolioId(availablePortfolios[0].id)), isNew: true });
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#33363b] px-5 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-[var(--primary)]"
            >
              <Plus className="h-4 w-4" />
              {tab === 'blogs' ? t('admin.newPost') : tab === 'portfolios' ? t('admin.newPortfolio') : t('admin.newProject')}
            </button>
          )}
          <Link to="/" className="inline-flex min-h-11 items-center rounded-full border border-[#d6d2cb] bg-white px-4 text-xs font-medium text-[#33363b] hover:border-[var(--primary)]">← Sitio</Link>
          <button onClick={() => void logout()} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d6d2cb] bg-white px-4 text-xs font-medium text-[#6b7078] hover:text-[#33363b]"><LogOut className="h-4 w-4" />{t('admin.logout')}</button>
        </div>
      </div>

      <div role="tablist" className="mb-8 flex gap-2 overflow-x-auto border-b border-[#e6e3de] pb-3 [scrollbar-width:none]">
        {(['blogs', 'portfolios', 'projects', 'settings'] as AdminTab[]).map((k) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={`min-h-11 shrink-0 rounded-full px-5 text-xs font-medium uppercase tracking-wider transition ${tab === k ? 'bg-[#33363b] text-white' : 'border border-[#e6e3de] bg-[#faf9f7] text-[#6b7078] hover:text-[#33363b]'}`}>
            {t(`admin.tabs.${k}`)}
          </button>
        ))}
      </div>

      {tab === 'settings' ? <SiteSettingsTab /> : loading ? <BlogLoader count={2} /> : activeList.length === 0 ? (
        <div className="space-y-4 rounded-2xl border border-[#e6e3de] bg-[#faf9f7] p-8 text-center">
          <p className="text-[#6b7078]">{t('admin.empty')}</p>
          <button onClick={() => void seedCurrentTab()} className="min-h-11 rounded-full border border-[#d6d2cb] bg-white px-5 text-xs font-medium text-[#33363b] hover:border-[var(--primary)]">{t('admin.importInitial')}</button>
        </div>
      ) : (
        <ul className="space-y-3">
          {tab === 'blogs' && blogs.map((p, i) => (
            <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#e6e3de] bg-[#faf9f7] p-4">
              <span className="w-8 text-center font-mono text-xs text-[var(--primary)]">#{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#33363b]">{loc(p.title, lang) || p.title.es}</p>
                <p className="text-[11px] text-[#6b7078]">{p.publishedAt}</p>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => void moveItem('blogs', i, -1)} disabled={i === 0} aria-label={t('admin.moveUp')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#e6e3de] bg-white text-[#6b7078] hover:text-[#33363b] disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                <button onClick={() => void moveItem('blogs', i, 1)} disabled={i === blogs.length - 1} aria-label={t('admin.moveDown')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#e6e3de] bg-white text-[#6b7078] hover:text-[#33363b] disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                <button onClick={() => setEditBlog({ item: p, isNew: false })} aria-label={t('admin.edit')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#e6e3de] bg-white text-[#33363b] hover:bg-[#f2f0ec]"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => setToDelete({ type: 'blogs', id: p.id, title: loc(p.title, lang) || p.title.es, backup: p })} aria-label={t('admin.delete')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}

          {tab === 'portfolios' && portfolios.map((p, i) => (
            <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#e6e3de] bg-[#faf9f7] p-4">
              <span className="w-8 text-center font-mono text-xs text-[var(--primary)]">#{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#33363b]">{loc(p.name, lang) || p.name.es}</p>
                <p className="text-[11px] text-[#6b7078]">{loc(p.tag, lang)} · {t(`admin.layouts.${p.layoutStyle}`)}</p>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => void moveItem('portfolios', i, -1)} disabled={i === 0} aria-label={t('admin.moveUp')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#e6e3de] bg-white text-[#6b7078] hover:text-[#33363b] disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                <button onClick={() => void moveItem('portfolios', i, 1)} disabled={i === portfolios.length - 1} aria-label={t('admin.moveDown')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#e6e3de] bg-white text-[#6b7078] hover:text-[#33363b] disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                <button onClick={() => setEditPortfolio({ item: p, isNew: false })} aria-label={t('admin.edit')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#e6e3de] bg-white text-[#33363b] hover:bg-[#f2f0ec]"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => setToDelete({ type: 'portfolios', id: p.id, title: loc(p.name, lang) || p.name.es, backup: p })} aria-label={t('admin.delete')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}

          {tab === 'projects' && projects.map((p, i) => {
            const pf = availablePortfolios.find((x) => normalizePortfolioId(x.id) === normalizePortfolioId(p.portfolio));
            return (
              <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#e6e3de] bg-[#faf9f7] p-4">
                <span className="w-8 text-center font-mono text-xs text-[var(--primary)]">#{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#33363b]">{loc(p.title, lang) || p.title.es}</p>
                  <p className="text-[11px] text-[#6b7078]">{pf ? loc(pf.name, lang) : p.portfolio} · {loc(p.location, lang)} · {p.year}</p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => void moveItem('projects', i, -1)} disabled={i === 0} aria-label={t('admin.moveUp')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#e6e3de] bg-white text-[#6b7078] hover:text-[#33363b] disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                  <button onClick={() => void moveItem('projects', i, 1)} disabled={i === projects.length - 1} aria-label={t('admin.moveDown')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#e6e3de] bg-white text-[#6b7078] hover:text-[#33363b] disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                  <button onClick={() => setEditProject({ item: p, isNew: false })} aria-label={t('admin.edit')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#e6e3de] bg-white text-[#33363b] hover:bg-[#f2f0ec]"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => setToDelete({ type: 'projects', id: p.id, title: loc(p.title, lang) || p.title.es, backup: p })} aria-label={t('admin.delete')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {editBlog && <BlogEditor initial={editBlog.item} isNew={editBlog.isNew} onClose={() => setEditBlog(null)} onSaved={() => { setEditBlog(null); void loadAll(); }} />}
      {editPortfolio && <PortfolioEditor initial={editPortfolio.item} isNew={editPortfolio.isNew} onClose={() => setEditPortfolio(null)} onSaved={() => { setEditPortfolio(null); void loadAll(); }} />}
      {editProject && <ProjectEditor initial={editProject.item} isNew={editProject.isNew} portfolios={availablePortfolios} onClose={() => setEditProject(null)} onSaved={() => { setEditProject(null); void loadAll(); }} />}

      {toDelete && (
        <div role="alertdialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setToDelete(null); }} className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#33363b]/60 p-4 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm space-y-4 rounded-2xl border border-[#e6e3de] bg-[#faf9f7] p-6 shadow-2xl">
            <h2 className="text-lg font-medium text-[#33363b]">{t('admin.confirmTitle')}</h2>
            <p className="text-sm text-[#6b7078]">{t('admin.confirmText', { title: toDelete.title })}</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setToDelete(null)} className="min-h-[44px] rounded-full border border-[#d6d2cb] bg-white px-5 text-xs text-[#6b7078] hover:text-[#33363b]">{t('admin.cancel')}</button>
              <button onClick={() => void confirmDelete()} className="min-h-[44px] rounded-full bg-rose-600 px-5 text-xs font-semibold text-white hover:bg-rose-700">{t('admin.delete')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  return (<AuthProvider><AdminGate /></AuthProvider>);
}

function AdminGate() {
  const { user, ready } = useAuth();
  const { t } = useTranslation();
  return (
    <>
      <Seo title={`${t('admin.title')} — Medelsa.`} description={t('admin.loginText')} path="/admin" />
      <meta name="robots" content="noindex,nofollow" />
      {!ready ? <div className="mx-auto max-w-4xl p-8 pt-36"><BlogLoader count={2} /></div> : user ? <Dashboard /> : <Login />}
    </>
  );
}
