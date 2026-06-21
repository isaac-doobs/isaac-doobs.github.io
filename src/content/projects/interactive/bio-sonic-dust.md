---
title: "BIO-SONIC DUST"
category: "Interactive"
year: 2025
status: "Operational"
medium:
  - "Interactive Audio-Visual Installation"
  - "Gesture-Controlled Soundscape"
concept: "Inspired by the contactless mechanics of the Theremin, Bio-Sonic Dust is an interactive spatial installation where the performer's invisible aura becomes the main interface. Pushing the concept of full-body mapping to its limit, the installation transforms the entire physical room into an instrument. By tracking the user's skeletal coordinates and Z-depth, the system modulates a complex audio-visual environment, allowing the user to physically sculpt sound and step away to trigger a 'gravity pull' that intensifies the bass waves."
academicContext: "Developed within the Master of Digital Interactive Arts program (1st semester) for the Sound Design for Immersive Media course, Faculty of Theatre and Film, Babeș-Bolyai University, 2025."
process:
  - "Theoretical study of the Theremin mechanics and gestural proximity."
  - "Configured a TouchDesigner pipeline utilizing a Kinect v2 sensor for skeleton and Z-depth tracking."
  - "Created custom data conditioning logic using Math CHOPs in TouchDesigner to build 'musical safety valves' and clamp parameters."
  - "Integrated the TDAmapper system to map single gestures to multiple Ableton Live parameters simultaneously (Meld, Roar distortion, filter cutoff, reverb decay)."
  - "Integrated a community Point Cloud .tox component in TouchDesigner and customized feedback loops to match the sound design."
challenges: "Raw sensor data from the Kinect was too jittery and linear to sound musical on its own. This was solved by avoiding raw direct mapping and building a custom conditioning layer in TouchDesigner. I used Math CHOPs to clamp input ranges (e.g. keeping the Ableton Meld effect under 35%) to prevent harshness, and inverted mapping logic to simulate a sonic 'Gravity Pull' where bass waves increase in intensity as the user steps back."
researchRelevance: "The installation explores full-body mapping as a direct interface, testing how multi-parameter mappings (one gesture modulating filter, distortion, and reverb simultaneously) and inverted spatial mapping affect user engagement and control in immersive media."
software:
  - "TouchDesigner"
  - "Ableton Live (Meld & Roar)"
  - "TDAmapper"
  - "OSC Protocol"
hardware:
  - "Microsoft Kinect v2"
  - "Spatial Audio Monitors"
  - "Workstation PC"
inputs:
  - "Skeletal Joint Coordinates (Kinect)"
  - "Z-depth (Distance from sensor)"
  - "Proximity Vectors"
videoUrl: "/assets/projects/bio-sonic-dust_hero.jpg"
thumbnailUrl: "/assets/projects/bio-sonic-dust_hero.jpg"
mediaGallery:
  - "/assets/projects/bio-sonic-dust.mp4"
codeLanguage: "python"
codeSnippet: |
  # Bio-Sonic Dust: Kinect Joint Tracker & OSC Transmitter
  # Maps skeletal joint positions to Ableton CC channels
  import math

  def onValueChange(channel, sampleIndex, val, prev):
      # Fetch tracked joint coordinates from kinect CHOP
      joint_x = op('kinect_select')['hand_r:tx']
      joint_y = op('kinect_select')['hand_r:ty']
      
      # Calculate distance from sensor origin
      distance = math.sqrt(joint_x**2 + joint_y**2)
      
      # Format and send OSC payload to Ableton Live port 9000
      osc_address = "/lumen/audio/filter"
      osc_payload = [float(val), float(distance)]
      
      op('osc_out').sendOSC(osc_address, osc_payload)
      return
---

### Detailed Narrative Section

Technically, the installation bridges physical movement and digital synthesis using a Kinect v2 sensor, TouchDesigner, and Ableton Live (via the TDAmapper system). Custom logic and Math CHOPs act as musical safety valves, conditioning jittery sensor coordinates to clamp parameters and modulate multiple audio effects simultaneously. The project serves as a prototype for future research into environment-aware systems using MediaPipe and multi-user gestural collaboration.
