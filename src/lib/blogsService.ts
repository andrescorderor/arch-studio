import {
  collection, getDocs, doc, setDoc, deleteDoc, query, where, writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import type { BlogPost } from '../data/content';

const COL = 'blogs';
const byOrder = (a: BlogPost, b: BlogPost) => a.orderIndex - b.orderIndex;

/** Lectura pública: solo artículos publicados (las reglas de Firestore lo exigen). */
export async function getPublishedBlogs(): Promise<BlogPost[]> {
  const snap = await getDocs(query(collection(db, COL), where('isPublished', '==', true)));
  return snap.docs.map((d) => d.data() as BlogPost).sort(byOrder);
}

/** Lectura de administración: incluye borradores (requiere sesión). */
export async function getAllBlogs(): Promise<BlogPost[]> {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => d.data() as BlogPost).sort(byOrder);
}

export async function saveBlog(blog: BlogPost): Promise<void> {
  await setDoc(doc(db, COL, blog.id), blog);
}

export async function deleteBlog(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}

export async function reorderBlogs(blogs: BlogPost[]): Promise<BlogPost[]> {
  const batch = writeBatch(db);
  const next = blogs.map((b, i) => ({ ...b, orderIndex: i + 1 }));
  next.forEach((b) => batch.set(doc(db, COL, b.id), b));
  await batch.commit();
  return next;
}
