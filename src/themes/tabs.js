export default {
  header: {
    extend: ({ theme }) => `
    border-top: 1px solid ${theme.global.colors['gray-shade-40']};
    border-bottom: 1px solid  ${theme.global.colors['gray-shade-40']};
    border-left: 1px solid  ${theme.global.colors['gray-shade-40']};
    height: 100%;
    button { 
      min-height: 100%;
    }
    `
  }
}
