import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { MethodPage } from './pages/MethodPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const REPO_BASE = '/Vanguardbooksearch';

function stripBasePath(path: string): string {
  if (!path) return '/';
  let normalized = path;
  if (normalized.toLowerCase().startsWith(REPO_BASE.toLowerCase())) {
    normalized = normalized.slice(REPO_BASE.length);
  }
  normalized = normalized.replace(/\/+$/, '');
  return normalized === '' ? '/' : normalized;
}

function getInitialPath(): string {
  if (typeof window === 'undefined') return '/';
  const pathname = window.location.pathname;
  if (pathname) {
    const stripped = stripBasePath(pathname);
    if (stripped !== '/') return stripped;
  }
  if (window.location.hash && window.location.hash.startsWith('#/')) {
    return stripBasePath(window.location.hash.substring(1));
  }
  return '/';
}

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(getInitialPath);

  const [routeParams, setRouteParams] = useState<{
    cat?: string;
    service?: string;
    subject?: string;
  }>({});

  // Sync route and query params with window.location
  useEffect(() => {
    const handleLocationChange = () => {
      const path = getInitialPath();
      const search = new URLSearchParams(window.location.search);
      setCurrentRoute(path);
      setRouteParams({
        cat: search.get('cat') || undefined,
        service: search.get('service') || undefined,
        subject: search.get('subject') || undefined
      });
      window.scrollTo(0, 0);
    };

    // Initial check
    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (to: string) => {
    const [pathPart, queryString] = to.split('?');
    const searchParams = new URLSearchParams(queryString || '');
    const logicalPath = stripBasePath(pathPart);
    
    // Check if we are running under the GitHub Pages base path
    const isUnderRepo = typeof window !== 'undefined' && 
      window.location.pathname.toLowerCase().startsWith(REPO_BASE.toLowerCase());
    
    const browserPath = (isUnderRepo ? REPO_BASE : '') + 
      (logicalPath === '/' ? '/' : logicalPath) + 
      (queryString ? `?${queryString}` : '');

    try {
      window.history.pushState({}, '', browserPath);
    } catch {
      window.location.hash = (logicalPath === '/' ? '/' : logicalPath) + 
        (queryString ? `?${queryString}` : '');
    }

    setCurrentRoute(logicalPath);
    setRouteParams({
      cat: searchParams.get('cat') || undefined,
      service: searchParams.get('service') || undefined,
      subject: searchParams.get('subject') || undefined
    });
    window.scrollTo(0, 0);
  };

  // Determine which page component to display
  const renderCurrentPage = () => {
    const clean = stripBasePath(currentRoute);
    switch (clean) {
      case '/services':
        return (
          <ServicesPage
            navigate={navigate}
            initialCategory={routeParams.cat}
            onSelectServiceForEnquiry={(name) => {
              navigate(`/contact?service=${encodeURIComponent(name)}`);
            }}
          />
        );
      case '/method':
        return <MethodPage navigate={navigate} />;
      case '/feedback':
        return <FeedbackPage navigate={navigate} />;
      case '/contact':
        return (
          <ContactPage
            initialSubject={routeParams.subject}
            initialService={routeParams.service}
          />
        );
      case '/admin':
        return <AdminPage />;
      case '/':
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  // Check if current view is private admin
  const isAdminView = currentRoute === '/admin';

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-200">
        <Header currentRoute={currentRoute} navigate={navigate} />

        <main className="flex-1">
          {renderCurrentPage()}
        </main>

        {/* Footer is displayed across public routes */}
        {!isAdminView && <Footer navigate={navigate} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
