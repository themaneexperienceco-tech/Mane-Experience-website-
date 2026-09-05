# The Mane Experience By Bri — Website

Self-hosted, static (no Shopify/Wix) site. Plain HTML/CSS/JS, deployed to Netlify with a custom domain.

## Pages

- `index.html` — Home
- `about.html` — About
- `services.html` — Services
- `booking.html` — Booking questionnaire (submits via Formspree)
- `policies.html` — Booking & service policies
- `gallery.html` — Photo gallery (in progress)
- `faq.html` — FAQ (in progress)

## Folders

- `images/gallery/` — web-optimized photos used on the site
- `raw/` — original, full-size source photos (not tracked in git — see `.gitignore`)
- `_archive/` — old drafts/duplicates kept for reference, not part of the live site

## Deploy

Netlify, publishing from the repo root (`netlify.toml` sets `publish = "."`). Push to a git remote (GitHub/GitLab) and connect it in Netlify, or drag-and-drop the folder into Netlify's dashboard.

## Status

Currently unifying the 5 existing pages with shared nav/footer, real contact info, a processed image gallery, and the two new pages (Gallery, FAQ).
