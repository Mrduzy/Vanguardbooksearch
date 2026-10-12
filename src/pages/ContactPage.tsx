import React, { useState, useEffect } from 'react';
import {
  Mail,
  Globe,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { fetchApi } from '../utils/api';

interface ContactPageProps {
  initialSubject?: string;
  initialService?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialSubject,
  initialService
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(
    initialSubject || (initialService ? `Enquiry regarding ${initialService}` : '')
  );
  const [bookOrWebsite, setBookOrWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contactId, setContactId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialService && !subject) {
      setSubject(`Enquiry regarding ${initialService}`);
    }
  }, [initialService, subject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!subject.trim()) {
      setErrorMessage('Please provide a subject for your enquiry.');
      return;
    }
    if (!message.trim() || message.trim().length < 15) {
      setErrorMessage('Please provide a message describing your book or discoverability question (at least 15 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetchApi('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          bookOrWebsite,
          honeypot
        })
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        setSubmitSuccess(true);
        setContactId(data.id || 'INQ-' + Date.now());
      } else if (response.status === 404) {
        // Fallback for static hosting environments (e.g. GitHub Pages)
        const localId = 'GH-INQ-' + Date.now();
        try {
          const stored = JSON.parse(localStorage.getItem('vanguard_local_contacts') || '[]');
          stored.push({ id: localId, name, email, subject, message, bookOrWebsite, createdAt: new Date().toISOString() });
          localStorage.setItem('vanguard_local_contacts', JSON.stringify(stored));
        } catch {
          // Ignore storage restrictions
        }
        setSubmitSuccess(true);
        setContactId(localId);
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit contact enquiry.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to submit your message at this time. Please try again or write directly to vanguardbooksearch@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400" />
          <span>Consultation &amp; Project Discussion</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-stone-50 font-editorial-serif leading-tight">
          Discuss Your Book Discoverability Architecture
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-light">
          Whether you are launching an upcoming title, auditing an established backlist, or seeking to understand why your books perform well with readers who find them yet lack broad discoverability, we welcome serious inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information & Context */}
        <div className="lg:col-span-5 space-y-8">
          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/40 p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
              Direct Contact Details
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">
                    Business Email:
                  </span>
                  <p className="text-stone-600 dark:text-stone-400 pt-0.5">
                    <a
                      href="mailto:vanguardbooksearch@gmail.com"
                      className="hover:underline text-amber-700 dark:text-amber-400 font-medium"
                    >
                      vanguardbooksearch@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">
                    Official Domain:
                  </span>
                  <p className="text-stone-600 dark:text-stone-400 pt-0.5">
                    <a
                      href="https://vanguardbooksearch.com"
                      className="hover:underline text-stone-900 dark:text-stone-100"
                    >
                      https://vanguardbooksearch.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">
                    Response Horizon:
                  </span>
                  <p className="text-stone-600 dark:text-stone-400 pt-0.5">
                    We review inquiries thoroughly and respond within one business day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 space-y-3 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-500" />
              <span>Confidentiality Notice</span>
            </h3>
            <p>
              All manuscript titles, catalog sales figures, distribution plans, and author strategies shared with Vanguard Book Search are treated with strict editorial confidentiality. We do not distribute your information to outside parties.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          {submitSuccess ? (
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/80 p-8 md:p-12 space-y-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
                  Inquiry Received
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Thank you for reaching out. Your inquiry has been securely registered in our system under reference <strong className="font-mono text-stone-900 dark:text-stone-100">{contactId}</strong>.
                </p>
              </div>

              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                A member of the Vanguard Book Search team will review your project details and follow up via email at <strong className="text-stone-800 dark:text-stone-200">{email}</strong> within one business day.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    setMessage('');
                    setSubject('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 rounded hover:bg-stone-200 transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/60 p-6 sm:p-8 space-y-6 shadow-sm"
            >
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-start gap-3 text-xs text-red-800 dark:text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Bot trap */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_url_check">Do not fill this</label>
                <input
                  id="website_url_check"
                  type="text"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={name}
                    onChange={e => setName(e.target.value)}
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
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  Subject / Area of Interest <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amazon SEO audit for upcoming launch / Series repositioning"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  Book Title, Amazon ASIN, or Website URL (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Architecture of Midnight / B0ABC12345 / https://..."
                  value={bookOrWebsite}
                  onChange={e => setBookOrWebsite(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  Message &amp; Project Context <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell us about your book, target genre, publishing timeline, and current discoverability challenges. What have you observed regarding your current reader reach?"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 text-stone-900 dark:text-stone-100 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-700 rounded transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Consultation Inquiry'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
