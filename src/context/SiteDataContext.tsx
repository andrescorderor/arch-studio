import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  INITIAL_PORTFOLIOS,
  INITIAL_PROJECTS,
  INITIAL_SETTINGS,
  getOnDarkAccent,
  normalizePortfolioId,
} from '../data/content';
import type { ArchitecturalProject, PortfolioItem, SiteSettings } from '../data/content';

interface SiteDataApi {
  portfolios: PortfolioItem[];
  projects: ArchitecturalProject[];
  settings: SiteSettings;
  loading: boolean;
  refresh: () => Promise<void>;
  updateLocalSettings: (next: SiteSettings) => void;
}

const SETTINGS_CACHE_KEY = 'medelsa_site_settings_v1';

function loadCachedSettings(): SiteSettings {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(SETTINGS_CACHE_KEY) : null;
    if (raw) {
      return { ...INITIAL_SETTINGS, ...(JSON.parse(raw) as Partial<SiteSettings>) };
    }
  } catch {
    /* ignore */
  }
  return INITIAL_SETTINGS;
}

const Ctx = createContext<SiteDataApi>({
  portfolios: INITIAL_PORTFOLIOS,
  projects: INITIAL_PROJECTS,
  settings: INITIAL_SETTINGS,
  loading: false,
  refresh: async () => {},
  updateLocalSettings: () => {},
});

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(INITIAL_PORTFOLIOS);
  const [projects, setProjects] = useState<ArchitecturalProject[]>(INITIAL_PROJECTS);
  const [settings, setSettings] = useState<SiteSettings>(loadCachedSettings);
  const [loading, setLoading] = useState(true);

  // Sincroniza variables CSS de color de acento en vivo
  useEffect(() => {
    const root = document.documentElement;
    const primary = settings.accentColor || '#3d5a47';
    const onDark = getOnDarkAccent(primary);
    root.style.setProperty('--primary', primary);
    root.style.setProperty('--primary-on-dark', onDark);
  }, [settings.accentColor]);

  const updateLocalSettings = useCallback((next: SiteSettings) => {
    setSettings(next);
    try {
      localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const m = await import('../lib/blogsService');
      const [pfs, prjs, st] = await Promise.all([
        m.getAllPortfolios(),
        m.getAllProjects(),
        m.getSiteSettings(),
      ]);
      if (pfs.length) {
        setPortfolios(pfs.map((p) => ({ ...p, id: normalizePortfolioId(p.id) })));
      }
      if (prjs.length) {
        setProjects(prjs.map((p) => ({ ...p, portfolio: normalizePortfolioId(p.portfolio) })));
      }
      if (st) {
        updateLocalSettings(st);
      }
    } catch {
      /* mantiene respaldo inicial */
    } finally {
      setLoading(false);
    }
  }, [updateLocalSettings]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <Ctx.Provider value={{ portfolios, projects, settings, loading, refresh, updateLocalSettings }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSiteDataContext() {
  return useContext(Ctx);
}
