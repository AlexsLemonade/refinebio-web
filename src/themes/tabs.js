import { normalizeColor } from 'grommet/utils'

export default {
  header: {
    extend: ({ theme }) => `
    border-top: 1px solid ${normalizeColor('gray-shade-40', theme)};
    border-bottom: 1px solid ${normalizeColor('gray-shade-40', theme)};
    border-left: 1px solid ${normalizeColor('gray-shade-40', theme)};
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
            color: ${normalizeColor('brand', theme)};
            font-size: 26px;
            padding-bottom: 8px;
          }
          &:hover {
            span {
              border-color: ${normalizeColor('brand', theme)};
            }
          }
          &[aria-selected="true"] {
            span {
              border-bottom-color: ${normalizeColor('brand', theme)};
              border-bottom-width: 2px;
              font-weight: bold;
            }
          }
        }
      }
    }
  `
}
