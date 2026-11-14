import { useEffect, useState } from 'react';
import { INITIAL_PORTFOLIOS, INITIAL_PROJECTS } from '../data/content';
import type { ArchitecturalProject, PortfolioItem } from '../data/content';

/** Portafolios y proyectos públicos desde Firestore con respaldo de datos iniciales. */
export function useSiteData() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(INITIAL_PORTFOLIOS);
  const [projects, setProjects] = useState<ArchitecturalProject[]>(INITIAL_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    import('./blogsService')
      .then(async (m) => {
        const [pfs, prjs] = await Promise.all([m.getAllPortfolios(), m.getAllProjects()]);
        if (!alive) return;
        if (pfs.length) setPortfolios(pfs);
        if (prjs.length) setProjects(prjs);
      })
      .catch(() => { /* se mantiene el contenido inicial */ })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return { portfolios, projects, loading };
}
