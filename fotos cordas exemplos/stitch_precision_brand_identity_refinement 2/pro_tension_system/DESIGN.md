---
name: Pro Tension System
colors:
  surface: '#14140d'
  surface-dim: '#14140d'
  surface-bright: '#3a3931'
  surface-container-lowest: '#0f0e08'
  surface-container-low: '#1c1c15'
  surface-container: '#212019'
  surface-container-high: '#2b2a22'
  surface-container-highest: '#36352d'
  on-surface: '#e6e2d6'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e6e2d6'
  inverse-on-surface: '#323129'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c9c6c5'
  primary: '#c9c6c5'
  on-primary: '#313030'
  primary-container: '#0a0a0a'
  on-primary-container: '#7b7979'
  inverse-primary: '#5f5e5e'
  secondary: '#9dd754'
  on-secondary: '#1f3700'
  secondary-container: '#6a9f21'
  on-secondary-container: '#1a2f00'
  tertiary: '#a7d0b1'
  on-tertiary: '#113722'
  tertiary-container: '#000d04'
  on-tertiary-container: '#5b8267'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#b8f46d'
  secondary-fixed-dim: '#9dd754'
  on-secondary-fixed: '#102000'
  on-secondary-fixed-variant: '#2f4f00'
  tertiary-fixed: '#c2edcc'
  tertiary-fixed-dim: '#a7d0b1'
  on-tertiary-fixed: '#00210f'
  on-tertiary-fixed-variant: '#294e37'
  background: '#14140d'
  on-background: '#e6e2d6'
  surface-variant: '#36352d'
typography:
  display-lg:
    fontFamily: Archivo Narrow
    fontSize: 64px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Archivo Narrow
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Archivo Narrow
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  slogan-editorial:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-md:
    fontFamily: Archivo Narrow
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Archivo Narrow
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system embodies an **athletic, technical, and premium** aesthetic, drawing inspiration from high-performance sports equipment and editorial precision. The visual language is rooted in **Modern Minimalism** with a **Technical/High-Contrast** edge. It is designed to evoke a sense of professional mastery, tension, and elite performance, targeting athletes and professionals who value precision engineering.

The UI relies on deep, immersive backgrounds punctuated by high-visibility accents. It utilizes a strict typographic hierarchy that balances aggressive, condensed display faces with refined, historical serifs to create a "modern-traditional" tension.

## Colors

The palette is anchored by **Tinta (#0A0A0A)**, a deep black that provides the technical "chassis" for the UI. **Bola Lima (#9CD653)** serves as the high-energy highlight color, used sparingly for critical actions and data visualization. 

**Quadra (#143A24)** is a specialized editorial green used for secondary surfaces, signaling, and thematic backgrounds. **Papel (#F0ECE0)** provides a warm, sophisticated neutral for text and subtle UI elements, offering a high-contrast alternative to pure white that feels more artisanal and "premium."

## Typography

The typography system follows a "four-voice" philosophy. 
- **Display & Titles:** Use **Archivo Narrow** (as the closest system equivalent to Saira Condensed) in Heavy Italic weights for headlines. This creates a sense of movement and speed.
- **Editorial & Slogans:** **EB Garamond** (representative of Cormorant) provides a sophisticated counterpoint, used exclusively in italics for quotes, taglines, and storytelling elements.
- **UI & Body:** **Archivo Narrow** handles all functional roles, ensuring legibility and a technical feel in data-heavy environments. 

Use uppercase styling for labels and primary headers to reinforce the athletic, commanding tone.

## Layout & Spacing

The layout uses a **fixed grid** model on desktop (12 columns) to maintain a rigid, engineered structure. On mobile, it transitions to a single-column fluid flow with 16px safe margins.

The spacing rhythm is governed by a 4px base unit, but emphasizes large "breathing spaces" (Papel) to ensure the dark backgrounds don't feel claustrophobic. Use generous vertical stacking (32px+) between major sections to mimic high-end editorial magazines. Gutters should remain tight (24px) to keep technical data points connected.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** rather than shadows. In this dark-themed system, depth is achieved by moving from the base **Tinta** to slightly lighter shades of charcoal or the deep **Quadra** green.

- **Base Level:** Tinta (#0A0A0A) for the primary canvas.
- **Mid Level:** Quadra (#143A24) for containers or section dividers.
- **High Level:** Tonal shifts to dark grays for interactive states.
- **Outlines:** Use thin, 1px low-contrast borders in dark greens or grays to define boundaries without adding visual bulk. Avoid ambient shadows; keep the UI flat and structural.

## Shapes

The shape language is strictly **Sharp (0px)**. Rectilinear containers, buttons with square corners, and hard-edged dividers reinforce the technical, precision-machined nature of the "String Pro" identity. This lack of rounding mirrors the tension and rigidity of high-performance tennis strings.

## Components

- **Buttons:** Primary buttons use a solid **Bola Lima** fill with **Tinta** text, always rectangular. Secondary buttons use a **Papel** or **Quadra** stroke with no fill.
- **Chips/Status:** Small, square-edged labels using **Quadra** background with **Bola Lima** text for high-visibility technical status.
- **Inputs:** Underlined or fully boxed in 1px strokes. Use **Archivo Narrow** for placeholder text. The active state should trigger a **Bola Lima** bottom border.
- **Cards:** Defined by subtle 1px borders or a shift to **Quadra** background. No shadows. Use **EB Garamond** for any card-based storytelling or intro text.
- **Lists:** Technical lists should feature heavy dividers (2px) and use monochromatic scales, reserving **Bola Lima** for specific data highlights or "Active" indicators.
- **Data Visualization:** Use **Bola Lima** for primary data points and **Quadra** for secondary benchmarks.