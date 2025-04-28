import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1249C7',
        secondary: '#1E40AF',
        accent: '#3B82F6',
        muted: '#6B7280',
      },
    },
  },
  plugins: [],
};

export default config; 