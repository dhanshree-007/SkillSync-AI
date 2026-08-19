/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neural: {
          bg: '#0B1120',      // 🌌 Midnight Space Dark Background
          card: '#0F172A',    // Deep slate card base
          border: '#1E293B',  // Slate border
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Electric Indigo Primary
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          400: '#a78bfa',
          500: '#8b5cf6', // Deep Violet
          600: '#7c3aed',
        },
        cyber: {
          400: '#22d3ee',
          500: '#06b6d4', // Cyber Cyan AI Highlight
          600: '#0891b2',
        },
        matched: {
          bg: 'rgba(16, 185, 129, 0.15)',
          text: '#10B981',
          border: 'rgba(16, 185, 129, 0.3)',
        },
        missing: {
          bg: 'rgba(239, 68, 68, 0.15)',
          text: '#F43F5E',
          border: 'rgba(239, 68, 68, 0.3)',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)',
        'neural-gradient': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)',
        'brand-gradient-subtle': 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(6, 182, 212, 0.1) 100%)',
      },
      boxShadow: {
        'neural-glow': '0 0 25px rgba(99, 102, 241, 0.4)',
        'neural-glow-hover': '0 0 35px rgba(6, 182, 212, 0.6)',
        'cyan-glow': '0 0 20px rgba(6, 182, 212, 0.35)',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' },
          '50%': { boxShadow: '0 0 35px rgba(6, 182, 212, 0.7)' },
        }
      }
    },
  },
  plugins: [],
}
