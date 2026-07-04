---
name: VislyBluq Design System
colors:
  surface: '#071423'
  surface-dim: '#071423'
  surface-bright: '#2e3a4b'
  surface-container-lowest: '#030f1e'
  surface-container-low: '#101c2c'
  surface-container: '#142030'
  surface-container-high: '#1f2b3b'
  surface-container-highest: '#2a3546'
  on-surface: '#d7e3f9'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#d7e3f9'
  inverse-on-surface: '#253142'
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
  tertiary: '#b7c5f5'
  on-tertiary: '#202f55'
  tertiary-container: '#8190bc'
  on-tertiary-container: '#18284e'
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
  tertiary-fixed: '#dae2ff'
  tertiary-fixed-dim: '#b7c5f5'
  on-tertiary-fixed: '#08193f'
  on-tertiary-fixed-variant: '#37466d'
  background: '#071423'
  on-background: '#d7e3f9'
  surface-variant: '#2a3546'
typography:
  display-2xl:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 80px
    letterSpacing: -0.04em
  display-xl:
    fontFamily: Inter
    fontSize: 60px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 24px
  stack-xl: 120px
  stack-lg: 80px
  stack-md: 48px
---

## Brand & Style
The design system is built on a foundation of **Technical Sophistication** and **Premium Innovation**. It targets enterprise decision-makers who value both high-performance engineering and aesthetic refinement. 

The visual style is a fusion of **Minimalism** and **Glassmorphism**, characterized by deep spatial depth, monochromatic clarity with high-performance accents, and an uncompromising focus on white space. The interface should feel like a high-end physical console—tactile yet ethereal—evoking an emotional response of absolute reliability and forward-thinking intelligence. Every element is intentional, removing clutter to let technical excellence breathe.

## Colors
This design system utilizes a deep, atmospheric "Obsidian Blue" palette. The core is built on `#050914`, providing a high-contrast canvas for vibrant accent colors. 

- **Primary Brand Blue (#2E7EF7):** Used for primary actions and core branding. It represents stability and intelligence.
- **Accent Cyan (#20C6F7):** Reserved for highlights, active states, and data visualizations to provide a sense of "energy" and innovation.
- **Surface Tiers:** Backgrounds transition from the base obsidian to `#0B1633` for secondary containers and `#14244A` for interactive cards.
- **Typography:** Pure white `#FFFFFF` for primary headings and `#A7B3C8` for secondary/body text to ensure comfortable readability against the dark background.

## Typography
The typography system prioritizes clarity and hierarchy. **Inter** is the primary typeface, utilized for its neutral yet modern character. **Geist** is introduced for technical labels and monospaced data to enhance the "developer-centric" feel of the consulting firm.

- **Hero Headings:** Use `display-2xl` with tight letter spacing to create a powerful, "Linear-style" impact.
- **Weights:** Heavily utilize Bold (700) and ExtraBold (800) for headlines to contrast against the fine, airy lines of the UI components.
- **Responsiveness:** Headings scale down aggressively for mobile (e.g., 60px to 40px) to maintain readability without overwhelming the viewport.

## Layout & Spacing
The layout follows a **Fluid 12-Column Grid** with generous inner-gutters of 32px to ensure content never feels cramped. 

- **Vertical Rhythm:** Sections should be separated by large "breathing rooms" (120px on desktop) to evoke a premium, editorial feel.
- **Safe Zones:** A standard 64px outer margin is maintained on desktop, ensuring high-end displays feel balanced.
- **Reflow:** On mobile, the grid collapses to 1 or 2 columns, and horizontal margins reduce to 24px, while maintaining the vertical stack density to keep the momentum of the narrative.

## Elevation & Depth
Depth is created through **Luminous Layers** rather than traditional drop shadows. This system uses:

- **Backdrop Blurs:** Surfaces use a 12px - 20px Gaussian blur combined with semi-transparent fills (e.g., `rgba(20, 36, 74, 0.6)`) to create a frosted glass effect.
- **Inner Glows:** Card elements feature a 1px solid stroke at 15% opacity, with a subtle 0.5px inner highlight on the top edge to simulate light hitting a glass edge.
- **Blue Glows:** Strategic use of `box-shadow: 0 0 40px rgba(46, 126, 247, 0.1)` behind primary containers to simulate a soft ambient backlight.
- **Stacked Depth:** Floating navigation menus use the highest elevation with `backdrop-filter: blur(24px)`.

## Shapes
The shape language is modern and approachable. A base `0.5rem` (8px) radius is used for standard inputs, while larger containers like cards and hero images utilize `rounded-xl` (24px) to create a softer, more premium "Apple-esque" silhouette. Interactive buttons often lean towards `rounded-lg` (16px) to stand out from the grid.

## Components
Consistent component styling is vital for the technical-premium aesthetic:

- **Elevated Buttons:** Primary buttons use a gradient of Primary Blue to Accent Cyan with a subtle outer glow on hover. Text is bold and center-aligned.
- **Glass Cards:** Feature a background of Card Surface (`#14244A`) at 70% opacity, a 1px border of white at 10% opacity, and a 20px backdrop blur.
- **Interactive Inputs:** Fields use Secondary Surface (`#0B1633`) backgrounds. On focus, the border transitions to Primary Blue with a 4px soft outer glow.
- **Premium Navigation:** A "floating" dock-style navbar that sits at the top of the viewport with a heavy backdrop blur and micro-interactions for links.
- **Feature Chips:** Small, Pill-shaped tags using the Accent Cyan color with low-opacity backgrounds (10%) for categorization without visual weight.
- **Data Lists:** High-contrast rows with subtle dividers (1px, 5% white) and hover states that slightly lighten the background color.