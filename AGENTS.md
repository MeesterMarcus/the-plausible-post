# AGENTS.md — Project Agents Guide for Coding Agents

Reference: https://agentsmd.net/

## Purpose
This file provides authoritative guidance for automated coding agents (OpenAI Codex, other code-writing agents) operating on this repository so they have the context, constraints, and commands needed to make safe, small, useful changes.

## Project overview
- Input / source:
  - [`src/`](src:1)
    - [`src/articles/`](src/articles:1) — Markdown articles. (front matter: title, date, layout: article.njk, tags, author, image)
    - [`src/_layouts/`](src/_layouts:1) — Nunjucks layout templates (e.g. [`src/_layouts/article.njk`](src/_layouts/article.njk:1))
    - [`src/_includes/`](src/_includes:1) — shared includes (e.g. [`src/_includes/base.njk`](src/_includes/base.njk:1))
    - [`src/_data/`](src/_data:1) — global data (e.g. [`src/_data/site.json`](src/_data/site.json:1))
    - [`src/assets/`](src/assets:1) — CSS and images (served to /assets/)
- Config: [`.eleventy.js`](.eleventy.js:1)
- Manifest / scripts: [`package.json`](package.json:1)
- Output: `_site/` (do not commit)

## Conventions and constraints
- Languages:
  - JavaScript / Node for tooling and build steps.
  - Markdown for content files.
  - Nunjucks for template files.
- Content guidelines:
  - Use US English unless requested otherwise.
  - Maintain satirical tone; avoid real-world defamation and targeted harassment.
  - When generating content that may be sensitive, add `disclaimer: "Satire — not factual"` to front matter.
- File placement:
  - Create new articles under [`src/articles/`](src/articles:1).
  - Do not modify files outside the repository root without explicit instruction.
- Filenames:
  - Use `YYYY-MM-DD-title.md` pattern for articles.
  - Use lowercase, hyphen-separated slugs for permalinks.

## Coding standards for agents
- Generate clear, idiomatic JavaScript (ES2020+) when creating or editing scripts.
- Keep changes minimal and focused; prefer many small PRs over one large PR.
- Add short comments for non-trivial logic.
- Prefer to update or add tests when introducing logic; if tests are not present, mention that tests should be added in the PR description.

## Template & styling rules
- Article pages should use `layout: article.njk`.
- Shared fragments belong in [`src/_includes/`](src/_includes:1).
- Keep CSS changes small and scoped to existing files under [`src/assets/css/`](src/assets/css:1). Do not introduce large CSS frameworks unless approved.

## Commands agents may reference (developer context)
- Install dependencies: [`npm install`](package.json:1)
- Start dev server (live reload): [`npm run dev`](package.json:1) or [`npm start`](package.json:1)
- Build for production: [`npm run build`](package.json:1)

## Pull request / commit workflow for agents
- Create a branch per task.
- Each PR must include:
  - Short summary of change.
  - Files changed and reasoning.
  - Build/check status (see programmatic checks below).
  - If adding content, a short human-facing summary (headline + 2-sentence blurb).
- Do not merge to main without human reviewer approval.

## Programmatic checks (agents should run before creating PRs)
- Build: run [`npm run build`](package.json:1) to ensure site compiles.
- Lint / formatting: repository does not include a default linter; if you add code, add linters and include `npm run lint` in checks.
- Tests: none exist by default; add `npm test` if you add testable code.

## Recommended agent roles
- IdeaAgent — propose headlines and short outlines, writing to `src/drafts/` (if repo uses a drafts directory) or open an issue/PR with suggestions.
- DraftAgent — generate initial Markdown drafts in [`src/articles/`](src/articles:1) with complete front matter and a short author note.
- FormatAgent — run formatting (prettier) and adjust generated files to match repo style.
- PRAgent — prepare branch and PR with description, run build checks, and leave notes for reviewers.

## Safety & human-in-the-loop
- Agents must never push directly to `main`. Create branches and PRs for human review.
- Agents should add a clear "agent-generated" note in PR description and include the commands used.
- Editors must verify satire tone and legal safety before merging.

## Example front matter template (agents should follow exactly)
```
---
title: "Headline"
date: 2025-09-13
layout: article.njk
author: "Author Name"
tags: [tag1, tag2]
image: "/assets/images/example.svg"
disclaimer: "Satire — not factual"
---
```

## References
- Agents.md reference: https://agentsmd.net/

End.