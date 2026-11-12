import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ContactModal } from '../components/ContactModal';

interface ContactApi {
  open: (context?: string) => void;
  pageContext?: string;
  setPageContext: (c?: string) => void;
}
const Ctx = createContext<ContactApi | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; context?: string }>({ open: false });
  const [pageContext, setPageContext] = useState<string | undefined>();
  const open = useCallback((context?: string) => setState({ open: true, context }), []);
  return (
    <Ctx.Provider value={{ open, pageContext, setPageContext }}>
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
export function usePageContext(context?: string) {
  const { setPageContext } = useContact();
  useEffect(() => {
    setPageContext(context);
    return () => setPageContext(undefined);
  }, [context, setPageContext]);
}
