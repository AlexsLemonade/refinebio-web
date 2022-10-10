export default {
  header: {
    extend: ({ theme }) => `
    border-top: 1px solid ${theme.global.colors['gray-shade-40']};
    border-bottom: 1px solid  ${theme.global.colors['gray-shade-40']};
    border-left: 1px solid  ${theme.global.colors['gray-shade-40']};
    `
  },
  extend: ({ theme }) => `
    &.text {
      div > div {
        border: none;
        button {           
          > div {
            background: none;
            border: none;
          }
          span {
            border-bottom: 1px solid transparent;
            color:  ${theme.global.colors.brand};
            font-size: 26px;
            padding-bottom: 8px;
          }
          &:hover {
            span {
              border-color: ${theme.global.colors.brand};
            }
          }
          &[aria-selected="true"] {
            span {
              border-bottom-color:${theme.global.colors.brand};
              border-bottom-width: 2px;
              font-weight: bold;
            }
          }
        }
      }
    }
  `
}
