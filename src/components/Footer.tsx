import React from 'react';
import { Mail, Globe, ArrowRight, Sun, Moon, Lock } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-950 text-stone-700 dark:text-stone-300 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo size="md" />
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-md pt-2">
              Book search discoverability and positioning architecture. Helping authors identify and address the gap between how well their books perform with existing readers and how many of the right readers have had the opportunity to discover them.
            </p>
            <div className="pt-2 space-y-2 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
                <a
                  href="https://vanguardbooksearch.com"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  https://vanguardbooksearch.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
                <a
                  href="mailto:vanguardbooksearch@gmail.com"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  vanguardbooksearch@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Primary Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Services Directory (74 Disciplines)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/method')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Method and Positioning Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/feedback')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Author Feedback Submission
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Contact and Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/admin')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer inline-flex items-center gap-1.5 text-stone-500 dark:text-stone-400 pt-1"
                >
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Admin Gateway</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Architectural Categories */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Service Architecture
            </h4>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li className="flex items-center justify-between">
                <span>Amazon Search &amp; Catalog Services</span>
                <span className="text-xs text-stone-400 dark:text-stone-500">20 Offerings</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Goodreads Community &amp; Shelves</span>
                <span className="text-xs text-stone-400 dark:text-stone-500">14 Offerings</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Community Outreach &amp; Reviews</span>
                <span className="text-xs text-stone-400 dark:text-stone-500">11 Offerings</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Visual Content &amp; Media Assets</span>
                <span className="text-xs text-stone-400 dark:text-stone-500">13 Offerings</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Social Media &amp; Digital Marketing</span>
                <span className="text-xs text-stone-400 dark:text-stone-500">16 Offerings</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => navigate('/services')}
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
              >
                <span>Browse complete catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-4">
          <p>
            &copy; 2026 VANGUARDBOOKSEARCH. All rights reserved. Strategic book discoverability and positioning architecture.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                  <span>Dark Theme</span>
                </>
              )}
            </button>
            <p className="text-center sm:text-right hidden sm:block">
              Dedicated to author visibility and catalog fidelity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
