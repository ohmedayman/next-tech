/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        card: '#0A0A0A',
        'card-hover': '#141414',
        'card-border': '#222226',
        accent: {
          DEFAULT: '#B27BFF',
          hover: '#9E5FF5',
          light: '#D3AFFF',
          dim: 'rgba(178, 123, 255, 0.15)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(178, 123, 255, 0.35)',
        'glow': '0 0 15px #B27BFF',
        'glow-lg': '0 0 30px rgba(178, 123, 255, 0.5)',
        'glow-card': '0 0 20px rgba(178, 123, 255, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.8' },
          '50%': { transform: 'translateY(100%)', opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
