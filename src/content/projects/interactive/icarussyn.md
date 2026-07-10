---
title: "IcarusSyn .01"
category: "Interactive"
year: 2026
status: "In Production"
medium:
  - "Interactive Light Installation"
  - "Generative LED Sphere"
  - "Camera-Tracked Interaction"
dimensions: "~1 m diameter sphere on a plinth · dense addressable LED matrix"
concept: "IcarusSyn .01 is an interactive light installation about our relationship with technology and the idea of an artificial entity. It takes the form of a light sphere about a metre across, resting on a plinth, its surface a dense matrix of digitally controlled LEDs. The sphere generates moving imagery drawn from cosmic phenomena, bursts of light, drifting particles, energy waves, and responds in real time to the movement of people around it, tracked by a 360 camera. You can read it as a living technological body: an image of how we relate to technology today, with fascination and the sense that we never fully control it. The title points to the myth of Icarus, and 'Syn' to the idea of synthesis and an artificial system."
academicContext: "Developed within the Master of Digital Interactive Arts program, Faculty of Theatre and Film, Babeș-Bolyai University (UBB), 2026. The project exists thanks to a cultural-artistic scholarship awarded by UBB to develop it, and continues in production toward a public exhibition."
process:
  - "Researched real-time generative approaches and settled on a visual direction drawn from cosmic phenomena."
  - "3D-printed the physical structure of the sphere and sourced the addressable LEDs and controller."
  - "Switched the interaction model from proximity sensors to a 360 camera that reads the movement of people around the sphere."
  - "Building the generative behaviour in TouchDesigner and mapping it onto the sphere's surface."
  - "Next: mount the LED matrix into the printed structure, calibrate the camera tracking, add the ambient sound, and test at length with the public."
challenges: "The core challenge is keeping a dense LED sphere stable and legible while it reacts live to several people at once. Moving from proximity sensors to a 360 camera makes the interaction read the whole space rather than a single hand, but it also shifts the hard part to tracking and calibration, so the sphere responds to real movement instead of noise."
researchRelevance: "IcarusSyn .01 continues the line of work behind (in)between.wav: addressable LED, TouchDesigner, and contactless interaction, scaled up into a sculptural object that behaves like an organism. It asks how far a generative system can feel alive, and brings an accessible form of interactive art to the Cluj scene, where new-media practice is still taking shape."
software:
  - "TouchDesigner"
  - "WLED (ESP32)"
  - "Arduino IDE"
inputs:
  - "360 camera motion tracking"
  - "Multi-person movement around the sphere"
  - "Art-Net / E1.31 lighting data"
hardware:
  - "3D-printed spherical structure + plinth"
  - "Dense addressable LED matrix"
  - "ESP32 controller (WLED)"
  - "360 camera"
  - "Power supply + injection"
videoUrl: "/assets/projects/icarussyn_01.jpg"
thumbnailUrl: "/assets/projects/icarussyn_01.jpg"
codeLanguage: "python"
---

### Detailed Narrative Section

The room is low-lit. In the centre, a light sphere about a metre across rests on a plinth. Left alone it holds a slow pulse, like a body at rest. As people move around it, a 360 camera reads their movement and the surface answers with bursts of light, drifting particles, and energy waves. Several people can shape it at once, so the imagery turns collective and hard to predict. The piece works less as an object to look at and more as a place where a crowd and a light system meet.

### Credits

- **Coordinator:** Prof. Cristina Pop-Tiron
- **Program:** Master of Digital Interactive Arts, Faculty of Theatre and Film, Babeș-Bolyai University (UBB), 2026
- **Support:** Developed thanks to a UBB cultural-artistic scholarship awarded to produce the work.
- **Status:** In production — documentation of the printed structure, LED tests, and camera tracking to follow.
