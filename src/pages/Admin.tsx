import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowUp, Lock, LogOut, Pencil, Plus, Trash2, X } from 'lucide-react';
import { Seo } from '../components/Seo';
import { RichTextEditor } from '../components/RichTextEditor';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { deleteBlog, getAllBlogs, reorderBlogs, saveBlog } from '../lib/blogsService';
import { INITIAL_BLOGS, loc } from '../data/content';
import type { BlogPost } from '../data/content';
import { LANGS } from '../config/site';
import type { Lang } from '../config/site';

const empty = (n: number): BlogPost => ({
  id: crypto.randomUUID(), slug: '', orderIndex: n, isPublished: true, coverImage: '',
  publishedAt: new Date().toISOString().slice(0, 10),
  category: { es: '', en: '', ja: '' }, title: { es: '', en: '', ja: '' },
  excerpt: { es: '', en: '', ja: '' }, contentHtml: { es: '', en: '', ja: '' },
});
const slugify = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const inputCls = 'min-h-[44px] w-full rounded-lg border border-[#2e2e38] bg-[#121214] px-3 text-sm text-white focus:border-[#d4a373] focus:outline-none';

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
      <form onSubmit={submit} className="w-full space-y-5 rounded-2xl border border-[#2e2e38] bg-[#18181c] p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#343440] bg-[#24242e] text-[#d4a373]"><Lock className="h-5 w-5" /></div>
        <div><h1 className="text-xl font-light text-white">{t('admin.loginTitle')}</h1><p className="mt-1 text-xs text-[#9b9ba8]">{t('admin.loginText')}</p></div>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#9b9ba8]">{t('admin.email')}</span>
          <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></label>
        <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#9b9ba8]">{t('admin.password')}</span>
          <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} /></label>
        {error && <p role="alert" className="rounded-lg border border-rose-900/50 bg-rose-950/30 p-3 text-xs text-rose-300">{error}</p>}
        <button disabled={busy} className="min-h-[44px] w-full rounded-xl bg-[#d4a373] text-xs font-semibold uppercase tracking-widest text-[#121214] hover:bg-[#c29263] disabled:opacity-60">{busy ? t('admin.signingIn') : t('admin.submit')}</button>
      </form>
    </div>
  );
}

function Editor({ initial, isNew, onClose, onSaved }: { initial: BlogPost; isNew: boolean; onClose: () => void; onSaved: (p: BlogPost) => void }) {
  const { t } = useTranslation();
  const toast = useToast();
  const [post, setPost] = useState<BlogPost>(initial);
  const [lang, setLang] = useState<Lang>('es');
  const [saving, setSaving] = useState(false);
  const setL = (k: 'title' | 'excerpt' | 'category' | 'contentHtml', v: string) => setPost((p) => ({ ...p, [k]: { ...p[k], [lang]: v } }));

  const save = async () => {
    if (!post.title.es.trim()) { toast.error(t('admin.errTitle')); setLang('es'); return; }
    setSaving(true);
    const toSave = { ...post, slug: post.slug.trim() || slugify(post.title.es) };
    try { await saveBlog(toSave); toast.success(t('admin.saved')); onSaved(toSave); }
    catch { toast.error(t('admin.errSave')); }
    finally { setSaving(false); }
  };

  return (
    <div role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#0e0e10]/70 p-0 backdrop-blur-md sm:p-4">
      <div onClick={(e) => e.stopPropagation()} className="flex h-full max-h-[100vh] w-full max-w-3xl flex-col overflow-hidden border border-[#2e2e38] bg-[#18181c] sm:h-auto sm:max-h-[90vh] sm:rounded-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-[#2a2a34] px-5 py-3">
          <h2 className="text-base text-white">{isNew ? t('admin.editorNew') : t('admin.editorEdit')}</h2>
          <button onClick={onClose} aria-label={t('nav.close')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#9b9ba8] hover:bg-[#222228] hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
          <div role="tablist" aria-label={t('admin.langTab')} className="flex gap-2">
            {LANGS.map((l) => (
              <button key={l} role="tab" aria-selected={lang === l} onClick={() => setLang(l)} className={`min-h-[44px] rounded-lg border px-4 text-xs uppercase tracking-wider ${lang === l ? 'border-[#d4a373] bg-[#d4a373]/15 text-[#d4a373]' : 'border-[#2e2e38] text-[#9b9ba8] hover:text-white'}`}>{l === 'ja' ? '日本語' : l}</button>
            ))}
          </div>
          <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#9b9ba8]">{t('admin.fTitle')}</span><input className={inputCls} value={post.title[lang]} onChange={(e) => setL('title', e.target.value)} /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#9b9ba8]">{t('admin.fCategory')}</span><input className={inputCls} value={post.category[lang]} onChange={(e) => setL('category', e.target.value)} /></label>
            <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#9b9ba8]">{t('admin.fDate')}</span><input type="date" className={inputCls} value={post.publishedAt} onChange={(e) => setPost({ ...post, publishedAt: e.target.value })} /></label>
          </div>
          <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#9b9ba8]">{t('admin.fExcerpt')}</span><textarea rows={2} className="min-h-[70px] w-full resize-y rounded-lg border border-[#2e2e38] bg-[#121214] p-3 text-sm text-white focus:border-[#d4a373] focus:outline-none" value={post.excerpt[lang]} onChange={(e) => setL('excerpt', e.target.value)} /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#9b9ba8]">{t('admin.fCover')}</span><input type="url" className={inputCls} value={post.coverImage} onChange={(e) => setPost({ ...post, coverImage: e.target.value })} /></label>
            <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-[#9b9ba8]">{t('admin.fSlug')}</span><input className={inputCls} value={post.slug} placeholder={slugify(post.title.es)} onChange={(e) => setPost({ ...post, slug: slugify(e.target.value) })} /></label>
          </div>
          <div>
            <span className="mb-1 block text-xs uppercase tracking-wider text-[#9b9ba8]">{t('admin.fContent')}</span>
            <RichTextEditor key={lang} value={post.contentHtml[lang]} onChange={(h) => setL('contentHtml', h)} />
          </div>
          <label className="flex min-h-[44px] items-center gap-3 text-sm text-white"><input type="checkbox" className="h-5 w-5" checked={post.isPublished} onChange={(e) => setPost({ ...post, isPublished: e.target.checked })} />{t('admin.fPublished')}</label>
        </div>
        <div className="flex shrink-0 justify-between gap-3 border-t border-[#2a2a34] bg-[#141418] p-4">
          <button onClick={onClose} className="min-h-[44px] rounded-xl border border-[#343440] px-5 text-xs text-[#b4b4c0] hover:text-white">{t('admin.cancel')}</button>
          <button onClick={save} disabled={saving} className="min-h-[44px] rounded-xl bg-[#d4a373] px-6 text-xs font-semibold uppercase tracking-widest text-[#121214] hover:bg-[#c29263] disabled:opacity-60">{saving ? t('admin.saving') : t('admin.save')}</button>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const toast = useToast();
  const { logout, user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ post: BlogPost; isNew: boolean } | null>(null);
  const [toDelete, setToDelete] = useState<BlogPost | null>(null);

  const load = useCallback(async () => {
    try { setPosts(await getAllBlogs()); } catch { toast.error(t('admin.errOffline')); } finally { setLoading(false); }
  }, [t, toast]);
  useEffect(() => { void load(); }, [load]);

  const move = async (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= posts.length) return;
    const next = [...posts];
    [next[i], next[j]] = [next[j], next[i]];
    try { setPosts(await reorderBlogs(next)); toast.success(t('admin.reordered')); } catch { toast.error(t('admin.errSave')); }
  };

  const confirmDelete = async () => {
    const p = toDelete; setToDelete(null);
    if (!p) return;
    try {
      await deleteBlog(p.id);
      setPosts((prev) => prev.filter((x) => x.id !== p.id));
      toast.undoable(t('admin.deleted'), t('admin.undo'), async () => {
        try { await saveBlog(p); await load(); toast.success(t('admin.restored')); } catch { toast.error(t('admin.errSave')); }
      });
    } catch { toast.error(t('admin.errSave')); }
  };

  const seed = async () => {
    try { for (const b of INITIAL_BLOGS) await saveBlog(b); await load(); toast.success(t('admin.saved')); } catch { toast.error(t('admin.errSave')); }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="font-display text-4xl font-light text-white">{t('admin.title')}</h1><p className="mt-1 text-xs text-[#9b9ba8]">{user?.email}</p></div>
        <div className="flex gap-2">
          <button onClick={() => setEditing({ post: empty(posts.length + 1), isNew: true })} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#d4a373] px-5 text-xs font-semibold uppercase tracking-wider text-[#121214] hover:bg-[#c29263]"><Plus className="h-4 w-4" />{t('admin.newPost')}</button>
          <button onClick={() => void logout()} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#343440] px-4 text-xs text-[#b4b4c0] hover:text-white"><LogOut className="h-4 w-4" />{t('nav.logout')}</button>
        </div>
      </div>

      {loading ? <p className="text-sm text-[#9b9ba8]">{t('common.loading')}</p> : posts.length === 0 ? (
        <div className="space-y-4 rounded-2xl border border-[#23232b] bg-[#18181c] p-8 text-center">
          <p className="text-[#9b9ba8]">{t('admin.empty')}</p>
          <button onClick={() => void seed()} className="min-h-[44px] rounded-xl border border-[#343440] px-5 text-xs text-white hover:bg-[#222228]">{t('admin.importInitial')}</button>
        </div>
      ) : (
        <ul className="space-y-3">
          {posts.map((p, i) => (
            <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#262630] bg-[#141418] p-3">
              <span className="w-8 text-center font-mono text-xs text-[#d4a373]" title={t('admin.position')}>#{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-white">{loc(p.title, lang) || p.title.es}</p>
                <p className="text-[11px] text-[#9b9ba8]">{loc(p.category, lang)} · {p.publishedAt} · <span className={p.isPublished ? 'text-[#9bb88a]' : 'text-[#9b9ba8]'}>{p.isPublished ? t('admin.published') : t('admin.draft')}</span></p>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => void move(i, -1)} disabled={i === 0} aria-label={t('admin.moveUp')} title={t('admin.moveUp')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#2e2e38] text-[#b4b4c0] hover:text-white disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                <button onClick={() => void move(i, 1)} disabled={i === posts.length - 1} aria-label={t('admin.moveDown')} title={t('admin.moveDown')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#2e2e38] text-[#b4b4c0] hover:text-white disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                <button onClick={() => setEditing({ post: p, isNew: false })} aria-label={t('admin.edit')} title={t('admin.edit')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#2e2e38] text-white hover:bg-[#222228]"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => setToDelete(p)} aria-label={t('admin.delete')} title={t('admin.delete')} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-rose-900/50 text-rose-400 hover:bg-rose-950/40"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && <Editor initial={editing.post} isNew={editing.isNew} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); void load(); }} />}

      {toDelete && (
        <div role="alertdialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setToDelete(null); }} className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#0e0e10]/70 p-4 backdrop-blur-md">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm space-y-4 rounded-2xl border border-[#2e2e38] bg-[#18181c] p-6">
            <h2 className="text-lg text-white">{t('admin.confirmTitle')}</h2>
            <p className="text-sm text-[#9b9ba8]">{t('admin.confirmText', { title: loc(toDelete.title, lang) || toDelete.title.es })}</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setToDelete(null)} className="min-h-[44px] rounded-xl border border-[#343440] px-5 text-xs text-[#b4b4c0] hover:text-white">{t('admin.cancel')}</button>
              <button onClick={() => void confirmDelete()} className="min-h-[44px] rounded-xl bg-rose-500 px-5 text-xs font-semibold text-white hover:bg-rose-600">{t('admin.delete')}</button>
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
      {!ready ? <p className="p-12 text-sm text-[#9b9ba8]">{t('common.loading')}</p> : user ? <Dashboard /> : <Login />}
    </>
  );
}
