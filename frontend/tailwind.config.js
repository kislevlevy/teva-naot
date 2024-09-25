import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    fontFamily: {
      ragsans: ['RagSans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
