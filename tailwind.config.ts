import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6F61',
        secondary: '#1C1C1E', 
        accent: '#FFD700', 
        tertiary: '#E5E5E5', 
      },
    },
  },
  plugins: [],
} satisfies Config;
