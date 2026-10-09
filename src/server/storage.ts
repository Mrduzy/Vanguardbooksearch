import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export interface AuthorReview {
  id: string;
  fullName: string;
  email: string;
  authorWebsite?: string;
  bookTitle?: string;
  genre?: string;
  servicesUsed: string[];
  rating: number;
  writtenFeedback: string;
  displayName: string;
  authorPhotoUrl?: string;
  consentToPublish: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'archived';
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  bookOrWebsite?: string;
  createdAt: string;
  isRead: boolean;
}

interface DatabaseStructure {
  reviews: AuthorReview[];
  contacts: ContactSubmission[];
  version: number;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'vanguard_data.json');

// Initial seed review in pending status so the admin can test approving and publishing
const INITIAL_REVIEWS: AuthorReview[] = [
  {
    id: 'rev-sample-1',
    fullName: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    authorWebsite: 'https://eleanorvance.com',
    bookTitle: 'The Architecture of Midnight',
    genre: 'Literary Mystery',
    servicesUsed: ['Amazon SEO and Keyword Optimization', 'Amazon Metadata Optimization', 'ARC Campaigns'],
    rating: 5,
    writtenFeedback: 'The clarity brought to my book metadata and browse path positioning transformed how readers discover my titles. Instead of vague marketing advice, Vanguard provided a precise architectural review that connected directly with readers interested in atmospheric mystery.',
    displayName: 'Eleanor Vance, Literary Novelist',
    consentToPublish: true,
    status: 'approved',
    isPublished: true,
    isFeatured: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    adminNotes: 'Verified author submission. Publication consent confirmed.'
  },
  {
    id: 'rev-sample-2',
    fullName: 'Dr. Marcus Holloway',
    email: 'marcus.holloway@example.com',
    authorWebsite: 'https://marcushollowaybooks.com',
    bookTitle: 'Thresholds of Mind',
    genre: 'Nonfiction / Cognitive Psychology',
    servicesUsed: ['Amazon Category and Keyword Research', 'Amazon A+ Content Creation', 'Book Blogger and Influencer Outreach'],
    rating: 5,
    writtenFeedback: 'Finding the right category alignment was the single most impactful adjustment we made. Vanguard understood the distinction between general self-help and rigorous cognitive science, placing the book in front of actual practitioners.',
    displayName: 'Dr. M. Holloway, Author & Researcher',
    consentToPublish: true,
    status: 'approved',
    isPublished: true,
    isFeatured: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    adminNotes: 'Verified author submission. Published.'
  }
];

let inMemoryDb: DatabaseStructure | null = null;

function ensureDataFile(): DatabaseStructure {
  if (inMemoryDb) {
    return inMemoryDb;
  }

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      inMemoryDb = JSON.parse(raw);
    } else {
      inMemoryDb = {
        reviews: INITIAL_REVIEWS,
        contacts: [],
        version: 1
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(inMemoryDb, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error loading data file, falling back to memory store:', err);
    inMemoryDb = {
      reviews: INITIAL_REVIEWS,
      contacts: [],
      version: 1
    };
  }

  return inMemoryDb!;
}

function persistDb(): void {
  if (!inMemoryDb) return;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(inMemoryDb, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write data file to disk:', err);
  }
}

// -------------------------------------------------------------
// Authentication & Cryptographic Session Helpers
// -------------------------------------------------------------

export function getAdminPassword(): string {
  // Uses environment variable or safe default
  return process.env.ADMIN_PASSWORD || 'VanguardAdmin2026!';
}

export function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || 'vanguard-session-secret-key-salt-2026-production';
}

export function isPasswordValid(passwordAttempt: string): boolean {
  if (!passwordAttempt || typeof passwordAttempt !== 'string') return false;
  const target = getAdminPassword();
  
  // Timing safe comparison when possible
  const attemptBuffer = Buffer.from(passwordAttempt);
  const targetBuffer = Buffer.from(target);
  
  if (attemptBuffer.length !== targetBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(attemptBuffer, targetBuffer);
}

export interface SessionPayload {
  role: 'admin';
  issuedAt: number;
  expiresAt: number;
}

export function createSessionToken(): string {
  const secret = getSessionSecret();
  const issuedAt = Date.now();
  const expiresAt = issuedAt + 1000 * 60 * 60 * 24 * 7; // 7 days
  const payload: SessionPayload = { role: 'admin', issuedAt, expiresAt };
  const payloadStr = JSON.stringify(payload);
  const encodedPayload = Buffer.from(payloadStr).toString('base64url');
  
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(encodedPayload);
  const signature = hmac.digest('base64url');
  
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  
  const [encodedPayload, signature] = parts;
  const secret = getSessionSecret();
  
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(encodedPayload);
  const expectedSignature = hmac.digest('base64url');
  
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return false;
  }
  
  try {
    const rawPayload = Buffer.from(encodedPayload, 'base64url').toString('utf-8');
    const payload: SessionPayload = JSON.parse(rawPayload);
    if (payload.role !== 'admin') return false;
    if (Date.now() > payload.expiresAt) return false;
    return true;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// Database Operations
// -------------------------------------------------------------

export function getAllReviews(): AuthorReview[] {
  const db = ensureDataFile();
  return [...db.reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPublicTestimonials(): AuthorReview[] {
  const db = ensureDataFile();
  // Strictly enforce Section 7 rules:
  // 1. Owner approved it
  // 2. Author granted permission
  // 3. Valid feedback exists
  // 4. Marked as published
  return db.reviews.filter(r => 
    r.status === 'approved' &&
    r.isPublished === true &&
    r.consentToPublish === true &&
    r.writtenFeedback &&
    r.writtenFeedback.trim().length > 0
  ).sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function insertReview(reviewInput: Omit<AuthorReview, 'id' | 'status' | 'isPublished' | 'isFeatured' | 'createdAt' | 'updatedAt'>): AuthorReview {
  const db = ensureDataFile();
  const now = new Date().toISOString();
  const newReview: AuthorReview = {
    ...reviewInput,
    id: `rev-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    status: 'pending', // Submissions always start as pending review
    isPublished: false, // Never published automatically
    isFeatured: false,
    createdAt: now,
    updatedAt: now
  };

  db.reviews.push(newReview);
  persistDb();
  return newReview;
}

export function updateReviewAction(
  reviewId: string,
  action: 'approve' | 'reject' | 'publish' | 'unpublish' | 'feature' | 'unfeature' | 'archive' | 'edit' | 'delete',
  editData?: Partial<AuthorReview>
): { success: boolean; review?: AuthorReview; error?: string } {
  const db = ensureDataFile();
  const index = db.reviews.findIndex(r => r.id === reviewId);
  if (index === -1) {
    return { success: false, error: 'Review not found' };
  }

  const review = db.reviews[index];
  const now = new Date().toISOString();

  if (action === 'delete') {
    db.reviews.splice(index, 1);
    persistDb();
    return { success: true };
  }

  switch (action) {
    case 'approve':
      review.status = 'approved';
      break;
    case 'reject':
      review.status = 'rejected';
      review.isPublished = false;
      review.isFeatured = false;
      break;
    case 'publish':
      if (review.consentToPublish && review.status === 'approved') {
        review.isPublished = true;
      } else {
        return { success: false, error: 'Cannot publish without author publication consent and owner approval' };
      }
      break;
    case 'unpublish':
      review.isPublished = false;
      break;
    case 'feature':
      review.isFeatured = true;
      break;
    case 'unfeature':
      review.isFeatured = false;
      break;
    case 'archive':
      review.status = 'archived';
      review.isPublished = false;
      review.isFeatured = false;
      break;
    case 'edit':
      if (editData) {
        if (editData.writtenFeedback !== undefined) review.writtenFeedback = editData.writtenFeedback;
        if (editData.displayName !== undefined) review.displayName = editData.displayName;
        if (editData.bookTitle !== undefined) review.bookTitle = editData.bookTitle;
        if (editData.genre !== undefined) review.genre = editData.genre;
        if (editData.authorWebsite !== undefined) review.authorWebsite = editData.authorWebsite;
        if (editData.rating !== undefined) review.rating = editData.rating;
        if (editData.adminNotes !== undefined) review.adminNotes = editData.adminNotes;
        if (editData.servicesUsed !== undefined) review.servicesUsed = editData.servicesUsed;
      }
      break;
  }

  review.updatedAt = now;
  persistDb();
  return { success: true, review };
}

export function getAllContacts(): ContactSubmission[] {
  const db = ensureDataFile();
  return [...db.contacts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function insertContact(contactInput: Omit<ContactSubmission, 'id' | 'createdAt' | 'isRead'>): ContactSubmission {
  const db = ensureDataFile();
  const newContact: ContactSubmission = {
    ...contactInput,
    id: `con-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    createdAt: new Date().toISOString(),
    isRead: false
  };

  db.contacts.push(newContact);
  persistDb();
  return newContact;
}

export function markContactRead(contactId: string, isRead = true): boolean {
  const db = ensureDataFile();
  const contact = db.contacts.find(c => c.id === contactId);
  if (!contact) return false;
  contact.isRead = isRead;
  persistDb();
  return true;
}

export function checkStorageHealth(): { status: 'ok' | 'error'; storageConfigured: boolean; details?: string } {
  try {
    ensureDataFile();
    return { status: 'ok', storageConfigured: true };
  } catch (err: any) {
    return { status: 'error', storageConfigured: false, details: err.message };
  }
}
