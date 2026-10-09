import React, { useState } from 'react';
import {
  Search,
  Layers,
  Sliders,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  Users,
  Compass,
  FileCheck
} from 'lucide-react';

interface MethodPageProps {
  navigate: (route: string) => void;
}

interface MethodStage {
  step: string;
  number: string;
  title: string;
  subtitle: string;
  overview: string;
  diagnosticQuestions: string[];
  operationalActions: string[];
  deliverableOutput: string;
}

export const MethodPage: React.FC<MethodPageProps> = ({ navigate }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const stages: MethodStage[] = [
    {
      step: 'Stage 01',
      number: '01',
      title: 'Discovery and Assessment',
      subtitle: 'Comprehensive catalog orientation and positioning baseline',
      overview: 'We start by examining the book as an individual cultural and commercial artifact. Rather than assuming standard flaws, we review the history of the title, historical reader reactions, current retail performance, author catalog goals, and genre landscape.',
      diagnosticQuestions: [
        'How does the book currently perform when readers actually discover it?',
        'What specific subgenre or reader expectations define the ideal audience?',
        'What platform distribution channels (KDP Select, Wide, IngramSpark) are active?',
        'What past promotional initiatives have succeeded or plateaued?'
      ],
      operationalActions: [
        'Analysis of existing customer ratings and qualitative review sentiment',
        'Catalog read-through audit across series installments or companion titles',
        'Historical retail velocity and ranking baseline benchmarking',
        'Definition of the primary reader avatar and search behavior'
      ],
      deliverableOutput: 'Initial Catalog Baseline Dossier and Opportunity Assessment'
    },
    {
      step: 'Stage 02',
      number: '02',
      title: 'Search Visibility and Metadata Analysis',
      subtitle: 'Technical inspection of platform indexing and retail algorithm inputs',
      overview: 'Book search engines operate on structured data. We audit whether the current catalog metadata matches how prospective readers construct search queries on Amazon and Google.',
      diagnosticQuestions: [
        'Is the book indexing for its primary genre and theme keywords?',
        'Are backend search fields fully utilized without character waste or duplication?',
        'Do subtitle and contributor fields adhere to retailer guidelines?',
        'Are series pages and multi-format editions correctly interconnected?'
      ],
      operationalActions: [
        'Harvesting high intent search queries and comp-author search patterns',
        '249-byte backend search slot efficiency modeling',
        'Kindle and Audible cross-edition metadata verification',
        'Identification of search index suppressions or catalog friction'
      ],
      deliverableOutput: 'Comprehensive Search Indexing &amp; Metadata Diagnostic'
    },
    {
      step: 'Stage 03',
      number: '03',
      title: 'Category, Keyword, and Positioning Alignment',
      subtitle: 'Classification taxonomy and subcategory competitiveness',
      overview: 'Placing a book in an overly broad category buries it beneath thousands of unrelated titles. Placing it in an inaccurate category confuses algorithms and alienates buyers. We map the catalog to precise browse paths where reader discovery is viable.',
      diagnosticQuestions: [
        'Which specific browse nodes accurately reflect the story content?',
        'What are the daily sales velocity thresholds required for ranking visibility?',
        'Are there emerging subcategories with passionate, underserviced readers?',
        'Does the classification support long term algorithmic recommendation?'
      ],
      operationalActions: [
        'BISAC mapping to Amazon browse nodes and international storefronts',
        'Competitor density and velocity requirement analysis per category',
        'Formulation of category adjustment tickets for publisher submission',
        'Keyword clustering across promotional and organic touchpoints'
      ],
      deliverableOutput: 'Targeted Category Hierarchy &amp; Search Keyword Blueprint'
    },
    {
      step: 'Stage 04',
      number: '04',
      title: 'Book Presentation and Reader Expectation Alignment',
      subtitle: 'Refining detail page conversion, cover signals, and sample immersion',
      overview: 'Discoverability is useless if arriving readers do not convert. We calibrate every visual and editorial element on the retail product page to ensure seamless alignment with reader genre expectations.',
      diagnosticQuestions: [
        'Does the cover typography and iconography signal the exact genre tropes?',
        'Does the book description hook readers in the opening two sentences?',
        'Are A+ Content modules deepening reader engagement or causing clutter?',
        'Does the Look Inside sample hook the reader before the preview ends?'
      ],
      operationalActions: [
        'Book blurb rewriting utilizing psychological hooks and genre conventions',
        'A+ Content modular architecture layout and graphic asset design',
        'Look Inside front matter trimming to optimize early sample flow',
        'Cover redesign critique and illustrator creative brief preparation'
      ],
      deliverableOutput: 'High Converting Product Detail Page Architecture'
    },
    {
      step: 'Stage 05',
      number: '05',
      title: 'Relevant Reader Access and Outreach',
      subtitle: 'Grassroots reader advocacy, ethical reviews, and community placement',
      overview: 'Algorithms follow reader activity. We construct targeted outreach initiatives that connect the book with dedicated readers, vetted advance reviewers, book club curators, and literary influencers.',
      diagnosticQuestions: [
        'Where do avid readers of this subgenre congregate and discuss titles?',
        'How can early reviews be gathered ethically in full compliance with retailer policies?',
        'Which Goodreads Listopia lists and reading shelves influence purchase decisions?',
        'What podcast or media opportunities match the author background?'
      ],
      operationalActions: [
        'Vetted ARC campaign management and launch week review synchronization',
        'Goodreads profile, giveaway, and Listopia placement campaigns',
        'Targeted outreach to book bloggers, Substack reviewers, and BookTubers',
        'Discussion guide creation for book clubs and library distribution'
      ],
      deliverableOutput: 'Integrated Reader Outreach &amp; Review Acquisition Plan'
    },
    {
      step: 'Stage 06',
      number: '06',
      title: 'Implementation and Performance Monitoring',
      subtitle: 'Systemic execution, iterative tracking, and catalog stabilization',
      overview: 'Positioning is an iterative discipline, not a one-time event. We monitor algorithmic indexing, search query ranking, review momentum, and catalog read-through to ensure sustainable progress.',
      diagnosticQuestions: [
        'Are retail algorithms beginning to index the title for target search terms?',
        'How is the conversion rate from detail page views to purchases shifting?',
        'Is backlist read-through occurring from entry titles to sequels?',
        'What seasonal or competitive adjustments are warranted?'
      ],
      operationalActions: [
        'Ongoing rank and search indexing monitoring across retail platforms',
        'A/B comparison of blurb headline variants and advertising efficiency',
        'Back matter review solicitation and newsletter funnel integration',
        'Quarterly strategic catalog review and roadmap adjustments'
      ],
      deliverableOutput: 'Performance Analytics Dashboard &amp; Long Term Retention Roadmap'
    }
  ];

  return (
    <div className="space-y-20 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Page Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400" />
          <span>Methodology &amp; Positioning Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-stone-50 font-editorial-serif leading-tight">
          How Vanguard Approaches Book Discoverability
        </h1>

        <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-light">
          A coherent strategic process grounded in evidence, catalog analysis, and reader behavior. We do not offer generic marketing formulas, and we do not make unsupported guarantees.
        </p>
      </div>

      {/* Strategic Notice Banner */}
      <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/40 space-y-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
        <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 text-sm">
          <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-500" />
          <span>Individualized Strategy Principle</span>
        </div>
        <p>
          The appropriate positioning architecture depends strictly upon the individual book, its subgenre, existing catalog presentation, intended readership, publishing distribution model, and available evidence. We never imply that every author needs every service. We evaluate what is necessary for your specific catalog.
        </p>
      </div>

      {/* Interactive Process Pipeline */}
      <div className="space-y-8">
        <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
          <h2 className="text-2xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
            The Six Sequential Stages of Positioning Architecture
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Click through any stage below to inspect its diagnostic criteria, operational tasks, and strategic outputs.
          </p>
        </div>

        {/* Stage Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {stages.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? 'border-amber-600 dark:border-amber-500 bg-white dark:bg-stone-900 shadow-md ring-1 ring-amber-600/30'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-stone-400 dark:text-stone-500 mb-1">
                  <span>{stage.number}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />}
                </div>
                <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-2">
                  {stage.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        {(() => {
          const current = stages[activeStageIndex];
          return (
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/60 p-8 md:p-10 space-y-8 shadow-sm">
              <div className="space-y-2 border-b border-stone-100 dark:border-stone-800 pb-6">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-700 dark:text-amber-400">
                  <span>{current.step}</span>
                  <span>&middot;</span>
                  <span>PROCESS FRAMEWORK</span>
                </div>
                <h3 className="text-3xl font-bold text-stone-950 dark:text-stone-50 font-editorial-serif">
                  {current.title}
                </h3>
                <p className="text-base font-medium text-stone-700 dark:text-stone-300">
                  {current.subtitle}
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed pt-2 max-w-4xl">
                  {current.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Diagnostic Inquiries */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Search className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                    <span>Key Diagnostic Inquiries</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-stone-600 dark:text-stone-300">
                    {current.diagnosticQuestions.map((q, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-amber-600 dark:text-amber-500 font-bold">&bull;</span>
                        <span className="leading-relaxed">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Operational Actions */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                    <span>Operational Actions</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-stone-600 dark:text-stone-300">
                    {current.operationalActions.map((act, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Output Deliverable */}
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    Stage Deliverable:
                  </span>
                  <span className="ml-2 text-stone-600 dark:text-stone-400">
                    {current.deliverableOutput}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {activeStageIndex > 0 && (
                    <button
                      onClick={() => setActiveStageIndex(activeStageIndex - 1)}
                      className="px-3 py-1.5 rounded text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer"
                    >
                      &larr; Previous Stage
                    </button>
                  )}
                  {activeStageIndex < stages.length - 1 && (
                    <button
                      onClick={() => setActiveStageIndex(activeStageIndex + 1)}
                      className="px-3 py-1.5 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-medium cursor-pointer"
                    >
                      Next Stage &rarr;
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* No Unsupported Guarantees Clarification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="p-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 space-y-3">
          <h3 className="text-xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
            What We Do Not Guarantee
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            In publishing, anyone who promises specific bestseller rankings, fixed revenue figures, guaranteed five star reviews, or overnight algorithmic miracles is either relying on policy violating schemes or fabricating outcomes. Vanguard Book Search does not make performance guarantees or commercial promises.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 space-y-3">
          <h3 className="text-xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
            What We Rigorously Deliver
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            We deliver analytical rigor, meticulous catalog metadata, precision category placement, professional packaging alignment, compliant reviewer outreach, and transparent reporting. We ensure that every structural barrier preventing your intended readers from finding your work is methodically addressed.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center p-12 rounded-2xl bg-stone-900 text-white space-y-4">
        <h3 className="text-3xl font-bold font-editorial-serif">
          Ready to Examine Your Catalog Architecture?
        </h3>
        <p className="text-sm text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
          Contact our team for a preliminary discussion regarding your titles, genres, and discoverability challenges.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3 text-sm font-semibold text-stone-900 bg-amber-500 hover:bg-amber-400 rounded transition-colors cursor-pointer"
          >
            Schedule Preliminary Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
