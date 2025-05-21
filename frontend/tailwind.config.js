module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // adicionar cores do site aqui
        // TODO: MUDAR AS CORES
        primary: {
          DEFAULT: '#2C3E50',    // Azul escuro (header)
          500: '#2C3E50',
          600: '#1E2B38',
        },
        secondary: {
          DEFAULT: '#E74C3C',    // Vermelho (destaque)
          500: '#E74C3C',
          600: '#C0392B',
        },
        accent: {
          DEFAULT: '#F39C12',    // Laranja (botões)
          500: '#F39C12',
          600: '#D35400',
        },
        light: {
          DEFAULT: '#ECF0F1',    // Fundo claro
          500: '#ECF0F1',
          600: '#D0D3D4',
        },
        dark: {
          DEFAULT: '#34495E',    // Textos escuros
          500: '#34495E',
          600: '#2C3E50',
        },
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}