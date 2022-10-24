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
    height: ${SIZE};
    width: ${SIZE};
    input:not([disabled]) + div:hover {
        box-shadow: ${form.BOXSHADOW(theme)};
    }
     input:checked:not([disabled]) + div {
        box-shadow: none;
        &:hover {
            border-color: ${theme.global.colors.brand};
        }
     }
     input:disabled + div {
        background: ${form.DISABLED_BG(theme)};
        cursor: not-allowed;
     }
  `
}
