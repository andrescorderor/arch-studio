import { collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import type { ArchitecturalProject, BlogPost, PortfolioItem } from '../data/content';

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

// Portafolios
export const getAllPortfolios = () => getOrdered<PortfolioItem>('portfolios');
export const savePortfolio = (p: PortfolioItem) => saveItem('portfolios', p);
export const deletePortfolio = (id: string) => deleteItem('portfolios', id);
export const reorderPortfolios = (list: PortfolioItem[]) => reorderItems('portfolios', list);

// Proyectos
export const getAllProjects = () => getOrdered<ArchitecturalProject>('projects');
export const saveProject = (p: ArchitecturalProject) => saveItem('projects', p);
export const deleteProject = (id: string) => deleteItem('projects', id);
export const reorderProjects = (list: ArchitecturalProject[]) => reorderItems('projects', list);
