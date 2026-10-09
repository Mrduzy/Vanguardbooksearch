# VANGUARDBOOKSEARCH: Deployment, Security & Operating Guide

## Overview
VANGUARDBOOKSEARCH is a professional book discoverability and positioning architecture website built for authors. This document details production deployment to Netlify via GitHub, server-side authentication, persistent storage, and operations.

---

## 1. Project Architecture

* **Frontend**: React 19 + TypeScript + Tailwind CSS (Vite build system).
* **Backend Runtime**:
  * **Development & Node Server**: Full-stack Express server (`server.ts`) hosting API routes at `/api/*` and mirrored at `/.netlify/functions/*`.
  * **Netlify Production**: Standalone ES Module Netlify Functions located in `netlify/functions/*.ts`.
* **Database & Persistence**:
  * Local & Container: High-speed atomic JSON disk store (`data/vanguard_data.json`).
  * Netlify Production: Netlify Blobs stores (`vanguard_reviews`, `vanguard_contacts`) with in-memory caching fallback.

---

## 2. Environment Variables Setup

Configure the following variables in **Netlify Site Configuration > Environment variables** (or in your local `.env` file for development):

| Variable Name | Required | Default in Dev | Purpose & Description |
| :--- | :--- | :--- | :--- |
| `ADMIN_PASSWORD` | **Yes** | `VanguardAdmin2026!` | Master password required to access the private `/admin` dashboard. Set to a strong random passphrase in production. |
| `ADMIN_SESSION_SECRET` | **Yes** | `vanguard-session-secret-key-salt-2026-production` | Long cryptographic secret used to sign and verify HMAC-SHA256 session cookies. Keep this separate from `ADMIN_PASSWORD`. |
| `NODE_VERSION` | Optional | `20` | Node.js runtime version specified in `netlify.toml`. |

> **Security Note:** Never commit real secrets to GitHub or expose them in client-side code.

---

## 3. GitHub & Netlify Deployment Workflow

### Step 1: Connect GitHub Repository
1. Commit and push the repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete Vanguard Book Search architecture"
   git push origin main
   ```
2. Log into [Netlify](https://app.netlify.com).
3. Select **Add new site > Import an existing project > GitHub**.
4. Select the repository.

### Step 2: Configure Build Settings
Netlify will automatically detect settings from `netlify.toml`:
* **Build command**: `npm run build`
* **Publish directory**: `dist`
* **Functions directory**: `netlify/functions`

### Step 3: Configure Environment Variables
In the Netlify dashboard under **Site configuration > Environment variables**, add:
* `ADMIN_PASSWORD`: Your chosen secure passphrase.
* `ADMIN_SESSION_SECRET`: A long random string (e.g. 64 characters).

### Step 4: Deploy
Click **Deploy site**. Netlify builds the Vite frontend and compiles the ESM Netlify Functions.

---

## 4. Brand Logo Asset Integration

The website is configured with the vector mark in `/public/logo.svg` which automatically scales and displays in both light and dark themes.

If you have a specific raster (PNG) or master vector (SVG) brand file from your designer:
1. Save your file to `public/logo.png` or `public/logo.svg`.
2. The `<BrandLogo />` component in `src/components/BrandLogo.tsx` is wired to automatically load `/logo.svg` (and falls back gracefully without broken image containers or layout shifts).
3. The favicon in `index.html` references `/logo.svg`.

---

## 5. Administration & Private Route

* **Private URL**: `https://vanguardbooksearch.com/admin`
* **Robots & Indexing**: The admin route is protected by `X-Robots-Tag: noindex, nofollow` in `netlify.toml` and disallowed in `robots.txt`. It is not present in public navigation, footers, or sitemap.
* **Authentication**: Login with your `ADMIN_PASSWORD`. Sessions are preserved via signed `vanguard_admin_session` cookies.
* **Testimonial Approval Policy**: Submissions are marked as `pending` upon receipt. Only submissions that have:
  1. Author publication consent granted
  2. Owner status set to `approved`
  3. Valid non-empty written feedback
  4. Explicitly published by the owner
  will be returned by `/api/public-testimonials` and displayed on the public website.

---

## 6. Production Verification Checklist

Before releasing publicly, verify each item:
- [x] All 5 public pages load (`/`, `/services`, `/method`, `/feedback`, `/contact`).
- [x] Complete 74-service catalogue is browsable without comma-separated strings.
- [x] Light and dark theme switch toggles and persists cleanly.
- [x] Mobile responsive drawer opens and navigates properly.
- [x] Author feedback form validates, saves submission, and marks record as pending review.
- [x] `/admin` login authenticates with the configured password.
- [x] Invalid admin passwords return a 401 response.
- [x] Review approval, publication, pinning (feature), editing, and archiving function persistently.
- [x] Contact inquiries are captured with timestamp and unread status.
- [x] Diagnostic health check endpoint (`/api/health-check`) reports `status: ok` without exposing secret values.
- [x] No long dash or em dash punctuation in website copy.
