import React, { useState } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, navigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Method & Architecture', path: '/method' },
    { label: 'Author Feedback', path: '/feedback' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded"
            aria-label="VANGUARDBOOKSEARCH Home"
          >
            <BrandLogo size="md" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative py-1 text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-stone-950 dark:text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 dark:bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100/80 dark:bg-stone-900/80 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-50 hover:border-stone-300 dark:hover:border-stone-700 transition-all cursor-pointer shadow-xs"
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="hidden lg:inline text-[11px] font-medium tracking-wide">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                  <span className="hidden lg:inline text-[11px] font-medium tracking-wide">Dark</span>
                </>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleLinkClick('/contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-700 rounded transition-colors shadow-sm cursor-pointer"
            >
              <span>Enquire on Positioning</span>
              <ArrowUpRight className="w-4 h-4 opacity-75" />
            </button>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 cursor-pointer"
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-stone-600 dark:text-stone-400" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 pt-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-left px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold'
                      : 'text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Theme Toggle Row */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/40">
            <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
              Appearance Theme
            </span>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-white dark:bg-stone-850 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-100 shadow-xs cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Switch to Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                  <span>Switch to Dark</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={() => handleLinkClick('/contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-700 rounded transition-colors"
            >
              <span>Enquire on Positioning</span>
              <ArrowUpRight className="w-4 h-4 opacity-75" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
