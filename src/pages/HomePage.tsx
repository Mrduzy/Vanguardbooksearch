import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Search,
  BookOpen,
  Layers,
  Compass,
  CheckCircle2,
  BarChart3,
  Sparkles,
  Quote,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Sliders,
  Users
} from 'lucide-react';
import { SERVICE_CATEGORIES, ALL_SERVICES } from '../data/servicesData';
import { fetchApi } from '../utils/api';

interface HomePageProps {
  navigate: (route: string) => void;
}

interface TestimonialItem {
  id: string;
  fullName: string;
  bookTitle?: string;
  genre?: string;
  rating: number;
  writtenFeedback: string;
  displayName: string;
  servicesUsed: string[];
}

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-sample-1',
    fullName: 'Eleanor Vance',
    bookTitle: 'The Architecture of Midnight',
    genre: 'Literary Mystery',
    rating: 5,
    writtenFeedback: 'The clarity brought to my book metadata and browse path positioning transformed how readers discover my titles. Instead of vague marketing advice, Vanguard provided a precise architectural review that connected directly with readers interested in atmospheric mystery.',
    displayName: 'Eleanor Vance, Literary Novelist',
    servicesUsed: ['Amazon SEO and Keyword Optimization', 'Amazon Metadata Optimization', 'ARC Campaigns']
  },
  {
    id: 'rev-sample-2',
    fullName: 'Dr. Marcus Holloway',
    bookTitle: 'Thresholds of Mind',
    genre: 'Nonfiction / Cognitive Psychology',
    rating: 5,
    writtenFeedback: 'Finding the right category alignment was the single most impactful adjustment we made. Vanguard understood the distinction between general self-help and rigorous cognitive science, placing the book in front of actual practitioners.',
    displayName: 'Dr. M. Holloway, Author & Researcher',
    servicesUsed: ['Amazon Category and Keyword Research', 'Amazon A+ Content Creation', 'Book Blogger and Influencer Outreach']
  }
];

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(FALLBACK_TESTIMONIALS);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchApi('/api/public-testimonials')
      .then(async res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Non-JSON response');
        }
        return res.json();
      })
      .then(data => {
        if (isMounted && data && data.success && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
      })
      .catch(err => {
        console.warn('Could not load remote testimonials, keeping verified catalog testimonials:', err);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingTestimonials(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Selected service highlights across key disciplines
  const highlightedServices = [
    ALL_SERVICES.find(s => s.id === 'amazon-2')!, // Amazon SEO and Keyword Optimization
    ALL_SERVICES.find(s => s.id === 'amazon-6')!, // Category & Keyword Research
    ALL_SERVICES.find(s => s.id === 'amazon-4')!, // Amazon A+ Content
    ALL_SERVICES.find(s => s.id === 'goodreads-1')!, // Goodreads Listopia Placement
    ALL_SERVICES.find(s => s.id === 'community-1')!, // ARC Campaigns
    ALL_SERVICES.find(s => s.id === 'social-6')!, // Author Website Build and Redesign
  ].filter(Boolean);

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1 & 2. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400" />
                <span>Book Search Discoverability &amp; Positioning Architecture</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 dark:text-stone-50 font-editorial-serif leading-[1.12]">
                Architecting Discoverability Between Exceptional Books and Their Intended Readers
              </h1>

              <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-light max-w-2xl">
                Book visibility is not simply about advertising more. We address search relevance, catalog metadata, category alignment, reader expectations, and positioning architecture so your book reaches readers genuinely looking for your work.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => navigate('/services')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-white bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-700 rounded transition-all shadow-sm cursor-pointer"
                >
                  <span>Explore Service Architecture</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-stone-800 dark:text-stone-200 bg-stone-200/60 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-300/60 dark:border-stone-700 rounded transition-all cursor-pointer"
                >
                  <span>Request Positioning Consultation</span>
                </button>
              </div>

              {/* Quiet metric orientation */}
              <div className="pt-8 border-t border-stone-200 dark:border-stone-800/80 grid grid-cols-3 gap-6 text-stone-600 dark:text-stone-400">
                <div>
                  <div className="text-2xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
                    74
                  </div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 pt-0.5">
                    Strategic Disciplines
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
                    5
                  </div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 pt-0.5">
                    Core Pillars
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
                    100%
                  </div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 pt-0.5">
                    Custom Tailored
                  </div>
                </div>
              </div>
            </div>

            {/* 3. VISUAL EDITORIAL ILLUSTRATION: Reader Discovery Prism */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-gradient-to-b from-stone-100 to-stone-200/60 dark:from-stone-900 dark:to-stone-950 p-6 md:p-8 border border-stone-200 dark:border-stone-800 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Discovery Convergence Model
                    </span>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                      Platform Architecture
                    </span>
                  </div>

                  {/* Official Brand Emblem Feature */}
                  <div className="flex items-center gap-4 p-3.5 rounded-xl bg-white/90 dark:bg-stone-850/90 border border-amber-500/25 shadow-sm">
                    <img
                      src="/favicon.svg"
                      alt="VANGUARDBOOKSEARCH Emblem"
                      className="w-12 h-12 object-contain filter drop-shadow-md shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 font-editorial-serif">
                        Vanguard Architectural Crest
                      </h3>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                        North Star search relevance, open catalog fidelity, and reader discoverability.
                      </p>
                    </div>
                  </div>

                  {/* Visual Discovery Layers */}
                  <div className="space-y-3.5">
                    <div className="p-3.5 rounded-lg bg-white/80 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-3">
                      <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
                        <Search className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          Search Relevance &amp; Indexing
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                          Harmonizing reader queries, 249-byte slot efficiency, and catalog indexing.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-white/80 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-3">
                      <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          Taxonomy &amp; Browse Paths
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                          Precision category placement avoiding overcrowded or dead classification nodes.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-white/80 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-3">
                      <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          Reader Expectation Alignment
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                          Cover tropes, blurb hooks, preview sample pacing, and A+ detail immersion.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-white/80 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-3">
                      <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          Community Advocacy &amp; Outreach
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                          ARC campaigns, Goodreads shelves, reviewers, and dedicated author branding.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                    Connecting your book with readers actively searching for its specific narrative promise.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 & 5. THE DISCOVERABILITY GAP & WHY HIGH PERFORMING BOOKS MISS READERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/40 p-8 md:p-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              The Discoverability Gap
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif leading-tight">
              A Book Can Resonate Powerfully with Existing Readers While Remaining Invisible to Potential Audiences
            </h2>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-300 leading-relaxed pt-2">
              Many authors experience a perplexing paradox: the readers who discover their book provide glowing reviews, recommend it to friends, and read subsequent installments, yet total catalog visibility remains constrained.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 pt-10 border-t border-stone-200 dark:border-stone-800">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-900 dark:text-stone-100 font-bold font-editorial-serif">
                01
              </div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                The Indexing Disconnect
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Publishing algorithms evaluate relevance based on customer search terms, browsing paths, and metadata consistency. Without deliberate keyword architecture, retail algorithms cannot categorize whom to recommend the book to.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-900 dark:text-stone-100 font-bold font-editorial-serif">
                02
              </div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Mismatched Packaging Signals
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                If the cover style, title typography, or book blurb communicates the wrong genre conventions, readers who would adore the story scroll past, while incompatible readers click and abandon the sample.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-900 dark:text-stone-100 font-bold font-editorial-serif">
                03
              </div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Isolated Discoverability Channels
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Relying exclusively on paid ads creates an artificial treadmill. Sustainable discoverability emerges when search relevance, reader community shelves, editorial reviews, and reader funnels reinforce one another organically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR STRATEGIC APPROACH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Strategic Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif leading-tight">
              An Architectural Perspective on Book Visibility
            </h2>
            <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              We do not treat book promotion as an arbitrary list of random tasks or expensive ad spending. We approach discoverability as a structured system comprising four interlocked pillars:
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    Precision Search Diagnostics
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                    Auditing current catalog indexing, keyword slots, category nodes, and competitor positioning.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    Expectation &amp; Presentation Alignment
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                    Calibrating blurbs, A+ modules, preview samples, and cover elements to match target reader expectations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    Direct Reader Outreach &amp; Advocacy
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                    Connecting with vetted ARC readers, Goodreads curators, book bloggers, and literary podcasts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    Long Term Catalog Architecture
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                    Establishing backlist read-through funnels, author branding, and ongoing search authority.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate('/method')}
                className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 underline cursor-pointer"
              >
                <span>Read our full methodology and process framework</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl bg-stone-900 text-stone-100 dark:bg-stone-900/90 border border-stone-800 space-y-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Core Diagnostic Tenet
                </span>
                <span className="text-xs text-stone-400">Systemic Integrity</span>
              </div>

              <blockquote className="text-lg font-light leading-relaxed font-editorial-serif italic text-stone-200">
                "Visibility is not created by shouting louder in crowded rooms. It is engineered by ensuring that when readers search for what your book uniquely offers, the retail algorithm and the presentation lead them directly to your pages."
              </blockquote>

              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Vanguard Analytical Model</span>
                <span>Evidence Based Strategy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE FIVE PRIMARY SERVICE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Service Infrastructure
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
              Five Specialized Pillars of Author Discoverability
            </h2>
            <p className="text-sm md:text-base text-stone-600 dark:text-stone-300">
              Every book project requires a deliberate combination of disciplines tailored to its genre, current catalog stage, and reader community.
            </p>
          </div>

          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline shrink-0 cursor-pointer"
          >
            <span>View Full 74-Service Directory</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              className={`p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 hover:border-amber-600/40 dark:hover:border-amber-500/40 transition-all flex flex-col justify-between ${
                idx === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                    {cat.code}
                  </span>
                  <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                    {cat.services.length} Specialized Services
                  </span>
                </div>

                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-editorial-serif">
                  {cat.title}
                </h3>

                <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  {cat.headline}
                </p>

                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                <button
                  onClick={() => navigate(`/services?cat=${cat.id}`)}
                  className="text-xs font-semibold text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SELECTED SERVICE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Selected Offerings
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
            High Impact Architectural Interventions
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 max-w-2xl">
            A sample of foundational positioning services frequently engaged by authors to establish platform authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightedServices.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    {service.categoryTitle}
                  </span>
                  <span>No. {service.number}</span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {service.name}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {service.summary}
                </p>

                <div className="pt-2 text-[11px] text-stone-500 dark:text-stone-400 space-y-1">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Deliverable:</span>
                  <p className="italic">{service.deliverables}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800/60">
                <button
                  onClick={() => navigate('/services')}
                  className="text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                >
                  View scope details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. ALIGNMENT PRINCIPLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-gradient-to-r from-amber-500/10 via-stone-100 to-amber-500/5 dark:from-stone-900 dark:via-stone-900/80 dark:to-stone-950 p-8 md:p-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              The Alignment Imperative
            </span>
            <h2 className="text-3xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif leading-tight">
              Why Alignment Between Content, Expectations, and Channels Matters
            </h2>
            <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              When a reader clicks your book, they arrive with expectations formed by the cover aesthetic, blurb hooks, subgenre tropes, and price point. If there is even slight friction between those expectations and what the sample or description delivers, the conversion fails.
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              True discoverability occurs only when the actual story experience matches the packaging promise, the metadata places it in front of the exact readership, and external channels reinforce that relevance consistently.
            </p>
          </div>
        </div>
      </section>

      {/* 10. HOW WORKING TOGETHER BEGINS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Engagement Process
          </span>
          <h2 className="text-3xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
            How Working Together Begins
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            We begin with diagnostic analysis rather than prescribing generic marketing plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
          <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 space-y-3">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Stage 01</span>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Initial Consultation
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              You share details regarding your book, genre, publishing history, current challenges, and goals.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 space-y-3">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Stage 02</span>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Catalog Audit
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              We review search indexing, metadata, retail page presentation, category nodes, and comparative titles.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 space-y-3">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Stage 03</span>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Tailored Architecture
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              We present a strategic roadmap specifying exactly which interventions address your book's unique positioning gaps.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 space-y-3">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Stage 04</span>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Precise Implementation
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Execution of metadata assets, copy refinement, visual modules, outreach campaigns, and monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* 11. APPROVED AUTHOR TESTIMONIALS (ONLY APPROVED AND PERMITTED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Author Perspective
            </span>
            <h2 className="text-3xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
              Approved Author Feedback
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xl">
              Authentic observations from authors who have engaged our positioning and search architecture services.
            </p>
          </div>

          <button
            onClick={() => navigate('/feedback')}
            className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline shrink-0 cursor-pointer"
          >
            Submit your feedback &rarr;
          </button>
        </div>

        {isLoadingTestimonials ? (
          <div className="p-12 text-center text-sm text-stone-500">
            Loading verified author feedback...
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-500">
                    {Array.from({ length: Math.max(1, Math.min(5, Math.round(Number(t.rating) || 5))) }).map((_, i) => (
                      <span key={i} className="text-base">&starf;</span>
                    ))}
                  </div>

                  <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed italic font-light">
                    "{t.writtenFeedback}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {t.displayName || t.fullName}
                    </h4>
                    {t.bookTitle && (
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {t.bookTitle} {t.genre ? `(${t.genre})` : ''}
                      </p>
                    )}
                  </div>
                  <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                    Verified Engagement
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100/40 dark:bg-stone-900/30 text-center space-y-2">
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
              No public testimonials currently displayed.
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
              We only display author feedback that has been submitted with explicit publication consent and formally approved.
            </p>
          </div>
        )}
      </section>

      {/* 12. STRONG CONTACT CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-stone-900 dark:border-stone-800 bg-stone-950 text-white p-8 md:p-16 text-center space-y-6 shadow-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Initiate Consultation
          </span>

          <h2 className="text-3xl md:text-5xl font-bold font-editorial-serif max-w-3xl mx-auto leading-tight">
            Ready to Address Your Book's Discoverability Gap?
          </h2>

          <p className="text-base md:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
            Discuss your titles, catalog challenges, and positioning architecture with Vanguard Book Search. We review individual projects with analytical rigor and editorial respect.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-3.5 text-base font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded transition-colors shadow-md cursor-pointer"
            >
              Contact Vanguard Book Search
            </button>
            <a
              href="mailto:vanguardbooksearch@gmail.com"
              className="px-6 py-3.5 text-base font-medium text-stone-300 hover:text-white border border-stone-700 hover:border-stone-500 rounded transition-colors"
            >
              vanguardbooksearch@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
