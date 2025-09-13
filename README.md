# The Plausible Post

A small, news-style satirical site built with Eleventy.

Prerequisites
- Node.js 14+ (or newer)
- npm

Install
1. Install dependencies:
   npm install

Development
- Run local dev server (live reload):
  npm run dev
- or:
  npm start
The site will be served at http://localhost:8080 by default.

Build
- Produce a production build:
  npm run build
- Output directory: _site

Project layout
- src/ (Eleventy input)
  - articles/ — Markdown posts (front matter: title, date, layout: article.njk, tags, author, image)
  - _layouts/ — layout templates (e.g. [`src/_layouts/article.njk`](src/_layouts/article.njk:1))
  - _includes/ — shared includes (e.g. [`src/_includes/base.njk`](src/_includes/base.njk:1))
  - _data/ — global data (e.g. [`src/_data/site.json`](src/_data/site.json:1))
  - assets/ — CSS and images (served to /assets/)

Key files
- Site config: [` .eleventy.js `](.eleventy.js:1)
- Package manifest / scripts: [`package.json`](package.json:1)
- Sample article: [`src/articles/2025-01-01-sample-article.md`](src/articles/2025-01-01-sample-article.md:1)
- Styles: [`src/assets/css/styles.css`](src/assets/css/styles.css:1)

Features added
- Collections for articles (sorted by date)
- Tag listing and per-tag pages under /tags/
- RSS feed at /feed.xml (powered by `@11ty/eleventy-plugin-rss`)

Adding content
Create a Markdown file under [`src/articles/`](src/articles/2025-01-01-sample-article.md:1) with front matter, for example:
---
title: "Headline"
date: 2025-01-01
layout: article.njk
author: "Name"
tags: [tag1, tag2]
image: "/assets/images/example.svg"
---

Notes
- After editing dependencies in [`package.json`](package.json:1), run `npm install`.
- Output is static under the `_site` directory and can be hosted on any static host.

License
MIT