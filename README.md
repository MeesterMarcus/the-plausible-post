# The Plausible Post

A small, news-style satirical site built with Eleventy.

Prerequisites
- Node.js 14+ (or newer)
- npm (or yarn/pnpm)

Quick install
1. Install dependencies:
   npm install

2. Start local dev server with live reload:
   npm run dev
   or
   npm start

Default local URL: http://localhost:8080

Build / CI
- Build static site for production:
  npm run build
  Output directory: _site

- For CI reproducible installs, use:
  npm ci

Project layout
- [`src/`](src:1) — Eleventy input
  - [`src/articles/`](src/articles:1) — Markdown posts (front matter: title, date, layout: article.njk, tags, author, image)
  - [`src/_layouts/`](src/_layouts:1) — Nunjucks layout templates (eg. [`src/_layouts/article.njk`](src/_layouts/article.njk:1))
  - [`src/_includes/`](src/_includes:1) — shared includes (eg. [`src/_includes/base.njk`](src/_includes/base.njk:1))
  - [`src/_data/`](src/_data:1) — global data (eg. [`src/_data/site.json`](src/_data/site.json:1))
  - [`src/assets/`](src/assets:1) — CSS and images (served to /assets/)

Key files
- Site config: [`.eleventy.js`](.eleventy.js:1)
- Package manifest / scripts: [`package.json`](package.json:1)
- Sample content: [`src/articles/2025-01-01-sample-article.md`](src/articles/2025-01-01-sample-article.md:1)
- Styles: [`src/assets/css/styles.css`](src/assets/css/styles.css:1)
- Agent guidance: [`AGENTS.md`](AGENTS.md:1)

Features included
- Article collection, sorted by date
- Tag index and per-tag pages at `/tags/<tag>/`
- RSS feed at `/feed.xml` (powered by `@11ty/eleventy-plugin-rss`)
- Simple responsive CSS and placeholder assets

Adding articles
Create Markdown files under [`src/articles/`](src/articles:1) using the following front matter pattern:

---
title: "Headline"
date: 2025-01-01
layout: article.njk
author: "Author Name"
tags: [tag1, tag2]
image: "/assets/images/example.svg"
disclaimer: "Satire — not factual"
---

Notes & developer guidance
- After changing `devDependencies` in [`package.json`](package.json:1), run `npm install` (or `npm ci` in CI).
- The static output is written to `_site/` — don't commit that directory.
- The project has no linter by default. If you add scripts or JS, include linting and tests and add commands to [`package.json`](package.json:1).
- See [`AGENTS.md`](AGENTS.md:1) for guidance agents should follow when generating code or content.

Deployment
- Any static host (Netlify, Vercel, GitHub Pages, etc.) can serve the `_site/` output.
- Typical CI flow:
  1. npm ci
  2. npm run build
  3. Deploy `_site/`

Support & contributions
- Create small, focused branches for changes.
- Include a short PR description and mention if content is agent-generated (see [`AGENTS.md`](AGENTS.md:1)).

License
MIT