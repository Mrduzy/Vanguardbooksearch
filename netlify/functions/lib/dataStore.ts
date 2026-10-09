import { getStore } from '@netlify/blobs';
import crypto from 'node:crypto';
import type { AuthorReview, ContactSubmission } from './auth.js';

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

// Fallback in-memory cache for instances without Netlify Blobs token
let memoryReviews: AuthorReview[] = [...INITIAL_REVIEWS];
let memoryContacts: ContactSubmission[] = [];

async function getReviewsStore() {
  try {
    return getStore('vanguard_reviews');
  } catch {
    return null;
  }
}

async function getContactsStore() {
  try {
    return getStore('vanguard_contacts');
  } catch {
    return null;
  }
}

export async function fetchAllReviews(): Promise<AuthorReview[]> {
  const store = await getReviewsStore();
  if (store) {
    try {
      const data = await store.get('all_reviews', { type: 'json' });
      if (Array.isArray(data) && data.length > 0) {
        return data as AuthorReview[];
      }
      // If store is empty, seed it
      await store.setJSON('all_reviews', INITIAL_REVIEWS);
      return INITIAL_REVIEWS;
    } catch {
      // Fallback
    }
  }
  return memoryReviews;
}

export async function saveAllReviews(reviews: AuthorReview[]): Promise<void> {
  memoryReviews = reviews;
  const store = await getReviewsStore();
  if (store) {
    try {
      await store.setJSON('all_reviews', reviews);
    } catch (err) {
      console.warn('Netlify Blobs write failed, relying on memory:', err);
    }
  }
}

export async function fetchAllContacts(): Promise<ContactSubmission[]> {
  const store = await getContactsStore();
  if (store) {
    try {
      const data = await store.get('all_contacts', { type: 'json' });
      if (Array.isArray(data)) {
        return data as ContactSubmission[];
      }
    } catch {
      // Fallback
    }
  }
  return memoryContacts;
}

export async function saveAllContacts(contacts: ContactSubmission[]): Promise<void> {
  memoryContacts = contacts;
  const store = await getContactsStore();
  if (store) {
    try {
      await store.setJSON('all_contacts', contacts);
    } catch (err) {
      console.warn('Netlify Blobs contact write failed:', err);
    }
  }
}
