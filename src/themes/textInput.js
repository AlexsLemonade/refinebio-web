import { normalizeColor } from 'grommet/utils'
import { form } from 'themes/variables'

export const textInput = {
  extend: ({ theme }) => `
    border: 1px solid ${normalizeColor('gray-shade-40', theme)};
    border-radius: 1px;
    height: ${form.HEIGHT};
    padding: 4px 8px;
    &:hover {
      border-color: ${normalizeColor('gray-shade-40', theme)};
      box-shadow: ${form.BOXSHADOW(normalizeColor('gray-shade-20', theme))};
    }
    &:focus-visible {
      border-color: ${normalizeColor('brand', theme)};
      box-shadow: ${form.BOXSHADOW(normalizeColor('brand', theme))};
    }
    &::placeholder {
      color: ${normalizeColor('gray-shade-40', theme)};
    }
    &.error {
      border-color:  ${normalizeColor('coral', theme)};
      color:  ${normalizeColor('black', theme)};
      &:hover, &:focus-visible {
        border-color: ${normalizeColor('coral', theme)};
        box-shadow: none;
      }
    }
  `
}
