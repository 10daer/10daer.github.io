/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        xxs: "385px",
      },
      letterSpacing: {
        headings: "-0.03em",
      },
      colors: {
        nav: { background: "var(--background-nav)", text: "var(--text-nav)" },
        logo: { text: "var(--text-logo)" },
        transparent: "transparent",
        "primary-200": "#F2F2F2",
        "primary-300": "#E6E6E6",
        "primary-400": "#D9D9D9",
        secondary: "var(--background-secondary)",
        "secondary-100": "#FAFAF9",
        "secondary-200": "#E8E8E3",
        "secondary-300": "#DDDDD5",
        "secondary-400": "#D1D1C7",
        "secondary-500": "#AEAE9D",
        "secondary-600": "#987654",
        "secondary-700": "#8C8C73",
        "secondary-800": "#70705C",
        "accent-400": "#0E0E0C",
        "accent-300": "#3d2814",
        "accent-200": "#262626",
        "accent-100": "#4D4D4D",
        "accent-50": "#666666",
      },
      fontFamily: {
        general: ["GeneralSans-Variable", "sans-serif"],
        grotesk: ["CabinetGrotesk-Variable", "sans-serif"],
        neueMontreal: ["NeueMontreal-Regular", "sans-serif"], // Regular
        neueMontrealItalic: ["NeueMontreal-Italic", "sans-serif"], // Regular Italic
        neueMontrealMedium: ["NeueMontreal-Medium", "sans-serif"], // Medium
        neueMontrealMediumItalic: ["NeueMontreal-MediumItalic", "sans-serif"], // Medium Italic
        neueMontrealLight: ["NeueMontreal-Light", "sans-serif"], // Light
        neueMontrealLightItalic: ["NeueMontreal-LightItalic", "sans-serif"], // Light Italic
        neueMontrealBold: ["NeueMontreal-Bold", "sans-serif"], // Bold
        neueMontrealBoldItalic: ["NeueMontreal-BoldItalic", "sans-serif"], // Bold Italic
      },
      fontSize: {
        "display-xl": [
          "clamp(5rem,20vw,16rem)",
          {
            lineHeight: "clamp(4rem, 16vw, 10rem)",
            fontWeight: "900",
            letterSpacing: "-0.02em",
          },
        ],
        "display-lg": [
          "clamp(4rem,9vw,6rem)",
          {
            lineHeight: "0.8",
            fontWeight: "900",
            letterSpacing: "-0.01em",
          },
        ],
        service: [
          "clamp(2rem, 4vw, 3.25rem)",
          {
            lineHeight: "0.9",
            fontWeight: "800",
            fontFamily: "font-general",
            letterSpacing: "0.02em",
          },
        ],
        // Heading Sizes
        "section-head": [
          "clamp(4rem, 7vw, 10rem)",
          {
            lineHeight: "clamp(3rem,6vw,10rem)",
            letterSpacing: " -0.015em",
            fontWeight: "800",
          },
        ],
        "sub-head": [
          "clamp(2.25rem, 5vw, 3rem)",
          {
            lineHeight: "1.4",
            fontWeight: "600",
            letterSpacing: "0.01em",
          },
        ],
        h2: [
          "clamp(2.25rem,7vw,5rem)",
          {
            lineHeight: "0.8",
            fontWeight: "600",
            letterSpacing: "0.01em",
          },
        ],
        h3: [
          "clamp(2rem, 4vw, 2.75rem)",
          {
            lineHeight: "1",
            fontWeight: "600",
            letterSpacing: "-0.01em",
          },
        ],

        // Body Text Sizes
        "body-xl": [
          "clamp(1.2rem, 1.75vw, 1.25rem)",
          {
            // 20px
            lineHeight: "1.25",
            fontWeight: "400",
          },
        ],
        footer: [
          "clamp(0.875rem,1.5vw,1.5rem)",
          {
            // 20px
            lineHeight: "clamp(1.25rem, 2.25vw, 1.25rem)",
            fontWeight: "400",
          },
        ],
        "body-lg": [
          "clamp(1.1rem, 2vw, 1.3rem)",
          {
            // 18px
            lineHeight: "1.6",
            fontWeight: "400",
          },
        ],
        "body-md": [
          "clamp(1rem, 1.5vw, 1.5rem)",
          {
            // 16px
            lineHeight: "1.5",
            fontWeight: "400",
          },
        ],
        "body-sm": [
          "clamp(0.75rem, 3vw, 1rem)",
          {
            // 14px
            lineHeight: "1.4",
            fontWeight: "400",
          },
        ],
        "body-xs": [
          "0.75rem",
          {
            // 12px
            lineHeight: "1.3",
            fontWeight: "400",
          },
        ],
      },
      keyframes: {
        animateDot01: {
          "0%": { opacity: 0 },
          "20%": { opacity: 0 },
          "30%": { opacity: 1 },
          "90%": { opacity: 1 },
        },
        animateDot02: {
          "0%": { opacity: 0 },
          "35%": { opacity: 0 },
          "45%": { opacity: 1 },
          "90%": { opacity: 1 },
        },
        animateDot03: {
          "0%": { opacity: 0 },
          "50%": { opacity: 0 },
          "60%": { opacity: 1 },
          "90%": { opacity: 1 },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      animation: {
        animateDot1: "animateDot01 2s linear infinite",
        animateDot2: "animateDot02 2s linear infinite",
        animateDot3: "animateDot03 2s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
