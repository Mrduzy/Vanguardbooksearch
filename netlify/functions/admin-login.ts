import type { Handler } from '@netlify/functions';
import { isPasswordValid, createSessionToken } from './lib/auth.js';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { password } = JSON.parse(event.body || '{}');
    if (!password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Password is required' })
      };
    }

    if (!isPasswordValid(password)) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid admin credentials' })
      };
    }

    const token = createSessionToken();
    const cookieHeader = `vanguard_admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`;

    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': cookieHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        token,
        message: 'Authentication successful'
      })
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error processing login' })
    };
  }
};
