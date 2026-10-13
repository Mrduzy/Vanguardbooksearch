/**
 * API utility helper for Vanguard Book Search.
 * Supports pointing to an external backend URL (via VITE_API_BASE_URL)
 * when hosted statically on GitHub Pages.
 */

const API_BASE = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export function getStoredAdminToken(): string | null {
  try {
    return sessionStorage.getItem('vanguard_admin_token') || localStorage.getItem('vanguard_admin_token') || null;
  } catch {
    return null;
  }
}

export function setStoredAdminToken(token: string): void {
  try {
    sessionStorage.setItem('vanguard_admin_token', token);
    localStorage.setItem('vanguard_admin_token', token);
  } catch {}
}

export function clearStoredAdminToken(): void {
  try {
    sessionStorage.removeItem('vanguard_admin_token');
    localStorage.removeItem('vanguard_admin_token');
  } catch {}
}

export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return API_BASE ? `${API_BASE}${cleanEndpoint}` : cleanEndpoint;
}

export async function fetchApi(endpoint: string, options?: RequestInit): Promise<Response> {
  const url = getApiUrl(endpoint);
  const token = getStoredAdminToken();

  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string> || {})
  };

  if (token && !headers['Authorization'] && !headers['authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    credentials: 'include',
    ...options,
    headers
  });
}
