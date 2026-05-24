

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        beige: '#fcfcfc',
        brown: '#5e2b1c',
        olive: '#45581f',
        champagne: '#d4af37',
        charcoal: '#2d3436',
        cream: '#f8f4f0',
        babyPink: '#f7c8d3',
        babyPinkDeep: '#e89eb1',
        babyBlue: '#bcdcef',
        babyBlueDeep: '#7fb6d8',
        mint: '#d8ecdf',
      },
      fontFamily: {
        pacifico: ['var(--font-pacifico)', 'cursive'],
        bonheur: ['var(--font-bonheur-royale)', 'cursive'],
        greatvibes: "var(--font-great-vibes)",
        parisienne: "var(--font-parisienne)",
        satisfy:"var(--font-satisfy)",
        playfair: "var(--font-playfair)",
        montserrat: "var(--font-montserrat)",
      },
    },
  },
  plugins: [],
};
