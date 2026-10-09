import type { Handler } from '@netlify/functions';
import { extractAuthTokenFromHeaders, verifySessionToken } from './lib/auth.js';

export const handler: Handler = async (event) => {
  const token = extractAuthTokenFromHeaders(event.headers);
  const isValid = verifySessionToken(token);

  if (!isValid) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authenticated: false })
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ authenticated: true, role: 'admin' })
  };
};
