export default {
  header: {
    extend: ({ theme }) => `
    height: 100%;
    button { 
      border-top: 1px solid ${theme.global.colors['gray-shade-40']};
      border-bottom: 1px solid  ${theme.global.colors['gray-shade-40']};
      border-left: 1px solid  ${theme.global.colors['gray-shade-40']};
      min-height: 100%;
      > div {
        border-radius: 0;
      }
      &[aria-selected="true"] {
        span  {
          font-weight: bold;
          color: ${theme.global.colors.brand};
        }
      }
    }
    `
  }
}
