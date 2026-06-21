# Cristian Dubineanschi — Portfolio

Portfolio of an interactive media artist: light and sound installations, spatial
systems, and visual design. Live at **https://isaac-doobs.github.io**.

A static site built with Astro — no client framework, no backend. Each project is a
Markdown file compiled to HTML at build time.

## Stack

- **Astro 6** — static generation, zero JavaScript shipped by default
- **Content Collections** — projects authored as Markdown under `src/content/projects/`, validated against a typed schema
- **View Transitions** for client-side navigation
- **Self-hosted type** — Space Grotesk, Inter, and Space Mono via `@fontsource`; no external CDN
- **SEO** — `@astrojs/sitemap`, canonical and Open Graph tags, schema.org `Person` JSON-LD
- Light and dark themes, persisted to `localStorage` and applied before first paint

## Development

```bash
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # static build → dist/
npm run preview   # serve the production build locally
npm run format    # Prettier
```

Requires Node 22.12 or newer.

## Structure

```
src/
├─ content/projects/      project entries — interactive/ and design/ (the site's content)
├─ pages/                 routes: index, about, contact, projects/[id]
├─ layouts/Layout.astro   page shell — head, navigation, theme, fonts, motion
└─ styles/global.css      design tokens and base styles
public/assets/projects/   hero and gallery media
```

Projects sit in `interactive/` or `design/` for organisation only; each resolves to a
flat URL, `/projects/<slug>`.

## Adding a project

Create `src/content/projects/<interactive|design>/<slug>.md`. The frontmatter is
validated against `src/content.config.ts`:

```yaml
---
title: "Project Name"
category: "Interactive"          # "Interactive" or "Design"
year: 2026
status: "Exhibited"
medium: ["Light Installation", "Sound"]
concept: "A paragraph framing the work, its idea, and the space it occupies."
software: ["TouchDesigner"]
hardware: ["ESP32", "Addressable LEDs"]
inputs: ["Two voice signals"]
videoUrl: "/assets/projects/<slug>_01.jpg"      # image, or .mp4 for video
thumbnailUrl: "/assets/projects/<slug>_01.jpg"

# optional
academicContext: "Program or exhibition context."
process: ["First step", "Second step"]
challenges: "What was hard, and how it was resolved."
researchRelevance: "How the work connects to a wider line of inquiry."
mediaGallery: ["/assets/projects/<slug>_02.jpg", "/assets/projects/<slug>_03.jpg"]
blueprintUrl: "/assets/<slug>_blueprint.jpg"
blueprintCaption: "Spatial layout and sensor mapping."
---

Anything below the frontmatter renders as the project's detailed narrative.
```

**Media.** Gallery tiles show a still; full video loads only when a visitor opens the
lightbox. For a video `clip.mp4`, place a matching poster named `clip_poster.jpg`
beside it.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. The canonical URL comes from `site` in
`astro.config.mjs` (`https://isaac-doobs.github.io`); if it changes, update the
`Sitemap:` line in `public/robots.txt` to match.
