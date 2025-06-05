module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        'gentle-wave': 'gentleWave 8s linear infinite',
      },
      keyframes: {
        gentleWave: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' }
        },
      }
    }
  },
  plugins: [],
}

