import type { Handler } from '@netlify/functions';
import { fetchAllReviews } from './lib/dataStore.js';

export const handler: Handler = async () => {
  try {
    const all = await fetchAllReviews();
    // Enforce publication rules:
    // 1. Approved by owner
    // 2. Author consented to publish
    // 3. Valid feedback text
    // 4. Marked isPublished === true
    const publicTestimonials = all.filter(r =>
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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      },
      body: JSON.stringify({
        success: true,
        testimonials: publicTestimonials
      })
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve testimonials' })
    };
  }
};
