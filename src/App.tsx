import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './i18n';
import { ToastProvider } from './context/ToastContext';
import { ContactProvider } from './context/ContactContext';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import { PortfoliosIndex, PortfolioPage, ProjectPage } from './pages/Portfolios';
import { About, Awards, Blog, BlogPostPage, Contact, Privacy } from './pages/Pages';

// El editor (TipTap) solo se descarga al entrar al panel.
const Admin = lazy(() => import('./pages/Admin'));

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ContactProvider>
            <Suspense fallback={<div className="min-h-screen bg-[#121214]" />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="portafolios" element={<PortfoliosIndex />} />
                  <Route path="portafolios/:pid" element={<PortfolioPage />} />
                  <Route path="portafolios/:pid/:projectId" element={<ProjectPage />} />
                  <Route path="nosotros" element={<About />} />
                  <Route path="menciones" element={<Awards />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="blog/:slug" element={<BlogPostPage />} />
                  <Route path="contacto" element={<Contact />} />
                  <Route path="aviso-de-privacidad" element={<Privacy />} />
                  <Route path="admin" element={<Admin />} />
                  <Route path="*" element={<Home />} />
                </Route>
              </Routes>
            </Suspense>
        </ContactProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
