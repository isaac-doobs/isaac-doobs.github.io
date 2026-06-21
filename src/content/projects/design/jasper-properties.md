---
title: "JASPER PROPERTIES"
category: "Design"
year: 2025
status: "Active"
medium:
  - "Digital Product Interface"
  - "UI/UX Web Layout"
concept: "Jasper Properties is a digital interface design built for a renowned architectural and properties firm, designed to communicate elegance, architectural space, and user trust. The project focuses on creating a coherent, highly structured design language, emphasizing typographic hierarchy, spatial rhythm, and clear product navigation to optimize conversion funnels and user confidence."
academicContext: "A digital product design case study focused on optimizing commercial flows and user trust in premium real-estate platforms."
process:
  - "Stakeholder interviews and mapping of user personas."
  - "Structured the information architecture and low-fidelity wireframes."
  - "High-fidelity UI design in Figma — building components and reactive states."
  - "Animated prototyping in InVision."
challenges: "The central challenge was translating the physical feeling of space and quality architecture into a flat, list-based web interface — solved with large insets, a restrained earthy palette, and extended typography."
software:
  - "Figma"
  - "InVision"
  - "Webflow"
hardware:
  - "UI/UX Research Studio"
inputs:
  - "Architectural Portfolio Assets"
  - "User Experience (UX) Persona Data"
videoUrl: "/assets/projects/jasper-properties_01.jpg"
thumbnailUrl: "/assets/projects/jasper-properties_01.jpg"
mediaGallery:
  - "/assets/projects/jasper-properties_01.jpg"
blueprintUrl: "/assets/helios_blueprint.png"
blueprintCaption: "User Flow Diagram & Information Architecture Schematic (v1.1)"
codeLanguage: "javascript"
codeSnippet: |
  // Jasper Properties: Interface scroll transition controller
  // Smoothly reveals architectural panels as they enter viewport

  document.addEventListener("DOMContentLoaded", () => {
      const showcasePanels = document.querySelectorAll(".showcase-panel");
      
      const revealOnScroll = () => {
          showcasePanels.forEach(panel => {
              const panelTop = panel.getBoundingClientRect().top;
              const triggerPoint = window.innerHeight * 0.8;
              
              if (panelTop < triggerPoint) {
                  panel.classList.add("visible");
                  panel.style.transform = "translateY(0)";
                  panel.style.opacity = "1";
              }
          });
      };
      
      window.addEventListener("scroll", revealOnScroll);
      revealOnScroll(); // Initial run
  });
---

### Detailed Narrative Section

Jasper Properties demonstrates how UX variables relate to consumer trust metrics. By aligning image rhythm, typographic scale, and structural insets with architectural blueprints, the interface itself feels designed, professional, and reliable.
