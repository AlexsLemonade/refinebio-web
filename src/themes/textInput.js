import { normalizeColor } from 'grommet/utils'
import { form } from 'themes/variables'

const RADIUS = '1px'

export const textInput = {
  extend: ({ theme }) => `
    background-color: ${form.WHITE};
    border-radius: ${RADIUS};
    height: ${form.HEIGHT};
    padding: 4px 8px;
    &:hover {
      box-shadow: ${form.BOXSHADOW(theme)};
    }
    &:focus-visible {
      border-color: ${form.ACTIVE(theme)};
      box-shadow: ${form.BOXSHADOW_CUSTOM(normalizeColor('brand', theme))};
    }
    &.error {
      border-color: ${form.ERROR(theme)};
      color: ${normalizeColor('black', theme)};
      &:hover, &:focus-visible {
        border-color: ${form.ERROR(theme)};
        box-shadow: none;
      }
    }
  `
}
