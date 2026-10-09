import type { Handler } from '@netlify/functions';
import { extractAuthTokenFromHeaders, verifySessionToken } from './lib/auth.js';
import { fetchAllReviews } from './lib/dataStore.js';

export const handler: Handler = async (event) => {
  const token = extractAuthTokenFromHeaders(event.headers);
  if (!verifySessionToken(token)) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Unauthorized: Valid admin session required' })
    };
  }

  try {
    const reviews = await fetchAllReviews();
    const sorted = [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, reviews: sorted })
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load reviews' })
    };
  }
};
