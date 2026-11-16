/** @type {import('tailwindcss').Config} */
// The whole palette. Pages use these names only; no hex codes in components.
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark surfaces: page intros, closing call-to-action, footer.
        // Charcoal-slate with only a hint of the logo's blue, so the logo stays the bluest thing on the page.
        ink: {
          DEFAULT: '#171C26',
          raised: '#202633',
          line: 'rgba(255,255,255,0.08)',
          text: '#F4F4F2',
          muted: '#A9ADB6',
        },
        // Light surfaces: a clean, slightly cool off-white for pages, and a warmer stone for alternate sections.
        paper: {
          DEFAULT: '#F9FAFB',
          tint: '#F4F2ED',
          line: '#E4E4E1',
        },
        // Text on light surfaces: graphite rather than pure black or navy.
        body: {
          DEFAULT: '#15181E',
          muted: '#565B64',
          faint: '#686D76',
        },
        // The logo's blue, used sparingly for actions and emphasis.
        brand: {
          DEFAULT: '#1F6FDD',
          hover: '#1A5FC4',
          deep: '#1A45A0',
          light: '#7DB4F0',
        },
      },
      fontFamily: {
        sans: ['Switzer', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'Menlo', 'monospace'],
        serif: ['Gambetta', 'Georgia', 'serif'],
      },
      letterSpacing: {
        display: '-0.022em',
        label: '0.14em',
      },
      maxWidth: {
        page: '76rem',
        prose: '40rem',
      },
    },
  },
  plugins: [],
};
