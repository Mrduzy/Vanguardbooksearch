import type { Handler } from '@netlify/functions';
import crypto from 'node:crypto';
import { fetchAllReviews, saveAllReviews } from './lib/dataStore.js';
import type { AuthorReview } from './lib/auth.js';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
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
      honeypot
    } = body;

    // Bot trap
    if (honeypot) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, message: 'Feedback received' })
      };
    }

    if (!fullName || !email || !writtenFeedback) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Full name, email address, and written feedback are required.' })
      };
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'A valid rating between 1 and 5 is required.' })
      };
    }

    const reviews = await fetchAllReviews();
    const now = new Date().toISOString();

    const newReview: AuthorReview = {
      id: `rev-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
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
      consentToPublish: Boolean(consentToPublish),
      status: 'pending', // Submissions always start as pending review
      isPublished: false, // Never published automatically
      isFeatured: false,
      createdAt: now,
      updatedAt: now
    };

    reviews.push(newReview);
    await saveAllReviews(reviews);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Feedback submitted successfully. Submissions are reviewed before publication.',
        id: newReview.id
      })
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process feedback submission' })
    };
  }
};
