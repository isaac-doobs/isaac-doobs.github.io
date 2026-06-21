---
title: "(in)between.wav"
category: "Interactive"
year: 2026
status: "Exhibited"
medium:
  - "Interactive Light Installation"
  - "Voice / Sound Interaction"
  - "Addressable LED Lighting"
concept: "(in)between.wav is an interactive light installation about the invisible harmony between people. We rarely notice the silent ways we sync up, the way footsteps fall into step or breathing matches in a deep conversation. The piece listens to two voices and turns the unspoken energy between them into light. Two people step into a ring and use their voices; the lights begin as two separate, chaotic signals, and as the voices align an arch of light fills above them and the floor follows. It gives the voice a body you can see but not hold, and asks whether technology can help us feel the exact moment we truly connect."
academicContext: "Developed within the Master of Digital Interactive Arts program, Faculty of Theatre and Film, Babeș-Bolyai University (UBB), 2026. Creative Visual Arts Project, coordinated by Prof. Cristina Pop-Tiron. Exhibited at the Ethnographical Museum of Transylvania."
process:
  - "Reworked an earlier touch-based interactive piece so the trigger became the voice rather than the hand."
  - "Built a TouchDesigner patch analysing two microphone channels for frequency, amplitude, and how closely the voices align."
  - "Drove WS2811 LED strips through an ESP32 running WLED, sending light data over Art-Net / E1.31."
  - "Fabricated a 3.5 m ground ring and a ~5.5 m semicircular light arch, with strips set into silicone diffuser profiles."
  - "Calibrated the sync response and added a five-minute reset so room noise can't build into a false connection."
challenges: "Two problems nearly broke the piece. The diffuser kept coming loose from the structure until a different adhesive finally held, and the TouchDesigner patch would gradually read general room noise as a sync, lighting up for two people who weren't actually in tune. Resetting the patch every five minutes kept the connected moment honest through a long day in the room."
researchRelevance: "The work gives sound a physical, visible form while keeping it out of reach, using pure geometry to carry the idea: a circle for unity, an arch for the connection that rises between two people. It treats the poetic and the technical as one problem, and at the museum it proved open to anyone, children and older visitors alike, willing to make a sound with someone else."
software:
  - "TouchDesigner"
  - "WLED (ESP32)"
  - "Arduino IDE"
hardware:
  - "ESP32 microcontroller (WLED)"
  - "WS2811 addressable LED strips (~15 m)"
  - "Two microphones + audio interface"
  - "12 V power injection (ring + arch)"
  - "3.5 m ground ring + semicircular light arch"
inputs:
  - "Two voice signals (frequency & amplitude)"
  - "Voice alignment / sync detection"
  - "Art-Net / E1.31 lighting data"
videoUrl: "/assets/projects/inbetween-wav_01.jpg"
thumbnailUrl: "/assets/projects/inbetween-wav_01.jpg"
mediaGallery:
  - "/assets/projects/inbetween-wav_02.jpg"
  - "/assets/projects/inbetween-wav_03.jpg"
  - "/assets/projects/inbetween-wav_04.jpg"
  - "/assets/projects/inbetween-wav_05.jpg"
codeLanguage: "python"
codeSnippet: |
  # (in)between.wav — representative sync mapping (TouchDesigner / Python)
  # Two voices in, one 0..1 "connection" value out that drives the light.
  def connection(voice_a, voice_b, smooth=0.92, prev=[0.0]):
      # Compare the two spectra; closer alignment -> higher score
      diff = sum(abs(a - b) for a, b in zip(voice_a, voice_b))
      raw = max(0.0, 1.0 - diff / len(voice_a))
      # Smooth so a held, shared note reads as connection, not a spike
      prev[0] = smooth * prev[0] + (1.0 - smooth) * raw
      return prev[0]  # arch fills first, base ring follows past threshold
---

### Detailed Narrative Section

When the room is empty, the light keeps a slow pulse, like a heartbeat. Step in with another person and use your voices: talk, hum, or hold a note together. The installation listens for the moment the two voices align; as they find it the arch above fills with light, and if they stay in sync the floor begins to glow as well. There is nothing to touch. The light stands in for the voices, something you can see but not hold. The piece isn't really finished until two people are standing inside it.

### Credits

- **Coordinator:** Prof. Cristina Pop-Tiron
- **Program:** Master of Digital Interactive Arts, Faculty of Theatre and Film, Babeș-Bolyai University (UBB), 2026
