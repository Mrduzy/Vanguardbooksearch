import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  Send,
  HelpCircle
} from 'lucide-react';
import { SERVICE_CATEGORIES, ALL_SERVICES, ServiceItem } from '../data/servicesData';

interface ServicesPageProps {
  navigate: (route: string) => void;
  initialCategory?: string;
  onSelectServiceForEnquiry?: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  navigate,
  initialCategory,
  onSelectServiceForEnquiry
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [modalService, setModalService] = useState<ServiceItem | null>(null);

  // Sync category from URL params or props if present
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredCategories = useMemo(() => {
    return SERVICE_CATEGORIES.map(cat => {
      // If a category filter is selected and does not match, return empty services
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return { ...cat, services: [] };
      }

      // Filter by search query within this category
      if (!searchQuery.trim()) {
        return cat;
      }

      const q = searchQuery.toLowerCase().trim();
      const matched = cat.services.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.scope.some(item => item.toLowerCase().includes(q)) ||
        s.deliverables.toLowerCase().includes(q)
      );

      return { ...cat, services: matched };
    }).filter(cat => cat.services.length > 0);
  }, [selectedCategory, searchQuery]);

  const totalVisibleServices = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.services.length, 0);
  }, [filteredCategories]);

  const handleEnquireService = (service: ServiceItem) => {
    if (onSelectServiceForEnquiry) {
      onSelectServiceForEnquiry(service.name);
    }
    navigate(`/contact?service=${encodeURIComponent(service.name)}`);
  };

  return (
    <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header & Mission */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400" />
          <span>Complete Architectural Catalogue</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-stone-50 font-editorial-serif leading-tight">
          74 Specialized Disciplines in Book Discoverability and Positioning
        </h1>

        <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-light">
          Each offering represents an exact intervention designed to resolve specific discoverability friction. We evaluate individual book needs and apply only the relevant disciplines rather than imposing unnecessary packages.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="sticky top-20 z-30 py-4 -my-4 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none" role="tablist">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-900'
              }`}
            >
              All Categories ({ALL_SERVICES.length})
            </button>

            {SERVICE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-900'
                }`}
              >
                {cat.title} ({cat.services.length})
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search disciplines or keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 text-stone-900 dark:text-stone-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-1">
          <span>
            Displaying <strong className="text-stone-900 dark:text-stone-100">{totalVisibleServices}</strong> of {ALL_SERVICES.length} total services
          </span>
          {searchQuery && (
            <span>
              Filtering for <span className="italic">"{searchQuery}"</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Service Sections Grouped by Category */}
      <div className="space-y-20">
        {filteredCategories.length === 0 ? (
          <div className="p-16 text-center space-y-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100/40 dark:bg-stone-900/40">
            <HelpCircle className="w-8 h-8 text-stone-400 mx-auto" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-editorial-serif">
              No matching services found
            </h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              No disciplines match your search criteria. Try a different search term or reset your category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium text-stone-900 dark:text-stone-100 bg-stone-200 dark:bg-stone-800 rounded hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredCategories.map(category => (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              className="space-y-8 scroll-mt-36"
            >
              {/* Category Header Card */}
              <div className="border-b border-stone-200 dark:border-stone-800 pb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
                    {category.code} &middot; {category.services.length} SPECIALIZED SERVICES
                  </span>
                  <button
                    onClick={() => {
                      if (onSelectServiceForEnquiry) {
                        onSelectServiceForEnquiry(`Category: ${category.title}`);
                      }
                      navigate(`/contact?subject=${encodeURIComponent(`Enquiry regarding ${category.title}`)}`);
                    }}
                    className="text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    Enquire about this category &rarr;
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50 font-editorial-serif">
                  {category.title}
                </h2>

                <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  {category.headline}
                </p>

                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-3xl pt-1">
                  {category.description}
                </p>
              </div>

              {/* Individual Service Entries */}
              <div className="space-y-4">
                {category.services.map((service) => {
                  const isExpanded = expandedServiceId === service.id;

                  return (
                    <div
                      key={service.id}
                      className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white/70 dark:bg-stone-900/60 overflow-hidden transition-all duration-200 hover:border-amber-600/30"
                    >
                      <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-2 max-w-3xl">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-400">
                              {category.code}.{String(service.number).padStart(2, '0')}
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
                              {service.name}
                            </h3>
                          </div>

                          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                            {service.summary}
                          </p>

                          <div className="text-xs text-stone-500 dark:text-stone-400 pt-1">
                            <span className="font-semibold text-stone-700 dark:text-stone-300">Deliverable: </span>
                            <span className="italic">{service.deliverables}</span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                          <button
                            onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded transition-colors cursor-pointer"
                            aria-expanded={isExpanded}
                          >
                            <span>{isExpanded ? 'Hide Scope' : 'Detailed Scope'}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => handleEnquireService(service)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-700 rounded transition-colors cursor-pointer"
                          >
                            <span>Enquire</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Detailed Scope Area */}
                      {isExpanded && (
                        <div className="border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/60 dark:bg-stone-900/40 p-5 md:p-6 space-y-4">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                            Scope of Engagement &amp; Operational Checklist
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {service.scope.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300">
                                <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-xs">
                            <span className="text-stone-500 dark:text-stone-400">
                              Integrated within Vanguard Book Search Positioning Architecture
                            </span>
                            <button
                              onClick={() => handleEnquireService(service)}
                              className="text-amber-700 dark:text-amber-400 font-semibold hover:underline"
                            >
                              Request this discipline for your catalog &rarr;
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>

      {/* Consultative Bottom Box */}
      <div className="mt-16 p-8 md:p-12 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/40 space-y-4">
        <h3 className="text-2xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
          Unsure Which Disciplines Apply to Your Current Release?
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          You do not need to diagnose your own catalog in isolation. Contact Vanguard Book Search with your title or author profile, and we will perform an initial review to determine which areas offer genuine opportunity for reader discoverability.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-700 rounded transition-colors cursor-pointer"
          >
            <span>Request Diagnostic Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
