import { normalizeColor } from 'grommet/utils'
import { form } from 'themes/variables'

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
    height: ${form.SIZE_16};
    width: ${form.SIZE_16};
  }
  input:not([disabled]) + div:hover {
    box-shadow: ${form.BOXSHADOW(theme)};
  }
  input:checked:not([disabled]) + div {
      background: ${form.ACTIVE(theme)};
      box-shadow: none;
      &:hover {
          border-color: ${form.ACTIVE(theme)};
      }
      svg {
        path {
          stroke: ${normalizeColor(form.WHITE, theme)};
        }
      }
   }
   input:disabled + div {
      background: ${normalizeColor(form.GRAY_LIGHT, theme)};
      cursor: not-allowed;
   }
`
}
