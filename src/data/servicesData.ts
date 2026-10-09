export interface ServiceItem {
  id: string;
  category: 'amazon' | 'goodreads' | 'community' | 'visual' | 'social';
  categoryTitle: string;
  number: number;
  name: string;
  summary: string;
  scope: string[];
  deliverables: string;
}

export interface ServiceCategory {
  id: 'amazon' | 'goodreads' | 'community' | 'visual' | 'social';
  title: string;
  code: string;
  headline: string;
  description: string;
  services: ServiceItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'amazon',
    title: 'Amazon Services',
    code: 'CAT-01',
    headline: 'Search relevance, catalog positioning, and algorithm alignment',
    description: 'Amazon functions as a high intent product search engine. Optimizing discoverability requires harmonizing search indexing, customer intent, category classification, conversion assets, and paid amplification.',
    services: [
      {
        id: 'amazon-1',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 1,
        name: 'Amazon Ads Management',
        summary: 'Targeted Sponsored Products, Sponsored Brands, and Sponsored Display campaign structuring tailored to reader search queries and competitor book titles.',
        scope: ['Campaign architecture and bidding strategy', 'Negative keyword pruning and match type control', 'ASIN and competitor product targeting', 'ACoS and read-through efficiency monitoring'],
        deliverables: 'Custom advertising structure, weekly keyword harvesting, and performance assessment.'
      },
      {
        id: 'amazon-2',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 2,
        name: 'Amazon SEO and Keyword Optimization',
        summary: 'Systematic research and indexing of high relevance reader search phrases within customer-facing copy and backend search slots.',
        scope: ['Reader intent query research', 'Backend 249-byte search field optimization', 'Title and subtitle indexing audits', 'Long-tail search term clustering'],
        deliverables: 'Optimized search term map and backend field deployment guide.'
      },
      {
        id: 'amazon-3',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 3,
        name: 'Amazon Metadata Optimization',
        summary: 'Comprehensive audit and refinement of core catalog metadata including title variations, edition notes, contributor fields, and series linkages.',
        scope: ['Catalog data consistency review', 'Series metadata and sequence linkages', 'Publisher metadata synchronization', 'Character count and guidelines compliance'],
        deliverables: 'Clean catalog metadata blueprint with upload documentation.'
      },
      {
        id: 'amazon-4',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 4,
        name: 'Amazon A+ Content Creation',
        summary: 'Editorial layout design and module architecture for product detail pages to deepen immersion and improve browse-to-purchase conversion.',
        scope: ['Module layout strategy: comparison tables, highlights, and author quotes', 'Visual module typography and asset production', 'Mobile readability formatting', 'KDP A+ Content submission and approval tracking'],
        deliverables: 'Complete visual asset set and approved A+ Content live on detail pages.'
      },
      {
        id: 'amazon-5',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 5,
        name: 'Amazon Author Central Optimization',
        summary: 'Professional author profile curation across global Amazon territories to establish trust, catalog clarity, and reader connection.',
        scope: ['Author biography refinement and editorial tone', 'Bibliography grouping and series sequencing', 'Author photo and video media curation', 'International marketplace profile unification'],
        deliverables: 'Optimized Author Central profiles across key Amazon stores.'
      },
      {
        id: 'amazon-6',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 6,
        name: 'Amazon Category and Keyword Research',
        summary: 'Rigorous analysis of Amazon browsing taxonomy (BISAC mapping and store-specific browse paths) to locate relevant categories for sustainable visibility.',
        scope: ['Browse path and node identification', 'Competitor rank threshold benchmarking', 'Subcategory depth assessment', 'Category modification ticket filing guidance'],
        deliverables: 'Ten targeted category paths with competitiveness evaluation.'
      },
      {
        id: 'amazon-7',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 7,
        name: 'Amazon Book Description Copywriting',
        summary: 'High converting blurb engineering utilizing psychological hooks, genre conventions, HTML formatting, and clear editorial hierarchy.',
        scope: ['Headline hook and reader promise formulation', 'Genre specific trope and pacing signals', 'Editorial review excerpts integration', 'Mobile friendly HTML formatting'],
        deliverables: 'Polished book description copy with ready to paste HTML.'
      },
      {
        id: 'amazon-8',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 8,
        name: 'Amazon Editorial Reviews Setup',
        summary: 'Strategic integration of trade reviews, publication mentions, and recognized author blurbs into the dedicated Editorial Reviews detail section.',
        scope: ['Trade publication pull-quote curation', 'Citation formatting and attribution hierarchy', 'KDP backend editorial review placement', 'Mobile above-the-fold excerpt prioritization'],
        deliverables: 'Formatted editorial review copy prepared for publisher account submission.'
      },
      {
        id: 'amazon-9',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 9,
        name: 'Amazon Look Inside and Preview Optimization',
        summary: 'Review and structural adjustment of early sample pages to maximize reader retention during the critical sample browsing window.',
        scope: ['Opening page hook audit and pacing review', 'Front matter positioning and table of contents flow', 'Sample cutoff boundary strategy', 'Formatting cleanup for Kindle previewer'],
        deliverables: 'Diagnostic report on preview reader conversion with layout adjustments.'
      },
      {
        id: 'amazon-10',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 10,
        name: 'Amazon Bestseller Rank Strategy',
        summary: 'Data-driven scheduling of sales velocity spikes, category targeting, and cross-channel promotions to improve category ranking visibility.',
        scope: ['Sales velocity modeling for target rank milestones', 'Category threshold timing and seasonal factors', 'Multi-channel promotional synchronization', 'Post-rank retention roadmap'],
        deliverables: 'Strategic velocity plan with timeline and promotional triggers.'
      },
      {
        id: 'amazon-11',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 11,
        name: 'Amazon Book Launch Strategy',
        summary: 'End to end structural plan for new releases spanning pre-order mechanics, algorithmic momentum building, and first thirty day velocity.',
        scope: ['Pre-launch momentum and countdown milestones', 'Algorithmic trigger activation during launch week', 'Price tier scheduling and initial traffic routing', 'ARC and early reader review synchronization'],
        deliverables: 'Comprehensive multi-week launch blueprint and checklist.'
      },
      {
        id: 'amazon-12',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 12,
        name: 'Amazon Advertising Strategy and Scaling',
        summary: 'Methodical scaling of profitable advertising campaigns across expanded keyword portfolios and complementary catalog ASINs.',
        scope: ['Budget allocation and top-of-search multiplier tuning', 'Campaign tiering: defense, discovery, and offensive targeting', 'Series read-through economic evaluation', 'Portfolio budgeting across multiple titles'],
        deliverables: 'Scaling playbook with target cost ceilings and allocation model.'
      },
      {
        id: 'amazon-13',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 13,
        name: 'Amazon KDP Select and Kindle Unlimited Strategy',
        summary: 'Economic and positioning assessment to determine whether exclusivity within KDP Select maximizes reader reach versus wide distribution.',
        scope: ['Page-read rate economics versus multi-platform sales', 'Free days versus Countdown deal scheduling', 'Genre specific KU penetration analysis', 'Catalog tiering strategy'],
        deliverables: 'Distribution model comparison report with promotion schedule.'
      },
      {
        id: 'amazon-14',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 14,
        name: 'Amazon Pre-Order Campaign Setup',
        summary: 'Strategic pre-order window configuration to accumulate indexing weight and reader anticipation while preserving day one algorithmic velocity.',
        scope: ['Optimal pre-order duration assessment', 'Cover and blurb progressive reveal cadence', 'Traffic coordination to build launch day authority', 'Final file delivery compliance auditing'],
        deliverables: 'Pre-order rollout timeline with operational safeguards.'
      },
      {
        id: 'amazon-15',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 15,
        name: 'Amazon Kindle Countdown Deals and Free Book Promotions',
        summary: 'Orchestration of official Amazon promotional tools to trigger algorithm recommendations and book ranking visibility.',
        scope: ['Eligibility verification and promotional scheduling', 'Supporting promo site and newsletter alignment', 'Price-drop messaging across social channels', 'Post-promotion price recovery monitoring'],
        deliverables: 'Promotion campaign calendar and external promotion briefing.'
      },
      {
        id: 'amazon-16',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 16,
        name: 'Amazon International Marketplace Expansion',
        summary: 'Catalog optimization across UK, Canada, Australia, Germany, and emerging Amazon marketplaces to capture global English readership.',
        scope: ['Territory pricing adjustments and currency rounding', 'Marketplace-specific keyword localization', 'Regional category browse node alignment', 'Global advertising account setup'],
        deliverables: 'International catalog audit and territory expansion guide.'
      },
      {
        id: 'amazon-17',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 17,
        name: 'Amazon Storefront Design',
        summary: 'Dedicated brand store architecture for authors with multi-title catalogs, series, and universe collections.',
        scope: ['Multi-page author storefront architecture', 'Series navigation and reading order modules', 'Lifestyle and universe visual branding', 'Custom Amazon attribution tagging'],
        deliverables: 'Published Amazon Author Store with verified responsive design.'
      },
      {
        id: 'amazon-18',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 18,
        name: 'ACX and Audible Audiobook Optimization',
        summary: 'Audiobook catalog presentation refinement across Audible and Amazon to connect with spoken-word audiences.',
        scope: ['Audio sample selection and hook placement', 'Narrator credit optimization and metadata tagging', 'Whispersync for Voice pairing verification', 'Audible promotional code distribution workflow'],
        deliverables: 'Audible listing optimization report and sample edit brief.'
      },
      {
        id: 'amazon-19',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 19,
        name: 'Amazon Vine Program Guidance',
        summary: 'Strategic evaluation and execution for KDP enrolled paperback titles eligible for Amazon Vine reviewer enrollment.',
        scope: ['Eligibility criteria and cost benefit calculation', 'Unit allocation and inventory staging', 'Expectation setting regarding editorial feedback', 'Long term review impact modeling'],
        deliverables: 'Vine program operational brief and enrollment checklist.'
      },
      {
        id: 'amazon-20',
        category: 'amazon',
        categoryTitle: 'Amazon Services',
        number: 20,
        name: 'Amazon Compliance and Review Health Audits',
        summary: 'Proactive review of catalog titles against KDP content guidelines to protect listings and preserve review integrity.',
        scope: ['Title and subtitle formatting compliance checks', 'Review authenticity policy review', 'Suppressed listing resolution guidance', 'Category and tag health diagnostics'],
        deliverables: 'Comprehensive compliance risk audit with corrective action steps.'
      }
    ]
  },
  {
    id: 'goodreads',
    title: 'Goodreads Services',
    code: 'CAT-02',
    headline: 'Social cataloging, reader shelves, and organic book community presence',
    description: 'Goodreads remains the central digital hub for dedicated book lovers. Strategic positioning on Goodreads builds word of mouth, social reading proof, and long term reader shelves.',
    services: [
      {
        id: 'goodreads-1',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 1,
        name: 'Goodreads Listopia Placement',
        summary: 'Identification and ethical positioning across relevant reader-curated Listopia lists to reach avid genre enthusiasts.',
        scope: ['Genre relevant Listopia discovery and scoring', 'Reader voting campaign guidance', 'Tag and thematic keyword alignment', 'Monitoring list movement and shelf adds'],
        deliverables: 'Curated list directory and organic voting outreach plan.'
      },
      {
        id: 'goodreads-2',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 2,
        name: 'Goodreads Reviews and Ratings Growth',
        summary: 'Ethical review generation strategies focused on active community reviewers who read and discuss your specific subgenre.',
        scope: ['Top reviewer directory research within genre', 'Personalized reading pitch framework', 'Community guidelines compliance verification', 'Rating trend analysis and reader sentiment mapping'],
        deliverables: 'Outreach workflow and reviewer connection tracking sheet.'
      },
      {
        id: 'goodreads-3',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 3,
        name: 'Goodreads Profile Optimization',
        summary: 'Polishing author program presence, shelf curation, bio, and author voice to build authentic reader rapport.',
        scope: ['Goodreads Author Program claim and setup', 'Bio and reader-facing reading list curation', 'Author ask-the-author feature integration', 'Goodreads blog and social link configuration'],
        deliverables: 'Fully configured and verified Goodreads Author Profile.'
      },
      {
        id: 'goodreads-4',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 4,
        name: 'Goodreads Want to Read Growth',
        summary: 'Targeted initiatives designed to drive organic Want to Read shelf additions, signaling algorithmic interest.',
        scope: ['Pre-release shelf addition campaigns', 'Community teaser sharing protocols', 'Cross-platform shelf CTA integrations', 'Conversion rate tracking to release day reads'],
        deliverables: 'Shelf addition campaign playbook and attribution strategy.'
      },
      {
        id: 'goodreads-5',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 5,
        name: 'Goodreads Book Page Optimization',
        summary: 'Refinement of book synopsis, genre tags, cover art clarity, and edition consolidation on book records.',
        scope: ['Clean synopsis formatting tailored to Goodreads readers', 'Crowdsourced genre tag seeding guidance', 'Librarian requests for edition merges', 'Default edition setting for highest reviews'],
        deliverables: 'Standardized book page audit and Librarian edit ticket support.'
      },
      {
        id: 'goodreads-6',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 6,
        name: 'Goodreads Giveaway Campaigns',
        summary: 'Turnkey administration of Print and Kindle giveaways to build thousands of shelf adds ahead of publication.',
        scope: ['Standard versus Premium giveaway tier selection', 'Giveaway timing relative to launch dates', 'Copywriting for giveaway teaser description', 'Post-giveaway winner outreach strategy'],
        deliverables: 'Giveaway campaign setup, scheduling, and results briefing.'
      },
      {
        id: 'goodreads-7',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 7,
        name: 'Goodreads Author Q&A Setup',
        summary: 'Configuration and moderation of Ask the Author questions to establish direct, meaningful reader dialogues.',
        scope: ['Ask the Author feature activation', 'Prompt question development for initial engagement', 'Editorial response drafting assistance', 'Featured answers display management'],
        deliverables: 'Curated question prompt library and response styling guide.'
      },
      {
        id: 'goodreads-8',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 8,
        name: 'Goodreads Group and Community Engagement',
        summary: 'Identification of active book club groups and non-spammy discussion participation strategies.',
        scope: ['Genre specific reading group discovery', 'Group rules and self-promotion guidelines audit', 'Author-sponsored read-along coordination', 'Discussion topic structuring'],
        deliverables: 'Group directory and community engagement roadmap.'
      },
      {
        id: 'goodreads-9',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 9,
        name: 'Goodreads Reading List Placements',
        summary: 'Connecting with prominent Goodreads readers and influential book collectors whose shelves influence followers.',
        scope: ['Influential curator identification by genre', 'Tailored connection messaging', 'Catalog matching and trope alignment', 'Shelf placement monitoring'],
        deliverables: 'Curator contact directory and pitch templates.'
      },
      {
        id: 'goodreads-10',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 10,
        name: 'Goodreads Marketing Campaigns',
        summary: 'Comprehensive promotional initiatives combining giveaways, author updates, and community engagement.',
        scope: ['Cross-channel promotional calendar', 'Goodreads event coordination', 'Author update dispatch scheduling', 'Campaign return on investment analysis'],
        deliverables: 'Integrated campaign schedule and performance review.'
      },
      {
        id: 'goodreads-11',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 11,
        name: 'Goodreads Author Blog and Interview Coordination',
        summary: 'Content strategy and publishing schedule for on-platform author articles and community interviews.',
        scope: ['Article topic curation rooted in reader curiosity', 'Publishing calendar synchronization with releases', 'Community interview placement coordination', 'Syndication to external author channels'],
        deliverables: 'Editorial article series and interview placement schedule.'
      },
      {
        id: 'goodreads-12',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 12,
        name: 'Goodreads Choice Awards Campaign Support',
        summary: 'Pre-voting positioning and reader mobilization for eligible books during the annual awards cycle.',
        scope: ['Eligibility criteria and opening round timeline audit', 'Reader communication strategy for write-in campaigns', 'Social media asset coordination', 'Voter engagement reminders without policy violations'],
        deliverables: 'Choice Awards readiness strategy and communications pack.'
      },
      {
        id: 'goodreads-13',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 13,
        name: 'Goodreads Series Page Consolidation',
        summary: 'Correction of broken series numbering, duplicate entries, and multi-author anthologies.',
        scope: ['Series numbering and reading order reconciliation', 'Goodreads Librarians group coordination', 'Box set and novella positioning within series', 'Series page description and metadata polish'],
        deliverables: 'Resolved series hierarchy and verified series page view.'
      },
      {
        id: 'goodreads-14',
        category: 'goodreads',
        categoryTitle: 'Goodreads Services',
        number: 14,
        name: 'Goodreads On-Site Ads Guidance',
        summary: 'Evaluation of Goodreads native self-serve and direct advertising options for specific promotional bursts.',
        scope: ['Ad placement suitability assessment', 'Demographic and genre targeting recommendations', 'Banner creative messaging guidelines', 'Cost per click performance expectations'],
        deliverables: 'Goodreads advertising feasibility memorandum.'
      }
    ]
  },
  {
    id: 'community',
    title: 'Community Outreach and Reviews',
    code: 'CAT-03',
    headline: 'Grassroots advocacy, early readers, bloggers, and cultural tastemakers',
    description: 'Long term discoverability is anchored in authentic reader advocacy. We build structured outreach channels that connect books directly with dedicated reviewers, libraries, and book communities.',
    services: [
      {
        id: 'community-1',
        category: 'community',
        categoryTitle: 'Community Outreach and Reviews',
        number: 1,
        name: 'ARC Campaigns',
        summary: 'Structured Advance Reader Copy campaigns designed to gather thoughtful launch week reviews across key retail channels.',
        scope: ['ARC reader application and vetting process', 'Secure digital file distribution protocols', 'Review reminder cadences and launch notifications', 'Cross-platform review verification'],
        deliverables: 'ARC campaign management framework and vetted participant roster.'
      },
      {
        id: 'community-2',
        category: 'community',
        categoryTitle: 'Community Outreach and Reviews',
        number: 2,
        name: 'Book Blogger and Influencer Outreach',
        summary: 'Targeted communications with dedicated book reviewers across WordPress, Substack, and literary blogs.',
        scope: ['Bespoke reviewer identification matching genre nuances', 'Personalized pitch letter drafting', 'Physical and digital review copy logistics', 'Coverage tracking and quote harvesting'],
        deliverables: 'Vetted blogger contact list and customized pitch templates.'
      },
      {
        id: 'community-3',
        category: 'community',
        categoryTitle: 'Community Outreach and Reviews',
        number: 3,
        name: 'Book Blog Outreach',
        summary: 'Tour scheduling and guest post placement on established reading blogs and literary editorial platforms.',
        scope: ['Virtual book tour itinerary construction', 'Guest post topic proposals and coordination', 'Author Q&A submission handling', 'Backlink acquisition and SEO verification'],
        deliverables: 'Confirmed blog tour itinerary and editorial submission kit.'
      },
      {
        id: 'community-4',
        category: 'community',
        categoryTitle: 'Community Outreach and Reviews',
        number: 4,
        name: 'Review Solicitation and Review Growth Strategy',
        summary: 'Compliant reader outreach systems to consistently generate consumer reviews throughout a book backlist lifecycle.',
        scope: ['Back matter call-to-action optimization', 'Newsletter subscriber review onboarding sequences', 'Ethical incentive policy compliance reviews', 'Review momentum tracking and pacing'],
        deliverables: 'Back matter copy templates and automated email review request sequences.'
      },
      {
        id: 'community-5',
        category: 'community',
        categoryTitle: 'Community Outreach and Reviews',
        number: 5,
        name: 'Reader Community Engagement',
        summary: 'Strategic engagement within Reddit book subreddits, Discord reader servers, and Facebook book groups.',
        scope: ['Community culture and moderation rule auditing', 'Non promotional value-first participation guides', 'Ask-Me-Anything event coordination', 'Reader community listening reports'],
        deliverables: 'Community engagement rules of engagement and event calendar.'
      },
      {
        id: 'community-6',
        category: 'community',
        categoryTitle: 'Community Outreach and Reviews',
        number: 6,
        name: 'Press Release Writing and Distribution',
        summary: 'Professional newswire releases crafted to capture regional media, industry journals, and trade journalists.',
        scope: ['Editorial press release drafting in AP style', 'Newsworthy angle and hook development', 'Targeted wire distribution scheduling', 'Media pickup and syndication report'],
        deliverables: 'Approved press release draft and distribution proof report.'
      },
      {
        id: 'community-7',
        category: 'community',
        categoryTitle: 'Community Outreach and Reviews',
        number: 7,
        name: 'NetGalley Campaign Management',
        summary: 'Listing optimization, approval vetting, and reviewer follow-up on NetGalley for serious industry consideration.',
        scope: ['Listing setup and category positioning', 'Reader approval criteria configuration', 'DRM file staging and widget generation', 'Reviewer feedback compilation and analytics'],
        deliverables: 'Turnkey NetGalley listing setup and reviewer approval workflow.'
      },
      {
        id: 'community-8',
        category: 'community',
        categoryTitle: 'Community Outreach and Reviews',
        number: 8,
        name: 'Podcast and Author Interview Outreach',
        summary: 'Booking author interviews on book focused and topical podcasts to discuss themes, research, and story craft.',
        scope: ['Podcast directory research with active listener bases', 'Author media one-sheet and talking points kit', 'Host pitch outreach and booking management', 'Episode promotion across author channels'],
        deliverables: 'Author Media Kit and pitched podcast tracking sheet.'
      },
      {
        id: 'community-9',
        category: 'community',
        categoryTitle: 'Community Outreach and Reviews',
        number: 9,
        name: 'Street Team and ARC Team Building',
        summary: 'Establishing a dedicated inner circle of superfans who amplify new releases, share graphics, and advocate organically.',
        scope: ['Street team recruitment landing page architecture', 'Exclusive community group setup and onboarding', 'Release day action checklists and missions', 'Retention and recognition initiatives'],
        deliverables: 'Street team operating playbook and onboarding email sequence.'
      },
      {
        id: 'community-10',
        category: 'community',
        categoryTitle: 'Community Outreach and Reviews',
        number: 10,
        name: 'Library and Book Club Outreach',
        summary: 'Positioning titles for public library acquisition systems and book club selection guides.',
        scope: ['OverDrive and Libby distribution verification', 'Book club discussion guide preparation', 'Library selector pitch letter formulation', 'Book club bulk order purchase pathways'],
        deliverables: 'Book Club Discussion Guide and library acquisition sell-sheet.'
      },
      {
        id: 'community-11',
        category: 'community',
        categoryTitle: 'Community Outreach and Reviews',
        number: 11,
        name: 'Local and Independent Bookstore Outreach',
        summary: 'Consignment and stocking outreach packages prepared for independent booksellers and regional store buyers.',
        scope: ['IngramSpark catalog and returnability setup review', 'Bookstore consignment pitch packets', 'Local author event proposal drafting', 'Store visit sell-sheets and order forms'],
        deliverables: 'Bookseller one-sheet and consignment outreach package.'
      }
    ]
  },
  {
    id: 'visual',
    title: 'Visual Content',
    code: 'CAT-04',
    headline: 'Cinematic trailers, book reels, cover consultation, and editorial brand assets',
    description: 'Visual presentation forms the initial impression for prospective readers. Our visual assets convey mood, genre cues, and narrative weight with deliberate editorial restraint.',
    services: [
      {
        id: 'visual-1',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 1,
        name: 'Book Trailers',
        summary: 'Atmospheric cinematic trailers combining evocative visuals, sound design, and text hooks to convey book tone.',
        scope: ['Scriptwriting and narrative storyboard concepting', 'High definition licensed footage curation', 'Sound design and voiceover coordination', 'Multi-resolution exports for web and YouTube'],
        deliverables: 'Master 60-second cinematic trailer and 30-second teaser cuts.'
      },
      {
        id: 'visual-2',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 2,
        name: 'Book Reels',
        summary: 'Fast-paced vertical videos engineered specifically for Instagram Reels and TikTok discovery algorithms.',
        scope: ['Vertical 9:16 aspect ratio formatting', 'Trending audio pairing recommendations', 'Trope highlighting and fast typographic hooks', 'Captions and accessibility styling'],
        deliverables: 'Package of vertical reels with suggested posting copy and audio tags.'
      },
      {
        id: 'visual-3',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 3,
        name: 'Book Recommendation Videos',
        summary: 'Contextual video formats highlighting where your book fits alongside beloved classics and contemporary bestsellers.',
        scope: ['If You Liked X Read Y recommendation scripting', 'Visual book juxtaposition design', 'Platform native pacing and audio selection', 'Call-to-action overlay graphics'],
        deliverables: 'Set of recommendation video assets ready for social publishing.'
      },
      {
        id: 'visual-4',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 4,
        name: 'Book Review Videos',
        summary: 'Editorial video shorts spotlighting standout reader quotes, editorial excerpts, and early reviews.',
        scope: ['Review quote curation and typographic kinetic animation', 'Atmospheric background video loops', 'Brand consistent color and typography integration', 'High readability mobile typography'],
        deliverables: 'Suite of dynamic review highlight video assets.'
      },
      {
        id: 'visual-5',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 5,
        name: 'UGC Videos for Books',
        summary: 'Authentic user style reading reactions and unboxing videos that mirror organic reader community content.',
        scope: ['Authentic reader unboxing and reading vlog creative direction', 'Creator talent briefing and coordination', 'Compliance with advertising disclosure requirements', 'Raw and edited versions for advertising deployment'],
        deliverables: 'Authentic creator video assets licensed for author promotional use.'
      },
      {
        id: 'visual-6',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 6,
        name: 'Book Banners',
        summary: 'High resolution digital banners tailored for Facebook headers, Twitter headers, newsletters, and blog tours.',
        scope: ['Multi-platform aspect ratio specifications', 'Typography hierarchy for headline and retail badges', 'Device preview testing for desktop and mobile headers', 'Source file organization for future edits'],
        deliverables: 'Full banner suite across all major platform dimensions.'
      },
      {
        id: 'visual-7',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 7,
        name: 'Book Cover Design and Redesign Consultation',
        summary: 'Expert critique and strategic brief development evaluating whether current cover art aligns with reader genre expectations.',
        scope: ['Thumbnail size legibility and competition benchmarking', 'Genre typography and visual trope alignment', 'Detailed redesign creative brief for illustrators', 'Wrap around spine and back cover layout review'],
        deliverables: 'Comprehensive cover audit report and designer creative brief.'
      },
      {
        id: 'visual-8',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 8,
        name: 'Promotional and Social Media Graphics',
        summary: 'Cohesive graphic packs including quote cards, countdown graphics, sale announcements, and teaser visuals.',
        scope: ['Brand asset kit: color palette, fonts, and textures', 'Templates for Canva or Photoshop workflows', 'Square, landscape, and vertical formats', 'Batch generation for multi-week campaigns'],
        deliverables: 'Custom promotional graphic library with editable master files.'
      },
      {
        id: 'visual-9',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 9,
        name: 'Author Brand Visual Content',
        summary: 'Unifying visual identity across web, social headers, newsletters, and printed bookmarks to solidify brand recognition.',
        scope: ['Brand guidelines documentation', 'Logo variations and favicon assets', 'Color codes and font pairing hierarchy', 'Stationery, bookmark, and postcard print layouts'],
        deliverables: 'Complete Author Brand Identity Guide with vector assets.'
      },
      {
        id: 'visual-10',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 10,
        name: 'Audiobook Sample and Teaser Clips',
        summary: 'Audiogram waveform videos synchronizing narrator audio with book cover art and animated captions.',
        scope: ['Audio waveform styling and color harmonization', 'Animated subtitle transcription for silent viewing', 'Optimal 30-to-90 second excerpt selection', 'Audible and retail purchase badges'],
        deliverables: 'Package of audiogram video clips formatted for social feeds.'
      },
      {
        id: 'visual-11',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 11,
        name: 'Pinterest Pin and Board Design',
        summary: 'Aesthetic mood boards and rich pins that index on Pinterest search for readers browsing story aesthetics and tropes.',
        scope: ['High engagement vertical pin templates (2:3 aspect)', 'Character aesthetic and setting mood boards', 'Rich Pin metadata setup and board architecture', 'SEO keyword integration into pin descriptions'],
        deliverables: 'Pinterest aesthetic asset kit and keyword-rich board blueprint.'
      },
      {
        id: 'visual-12',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 12,
        name: 'Cover Reveal Campaigns',
        summary: 'Step by step rollout assets including silhouette teasers, puzzle reveals, and official reveal announcements.',
        scope: ['Teaser graphic sequence and mystery countdown', 'Blogger and influencer reveal kit preparation', 'Live reveal event asset package', 'Pre-order link integration across all touchpoints'],
        deliverables: 'Cover reveal campaign schedule and complete graphic suite.'
      },
      {
        id: 'visual-13',
        category: 'visual',
        categoryTitle: 'Visual Content',
        number: 13,
        name: 'Author Headshot and Photo Direction',
        summary: 'Art direction guidelines for professional author portraits reflecting genre tone and author positioning.',
        scope: ['Mood board for photographer briefing', 'Wardrobe, lighting, and setting recommendations', 'Cropping specifications for square, banner, and circular avatars', 'Retouching and color temperature standards'],
        deliverables: 'Author Portrait Creative Brief and photographer briefing sheet.'
      }
    ]
  },
  {
    id: 'social',
    title: 'Social Media and Digital Marketing',
    code: 'CAT-05',
    headline: 'Audience acquisition, reader funnels, email retention, and digital discoverability',
    description: 'Digital discoverability connects search visibility with audience retention. We construct sustainable marketing channels that transform casual browsers into dedicated newsletter subscribers and lifelong readers.',
    services: [
      {
        id: 'social-1',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 1,
        name: 'Social Media Marketing and Management',
        summary: 'Systematic content planning, copywriting, and publishing schedules across major reader networks.',
        scope: ['Monthly editorial calendar architecture', 'Engagement copy drafted in the author authentic voice', 'Hashtag and topic cluster research', 'Community management and reply guidelines'],
        deliverables: 'Comprehensive 30-day social content calendar with ready-to-publish copy.'
      },
      {
        id: 'social-2',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 2,
        name: 'BookTok and TikTok Strategy',
        summary: 'Strategic navigation of the BookTok ecosystem focusing on storytelling tropes, emotional reactions, and trend adaptation.',
        scope: ['Genre trope identification and video hook hooks', 'Account bio and Linktree conversion optimization', 'Organic posting schedule and sound curation', 'Influencer collaboration outreach scripts'],
        deliverables: 'BookTok Strategy Playbook with 20 actionable video concepts.'
      },
      {
        id: 'social-3',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 3,
        name: 'Bookstagram Strategy',
        summary: 'Visual grid aesthetic planning, flat lay photography direction, and storytelling captions on Instagram.',
        scope: ['Grid harmony and color palette design', 'Carousel post strategy for reader tips and excerpts', 'Story engagement sequences and poll questions', 'Bookstagrammer tag and community interaction protocols'],
        deliverables: 'Instagram feed layout blueprint and carousel templates.'
      },
      {
        id: 'social-4',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 4,
        name: 'Email Marketing Campaigns',
        summary: 'Targeted broadcast campaigns for launches, sales, and catalog updates engineered for high deliverability and opens.',
        scope: ['Subject line testing and preview text craftsmanship', 'Reader segmenting by interest and reading progress', 'Clean, responsive email layout styling', 'Click through tracking to retailer links'],
        deliverables: 'Email campaign calendar and fully formatted email broadcast copy.'
      },
      {
        id: 'social-5',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 5,
        name: 'Newsletter Strategy',
        summary: 'Comprehensive onboarding and nurture sequences turning new subscribers into invested brand champions.',
        scope: ['Welcome automation sequence (5-part welcome funnel)', 'Reader magnet delivery and consumption prompts', 'Content pillars: personal updates, book craft, and book recs', 'List hygiene and unengaged subscriber pruning'],
        deliverables: 'Complete 5-part automated welcome sequence and list hygiene protocol.'
      },
      {
        id: 'social-6',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 6,
        name: 'Author Website Build and Redesign',
        summary: 'Custom, fast-loading author websites featuring catalog showcases, direct sales or retailer links, and reader lead capture.',
        scope: ['Catalog hierarchy and book sample embeds', 'Responsive mobile-first editorial architecture', 'SEO structure and search engine indexing setup', 'Mailing list signup integration with lead magnet delivery'],
        deliverables: 'Full author website architecture, copy map, and deployment specification.'
      },
      {
        id: 'social-7',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 7,
        name: 'Book Funnel Creation',
        summary: 'High-converting landing pages tailored to specific reader magnets, sample chapters, or discounted entry books.',
        scope: ['Landing page copywriting and distraction-free design', 'Lead capture integration with MailerLite, ConvertKit, or Mailchimp', 'BookFunnel or StoryOrigin delivery configuration', 'Traffic attribution tracking'],
        deliverables: 'Turnkey landing page setup and delivery automation workflow.'
      },
      {
        id: 'social-8',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 8,
        name: 'Reader Lead Generation',
        summary: 'Paid and cross-promotional campaigns designed to scale email subscriber lists with verified genre readers.',
        scope: ['Reader magnet development brief (bonus epilogue, prequel, or novella)', 'Group promo participation on book platforms', 'Targeted paid acquisition tests', 'Cost per subscriber calculation and monitoring'],
        deliverables: 'Lead generation roadmap and campaign monitoring dashboard.'
      },
      {
        id: 'social-9',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 9,
        name: 'Author Branding Strategy',
        summary: 'Holistic brand strategy establishing author core identity, reader promises, genre authority, and market positioning.',
        scope: ['Core brand narrative and author bio hierarchy', 'Reader avatar definition and psychographic analysis', 'Tone of voice guidelines across all communications', 'Long term catalog positioning roadmap'],
        deliverables: 'Comprehensive Author Brand Strategy Dossier.'
      },
      {
        id: 'social-10',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 10,
        name: 'Digital Marketing Campaign Management',
        summary: 'End to end coordination of multi-platform marketing blitzes aligning advertising, email, social, and influencer outreach.',
        scope: ['Unified campaign timeline and milestone tracking', 'Budget distribution across channels', 'Creative asset deployment and variant testing', 'Post-campaign retrospective and data consolidation'],
        deliverables: 'Multi-channel master campaign plan and performance summary.'
      },
      {
        id: 'social-11',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 11,
        name: 'Pinterest Strategy',
        summary: 'Search engine optimization on Pinterest to drive steady, compound visual search traffic to book landing pages.',
        scope: ['Pinterest business account optimization', 'Evergreen keyword research across book aesthetics', 'Automated pinning workflow with Tailwind or native scheduler', 'Monthly analytics review and board adjustments'],
        deliverables: 'Pinterest SEO Keyword Index and evergreen pinning roadmap.'
      },
      {
        id: 'social-12',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 12,
        name: 'YouTube and BookTube Strategy',
        summary: 'Leveraging YouTube video search through channel development or targeted BookTuber review sponsorship.',
        scope: ['BookTube channel audit or outreach list development', 'Video metadata optimization (titles, tags, descriptions)', 'Video description link architecture and timestamps', 'Channel banner and thumbnail styling'],
        deliverables: 'BookTube outreach strategy and video optimization guidelines.'
      },
      {
        id: 'social-13',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 13,
        name: 'Threads and X Strategy',
        summary: 'Conversational writing and literary microblogging strategies to build industry connections and reader followings.',
        scope: ['Thread writing templates for narrative storytelling', 'Quote tweet engagement and author community networking', 'Hashtag etiquette and search discovery tactics', 'Profile optimization and pinned tweet strategy'],
        deliverables: 'Microblogging editorial templates and interaction guide.'
      },
      {
        id: 'social-14',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 14,
        name: 'Paid Social Advertising',
        summary: 'Meta Ads (Facebook and Instagram) campaigns built to drive direct book sales or high-intent email subscribers.',
        scope: ['Audience definition using author and comp-title interests', 'Ad creative testing: video reels, book 3D mockups, and excerpt quotes', 'Ad copy variants crafted for cold versus warm audiences', 'Return on ad spend and conversion tracking'],
        deliverables: 'Meta Ads campaign structure and creative asset playbook.'
      },
      {
        id: 'social-15',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 15,
        name: 'Author Website SEO',
        summary: 'Search engine optimization for author websites to rank for author name, book titles, characters, and genre tropes.',
        scope: ['Technical SEO audit: crawlability, mobile speed, and SSL', 'On-page title tags, meta descriptions, and schema markup', 'Book series and character page architecture', 'Keyword research for reader search queries on Google'],
        deliverables: 'Author Website SEO Audit Report with implementation punch list.'
      },
      {
        id: 'social-16',
        category: 'social',
        categoryTitle: 'Social Media and Digital Marketing',
        number: 16,
        name: 'Analytics and Reporting Dashboards',
        summary: 'Unified performance tracking synthesizing web traffic, email growth, advertising spend, and catalog movement.',
        scope: ['Key performance indicator definition and benchmarking', 'Custom dashboard setup using Google Looker Studio or simple tracking sheets', 'Attribution modeling across marketing touchpoints', 'Monthly strategic review call and action planning'],
        deliverables: 'Custom Analytics Dashboard and monthly report template.'
      }
    ]
  }
];

export const ALL_SERVICES = SERVICE_CATEGORIES.flatMap(cat => cat.services);
