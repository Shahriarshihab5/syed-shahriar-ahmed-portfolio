# Syed Shahriar Ahmed — Portfolio

A React + Vite portfolio for data intelligence, software engineering, research, and leadership work. It ships with a built-in admin studio so the site can be updated without touching code.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Admin studio

Open `http://localhost:5173/admin`.

- Default PIN: `shahriar2026`
- Override it by creating `.env.local`:

```bash
VITE_ADMIN_PIN=your-own-pin
```

The PIN is a convenience lock in the browser. The real protection for publishing is your GitHub token, so keep the token private.

### What you can manage

- Projects, split into **Data Intelligence** (Power BI / Excel / SQL) and **Software Engineering**
- Professional experience, with a per-role **Show on portfolio** toggle
- Research and publications
- Certificates (with image upload)
- Life & leadership activities (with image galleries)
- Profile details, hero portrait, and the downloadable CV
- Visitor analytics for the live site (read-only)
- Visibility, ordering, and deletion for every item

Every edit is saved to a local draft immediately. Use **Publish** to commit it to GitHub.

## Publishing to GitHub

1. Create a fine-grained personal access token at <https://github.com/settings/tokens?type=beta>.
2. Give it **Contents: Read and write** access to this repository only.
3. In **Admin → Publish**, paste the token and press **Publish changes**.
4. The admin commits `public/content.json` (and any new CV or images) to the configured branch.
5. Your host — Vercel, Netlify, or GitHub Pages — rebuilds automatically.

The token is stored in `sessionStorage` by default, or `localStorage` if you tick “Remember this token on this device”. It is never written into `content.json`.

### CV and photo updates

Upload a new PDF from **Admin → Profile & CV**. The file is committed to `public/` on publish, and the site links to it with a cache-busting version so visitors always get the latest CV.

Upload a new hero portrait in the same tab. The image is compressed in the browser, committed under `public/uploads/` on publish, and can be removed at any time to fall back to the default photo.

## Theme

- Dark mode is the default for new visitors.
- A sun/moon button (top-right) switches between dark and light mode.
- Both modes default to the **Emerald** palette.
- Each mode remembers the palette you last chose there.
- The palette menu beside the sun/moon button offers Sunset, Aurora, Emerald, and Azure.
- Preferences are stored in `localStorage`, so they persist between visits.

## Visitor analytics

Open **Admin → Analytics** to see how many people visit the live site and how long they stay. It shows:

- visitors, sessions, pageviews, average time on site, and bounce rate
- a traffic chart for 24 hours, 7 days, 30 days, or 90 days
- recent sessions with their duration, country, device, browser, and referrer
- breakdowns by country, device, browser, referrer, and section viewed

The tracker is cookie-free and anonymous. It stores no IP addresses, names, or personal details.

It needs no third-party account or API key. A small Netlify Function (`netlify/functions/track.mjs`) writes anonymous sessions to **Netlify Blobs**, and `netlify/functions/stats.mjs` aggregates them for the admin panel. Both the Vercel and Netlify deployments send their visits to the same function, so keep the Netlify site online. To use a different site, set `VITE_ANALYTICS_ORIGIN` at build time.

Use **Don't count my visits** in the Analytics tab to exclude your own browser; it takes effect on the next page load.

The functions run on Node.js 22, which `netlify.toml` sets.

## Content source

- Published content: `public/content.json`
- Default seed data: `src/data/defaultContent.js`

To reset `content.json` to the defaults:

```bash
npm run content:default
```

Export/import JSON backups from the **Publish** tab at any time.

## SPA routing

`/admin` is a client-side route. Redirect rules are included for:

- Netlify — `public/_redirects`
- Vercel — `vercel.json`

If you use GitHub Pages with a custom 404 strategy, serve `index.html` for unknown paths.
