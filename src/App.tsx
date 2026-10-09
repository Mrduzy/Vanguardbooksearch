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

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [routeParams, setRouteParams] = useState<{
    cat?: string;
    service?: string;
    subject?: string;
  }>({});

  // Sync route and query params with window.location
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname || '/';
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
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (to: string) => {
    const [path, queryString] = to.split('?');
    const searchParams = new URLSearchParams(queryString || '');
    
    window.history.pushState({}, '', to);
    setCurrentRoute(path || '/');
    setRouteParams({
      cat: searchParams.get('cat') || undefined,
      service: searchParams.get('service') || undefined,
      subject: searchParams.get('subject') || undefined
    });
    window.scrollTo(0, 0);
  };

  // Determine which page component to display
  const renderCurrentPage = () => {
    switch (currentRoute) {
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
