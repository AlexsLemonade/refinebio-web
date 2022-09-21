import { normalizeColor } from 'grommet/utils'
// TODO: Ask about the size 16px vs 24px

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
    input:not([disabled]) + div:hover {
        box-shadow: 0 0 1px 1px ${normalizeColor('gray-shade-20', theme)};
    }
     input:checked:not([disabled]) + div {
        box-shadow: none;
        &:hover {
            border-color: ${normalizeColor('brand', theme)};
        }
     }
     input:disabled + div {
        background: ${normalizeColor('gray-shade-5', theme)};
        cursor: not-allowed;
     }
  `
}
