import { collection, getDocs, getDoc, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { INITIAL_SETTINGS, normalizePortfolioId } from '../data/content';
import type { ArchitecturalProject, BlogPost, PortfolioItem, SiteSettings } from '../data/content';

const byOrder = <T extends { orderIndex: number }>(a: T, b: T) => a.orderIndex - b.orderIndex;

async function getOrdered<T extends { orderIndex: number }>(col: string): Promise<T[]> {
  const snap = await getDocs(collection(db, col));
  return snap.docs.map((d) => d.data() as T).sort(byOrder);
}

async function saveItem<T extends { id: string }>(col: string, item: T): Promise<void> {
  await setDoc(doc(db, col, item.id), item);
}

async function deleteItem(col: string, id: string): Promise<void> {
  await deleteDoc(doc(db, col, id));
}

async function reorderItems<T extends { id: string; orderIndex: number }>(col: string, items: T[]): Promise<T[]> {
  const batch = writeBatch(db);
  const next = items.map((item, i) => ({ ...item, orderIndex: i + 1 }));
  next.forEach((item) => batch.set(doc(db, col, item.id), item));
  await batch.commit();
  return next;
}

// Blogs
export const getAllBlogs = () => getOrdered<BlogPost>('blogs');
export const saveBlog = (b: BlogPost) => saveItem('blogs', b);
export const deleteBlog = (id: string) => deleteItem('blogs', id);
export const reorderBlogs = (list: BlogPost[]) => reorderItems('blogs', list);

// Portafolios / Categorías
export const getAllPortfolios = async (): Promise<PortfolioItem[]> => {
  const list = await getOrdered<PortfolioItem>('portfolios');
  return list.map((p) => ({ ...p, id: normalizePortfolioId(p.id) }));
};
export const savePortfolio = (p: PortfolioItem) => saveItem('portfolios', { ...p, id: normalizePortfolioId(p.id) });
export const deletePortfolio = (id: string) => deleteItem('portfolios', id);
export const reorderPortfolios = (list: PortfolioItem[]) => reorderItems('portfolios', list);

// Proyectos
export const getAllProjects = async (): Promise<ArchitecturalProject[]> => {
  const list = await getOrdered<ArchitecturalProject>('projects');
  return list.map((p) => ({ ...p, portfolio: normalizePortfolioId(p.portfolio) }));
};
export const saveProject = (p: ArchitecturalProject) => saveItem('projects', { ...p, portfolio: normalizePortfolioId(p.portfolio) });
export const deleteProject = (id: string) => deleteItem('projects', id);
export const reorderProjects = (list: ArchitecturalProject[]) => reorderItems('projects', list);

// Configuración del sitio (Medelsa)
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const snap = await getDoc(doc(db, 'settings', 'site'));
  if (!snap.exists()) return null;
  return { ...INITIAL_SETTINGS, ...(snap.data() as Partial<SiteSettings>) };
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  await setDoc(doc(db, 'settings', 'site'), { ...settings, id: 'site' });
}
