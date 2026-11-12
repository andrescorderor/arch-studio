import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import type { BlogPost } from '../data/content';
import { INITIAL_BLOGS } from '../data/content';

const BLOGS_COLLECTION = 'blogs';

// Obtener todos los blogs ordenados por orderIndex
export async function getBlogsFromFirestore(): Promise<BlogPost[]> {
  try {
    const q = query(collection(db, BLOGS_COLLECTION), orderBy('orderIndex', 'asc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Si la colección está vacía en Firestore, sembramos los iniciales
      for (const blog of INITIAL_BLOGS) {
        await setDoc(doc(db, BLOGS_COLLECTION, blog.id), blog);
      }
      return INITIAL_BLOGS;
    }

    return snapshot.docs.map((d) => d.data() as BlogPost);
  } catch (error) {
    console.warn('Firestore fallback: usando blogs iniciales en memoria.', error);
    return INITIAL_BLOGS;
  }
}

// Guardar o actualizar un blog
export async function saveBlogToFirestore(blog: BlogPost): Promise<void> {
  try {
    const docRef = doc(db, BLOGS_COLLECTION, blog.id);
    await setDoc(docRef, blog, { merge: true });
  } catch (error) {
    console.error('Error al guardar blog en Firestore:', error);
    throw error;
  }
}

// Eliminar un blog
export async function deleteBlogFromFirestore(id: string): Promise<void> {
  try {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error al eliminar blog de Firestore:', error);
    throw error;
  }
}

// Guardar nuevo orden masivo
export async function reorderBlogsInFirestore(blogs: BlogPost[]): Promise<void> {
  try {
    for (let i = 0; i < blogs.length; i++) {
      const b = { ...blogs[i], orderIndex: i + 1 };
      await setDoc(doc(db, BLOGS_COLLECTION, b.id), b, { merge: true });
    }
  } catch (error) {
    console.error('Error al reordenar blogs en Firestore:', error);
    throw error;
  }
}
