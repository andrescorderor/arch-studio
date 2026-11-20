import { useSiteDataContext } from '../context/SiteDataContext';

/** Portafolios, proyectos y configuración general desde Firestore con estado reactivo global. */
export function useSiteData() {
  return useSiteDataContext();
}
