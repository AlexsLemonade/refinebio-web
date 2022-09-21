import { normalizeColor } from 'grommet/utils'
import { form } from 'themes/variables'

export default {
  border: {
    color: 'form-gray-999'
  },
  hover: {
    border: {
      color: 'form-gray-999'
    }
  },
  extend: ({ theme }) => `
  input + div {
    box-shadow: none;
    height: ${form.SIZE_16};
    width: ${form.SIZE_16};
  }
  input:not([disabled]) + div:hover {
    box-shadow: ${form.BOXSHADOW(normalizeColor('gray-shade-20', theme))};
  }
  input:checked:not([disabled]) + div {
      background: ${normalizeColor('brand', theme)};
      box-shadow: none;
      &:hover {
          border-color: ${normalizeColor('brand', theme)};
      }
      svg {
        path {
          stroke: ${normalizeColor('white', theme)};
          stroke-width: 2px;
        }
      }
   }
   input:disabled + div {
      background: ${normalizeColor('gray-shade-5', theme)};
      cursor: not-allowed;
   }
`
}
