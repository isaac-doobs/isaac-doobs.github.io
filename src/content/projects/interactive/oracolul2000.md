---
title: "ORACOLUL2000"
category: "Interactive"
year: 2025
status: "Operational"
medium:
  - "Environmental LED Installation"
  - "Interactive Light Scenography"
concept: "Oracolul2000 is a collaborative environmental LED installation developed for a project signed by Călin Nahaiciuc. The installation explores the construction of a reactive, ambient luminous presence within a gallery space, mapping digital signals to custom addressable LED strips. Through physical hardware integration and microcontroller programming, the installation bridges the gap between digital pulse and architectural scenography, evoking a ritualistic and contemplative atmosphere."
software:
  - "TouchDesigner"
  - "WEBLed"
  - "WLED Integration"
hardware:
  - "ESP32 Microcontroller"
  - "WS2815B Addressable LED Strips"
  - "12V 30A Switching Power Supply"
inputs:
  - "Ambient Audio Signals"
  - "User Proximity Map"
videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-bright-led-lights-flashing-in-a-dark-hallway-40989-large.mp4"
thumbnailUrl: "https://assets.mixkit.co/videos/preview/mixkit-bright-led-lights-flashing-in-a-dark-hallway-40989-large.mp4"
academicContext: "Created in collaboration for a project signed by the artist Călin Nahaiciuc, exhibited in a gallery space in Cluj-Napoca, 2025."
process:
  - "Established the concept and the spatial scenography."
  - "Soldering, assembly and securing of the hardware network (300+ addressable LEDs)."
  - "Creating an audio-reactive and video-mapped TouchDesigner network for real-time LED control."
  - "Sensor integration and calibration."
challenges: "The biggest challenge was ensuring stable power over long distances without voltage drop, requiring power injection every 100 LEDs and shielding the data cables against electromagnetic interference."
mediaGallery:
  - "/assets/projects/oracolul2000_01.jpg"
  - "/assets/projects/oracolul2000_02.jpg"
  - "/assets/projects/oracolul2000_03.jpg"
codeLanguage: "cpp"
codeSnippet: |
  // Oracolul2000: ESP32 Led Signal Controller
  // Modulates LED segments to create ambient, ritualistic breathing pulses
  #include <FastLED.h>

  #define NUM_LEDS 300
  #define DATA_PIN 23
  #define CHIP_SET WS2812B
  #define COLOR_ORDER GRB

  CRGB leds[NUM_LEDS];

  void setup() {
      // Initialize FastLED library and serial debug
      FastLED.addLeds<CHIP_SET, DATA_PIN, COLOR_ORDER>(leds, NUM_LEDS);
      FastLED.setBrightness(150);
  }

  void loop() {
      // Generate slow sine wave for brightness modulation (12 beats per minute)
      uint8_t pulseBrightness = beatsin8(12, 30, 240);
      
      // Fill array with purple/indigo hue H=195 (approx 275 degrees)
      fill_solid(leds, NUM_LEDS, CHSV(195, 230, pulseBrightness));
      
      // Write pixels to physical LED strips
      FastLED.show();
      delay(10);
  }
---

### Detailed Narrative Section

Oracolul2000 converts physical architectural spaces into glowing, ritualistic chambers. Rather than flashing visual sequences, the ESP32 microcontroller generates a slow, organic breathing cycle (12 beats per minute, matching average human resting respiration) to lower user heart rates and inspire deep contemplation inside the gallery.
