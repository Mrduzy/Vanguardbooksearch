import vanguardRasterEmblem from '../assets/images/vanguard_logo_1791515327452.jpg';

/**
 * Resolves static assets stored in the public directory
 * using Vite's import.meta.env.BASE_URL.
 * This ensures all assets resolve properly on GitHub Pages (/Vanguardbooksearch/)
 * as well as custom domains and development environments.
 */
export function getAssetUrl(relativePath: string): string {
  if (!relativePath) return '';
  
  // Return external URLs or data URIs unchanged
  if (
    relativePath.startsWith('http://') ||
    relativePath.startsWith('https://') ||
    relativePath.startsWith('data:')
  ) {
    return relativePath;
  }

  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  const baseUrl = import.meta.env.BASE_URL || '/';
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${prefix}${cleanPath}`;
}

/**
 * Centrally managed brand asset references.
 * - public/ assets use getAssetUrl() with import.meta.env.BASE_URL
 * - src/assets/ assets use direct bundler imports
 */
export const BRAND_ASSETS = {
  faviconSvg: getAssetUrl('favicon.svg'),
  logoSvg: getAssetUrl('logo.svg'),
  logoPng: getAssetUrl('logo.png'),
  logoEmblemPng: getAssetUrl('logo-emblem.png'),
  logoEmblemJpg: getAssetUrl('logo-emblem.jpg'),
  rasterEmblem: vanguardRasterEmblem
};

export { vanguardRasterEmblem };
