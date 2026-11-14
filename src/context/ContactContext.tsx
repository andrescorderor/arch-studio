import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ContactModal } from '../components/ContactModal';

interface ContactApi {
  open: (context?: string) => void;
  pageContext?: string;
  pageImage?: string;
  setPageContext: (c?: string, img?: string) => void;
}
const Ctx = createContext<ContactApi | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; context?: string }>({ open: false });
  const [ctxData, setCtxData] = useState<{ context?: string; image?: string }>({});
  const open = useCallback((context?: string) => setState({ open: true, context }), []);
  const setPageContext = useCallback((context?: string, image?: string) => {
    setCtxData({ context, image });
  }, []);

  return (
    <Ctx.Provider value={{ open, pageContext: ctxData.context, pageImage: ctxData.image, setPageContext }}>
      {children}
      <ContactModal isOpen={state.open} context={state.context} onClose={() => setState({ open: false })} />
    </Ctx.Provider>
  );
}

export function useContact(): ContactApi {
  const c = useContext(Ctx);
  if (!c) throw new Error('useContact fuera de ContactProvider');
  return c;
}

/** Declara el proyecto/portafolio visible para que el CTA flotante lo incluya en el mensaje. */
export function usePageContext(context?: string, image?: string) {
  const { setPageContext } = useContact();
  useEffect(() => {
    setPageContext(context, image);
    return () => setPageContext(undefined, undefined);
  }, [context, image, setPageContext]);
}
