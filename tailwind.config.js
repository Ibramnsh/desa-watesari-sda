export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF751F',
        'primary-green': '#2E6417',
        'orange-hover': '#E5641A',
        'green-hover': '#245212',
        'green-light': '#EEF5EB',
        'orange-light': '#FFF3EB',
        'white-bg': '#FFFFFF',
        'light-gray': '#F8F9FA',
        'dark-text': '#2D2D2D',
        'medium-text': '#6B7280',
        'border-color': '#E5E7EB',
      },
      boxShadow: {
        'navbar': '0 2px 12px rgba(0,0,0,0.08)',
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
        'elevated': '0 4px 16px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
