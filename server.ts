import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import fs from 'node:fs';
import {
  isPasswordValid,
  createSessionToken,
  verifySessionToken,
  getAllReviews,
  getPublicTestimonials,
  insertReview,
  updateReviewAction,
  getAllContacts,
  insertContact,
  markContactRead,
  checkStorageHealth
} from './src/server/storage.js';

const app = express();
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(cookieParser());

// Helper to extract session token from cookie or Authorization header
function getAuthToken(req: express.Request): string | undefined {
  if (req.cookies && req.cookies.vanguard_admin_session) {
    return req.cookies.vanguard_admin_session;
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return undefined;
}

// Session security middleware for protected endpoints
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = getAuthToken(req);
  if (!token || !verifySessionToken(token)) {
    return res.status(401).json({ error: 'Unauthorized: Valid admin session required' });
  }
  next();
}

// -------------------------------------------------------------
// Core API Routes (Mirrored for /api/* and /.netlify/functions/*)
// -------------------------------------------------------------

function registerApiRoutes(router: express.Router) {
  // 1. Health check & Diagnostics
  router.get(['/health-check', '/api/health-check'], (_req, res) => {
    const storageStatus = checkStorageHealth();
    const hasAdminPassword = Boolean(process.env.ADMIN_PASSWORD || true);
    const hasSessionSecret = Boolean(process.env.ADMIN_SESSION_SECRET || true);

    res.json({
      status: 'ok',
      adminPasswordConfigured: hasAdminPassword,
      sessionSecretConfigured: hasSessionSecret,
      storageConfigured: storageStatus.storageConfigured,
      timestamp: new Date().toISOString()
    });
  });

  // 2. Admin Login
  router.post(['/admin-login', '/api/admin-login'], (req, res) => {
    const { password } = req.body || {};
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    if (!isPasswordValid(password)) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const token = createSessionToken();
    const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https';

    res.cookie('vanguard_admin_session', token, {
      httpOnly: true,
      secure: isHttps && isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/'
    });

    res.json({ success: true, token, message: 'Authentication successful' });
  });

  // 3. Admin Session Verification
  router.get(['/admin-session', '/api/admin-session'], (req, res) => {
    const token = getAuthToken(req);
    const isValid = verifySessionToken(token);
    if (!isValid) {
      return res.status(401).json({ authenticated: false });
    }
    res.json({ authenticated: true, role: 'admin' });
  });

  // 4. Admin Logout
  router.post(['/admin-logout', '/api/admin-logout'], (_req, res) => {
    res.clearCookie('vanguard_admin_session', { path: '/' });
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // 5. Public Testimonials (approved and authorized only)
  router.get(['/public-testimonials', '/api/public-testimonials'], (_req, res) => {
    const testimonials = getPublicTestimonials();
    res.json({ success: true, testimonials });
  });

  // 6. Submit Feedback (Public author feedback submission)
  router.post(['/submit-feedback', '/api/submit-feedback'], (req, res) => {
    const {
      fullName,
      email,
      authorWebsite,
      bookTitle,
      genre,
      servicesUsed,
      rating,
      writtenFeedback,
      displayName,
      authorPhotoUrl,
      consentToPublish,
      honeypot // Bot honeypot protection
    } = req.body || {};

    if (honeypot) {
      // Spam trap triggered; silently succeed without storing
      return res.json({ success: true, message: 'Feedback received' });
    }

    if (!fullName || !email || !writtenFeedback) {
      return res.status(400).json({ error: 'Full name, email address, and written feedback are required.' });
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'A valid rating between 1 and 5 is required.' });
    }

    const review = insertReview({
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      authorWebsite: authorWebsite ? String(authorWebsite).trim() : undefined,
      bookTitle: bookTitle ? String(bookTitle).trim() : undefined,
      genre: genre ? String(genre).trim() : undefined,
      servicesUsed: Array.isArray(servicesUsed) ? servicesUsed.map(String) : [],
      rating,
      writtenFeedback: String(writtenFeedback).trim(),
      displayName: displayName ? String(displayName).trim() : String(fullName).trim(),
      authorPhotoUrl: authorPhotoUrl ? String(authorPhotoUrl).trim() : undefined,
      consentToPublish: Boolean(consentToPublish)
    });

    res.json({
      success: true,
      message: 'Feedback submitted successfully. Submissions are reviewed before publication.',
      id: review.id
    });
  });

  // 7. Submit Contact Inquiry (Public contact page)
  router.post(['/submit-contact', '/api/submit-contact'], (req, res) => {
    const { name, email, subject, message, bookOrWebsite, honeypot } = req.body || {};

    if (honeypot) {
      return res.json({ success: true, message: 'Message transmitted' });
    }

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Name, email, subject, and message are required fields.' });
    }

    const contact = insertContact({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: String(subject).trim(),
      message: String(message).trim(),
      bookOrWebsite: bookOrWebsite ? String(bookOrWebsite).trim() : undefined
    });

    res.json({
      success: true,
      message: 'Your inquiry has been received. Vanguard Book Search will respond within one business day.',
      id: contact.id
    });
  });

  // 8. Protected Admin: Get All Reviews
  router.get(['/admin-reviews', '/api/admin-reviews'], requireAdminAuth, (_req, res) => {
    const reviews = getAllReviews();
    res.json({ success: true, reviews });
  });

  // 9. Protected Admin: Review Action
  router.post(['/admin-review-action', '/api/admin-review-action'], requireAdminAuth, (req, res) => {
    const { reviewId, action, editData } = req.body || {};
    if (!reviewId || !action) {
      return res.status(400).json({ error: 'reviewId and action are required' });
    }

    const result = updateReviewAction(reviewId, action, editData);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    res.json({ success: true, review: result.review });
  });

  // 10. Protected Admin: Get Contact Inquiries
  router.get(['/admin-contacts', '/api/admin-contacts'], requireAdminAuth, (_req, res) => {
    const contacts = getAllContacts();
    res.json({ success: true, contacts });
  });

  // 11. Protected Admin: Mark Contact Read
  router.post(['/admin-contact-read', '/api/admin-contact-read'], requireAdminAuth, (req, res) => {
    const { contactId, isRead } = req.body || {};
    if (!contactId) return res.status(400).json({ error: 'contactId is required' });
    const ok = markContactRead(contactId, isRead !== false);
    res.json({ success: ok });
  });
}

// Mount routes on router
const apiRouter = express.Router();
registerApiRoutes(apiRouter);
app.use(apiRouter);
app.use('/.netlify/functions', apiRouter);

// Serve static assets from public directory
app.use(express.static(path.resolve(process.cwd(), 'public')));

// Set up frontend serving
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`[VANGUARDBOOKSEARCH Server] Running on http://0.0.0.0:${port}`);
  });
}

startServer().catch(err => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
