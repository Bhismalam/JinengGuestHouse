/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      "colors": {
        "surface-container-high": "#e9e8e5",
        "error-container": "#ffdad6",
        "on-primary-fixed-variant": "#3c4a3c",
        "outline-variant": "#c4c8c0",
        "surface-tint": "#536253",
        "surface": "#faf9f6",
        "on-tertiary-fixed": "#1f1b13",
        "outline": "#747872",
        "tertiary-fixed-dim": "#cfc5b9",
        "inverse-primary": "#bbcbb8",
        "on-background": "#1a1c1a",
        "on-primary-container": "#dff0dc",
        "on-secondary": "#ffffff",
        "primary-fixed-dim": "#bbcbb8",
        "inverse-on-surface": "#f2f1ee",
        "tertiary-fixed": "#ebe1d4",
        "on-secondary-fixed": "#351000",
        "surface-container": "#efeeeb",
        "on-primary-fixed": "#111f13",
        "surface-variant": "#e3e2e0",
        "surface-bright": "#faf9f6",
        "on-tertiary-fixed-variant": "#4c463c",
        "on-secondary-fixed-variant": "#713619",
        "on-error": "#ffffff",
        "tertiary": "#575147",
        "on-error-container": "#93000a",
        "primary": "#475647",
        "background": "#faf9f6",
        "on-primary": "#ffffff",
        "on-tertiary-container": "#f4eadc",
        "inverse-surface": "#2f312f",
        "tertiary-container": "#70695f",
        "on-secondary-container": "#783c1e",
        "surface-dim": "#dbdad7",
        "on-surface-variant": "#444842",
        "on-tertiary": "#ffffff",
        "surface-container-low": "#f4f3f1",
        "secondary-container": "#feaa84",
        "surface-container-lowest": "#ffffff",
        "secondary": "#8e4d2e",
        "secondary-fixed": "#ffdbcc",
        "error": "#ba1a1a",
        "primary-fixed": "#d7e7d3",
        "secondary-fixed-dim": "#ffb695",
        "primary-container": "#5f6e5e",
        "surface-container-highest": "#e3e2e0",
        "on-surface": "#1a1c1a"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "container-max": "1280px",
        "section-gap": "120px",
        "margin-desktop": "80px",
        "margin-mobile": "20px",
        "gutter": "24px"
      },
      "fontFamily": {
        "headline-md": ["Libre Caslon Text", "serif"],
        "display-lg-mobile": ["Libre Caslon Text", "serif"],
        "body-md": ["Plus Jakarta Sans", "sans-serif"],
        "body-lg": ["Plus Jakarta Sans", "sans-serif"],
        "display-lg": ["Libre Caslon Text", "serif"],
        "label-caps": ["Plus Jakarta Sans", "sans-serif"]
      },
      "fontSize": {
        "headline-md": ["32px", { "lineHeight": "1.3", "fontWeight": "400" }],
        "display-lg-mobile": ["40px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "400" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "display-lg": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "400" }],
        "label-caps": ["12px", { "lineHeight": "1.4", "letterSpacing": "0.1em", "fontWeight": "600" }]
      }
    },
  },
  plugins: [],
}
