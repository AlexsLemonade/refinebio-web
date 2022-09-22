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
    height: ${form.SIZE_16};
    width: ${form.SIZE_16};
    input:not([disabled]) + div:hover {
        box-shadow: ${form.BOXSHADOW(theme)};
    }
     input:checked:not([disabled]) + div {
        box-shadow: none;
        &:hover {
            border-color: ${form.ACTIVE(theme)};
        }
     }
     input:disabled + div {
        background: ${normalizeColor(form.GRAY_LIGHT, theme)};
        cursor: not-allowed;
     }
  `
}
