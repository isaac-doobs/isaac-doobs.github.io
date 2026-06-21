---
title: "ROOTED STRUCTURES"
category: "Interactive"
year: 2025
status: "Active"
medium:
  - "Interactive Performance"
  - "Digital Silhouette Projection"
  - "Skeletal Point Clouds"
  - "Capacitive Sensing"
concept: "Rooted Structures is an immersive interactive performance project engaging with accumulation, construction, and constant growth. Framed as a dystopian reflection on consumerism and capitalist expansion, the work explores a system built around infinite growth and structures that do not care. By combining choreography and real-time digital interaction, the project invites the audience to observe, reflect, and respect limits in a limited world."
software:
  - "TouchDesigner"
  - "Ableton Live"
  - "Arduino IDE"
hardware:
  - "Dual Kinect v2 Sensors"
  - "Arduino Microcontroller"
  - "Interactive Plants (Capacitive Sensors)"
  - "High-lumen Digital Projector"
inputs:
  - "AI Skeleton Coordinates"
  - "Point Cloud Depth Map"
  - "Capacitive Plant Touch Signals"
videoUrl: "/assets/projects/rooted-structures_01.jpg"
thumbnailUrl: "/assets/projects/rooted-structures_01.jpg"
blueprintUrl: "/assets/rooted_blueprint.jpg"
blueprintCaption: "Installation Blueprint — Spatial Layout & Sensor Mapping"
academicContext: "Developed within the Master of Digital Interactive Arts program, Faculty of Theatre and Film, Babeș-Bolyai University (UBB), 2025. Coordinated by Prof. Cristina Pop-Tiron."
process:
  - "Choreographic and performance space planning."
  - "Configured a dual Kinect system for simultaneous skeleton tracking and depth mapping."
  - "Wired capacitive touch circuits with Arduino and live plants."
  - "Programmed TouchDesigner point-cloud shaders and OSC routing to Ableton Live."
  - "Calibrated real-time audio modulation based on dancers' movements and plant interaction."
challenges: "Stabilizing raw skeleton data while maintaining responsiveness, and protecting capacitive plant touch sensors from electrical interference in a performance space. This was solved by utilizing a dual-Kinect setup (isolating tracking roles) and designing shielded capacitive wiring loops."
researchRelevance: "The project investigates how full-body interaction, capacitive biological inputs, and real-time media systems can be integrated into contemporary dance, raising critical questions about system boundaries, infinite expansion, and the paradox of care."
mediaGallery:
  - "/assets/projects/rooted-structures_01.jpg"
codeLanguage: "glsl"
codeSnippet: |
  // Rooted Structures: Silhouette Point Cloud Vertex Shader
  // Converts depth data into a shifting particle field
  uniform sampler2D u_depthMap;
  uniform float u_time;
  uniform float u_motionFactor;

  void main() {
      // Fetch depth texture coordinates
      vec2 uv = gl_TexCoord[0].st;
      float depthVal = texture2D(u_depthMap, uv).r;
      
      // Map flat grid to 3D points
      vec3 pos = vec3(uv.x * 2.0 - 1.0, uv.y * 2.0 - 1.0, depthVal * 1.5);
      
      // Apply harmonic displacement representing system negotiation
      float wave = sin(pos.y * 12.0 + u_time * 4.0) * 0.08 * u_motionFactor;
      pos.x += wave * depthVal;
      pos.z += cos(pos.x * 8.0 + u_time) * 0.05;
      
      gl_Position = gl_ModelViewProjectionMatrix * vec4(pos, 1.0);
      gl_FrontColor = vec4(vec3(depthVal * 0.8), 1.0);
  }
---

### Detailed Narrative Section

The technical ecosystem is driven by a dual-sensor Kinect vision system, combining AI-driven skeleton tracking and point-cloud depth visualization. An Arduino microcontroller enables capacitive touch sensing in interactive plants, allowing dancers to trigger spatial soundscapes and visual feedback. By routing coordinate and touch data through TouchDesigner to Ableton Live via OSC, the system generates real-time immersive projections and adaptive audio, addressing the delicate balance between natural growth, technology, and bodily expression.

### Team & Credits

- **Coordinator:** Prof. Cristina Pop-Tiron
- **Performers:** Sike Zsanna, Magos Fanni
- **Production & Creative Team:** Cristian Dubineanschi, Andrei Stanciulescu, Andrés Laguía, Karina Farkas, Barbora Molčiková, Áron Telegdy, Tiago Machado
