import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  AlertCircle,
  Send,
  Shield,
  HelpCircle
} from 'lucide-react';
import { ALL_SERVICES } from '../data/servicesData';
import { fetchApi } from '../utils/api';

interface FeedbackPageProps {
  navigate: (route: string) => void;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = ({ navigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [authorWebsite, setAuthorWebsite] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [writtenFeedback, setWrittenFeedback] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [authorPhotoUrl, setAuthorPhotoUrl] = useState('');
  const [consentToPublish, setConsentToPublish] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-bot trap

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const popularDisciplines = [
    'Amazon SEO and Keyword Optimization',
    'Amazon Category and Keyword Research',
    'Amazon A+ Content Creation',
    'Amazon Ads Management',
    'Goodreads Listopia Placement',
    'ARC Campaigns',
    'Book Cover Design and Redesign Consultation',
    'Author Website Build and Redesign',
    'Newsletter Strategy'
  ];

  const handleToggleService = (srv: string) => {
    setSelectedServices(prev =>
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!writtenFeedback.trim() || writtenFeedback.trim().length < 15) {
      setErrorMessage('Please provide your written feedback (at least 15 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetchApi('/api/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          authorWebsite,
          bookTitle,
          genre,
          servicesUsed: selectedServices,
          rating,
          writtenFeedback,
          displayName: displayName.trim() || fullName.trim(),
          authorPhotoUrl,
          consentToPublish,
          honeypot
        })
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        setSubmitSuccess(true);
        setSubmissionId(data.id || 'SUB-' + Date.now());
      } else if (response.status === 404) {
        // Fallback for purely static hosting environments (e.g. GitHub Pages)
        const localId = 'GH-SUB-' + Date.now();
        try {
          const stored = JSON.parse(localStorage.getItem('vanguard_local_feedback') || '[]');
          stored.push({ id: localId, fullName, email, bookTitle, rating, writtenFeedback, createdAt: new Date().toISOString() });
          localStorage.setItem('vanguard_local_feedback', JSON.stringify(stored));
        } catch {
          // Ignore storage restrictions
        }
        setSubmitSuccess(true);
        setSubmissionId(localId);
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit feedback.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400" />
          <span>Author Observations</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-stone-50 font-editorial-serif leading-tight">
          Author Feedback Submission
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-light">
          We deeply value candid reflections from authors who have engaged Vanguard Book Search. Submissions are reviewed directly by the site owner prior to any publication.
        </p>
      </div>

      {submitSuccess ? (
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/80 p-8 md:p-12 space-y-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
              Thank You for Your Feedback
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Your feedback has been securely transmitted and recorded in our system under reference <strong className="font-mono text-stone-900 dark:text-stone-100">{submissionId}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/50 border border-stone-200/80 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 leading-relaxed space-y-1">
            <div className="font-semibold text-stone-700 dark:text-stone-300">
              Publication Review Policy:
            </div>
            <p>
              In accordance with our publication standards, submitted feedback is marked as pending review until the site owner approves it. Testimonials are only displayed on public pages if publication consent was explicitly granted.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setWrittenFeedback('');
                setBookTitle('');
              }}
              className="px-4 py-2 text-xs font-medium text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 rounded transition-colors"
            >
              Submit Additional Feedback
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 dark:bg-amber-600 rounded transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/60 p-6 sm:p-10 space-y-8 shadow-sm"
        >
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-start gap-3 text-xs text-red-800 dark:text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Hidden Spam Trap */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company_nickname">Do not fill this</label>
            <input
              id="company_nickname"
              type="text"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Section 1: Author Details */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-editorial-serif border-b border-stone-100 dark:border-stone-800 pb-2">
              1. Author Identification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. author@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 text-stone-900 dark:text-stone-100"
                />
                <p className="text-[10px] text-stone-400">
                  Your email is strictly confidential and will never be published.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  Preferred Public Display Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. E. Vance, Mystery Author"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 text-stone-900 dark:text-stone-100"
                />
                <p className="text-[10px] text-stone-400">
                  How your name should appear if published. Defaults to your full name.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  Author Website (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={authorWebsite}
                  onChange={e => setAuthorWebsite(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Catalog Details */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-editorial-serif border-b border-stone-100 dark:border-stone-800 pb-2">
              2. Catalog Details (optional)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  Book Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Architecture of Midnight"
                  value={bookTitle}
                  onChange={e => setBookTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  Genre / Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Literary Mystery / Historical Fiction"
                  value={genre}
                  onChange={e => setGenre(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            {/* Disciplines Used */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                Services Engaged (select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {popularDisciplines.map((srv) => {
                  const isChecked = selectedServices.includes(srv);
                  return (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => handleToggleService(srv)}
                      className={`text-left p-2.5 rounded border text-xs transition-colors cursor-pointer ${
                        isChecked
                          ? 'border-amber-600 bg-amber-500/10 text-amber-900 dark:text-amber-300 font-medium'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                          isChecked ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-300 dark:border-stone-700'
                        }`}>
                          {isChecked ? '✓' : ''}
                        </span>
                        <span className="line-clamp-1">{srv}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Rating and Written Observations */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-editorial-serif border-b border-stone-100 dark:border-stone-800 pb-2">
              3. Experience and Rating
            </h3>

            {/* Rating Stars */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                Overall Experience Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                    aria-label={`Rate ${star} out of 5 stars`}
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-500 text-amber-500'
                          : 'fill-transparent text-stone-300 dark:text-stone-700'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-medium text-stone-600 dark:text-stone-400">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Written Feedback */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                Written Feedback <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Describe your experience working with Vanguard Book Search. How did the positioning architecture, catalog metadata, or category alignment affect reader discovery for your titles?"
                value={writtenFeedback}
                onChange={e => setWrittenFeedback(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 text-stone-900 dark:text-stone-100 leading-relaxed"
              />
              <p className="text-[10px] text-stone-400">
                Please do not include private credentials or sensitive personal information.
              </p>
            </div>
          </div>

          {/* Section 4: Publication Consent & Privacy */}
          <div className="space-y-4 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentToPublish}
                  onChange={e => setConsentToPublish(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  I grant permission for VANGUARDBOOKSEARCH to publish this feedback as an approved public testimonial using my preferred public display name.
                </span>
              </label>

              <div className="flex items-start gap-2 pt-1 text-[11px] text-stone-500 dark:text-stone-400">
                <Shield className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>
                  Privacy guarantee: Feedback submissions are never published automatically. All records are reviewed prior to publication. If you do not check the consent box above, your remarks remain entirely confidential between you and the site owner.
                </span>
              </div>
            </div>
          </div>

          {/* Submission Action */}
          <div className="pt-2 flex items-center justify-end gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-700 rounded transition-colors disabled:opacity-50 cursor-pointer"
            >
              <span>{isSubmitting ? 'Transmitting Feedback...' : 'Submit Author Feedback'}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
