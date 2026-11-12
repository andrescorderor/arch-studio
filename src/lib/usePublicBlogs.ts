import { useEffect, useState } from 'react';
import { INITIAL_BLOGS } from '../data/content';
import type { BlogPost } from '../data/content';

/** Blogs públicos: Firestore si hay datos; si la colección está vacía o no responde, contenido editorial inicial.
 *  Firestore se importa de forma diferida para no penalizar la carga inicial. */
export function usePublicBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    import('./blogsService')
      .then((m) => m.getPublishedBlogs())
      .then((d) => { if (alive && d.length) setBlogs(d); })
      .catch(() => { /* se mantiene el contenido inicial */ })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);
  return { blogs, loading };
}
