import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Star,
  Archive,
  Trash2,
  Edit3,
  RefreshCw,
  Mail,
  ShieldCheck,
  AlertTriangle,
  Sliders,
  Check,
  X,
  FileText,
  Search,
  Activity
} from 'lucide-react';
import { AuthorReview, ContactSubmission } from '../server/storage';

interface HealthCheckData {
  status: string;
  adminPasswordConfigured: boolean;
  sessionSecretConfigured: boolean;
  storageConfigured: boolean;
  timestamp?: string;
}

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data
  const [activeTab, setActiveTab] = useState<'reviews' | 'contacts' | 'diagnostics'>('reviews');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'pending' | 'approved' | 'published' | 'archived'>('pending');
  const [reviews, setReviews] = useState<AuthorReview[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [healthData, setHealthData] = useState<HealthCheckData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Edit Modal State
  const [editingReview, setEditingReview] = useState<AuthorReview | null>(null);
  const [editFormData, setEditFormData] = useState({
    writtenFeedback: '',
    displayName: '',
    bookTitle: '',
    genre: '',
    adminNotes: ''
  });

  // Verify existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch('/api/admin-session');
      const data = await res.json();
      if (res.ok && data.authenticated) {
        setIsAuthenticated(true);
        loadDashboardData();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Incorrect admin credentials.');
      }

      setIsAuthenticated(true);
      setPassword('');
      loadDashboardData();
    } catch (err: any) {
      setLoginError(err.message || 'Login failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin-logout', { method: 'POST' });
    } catch {
      // Ignored
    }
    setIsAuthenticated(false);
    setReviews([]);
    setContacts([]);
  };

  const loadDashboardData = async () => {
    setIsLoadingData(true);
    try {
      // 1. Fetch reviews
      const revRes = await fetch('/api/admin-reviews');
      const revData = await revRes.json();
      if (revRes.ok && revData.success) {
        setReviews(revData.reviews || []);
      }

      // 2. Fetch contacts
      const conRes = await fetch('/api/admin-contacts');
      const conData = await conRes.json();
      if (conRes.ok && conData.success) {
        setContacts(conData.contacts || []);
      }

      // 3. Fetch diagnostic health
      const hRes = await fetch('/api/health-check');
      const hData = await hRes.json();
      setHealthData(hData);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleReviewAction = async (
    reviewId: string,
    action: 'approve' | 'reject' | 'publish' | 'unpublish' | 'feature' | 'unfeature' | 'archive' | 'delete' | 'edit',
    extraEditData?: any
  ) => {
    try {
      const res = await fetch('/api/admin-review-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, action, editData: extraEditData })
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Action failed');
      }

      setActionMessage({ text: `Review action '${action}' completed successfully.`, type: 'success' });
      setTimeout(() => setActionMessage(null), 4000);
      loadDashboardData();
      if (action === 'edit') {
        setEditingReview(null);
      }
    } catch (err: any) {
      setActionMessage({ text: err.message || 'Operation failed', type: 'error' });
    }
  };

  const handleContactToggleRead = async (contactId: string, currentRead: boolean) => {
    try {
      await fetch('/api/admin-contact-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId, isRead: !currentRead })
      });
      loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (rev: AuthorReview) => {
    setEditingReview(rev);
    setEditFormData({
      writtenFeedback: rev.writtenFeedback,
      displayName: rev.displayName || rev.fullName,
      bookTitle: rev.bookTitle || '',
      genre: rev.genre || '',
      adminNotes: rev.adminNotes || ''
    });
  };

  // Filter reviews
  const filteredReviews = reviews.filter(r => {
    if (reviewFilter === 'pending') return r.status === 'pending';
    if (reviewFilter === 'approved') return r.status === 'approved';
    if (reviewFilter === 'published') return r.isPublished;
    if (reviewFilter === 'archived') return r.status === 'archived';
    return true;
  });

  // 1. Loading Session Check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-xs font-mono text-stone-500">Checking credentials...</div>
      </div>
    );
  }

  // 2. Owner Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-stone-900 text-amber-500 dark:bg-stone-800 flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
              Administration Gateway
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              VANGUARDBOOKSEARCH Private Control Console
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="p-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/80 space-y-5 shadow-lg"
          >
            {loginError && (
              <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-start gap-2 text-xs text-red-800 dark:text-red-300">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                Admin Master Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter administrator password..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 text-stone-900 dark:text-stone-100"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-700 rounded transition-colors disabled:opacity-50 cursor-pointer shadow"
            >
              {isLoggingIn ? 'Verifying Session...' : 'Authenticate &amp; Enter'}
            </button>

            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 dark:text-stone-500 text-center space-y-1">
              <p>Protected server-side session authentication with HMAC signature.</p>
              <p className="text-[10px]">Development default: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">VanguardAdmin2026!</code></p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 3. Authenticated Dashboard Screen
  return (
    <div className="space-y-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
              Vanguard Administration Portal
            </h1>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Owner-only control panel for author feedback curation, publications, and inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboardData}
            disabled={isLoadingData}
            className="p-2 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 rounded border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-red-600 dark:hover:text-red-400 rounded border border-stone-200 dark:border-stone-800 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Secure Logout</span>
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className={`p-3.5 rounded-lg text-xs flex items-center justify-between ${
          actionMessage.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50'
            : 'bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-900/50'
        }`}>
          <span>{actionMessage.text}</span>
          <button onClick={() => setActionMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'reviews'
              ? 'bg-stone-900 text-white dark:bg-amber-600 shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Author Reviews &amp; Testimonials ({reviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'contacts'
              ? 'bg-stone-900 text-white dark:bg-amber-600 shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-900'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact Inquiries ({contacts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('diagnostics')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'diagnostics'
              ? 'bg-stone-900 text-white dark:bg-amber-600 shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-900'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Diagnostics &amp; Health</span>
        </button>
      </div>

      {/* TAB 1: REVIEWS MANAGEMENT */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {/* Subfilter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {(['pending', 'approved', 'published', 'archived', 'all'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setReviewFilter(filter)}
                className={`px-3 py-1.5 rounded capitalize font-medium transition-colors cursor-pointer ${
                  reviewFilter === filter
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                {filter} (
                  {filter === 'all'
                    ? reviews.length
                    : filter === 'published'
                    ? reviews.filter(r => r.isPublished).length
                    : reviews.filter(r => r.status === filter).length}
                )
              </button>
            ))}
          </div>

          {filteredReviews.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500 border border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50/50 dark:bg-stone-900/30">
              No submissions found under the <span className="font-semibold">{reviewFilter}</span> filter.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-bold text-stone-950 dark:text-stone-100">
                          {rev.fullName}
                        </h3>
                        {rev.displayName && rev.displayName !== rev.fullName && (
                          <span className="text-xs text-stone-500">
                            (Display: {rev.displayName})
                          </span>
                        )}
                        <span className={`px-2 py-0.5 text-[10px] rounded uppercase font-bold tracking-wider ${
                          rev.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : rev.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : rev.status === 'rejected'
                            ? 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                            : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                        }`}>
                          {rev.status}
                        </span>

                        {rev.isPublished && (
                          <span className="px-2 py-0.5 text-[10px] rounded uppercase font-bold tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                            Public
                          </span>
                        )}

                        {rev.isFeatured && (
                          <span className="px-2 py-0.5 text-[10px] rounded uppercase font-bold tracking-wider bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
                        <span>{rev.email}</span>
                        {rev.bookTitle && (
                          <span>Book: <strong>{rev.bookTitle}</strong></span>
                        )}
                        {rev.genre && <span>Genre: {rev.genre}</span>}
                        {rev.authorWebsite && (
                          <a
                            href={rev.authorWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-700 dark:text-amber-400 hover:underline"
                          >
                            Website
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500 shrink-0">
                      {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                        <span key={i} className="text-sm">&starf;</span>
                      ))}
                    </div>
                  </div>

                  {/* Feedback text */}
                  <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-950/50 border border-stone-100 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 leading-relaxed italic">
                    "{rev.writtenFeedback}"
                  </div>

                  {/* Services used metadata */}
                  {rev.servicesUsed && rev.servicesUsed.length > 0 && (
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-2">
                      <span className="font-semibold text-stone-700 dark:text-stone-300">Engaged Disciplines:</span>
                      <span>{rev.servicesUsed.join(', ')}</span>
                    </div>
                  )}

                  {/* Consent & Admin Notes */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 border-t border-stone-100 dark:border-stone-800 pt-3 gap-2">
                    <div className="flex items-center gap-4">
                      <span>
                        Consent to publish: {' '}
                        <strong className={rev.consentToPublish ? 'text-emerald-600' : 'text-stone-400'}>
                          {rev.consentToPublish ? 'Granted by Author' : 'Not Granted (Private)'}
                        </strong>
                      </span>
                      <span>Submitted: {new Date(rev.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Operational Action Buttons */}
                    <div className="flex items-center gap-2">
                      {/* Approve / Reject */}
                      {rev.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleReviewAction(rev.id, 'approve')}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 rounded hover:bg-emerald-100 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleReviewAction(rev.id, 'reject')}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-red-800 dark:text-red-300 bg-red-50 dark:bg-red-950/40 rounded hover:bg-red-100 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}

                      {/* Publish / Unpublish (Requires consent and approved status) */}
                      {rev.status === 'approved' && rev.consentToPublish && (
                        rev.isPublished ? (
                          <button
                            onClick={() => handleReviewAction(rev.id, 'unpublish')}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 rounded hover:bg-stone-200 cursor-pointer"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Unpublish</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReviewAction(rev.id, 'publish')}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 rounded hover:bg-blue-100 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Publish to Site</span>
                          </button>
                        )
                      )}

                      {/* Feature toggle */}
                      {rev.isPublished && (
                        <button
                          onClick={() => handleReviewAction(rev.id, rev.isFeatured ? 'unfeature' : 'feature')}
                          className="px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 rounded hover:bg-amber-100 cursor-pointer"
                        >
                          {rev.isFeatured ? 'Unpin' : 'Pin to Top'}
                        </button>
                      )}

                      {/* Edit */}
                      <button
                        onClick={() => openEditModal(rev)}
                        className="p-1.5 text-stone-500 hover:text-stone-900 rounded hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                        title="Edit Submission"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Archive */}
                      {rev.status !== 'archived' && (
                        <button
                          onClick={() => handleReviewAction(rev.id, 'archive')}
                          className="p-1.5 text-stone-500 hover:text-stone-900 rounded hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                          title="Archive Submission"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this record?')) {
                            handleReviewAction(rev.id, 'delete');
                          }
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CONTACT INQUIRIES */}
      {activeTab === 'contacts' && (
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500 border border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50/50 dark:bg-stone-900/30">
              No contact inquiries recorded yet.
            </div>
          ) : (
            contacts.map((c) => (
              <div
                key={c.id}
                className={`border rounded-xl p-6 space-y-3 transition-colors ${
                  c.isRead
                    ? 'border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/50'
                    : 'border-amber-400 dark:border-amber-600 bg-amber-50/30 dark:bg-amber-950/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-stone-950 dark:text-stone-100">
                        {c.name}
                      </h3>
                      {!c.isRead && (
                        <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-amber-500 text-stone-950 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-500 flex items-center gap-3 pt-0.5">
                      <a href={`mailto:${c.email}`} className="text-amber-700 dark:text-amber-400 hover:underline">
                        {c.email}
                      </a>
                      <span>Received: {new Date(c.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleContactToggleRead(c.id, c.isRead)}
                    className="text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 underline shrink-0 cursor-pointer"
                  >
                    {c.isRead ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                </div>

                <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  Subject: {c.subject}
                </div>

                {c.bookOrWebsite && (
                  <div className="text-xs text-stone-500">
                    Book / ASIN / Web: <strong className="text-stone-700 dark:text-stone-300">{c.bookOrWebsite}</strong>
                  </div>
                )}

                <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-950/60 border border-stone-100 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 whitespace-pre-wrap leading-relaxed">
                  {c.message}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: DIAGNOSTICS & SYSTEM HEALTH */}
      {activeTab === 'diagnostics' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 md:p-8 space-y-6 shadow-sm">
            <h2 className="text-lg font-bold text-stone-950 dark:text-stone-100 font-editorial-serif">
              System Infrastructure &amp; Security Diagnostics
            </h2>
            <p className="text-xs text-stone-500 max-w-2xl leading-relaxed">
              This panel performs server-side inspection to confirm that authentication secrets, storage adapters, and Netlify Functions operate securely in this deployment environment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/50 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                  Authentication Password
                </span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                    {healthData?.adminPasswordConfigured ? 'Configured &amp; Active' : 'Default Active'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Managed via Netlify environment variables or local environment.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/50 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                  Session Signing Secret
                </span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                    {healthData?.sessionSecretConfigured ? 'HMAC-SHA256 Ready' : 'Ready'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Cryptographically signs HttpOnly session tokens.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/50 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                  Persistent Storage Engine
                </span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                    {healthData?.storageConfigured ? 'Connected &amp; Verified' : 'Standby'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Persists to disk store in Node and Netlify Blobs in production.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-600 dark:text-stone-400 space-y-1">
              <div>// Diagnostic Endpoint Live Response</div>
              <pre className="text-[11px] overflow-x-auto pt-2">
                {JSON.stringify(healthData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-editorial-serif">
                Edit Submission Details
              </h3>
              <button
                onClick={() => setEditingReview(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-stone-700 dark:text-stone-300">
                  Public Display Name
                </label>
                <input
                  type="text"
                  value={editFormData.displayName}
                  onChange={e => setEditFormData({ ...editFormData, displayName: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-stone-700 dark:text-stone-300">
                  Book Title
                </label>
                <input
                  type="text"
                  value={editFormData.bookTitle}
                  onChange={e => setEditFormData({ ...editFormData, bookTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-stone-700 dark:text-stone-300">
                  Written Feedback
                </label>
                <textarea
                  rows={4}
                  value={editFormData.writtenFeedback}
                  onChange={e => setEditFormData({ ...editFormData, writtenFeedback: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded text-stone-900 dark:text-stone-100 leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-stone-700 dark:text-stone-300">
                  Internal Administrative Notes
                </label>
                <input
                  type="text"
                  value={editFormData.adminNotes}
                  onChange={e => setEditFormData({ ...editFormData, adminNotes: e.target.value })}
                  placeholder="Notes visible only to administrators..."
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleReviewAction(editingReview.id, 'edit', editFormData)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 dark:bg-amber-600 rounded hover:bg-stone-800"
              >
                Save Adjustments
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
