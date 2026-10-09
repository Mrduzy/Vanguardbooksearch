import type { Handler } from '@netlify/functions';
import { extractAuthTokenFromHeaders, verifySessionToken } from './lib/auth.js';
import { fetchAllReviews, saveAllReviews } from './lib/dataStore.js';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const token = extractAuthTokenFromHeaders(event.headers);
  if (!verifySessionToken(token)) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Unauthorized: Valid admin session required' })
    };
  }

  try {
    const { reviewId, action, editData } = JSON.parse(event.body || '{}');
    if (!reviewId || !action) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'reviewId and action are required' })
      };
    }

    const reviews = await fetchAllReviews();
    const index = reviews.findIndex(r => r.id === reviewId);
    if (index === -1) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Review record not found' })
      };
    }

    const review = reviews[index];
    const now = new Date().toISOString();

    if (action === 'delete') {
      reviews.splice(index, 1);
      await saveAllReviews(reviews);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, message: 'Review deleted' })
      };
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
          return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Cannot publish without verified author consent and approved status' })
          };
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
        }
        break;
    }

    review.updatedAt = now;
    await saveAllReviews(reviews);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, review })
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error modifying review' })
    };
  }
};
