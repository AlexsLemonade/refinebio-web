export default {
  drop: {
    align: { top: 'bottom' }
  },
  icons: {
    margin: '4px 0 0'
  },
  extend: ({ theme }) => `
    background: ${theme.global.colors.white};
    button:hover { color: ${theme.global.colors.brand}; }
    }
  `
}
