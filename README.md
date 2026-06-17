# SYS // MEDIA_ARTIST_PORTFOLIO

An immersive, high-performance, minimalist system repository for interactive media artists, designed to present large-scale video documentation, technical data grids, hardware schematics, and code archives.

Hosted at: `https://<your-username>.github.io/`

---

## 1. Visual Direction & Aesthetic

- **Palette:** Strict dark-mode native.
  - **Background:** Absolute Deep Black (`#000000`) to maximize the contrast of installation video glows.
  - **Primary Accent:** Electric Purple (`#a855f7` / `#8b5cf6`), used selectively for interface borders, hover signals, glowing text, and terminal cursors.
  - **Muted UI:** Cool Gray (`#9ca3af`) and desaturated lavender (`#cbd5e1`) for secondary data tags and technical labels.
- **Typography:** Strict grid-aligned headers (Inter / SF Pro) paired with monospace body fonts (Fira Code / Roboto Mono) for hardware logs and code readouts.
- **Aesthetic Details:** CRT scanline animations and digital mesh grid overlays to reinforce the raw technology signal pipeline.

---

## 2. Technical Stack

- **Framework:** [Astro v6](https://astro.build/) (lightning fast, zero-JS by default, static HTML generation).
- **Content Model:** Astro Content Collections using local Markdown files for modular project pages.
- **Transitions:** Built-in Astro `<ClientRouter />` utilizing the native browser View Transitions API for glitch-free page switches.
- **Syntax Highlighting:** Integrated Shiki highlighting engine inside the code terminals.

---

## 3. External Media Pipeline (Critical Optimization)

To prevent hitting GitHub's **100GB/month bandwidth limit** and ensure near-instant page loads:

1.  **Do NOT host production-grade high-res video loops in the Git repository.**
2.  **Streaming Platform:** Host your primary project videos externally (e.g. Vimeo PRO direct MP4 link, Cloudinary, or AWS S3 bucket).
3.  **Thumbnails:** Use highly compressed, silent WebM/MP4 loops for the homepage grid.
4.  **Lazy Loading:** The homepage grid implements an `IntersectionObserver` that only loads and plays videos when they enter the viewport and pauses them when off-screen, saving client bandwidth and processing power.

---

## 4. How to Add a New Project Page

Adding a new project to the portfolio is as simple as creating a new Markdown file in the `src/content/projects/` directory.

### Step 1: Create the markdown file

Create a new file: `src/content/projects/your-project-slug.md`

### Step 2: Fill in the Frontmatter Metadata

Copy the following structure into your new markdown file:

```markdown
---
title: "PROJECT NAME"
year: 2026
status: "Operational" # [Operational, Active, Archived, In Development]
medium:
  - "Primary Medium Tag"
  - "Secondary Medium Tag"
concept: "Write a short paragraph summarizing the artistic concept, spatial installation layout, and thematic exploration of the piece."
software:
  - "Software A"
  - "Software B"
hardware:
  - "Hardware A"
  - "Hardware B"
inputs:
  - "Sensor Input A"
  - "Sensor Input B"
videoUrl: "https://your-external-host.com/high-res-hero-loop.mp4"
thumbnailUrl: "https://your-external-host.com/compressed-grid-thumbnail.mp4"
blueprintUrl: "/assets/your_custom_blueprint.png" # Place PNG in public/assets/
blueprintCaption: "System Signal Flow & Wiring Schematic v1.0"
codeLanguage: "glsl" # [glsl, python, cpp, javascript, c, rust, etc.]
codeSnippet: |
  // Paste your key code snippet here
  void main() {
      // code
  }
---

### Markdown Content Below Frontmatter

Any additional markdown headers, text, ascii diagrams, or logs placed here will automatically compile and render under the Artistic Concept block on the project details page.
```

---

## 5. Development & Deployment

### Local Development

To run the server locally:

```bash
npm run dev
```

Open `http://localhost:4321/` in your browser.

### Static Production Build

To test the static build pipeline locally:

```bash
npm run build
```

The output files will be built into the `dist/` directory.

### GitHub Pages Configuration

Deployment is automated via GitHub Actions on every commit pushed to the `main` branch.

1.  If you are deploying to a **Project Page** (e.g., `username.github.io/my-repo-name`) rather than a **User Page** (e.g., `username.github.io`):
    - Open `astro.config.mjs`.
    - Uncomment and set `site` and `base`:
      ```javascript
      site: 'https://username.github.io',
      base: '/my-repo-name',
      ```
2.  Enable GitHub Pages on your repository:
    - Go to **Settings** -> **Pages**.
    - Under **Build and deployment**, set **Source** to **GitHub Actions**.
    - Once you push your code, the workflow in `.github/workflows/deploy.yml` will automatically build and publish the site.
