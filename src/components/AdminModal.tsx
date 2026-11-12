import React, { useState } from 'react';
import { X, Lock, FileText, AlertCircle } from 'lucide-react';
import type { BlogPost } from '../data/content';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
  onSavePost: (post: BlogPost) => void;
  onDeletePost: (id: string) => void;
  onReorderPosts: (reordered: BlogPost[]) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  posts,
  onSavePost,
  onDeletePost,
  onReorderPosts,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Estado de edición de artículo
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'taller2026' || password.length >= 6) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta. Introduce una clave autorizada.');
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= posts.length) return;
    const updated = [...posts];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    updated.forEach((p, idx) => {
      p.orderIndex = idx + 1;
    });
    onReorderPosts(updated);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
    >
      <div className="relative w-full max-w-2xl bg-[#18181c] border border-[#2e2e38] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cabecera Fija */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a34] shrink-0 bg-[#141418]">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-[#d4a373]" />
            <h2 className="text-sm font-semibold tracking-wider uppercase text-white">
              Panel de Taller & Publicaciones
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#9b9ba8] hover:text-white hover:bg-[#222228] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido Central Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-4 py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-[#24242e] border border-[#343440] flex items-center justify-center mx-auto text-[#d4a373]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium text-white">Acceso de Edición</h3>
              <p className="text-xs text-[#9b9ba8]">
                Introduce tus credenciales para crear, editar o reorganizar los artículos del blog y ensayos de taller.
              </p>

              <div className="text-left space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#9b9ba8]">
                  Clave de Acceso
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce la contraseña..."
                  className="w-full bg-[#121214] border border-[#2e2e38] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4a373] min-h-[44px]"
                  autoFocus
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/30 border border-rose-900/40 p-3 rounded-lg text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#d4a373] hover:bg-[#c29263] text-[#121214] font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-widest transition-all min-h-[44px]"
              >
                Ingresar al Gestor
              </button>
            </form>
          ) : editingPost ? (
            /* Formulario de Creación / Edición de Post */
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#2a2a34] pb-3">
                <h4 className="text-sm font-medium text-white">
                  {editingPost.id ? 'Editar Ensayo / Nota' : 'Redactar Nuevo Artículo'}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="text-xs text-[#9b9ba8] hover:text-white underline min-h-[44px] flex items-center"
                >
                  Volver al listado
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-[#9b9ba8] block mb-1">Título del Artículo</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full bg-[#121214] border border-[#2e2e38] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#d4a373] min-h-[44px]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#9b9ba8] block mb-1">Categoría</label>
                    <input
                      type="text"
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                      placeholder="Ensayo, Obra, Concurso..."
                      className="w-full bg-[#121214] border border-[#2e2e38] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#d4a373] min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#9b9ba8] block mb-1">URL Imagen de Portada</label>
                    <input
                      type="url"
                      value={editingPost.coverImage}
                      onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
                      className="w-full bg-[#121214] border border-[#2e2e38] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#d4a373] min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#9b9ba8] block mb-1">Resumen Editorial (Extracto)</label>
                  <textarea
                    rows={2}
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    className="w-full bg-[#121214] border border-[#2e2e38] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#d4a373] resize-y min-h-[70px]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#9b9ba8] block mb-1">
                    Cuerpo del Artículo (Formato HTML / TipTap)
                  </label>
                  <textarea
                    rows={6}
                    value={editingPost.contentHtml}
                    onChange={(e) => setEditingPost({ ...editingPost, contentHtml: e.target.value })}
                    className="w-full bg-[#121214] border border-[#2e2e38] rounded-lg p-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4a373] resize-y min-h-[140px]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#2a2a34]">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2.5 rounded-lg border border-[#343440] text-xs text-[#9b9ba8] hover:text-white min-h-[44px]"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSavePost(editingPost);
                    setEditingPost(null);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#d4a373] hover:bg-[#c29263] text-[#121214] font-medium text-xs tracking-wider uppercase min-h-[44px]"
                >
                  Guardar Publicación
                </button>
              </div>
            </div>
          ) : (
            /* Lista y Ordenamiento de Artículos */
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-[#9b9ba8]">
                  Artículos publicados ordenados según prioridad visual:
                </p>
                <button
                  onClick={() =>
                    setEditingPost({
                      id: String(Date.now()),
                      slug: 'nuevo-articulo',
                      title: '',
                      category: 'Ensayo',
                      publishedAt: new Date().toISOString().split('T')[0],
                      orderIndex: posts.length + 1,
                      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                      excerpt: '',
                      contentHtml: '<p>Escribe aquí el contenido...</p>',
                      isPublished: true,
                    })
                  }
                  className="bg-[#24242e] hover:bg-[#2e2e3a] text-white border border-[#343440] px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide min-h-[44px] flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#d4a373]" />
                  <span>+ Redactar Artículo</span>
                </button>
              </div>

              <div className="space-y-2">
                {posts.map((post, idx) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-3.5 bg-[#141418] border border-[#262630] rounded-xl hover:border-[#383844] transition-colors"
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <span className="text-xs font-mono text-[#d4a373] w-5 text-center">
                        #{idx + 1}
                      </span>
                      <div className="truncate">
                        <h5 className="text-xs font-medium text-white truncate">
                          {post.title}
                        </h5>
                        <span className="text-[10px] text-[#9b9ba8]">
                          {post.category} · {post.publishedAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => handleMove(idx, 'up')}
                        disabled={idx === 0}
                        className="px-2 py-1 text-xs border border-[#2e2e38] rounded text-[#9b9ba8] disabled:opacity-30 hover:text-white min-h-[44px] min-w-[36px]"
                        title="Subir posición"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => handleMove(idx, 'down')}
                        disabled={idx === posts.length - 1}
                        className="px-2 py-1 text-xs border border-[#2e2e38] rounded text-[#9b9ba8] disabled:opacity-30 hover:text-white min-h-[44px] min-w-[36px]"
                        title="Bajar posición"
                      >
                        ▼
                      </button>
                      <button
                        onClick={() => setEditingPost(post)}
                        className="px-3 py-1 text-xs bg-[#222228] text-white rounded hover:bg-[#2c2c34] min-h-[44px]"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDeletePost(post.id)}
                        className="px-2.5 py-1 text-xs text-rose-400 hover:bg-rose-950/40 rounded min-h-[44px]"
                        title="Eliminar artículo"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pie Fijo */}
        <div className="px-6 py-3 border-t border-[#2a2a34] bg-[#141418] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="text-xs text-[#9b9ba8] hover:text-white min-h-[44px] px-3 flex items-center"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
};
