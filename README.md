# Cristian Dubineanschi — Portfolio

Portfolio for an interactive media artist: installations, light systems, and
visual design. Built with **Astro 6** (static, zero-JS by default) and deployed
to GitHub Pages.

---

## 1. Visual direction

Brutalist-editorial: monochrome base with a single muted-violet accent.

- **Palette:** near-black ink on off-white paper (dark theme) / warm bone paper
  (light theme). Accent `#8b6fc4` (dark) / `#5f4a93` (light), used sparingly.
- **Typography:** Space Grotesk (display/sans) + Inter (body) + Space Mono
  (labels/code). **Self-hosted via `@fontsource`** — no external font CDN.
- **Motion:** a Swiss column grid, cursor-reactive grid dots, a particle cursor,
  scroll reveals, and a film-grain overlay — all gated behind
  `prefers-reduced-motion` and disabled on touch / small screens.

Theme is persisted to `localStorage` under `system-theme`; an inline script in
`Layout.astro` sets it before paint to avoid a flash.

---

## 2. Stack

- **Framework:** [Astro v6](https://astro.build/) — static HTML generation.
- **Content:** Astro Content Collections from local Markdown in
  `src/content/projects/` (see `src/content.config.ts` for the schema).
- **Transitions:** native View Transitions via `<ClientRouter />`.
- **Code highlighting:** built-in Shiki (`<Code />`).
- **SEO:** `@astrojs/sitemap`, `public/robots.txt`, canonical + Open Graph tags,
  and schema.org `Person` JSON-LD in `Layout.astro`.

---

## 3. Media

Project hero/gallery media lives in frontmatter (`videoUrl`, `thumbnailUrl`,
`mediaGallery`). Paths starting with `/assets/...` are served from `public/`;
full URLs are loaded as-is.

- **Heavy video is not auto-loaded in the gallery grid.** A lightweight poster
  still is shown (convention: same path with `_poster.jpg`, e.g.
  `bio-sonic-dust.mp4` → `bio-sonic-dust_poster.jpg`) and the full clip — with
  sound — is fetched only when the visitor opens the lightbox.
- `public/assets/projects/bio-sonic-dust.mp4` is committed in-repo (H.264 +
  AAC, 1280×720, ~21 MB). Keep large originals out of the repo where possible;
  GitHub Pages has a monthly bandwidth limit.
- ⚠️ Several projects currently point at **mixkit.co stock clips** as
  placeholders — replace these with real documentation before sharing widely.

---

## 4. Add a new project

Create `src/content/projects/<category>/<slug>.md` (the folder is `design` or
`interactive`; the public URL is always the flat slug, `/projects/<slug>`).

Required + optional frontmatter (must satisfy `src/content.config.ts`):

```markdown
---
title: "PROJECT NAME"
category: "Interactive" # required — "Interactive" | "Design"
year: 2026 # required (number)
status: "Operational" # required — Operational | Active | Archived | In Development
medium: # required
  - "Primary Medium"
  - "Secondary Medium"
concept: "One paragraph on the concept, installation, and themes." # required
software: ["Software A", "Software B"] # required
hardware: ["Hardware A"] # required
inputs: ["Sensor Input A"] # required
videoUrl: "/assets/projects/your-hero.jpg" # required (.mp4 → <video>, image → <img>)
thumbnailUrl: "/assets/projects/your-hero.jpg" # required
# --- optional ---
academicContext: "Course / program context."
process: ["Step one", "Step two"]
challenges: "Problems and how they were solved."
researchRelevance: "How it connects to the research theme."
mediaGallery: ["/assets/projects/shot_01.jpg", "/assets/projects/clip.mp4"]
blueprintUrl: "/assets/your_blueprint.png"
blueprintCaption: "System signal flow v1.0"
codeLanguage: "python" # default: "javascript"
codeSnippet: |
  def main():
      pass
---

Any Markdown placed below the frontmatter renders under the Concept block.
```

You can also use the local visual editor (see below).

---

## 5. Development

```bash
npm run dev   # CMS daemon (port 4322) + Astro dev server (port 4321)
npm run build # static production build → dist/
npm run preview
npm run format        # Prettier write
npm run format:check  # Prettier check
```

Open `http://localhost:4321/`.

**Local authoring console** lives at `/admin` and a per-page "Edit live" HUD on
project pages. Both are **localhost-only**: the admin route redirects to `/` in
production builds, the HUD is stripped from the production bundle, and edits are
written to disk by `scripts/cms-server.js` (port 4322). If you hit
`EADDRINUSE: 4322`, run `lsof -ti:4322 | xargs kill`.

---

## 6. Deployment (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` via GitHub Actions. In the repo: **Settings → Pages →
Build and deployment → Source: GitHub Actions.**

**Before deploying, confirm `site` in `astro.config.mjs`.** It's currently
`https://cristian-dubineanschi.github.io` (a root user page). If you use a custom
domain or a project page (`username.github.io/repo-name`), update `site` (and set
`base`) or canonical / OG / sitemap URLs will be wrong. Also update the `Sitemap:`
line in `public/robots.txt` to match.
