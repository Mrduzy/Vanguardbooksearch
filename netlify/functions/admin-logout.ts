import type { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': 'vanguard_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ success: true, message: 'Logged out successfully' })
  };
};
