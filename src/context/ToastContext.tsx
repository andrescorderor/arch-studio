import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

type Kind = 'success' | 'error' | 'info';
interface ToastItem { id: number; kind: Kind; message: string; actionLabel?: string; onAction?: () => void }
interface ToastApi {
  success: (m: string) => void;
  error: (m: string) => void;
  info: (m: string) => void;
  undoable: (m: string, actionLabel: string, onUndo: () => void) => void;
}

const Ctx = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setItems((p) => p.filter((t) => t.id !== id)), []);
  const push = useCallback((t: Omit<ToastItem, 'id'>, ms = 4500) => {
    const id = nextId.current++;
    setItems((p) => [...p, { ...t, id }]);
    window.setTimeout(() => dismiss(id), ms);
  }, [dismiss]);

  const api = useMemo<ToastApi>(() => ({
    success: (message) => push({ kind: 'success', message }),
    error: (message) => push({ kind: 'error', message }, 7000),
    info: (message) => push({ kind: 'info', message }),
    undoable: (message, actionLabel, onAction) => push({ kind: 'info', message, actionLabel, onAction }, 7000),
  }), [push]);

  const color: Record<Kind, string> = {
    success: 'border-[#9bb88a]', error: 'border-rose-400', info: 'border-[#d4a373]',
  };

  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="fixed top-24 right-4 left-4 sm:left-auto z-[10000] flex flex-col gap-2 sm:w-96" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} role="status" className={`flex items-center gap-3 rounded-xl border-l-4 ${color[t.kind]} bg-[#1e1e24] px-4 py-3 text-sm text-white shadow-2xl`}>
            <span className="flex-1">{t.message}</span>
            {t.actionLabel && (
              <button
                onClick={() => { t.onAction?.(); dismiss(t.id); }}
                className="min-h-[44px] px-3 text-xs font-semibold uppercase tracking-wider text-[#d4a373] hover:text-white"
              >
                {t.actionLabel}
              </button>
            )}
            <button onClick={() => dismiss(t.id)} className="flex min-h-[44px] min-w-[44px] items-center justify-center text-[#9b9ba8] hover:text-white" aria-label="Cerrar">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast(): ToastApi {
  const c = useContext(Ctx);
  if (!c) throw new Error('useToast fuera de ToastProvider');
  return c;
}
