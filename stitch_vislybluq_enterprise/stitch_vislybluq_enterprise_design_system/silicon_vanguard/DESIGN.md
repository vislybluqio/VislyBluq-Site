---
name: Silicon Vanguard
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b23'
  surface-container: '#1d2027'
  surface-container-high: '#272a32'
  surface-container-highest: '#32353d'
  on-surface: '#e0e2ec'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e0e2ec'
  inverse-on-surface: '#2d3038'
  outline: '#8c90a0'
  outline-variant: '#414754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#77d8ff'
  on-secondary: '#003545'
  secondary-container: '#04bff0'
  on-secondary-container: '#004a5e'
  tertiary: '#ffb68c'
  on-tertiary: '#532200'
  tertiary-container: '#e56f17'
  on-tertiary-container: '#481d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004494'
  secondary-fixed: '#bbe9ff'
  secondary-fixed-dim: '#60d4ff'
  on-secondary-fixed: '#001f29'
  on-secondary-fixed-variant: '#004d63'
  tertiary-fixed: '#ffdbc9'
  tertiary-fixed-dim: '#ffb68c'
  on-tertiary-fixed: '#321200'
  on-tertiary-fixed-variant: '#753400'
  background: '#10131a'
  on-background: '#e0e2ec'
  surface-variant: '#32353d'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is engineered for high-end technology consulting and enterprise SaaS solutions. It evokes a sense of "Luminous Precision"—combining the stability of traditional corporate identity with the forward-leaning energy of Silicon Valley.

The aesthetic blends **Modern Minimalism** with **Glassmorphism**. It utilizes a deep, multi-layered dark mode to create an infinite canvas feel, punctuated by sharp, vibrant accents that draw the eye to critical data points and actions. The emotional response is one of trust, high-velocity intelligence, and premium craftsmanship.

Key stylistic markers include:
- **Atmospheric Depth:** Strategic use of blurred radial glows to define space.
- **Micro-Precision:** 1px borders and tight geometric alignment.
- **High-Contrast Clarity:** Stark white typography against deep oceanic backgrounds.

## Colors

The palette is centered on a "Deep Navy" foundation to provide a sophisticated, low-fatigue environment for professional users.

- **Surface (#0B1633):** The primary background color. It should feel vast and immersive.
- **Surface-Container (#14244A):** Used for cards, modals, and navigation bars. This color provides the structural scaffolding of the UI.
- **Primary Blue (#2E7EF7):** Reserved for high-priority actions, active states, and brand-critical elements.
- **Accent Cyan (#20C6F7):** A "precision" color used for data visualizations, success indicators, and subtle luminescence.
- **On-Surface (#FFFFFF):** Pure white is used for maximum legibility. For secondary text, use white at 70% opacity; for disabled text, use 40%.

## Typography

This design system uses **Inter** exclusively to achieve a systematic, utilitarian, and premium aesthetic. The typography relies on high contrast and generous line heights to ensure readability in a dark-themed environment.

- **Tracking:** Headings use negative letter-spacing for a "tighter," more editorial feel. Labels use increased tracking and uppercase styling for architectural clarity.
- **Scale:** On mobile, large display type should scale down aggressively to maintain the "one-screen" information density favored by consulting dashboards.
- **Hierarchy:** Use font weight rather than size to distinguish between primary and secondary information within components.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** on desktop and a **Fluid Grid** on mobile.

- **Desktop:** 12-column grid with a maximum content width of 1280px. Gutters are fixed at 24px to provide "breathing room" for the glassmorphic cards.
- **Mobile:** 4-column fluid grid with 16px margins.
- **Spacing Rhythm:** Based on an 8px baseline. Use `md` (24px) for most internal padding within containers to maintain a spacious, "expensive" feel. Use `xl` (80px) for vertical section spacing to emphasize minimalism.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and **Atmospheric Glows** rather than traditional heavy drop shadows.

- **Layer 0 (Background):** Surface (#0B1633).
- **Layer 1 (Cards/Containers):** Surface-Container (#14244A). These containers must feature a 1px solid border using Primary Blue or Accent Cyan at 15% opacity. 
- **Layer 2 (Modals/Popovers):** Surface-Container (#14244A) with a more prominent 1px border at 30% opacity and a subtle "Accent Cyan" outer glow (blur: 20px, spread: -5px, opacity: 10%).
- **Luminous Effects:** Behind primary sections or data visualizations, apply a large, soft radial gradient (e.g., #2E7EF7 at 5% opacity) to simulate backlighting and lift the content off the deep navy canvas.

## Shapes

The design system utilizes **Soft** geometry. Sharp corners are avoided to prevent the UI from feeling "aggressive," but large radii are avoided to keep the look professional and architectural.

- **Standard Elements:** 0.25rem (4px) for small inputs and buttons.
- **Cards/Sections:** 0.5rem (8px) for containers to provide a modern, framed appearance.
- **Active Indicators:** Vertical bars or underline accents should remain sharp (0px) to imply precision and data accuracy.

## Components

- **Buttons:** 
  - *Primary:* Solid Brand Blue (#2E7EF7). On hover, add an outer shadow of Accent Cyan (#20C6F7) at 40% opacity with a 10px blur.
  - *Outline:* 1px border of Brand Blue at 50% opacity. Text in white.
- **Input Fields:** Background should be #0B1633 (darker than the card it sits on) with a 1px border of #14244A. Focus state changes border to Accent Cyan (#20C6F7).
- **Cards:** Use Surface-Container (#14244A). All cards must have the 1px subtle border. For "featured" cards, apply a 2px top-border in Accent Cyan.
- **Chips/Badges:** Small, uppercase labels. Background is Primary Blue at 10% opacity, text is Primary Blue at 100% opacity.
- **Data Visuals:** Use Accent Cyan (#20C6F7) for primary data lines. Ensure any "glow" effects on charts are subtle to maintain the "expensive" aesthetic.
- **Lists:** Rows should be separated by 1px dividers of #14244A. Hover states on list items should shift the background to a slightly lighter navy (#1C2E5A).