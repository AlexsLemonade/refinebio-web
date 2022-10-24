import { form } from 'themes/variables'

const SIZE = '16px'

export default {
  border: {
    color: form.GRAY
  },
  hover: {
    border: {
      color: form.GRAY
    }
  },
  extend: ({ theme }) => `
  input + div {
    box-shadow: none;
    height: ${SIZE};
    width: ${SIZE};
  }
  input:not([disabled]) + div:hover {
    box-shadow: ${form.BOXSHADOW(theme)};
  }
  input:checked:not([disabled]) + div {
      background: ${theme.global.colors.brand};
      box-shadow: none;
      &:hover {
          border-color: ${theme.global.colors.brand};
      }
      svg {
        path {
          stroke: ${theme.global.colors.white};
        }
      }
   }
   input:disabled + div {
      background: ${form.DISABLED_BG(theme)};
      cursor: not-allowed;
   }
`
}
