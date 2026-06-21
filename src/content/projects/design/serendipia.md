---
title: "SERENDIPIA"
category: "Design"
year: 2025
status: "Active"
medium:
  - "Exhibition Visual System"
  - "Graphic & Editorial Design"
concept: "Serendipia is a visual proposal for an art exhibition focusing on the tension between classical editorial structure and bold, expressive color palettes. The project builds a cohesive visual identity across brochures, poster layouts, and social media frames, finding a balance between clean, legible typography and high-impact abstract color gradients."
academicContext: "A conceptual exhibition-branding project proposing a fluid visual identity for new-media art openings."
process:
  - "Defined the editorial grid and the typographic structures."
  - "Created liquid mesh gradients in Adobe Illustrator."
  - "Designed the printed layouts in InDesign."
  - "Adapted digital formats for social media."
challenges: "The main challenge was preserving the chromatic vibrancy of the gradients when converting from RGB (screen) to CMYK (print), solved through manual selection of Pantone colors."
software:
  - "Adobe InDesign"
  - "Adobe Illustrator"
  - "Adobe Photoshop"
hardware:
  - "DTP Design Workstation"
inputs:
  - "Curator Statement"
  - "Fluid Gradient Maps"
videoUrl: "/assets/projects/serendipia_01.jpg"
thumbnailUrl: "/assets/projects/serendipia_01.jpg"
mediaGallery:
  - "/assets/projects/serendipia_01.jpg"
blueprintUrl: "/assets/chronos_blueprint.png"
blueprintCaption: "Exhibition Poster Grid System & Typography Mockup (v1.0)"
codeLanguage: "css"
codeSnippet: |
  /* Serendipia: Exhibition branding styles */
  /* Generates fluid background gradients and editorial text styling */

  .exhibition-title {
      font-family: "SF Pro Display", -apple-system, sans-serif;
      font-weight: 800;
      font-size: 5rem;
      letter-spacing: -0.04em;
      line-height: 0.95;
      text-transform: uppercase;
      background: linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f43f5e 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }

  .poster-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding-top: 10px;
  }
---

### Detailed Narrative Section

Serendipia highlights the balance between visual expressiveness and strict editorial systems. Using fluid gradients representing random artistic discoverability alongside a structured grid system representing rational cataloging, the design mirrors the conceptual thesis of the art pieces.
