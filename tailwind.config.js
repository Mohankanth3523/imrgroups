/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: false,
    extend: {
      colors: {
        navy: {
          DEFAULT: '#12324A',
          950: '#0A1E2D',
          900: '#0E2738',
          800: '#12324A',
          700: '#1B4563',
          600: '#265A7E',
        },
        sky: {
          DEFAULT: '#4AA9D8',
          50: '#EEF7FC',
          100: '#DCEFF8',
          200: '#B6DDF0',
          300: '#86C6E6',
          400: '#4AA9D8',
          500: '#2F8FBF',
          600: '#1F729C',
          700: '#195B7D',
        },
        /** Bright brand blue for primary actions and highlights. */
        azure: {
          DEFAULT: '#0878D1',
          50: '#EAF4FD',
          100: '#D3E8FA',
          500: '#0878D1',
          600: '#0667B4',
          700: '#055594',
        },
        /** Soft blue page background (kept under the old token name so every section updates). */
        ivory: '#F1F8FD',
        mist: '#F1F8FD',
        /** Restrained green for WhatsApp and success states. */
        leaf: {
          DEFAULT: '#1A8F4C',
          50: '#EDF8F1',
          500: '#1FA055',
          600: '#1A8F4C',
          700: '#15753E',
        },
        charcoal: {
          DEFAULT: '#203040',
          muted: '#475767',
          soft: '#677685',
        },
        line: '#D9E6F0',
        champagne: '#B89B5E',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      fontSize: {
        // Modular scale (1.25) — body copy at 17px for comfortable mobile reading.
        'body': ['1.0625rem', { lineHeight: '1.7' }],
        'display-sm': ['2.25rem', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
        'display': ['3rem', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'display-lg': ['4.25rem', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        site: '76rem',
        prose: '38rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(18, 50, 74, 0.06), 0 8px 24px -12px rgba(18, 50, 74, 0.18)',
        lift: '0 2px 4px rgba(18, 50, 74, 0.06), 0 18px 40px -18px rgba(18, 50, 74, 0.35)',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
    },
  },
  plugins: [],
};
