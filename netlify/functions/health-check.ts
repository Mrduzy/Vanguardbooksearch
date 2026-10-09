import type { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  const adminPasswordConfigured = Boolean(process.env.ADMIN_PASSWORD);
  const sessionSecretConfigured = Boolean(process.env.ADMIN_SESSION_SECRET);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify({
      status: 'ok',
      adminPasswordConfigured,
      sessionSecretConfigured,
      storageConfigured: true,
      runtime: 'Netlify Functions ESM',
      timestamp: new Date().toISOString()
    })
  };
};
