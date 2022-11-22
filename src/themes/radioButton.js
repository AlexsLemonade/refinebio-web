import { normalizeColor } from 'grommet/utils'

const backgroundDisabled = 'gray-shade-5'
const borderColor = 'gray-shade-40'
const boxShadow = 'gray-shade-20'
const size = '16px'

export default {
  border: {
    color: borderColor
  },
  hover: {
    border: {
      color: borderColor
    }
  },
  extend: ({ theme }) => `
    height: ${size};
    width: ${size};
    input:not([disabled]) + div:hover {
        box-shadow: 0 0 1px 1px ${normalizeColor(boxShadow, theme)};
    }
     input:checked:not([disabled]) + div {
        box-shadow: none;
        &:hover {
            border-color: ${theme.global.colors.brand};
        }
     }
     input:disabled + div {
        background: ${normalizeColor(backgroundDisabled, theme)};
        cursor: not-allowed;
     }
  `
}
