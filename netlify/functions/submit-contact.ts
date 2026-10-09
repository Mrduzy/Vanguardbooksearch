import type { Handler } from '@netlify/functions';
import crypto from 'node:crypto';
import { fetchAllContacts, saveAllContacts } from './lib/dataStore.js';
import type { ContactSubmission } from './lib/auth.js';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email, subject, message, bookOrWebsite, honeypot } = body;

    // Spam honeypot
    if (honeypot) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, message: 'Message transmitted' })
      };
    }

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Name, email, subject, and message are required fields.' })
      };
    }

    const contacts = await fetchAllContacts();
    const newContact: ContactSubmission = {
      id: `con-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: String(subject).trim(),
      message: String(message).trim(),
      bookOrWebsite: bookOrWebsite ? String(bookOrWebsite).trim() : undefined,
      createdAt: new Date().toISOString(),
      isRead: false
    };

    contacts.push(newContact);
    await saveAllContacts(contacts);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Your inquiry has been received. Vanguard Book Search will respond within one business day.',
        id: newContact.id
      })
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process contact submission' })
    };
  }
};
