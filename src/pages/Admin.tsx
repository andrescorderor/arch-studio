import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowUp, ImagePlus, Lock, LogOut, Pencil, Plus, Trash2, X } from 'lucide-react';
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
} from '../lib/blogsService';
import { INITIAL_BLOGS, INITIAL_PORTFOLIOS, INITIAL_PROJECTS, loc } from '../data/content';
import type { ArchitecturalProject, BlogPost, PortfolioItem, PortfolioLayout } from '../data/content';
import { LANGS } from '../config/site';
import type { Lang } from '../config/site';

type AdminTab = 'blogs' | 'portfolios' | 'projects';

const slugify = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const emptyL = () => ({ es: '', en: '', ja: '' });

const emptyBlog = (n: number): BlogPost => ({
  id: crypto.randomUUID(), slug: '', orderIndex: n, coverImage: '',
  publishedAt: new Date().toISOString().slice(0, 10),
  title: emptyL(), excerpt: emptyL(), contentHtml: emptyL(),
});

const emptyPortfolio = (n: number): PortfolioItem => ({
  id: '', orderIndex: n, accent: '#9a6b3b', layoutStyle: 'editorial',
  tag: emptyL(), name: emptyL(), desc: emptyL(), client: emptyL(), coverImage: '',
});

const emptyProject = (n: number, defaultPid: string): ArchitecturalProject => ({
  id: '', portfolio: defaultPid, orderIndex: n, year: new Date().getFullYear(), areaM2: 0,
  title: emptyL(), location: emptyL(), summary: emptyL(), materials: emptyL(), coverImage: '', gallery: [],
});

const inputCls = 'min-h-[44px] w-full rounded-lg border border-[#d4d4d8] bg-[#fafaf9] px-3 text-sm text-[#18181b] focus:border-[#9a6b3b] focus:outline-none';
const textCls = 'min-h-[80px] w-full resize-y rounded-lg border border-[#d4d4d8] bg-[#fafaf9] p-3 text-sm text-[#18181b] focus:border-[#9a6b3b] focus:outline-none';

function LangTabs({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const { t } = useTranslation();
  return (
    <div role="tablist" aria-label={t('admin.langTab')} className="flex gap-2">
      {LANGS.map((l) => (
        <button key={l} type="button" role="tab" aria-selected={lang === l} onClick={() => setLang(l)}
          className={`min-h-[44px] rounded-lg border px-4 text-xs uppercase tracking-wider ${lang === l ? 'border-[#9a6b3b] bg-[#9a6b3b]/15 font-semibold text-[#9a6b3b]' : 'border-[#d4d4d8] text-[#52525b] hover:text-[#18181b]'}`}>
          {l === 'ja' ? '日本語' : l}
        </button>
      ))}
    </div>
  );
}

function ImageUploadField({ value, onChange }: { value: string; onChange: (dataUrl: string) => void }) {
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
      <span className="block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fCoverUpload')}</span>
      <div className="flex flex-wrap items-center gap-4">
        {value && (
          <div className="h-20 w-32 overflow-hidden rounded-lg border border-[#e4e4e7] bg-[#f4f4f5]">
            <SafeImage alt="" src={value} className="h-full w-full object-cover" />
          </div>
        )}
        <label className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#d4d4d8] bg-white px-4 text-xs font-medium text-[#18181b] hover:bg-[#f4f4f5]">
          <ImagePlus className="h-4 w-4 text-[#9a6b3b]" />
          <span>{busy ? t('admin.uploadCompressing') : value ? t('admin.uploadReplace') : t('admin.uploadChoose')}</span>
          <input type="file" accept="image/*" onChange={handleFile} disabled={busy} className="sr-only" />
        </label>
      </div>
      <p className="text-[11px] text-[#71717a]">{t('admin.uploadHint')}</p>
    </div>
  );
}

function ModalShell({ title, onClose, onSave, saving, children }: { title: string; onClose: () => void; onSave: () => void; saving: boolean; children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <div role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#18181b]/60 p-0 backdrop-blur-sm sm:p-4">
      <div onClick={(e) => e.stopPropagation()} className="flex h-full max-h-[100vh] w-full max-w-3xl flex-col overflow-hidden border border-[#e4e4e7] bg-white shadow-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-[#e4e4e7] px-5 py-3">
          <h2 className="text-base font-medium text-[#18181b]">{title}</h2>
          <button onClick={onClose} aria-label={t('nav.close')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#18181b]"><X className="h-5 w-5" /></button>
        </div>
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5">{children}</div>
        <div className="flex shrink-0 justify-between gap-3 border-t border-[#e4e4e7] bg-[#fafaf9] p-4">
          <button onClick={onClose} className="min-h-[44px] rounded-xl border border-[#d4d4d8] bg-white px-5 text-xs text-[#52525b] hover:text-[#18181b]">{t('admin.cancel')}</button>
          <button onClick={onSave} disabled={saving} className="min-h-[44px] rounded-xl bg-[#18181b] px-6 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#27272a] disabled:opacity-60">{saving ? t('admin.saving') : t('admin.save')}</button>
        </div>
      </div>
    </div>
  );
}

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
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16">
      <form onSubmit={submit} className="w-full space-y-5 rounded-2xl border border-[#e4e4e7] bg-white p-8 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e4e4e7] bg-[#fafaf9] text-[#9a6b3b]"><Lock className="h-5 w-5" /></div>
        <div><h1 className="text-xl font-medium text-[#18181b]">{t('admin.loginTitle')}</h1><p className="mt-1 text-xs text-[#71717a]">{t('admin.loginText')}</p></div>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.email')}</span>
          <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></label>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.password')}</span>
          <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} /></label>
        {error && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">{error}</p>}
        <button disabled={busy} className="min-h-[44px] w-full rounded-xl bg-[#18181b] text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#27272a] disabled:opacity-60">{busy ? t('admin.signingIn') : t('admin.submit')}</button>
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
      <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fTitle')}</span><input className={inputCls} value={post.title[lang]} onChange={(e) => setL('title', e.target.value)} /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fDate')}</span><input type="date" className={inputCls} value={post.publishedAt} onChange={(e) => setPost({ ...post, publishedAt: e.target.value })} /></label>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fSlug')}</span><input className={inputCls} value={post.slug} placeholder={slugify(post.title.es)} onChange={(e) => setPost({ ...post, slug: slugify(e.target.value) })} /></label>
      </div>
      <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fExcerpt')}</span><textarea rows={2} className={textCls} value={post.excerpt[lang]} onChange={(e) => setL('excerpt', e.target.value)} /></label>
      <ImageUploadField value={post.coverImage} onChange={(v) => setPost({ ...post, coverImage: v })} />
      <div>
        <span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fContent')}</span>
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
    const toSave: PortfolioItem = { ...item, id: item.id.trim() || slugify(item.name.es) };
    try { await savePortfolio(toSave); toast.success(t('admin.saved')); onSaved(); }
    catch { toast.error(t('admin.errSave')); }
    finally { setSaving(false); }
  };

  return (
    <ModalShell title={isNew ? t('admin.portfolioNew') : t('admin.portfolioEdit')} onClose={onClose} onSave={save} saving={saving}>
      <LangTabs lang={lang} setLang={setLang} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fName')}</span><input className={inputCls} value={item.name[lang]} onChange={(e) => setL('name', e.target.value)} /></label>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fTag')}</span><input className={inputCls} value={item.tag[lang]} onChange={(e) => setL('tag', e.target.value)} /></label>
      </div>
      <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fClient')}</span><input className={inputCls} value={item.client[lang]} onChange={(e) => setL('client', e.target.value)} /></label>
      <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fDesc')}</span><textarea rows={2} className={textCls} value={item.desc[lang]} onChange={(e) => setL('desc', e.target.value)} /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fLayout')}</span>
          <select className={inputCls} value={item.layoutStyle} onChange={(e) => setItem({ ...item, layoutStyle: e.target.value as PortfolioLayout })}>
            <option value="editorial">{t('admin.layouts.editorial')}</option>
            <option value="technical">{t('admin.layouts.technical')}</option>
            <option value="organic">{t('admin.layouts.organic')}</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fAccent')}</span>
          <input type="color" className="min-h-[44px] w-full rounded-lg border border-[#d4d4d8] bg-white p-1" value={item.accent} onChange={(e) => setItem({ ...item, accent: e.target.value })} />
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
    const toSave: ArchitecturalProject = { ...proj, id, gallery: proj.coverImage ? [proj.coverImage] : proj.gallery };
    try { await saveProject(toSave); toast.success(t('admin.saved')); onSaved(); }
    catch { toast.error(t('admin.errSave')); }
    finally { setSaving(false); }
  };

  return (
    <ModalShell title={isNew ? t('admin.projectNew') : t('admin.projectEdit')} onClose={onClose} onSave={save} saving={saving}>
      <LangTabs lang={lang} setLang={setLang} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fPortfolio')}</span>
          <select className={inputCls} value={proj.portfolio} onChange={(e) => setProj({ ...proj, portfolio: e.target.value })}>
            {portfolios.map((pf) => (<option key={pf.id} value={pf.id}>{loc(pf.name, lang) || pf.name.es}</option>))}
          </select>
        </label>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fTitle')}</span><input className={inputCls} value={proj.title[lang]} onChange={(e) => setL('title', e.target.value)} /></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fLocation')}</span><input className={inputCls} value={proj.location[lang]} onChange={(e) => setL('location', e.target.value)} /></label>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fYear')}</span><input type="number" className={inputCls} value={proj.year} onChange={(e) => setProj({ ...proj, year: Number(e.target.value) })} /></label>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fArea')}</span><input type="number" className={inputCls} value={proj.areaM2} onChange={(e) => setProj({ ...proj, areaM2: Number(e.target.value) })} /></label>
      </div>
      <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fMaterials')}</span><input className={inputCls} value={proj.materials[lang]} onChange={(e) => setL('materials', e.target.value)} /></label>
      <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#52525b]">{t('admin.fSummary')}</span><textarea rows={3} className={textCls} value={proj.summary[lang]} onChange={(e) => setL('summary', e.target.value)} /></label>
      <ImageUploadField value={proj.coverImage} onChange={(v) => setProj({ ...proj, coverImage: v })} />
    </ModalShell>
  );
}

function Dashboard() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const toast = useToast();
  const { logout, user } = useAuth();
  const [tab, setTab] = useState<AdminTab>('blogs');
  const [loading, setLoading] = useState(true);

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [projects, setProjects] = useState<ArchitecturalProject[]>([]);

  const [editBlog, setEditBlog] = useState<{ item: BlogPost; isNew: boolean } | null>(null);
  const [editPortfolio, setEditPortfolio] = useState<{ item: PortfolioItem; isNew: boolean } | null>(null);
  const [editProject, setEditProject] = useState<{ item: ArchitecturalProject; isNew: boolean } | null>(null);
  const [toDelete, setToDelete] = useState<{ type: AdminTab; id: string; title: string; backup: BlogPost | PortfolioItem | ArchitecturalProject } | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [b, pf, pr] = await Promise.all([getAllBlogs(), getAllPortfolios(), getAllProjects()]);
      setBlogs(b);
      setPortfolios(pf);
      setProjects(pr);
    } catch { toast.error(t('admin.errOffline')); }
    finally { setLoading(false); }
  }, [t, toast]);

  useEffect(() => { void loadAll(); }, [loadAll]);

  const moveItem = async (type: AdminTab, i: number, d: -1 | 1) => {
    try {
      if (type === 'blogs') {
        const j = i + d; if (j < 0 || j >= blogs.length) return;
        const next = [...blogs]; [next[i], next[j]] = [next[j], next[i]];
        setBlogs(await reorderBlogs(next));
      } else if (type === 'portfolios') {
        const j = i + d; if (j < 0 || j >= portfolios.length) return;
        const next = [...portfolios]; [next[i], next[j]] = [next[j], next[i]];
        setPortfolios(await reorderPortfolios(next));
      } else {
        const j = i + d; if (j < 0 || j >= projects.length) return;
        const next = [...projects]; [next[i], next[j]] = [next[j], next[i]];
        setProjects(await reorderProjects(next));
      }
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
    } catch { toast.error(t('admin.errSave')); }
  };

  const seedCurrentTab = async () => {
    try {
      if (tab === 'blogs') { for (const b of INITIAL_BLOGS) await saveBlog(b); }
      else if (tab === 'portfolios') { for (const p of INITIAL_PORTFOLIOS) await savePortfolio(p); }
      else {
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
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="font-display text-4xl font-light text-[#18181b]">{t('admin.title')}</h1><p className="mt-1 text-xs text-[#71717a]">{user?.email}</p></div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              if (tab === 'blogs') setEditBlog({ item: emptyBlog(blogs.length + 1), isNew: true });
              else if (tab === 'portfolios') setEditPortfolio({ item: emptyPortfolio(portfolios.length + 1), isNew: true });
              else setEditProject({ item: emptyProject(projects.length + 1, availablePortfolios[0].id), isNew: true });
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#18181b] px-5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#27272a]"
          >
            <Plus className="h-4 w-4 text-[#d4a373]" />
            {tab === 'blogs' ? t('admin.newPost') : tab === 'portfolios' ? t('admin.newPortfolio') : t('admin.newProject')}
          </button>
          <button onClick={() => void logout()} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#d4d4d8] bg-white px-4 text-xs text-[#52525b] hover:text-[#18181b]"><LogOut className="h-4 w-4" />{t('admin.logout')}</button>
        </div>
      </div>

      {/* Pestañas: Blogs | Portafolios | Proyectos */}
      <div role="tablist" className="mb-6 flex gap-2 border-b border-[#e4e4e7] pb-3">
        {(['blogs', 'portfolios', 'projects'] as AdminTab[]).map((k) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={`min-h-[44px] rounded-xl px-4 text-xs font-medium uppercase tracking-wider transition ${tab === k ? 'bg-[#18181b] text-white' : 'bg-[#f4f4f5] text-[#52525b] hover:text-[#18181b]'}`}>
            {t(`admin.tabs.${k}`)}
          </button>
        ))}
      </div>

      {loading ? <BlogLoader count={2} /> : activeList.length === 0 ? (
        <div className="space-y-4 rounded-2xl border border-[#e4e4e7] bg-white p-8 text-center">
          <p className="text-[#52525b]">{t('admin.empty')}</p>
          <button onClick={() => void seedCurrentTab()} className="min-h-[44px] rounded-xl border border-[#d4d4d8] bg-[#fafaf9] px-5 text-xs font-medium text-[#18181b] hover:bg-[#f4f4f5]">{t('admin.importInitial')}</button>
        </div>
      ) : (
        <ul className="space-y-3">
          {tab === 'blogs' && blogs.map((p, i) => (
            <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e4e4e7] bg-white p-3 shadow-xs">
              <span className="w-8 text-center font-mono text-xs text-[#9a6b3b]">#{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#18181b]">{loc(p.title, lang) || p.title.es}</p>
                <p className="text-[11px] text-[#71717a]">{p.publishedAt}</p>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => void moveItem('blogs', i, -1)} disabled={i === 0} aria-label={t('admin.moveUp')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#e4e4e7] text-[#52525b] hover:text-[#18181b] disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                <button onClick={() => void moveItem('blogs', i, 1)} disabled={i === blogs.length - 1} aria-label={t('admin.moveDown')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#e4e4e7] text-[#52525b] hover:text-[#18181b] disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                <button onClick={() => setEditBlog({ item: p, isNew: false })} aria-label={t('admin.edit')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#e4e4e7] text-[#18181b] hover:bg-[#f4f4f5]"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => setToDelete({ type: 'blogs', id: p.id, title: loc(p.title, lang) || p.title.es, backup: p })} aria-label={t('admin.delete')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}

          {tab === 'portfolios' && portfolios.map((p, i) => (
            <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e4e4e7] bg-white p-3 shadow-xs">
              <span className="w-8 text-center font-mono text-xs" style={{ color: p.accent }}>#{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#18181b]">{loc(p.name, lang) || p.name.es}</p>
                <p className="text-[11px] text-[#71717a]">{loc(p.tag, lang)} · {t(`admin.layouts.${p.layoutStyle}`)}</p>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => void moveItem('portfolios', i, -1)} disabled={i === 0} aria-label={t('admin.moveUp')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#e4e4e7] text-[#52525b] hover:text-[#18181b] disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                <button onClick={() => void moveItem('portfolios', i, 1)} disabled={i === portfolios.length - 1} aria-label={t('admin.moveDown')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#e4e4e7] text-[#52525b] hover:text-[#18181b] disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                <button onClick={() => setEditPortfolio({ item: p, isNew: false })} aria-label={t('admin.edit')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#e4e4e7] text-[#18181b] hover:bg-[#f4f4f5]"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => setToDelete({ type: 'portfolios', id: p.id, title: loc(p.name, lang) || p.name.es, backup: p })} aria-label={t('admin.delete')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}

          {tab === 'projects' && projects.map((p, i) => {
            const pf = availablePortfolios.find((x) => x.id === p.portfolio);
            return (
              <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e4e4e7] bg-white p-3 shadow-xs">
                <span className="w-8 text-center font-mono text-xs text-[#9a6b3b]">#{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#18181b]">{loc(p.title, lang) || p.title.es}</p>
                  <p className="text-[11px] text-[#71717a]">{pf ? loc(pf.name, lang) : p.portfolio} · {loc(p.location, lang)} · {p.year}</p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => void moveItem('projects', i, -1)} disabled={i === 0} aria-label={t('admin.moveUp')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#e4e4e7] text-[#52525b] hover:text-[#18181b] disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                  <button onClick={() => void moveItem('projects', i, 1)} disabled={i === projects.length - 1} aria-label={t('admin.moveDown')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#e4e4e7] text-[#52525b] hover:text-[#18181b] disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                  <button onClick={() => setEditProject({ item: p, isNew: false })} aria-label={t('admin.edit')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#e4e4e7] text-[#18181b] hover:bg-[#f4f4f5]"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => setToDelete({ type: 'projects', id: p.id, title: loc(p.title, lang) || p.title.es, backup: p })} aria-label={t('admin.delete')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>
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
        <div role="alertdialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setToDelete(null); }} className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#18181b]/60 p-4 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm space-y-4 rounded-2xl border border-[#e4e4e7] bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-medium text-[#18181b]">{t('admin.confirmTitle')}</h2>
            <p className="text-sm text-[#52525b]">{t('admin.confirmText', { title: toDelete.title })}</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setToDelete(null)} className="min-h-[44px] rounded-xl border border-[#d4d4d8] px-5 text-xs text-[#52525b] hover:text-[#18181b]">{t('admin.cancel')}</button>
              <button onClick={() => void confirmDelete()} className="min-h-[44px] rounded-xl bg-rose-600 px-5 text-xs font-semibold text-white hover:bg-rose-700">{t('admin.delete')}</button>
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
      <Seo title={`${t('admin.title')} | ${t('brand.title')}`} description={t('admin.loginText')} path="/admin" />
      <meta name="robots" content="noindex,nofollow" />
      {!ready ? <div className="mx-auto max-w-4xl p-8"><BlogLoader count={2} /></div> : user ? <Dashboard /> : <Login />}
    </>
  );
}
