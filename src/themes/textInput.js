import { normalizeColor } from 'grommet/utils'
import { form } from 'themes/variables'

export const textInput = {
  extend: ({ theme }) => `
    background-color: ${theme.global.colors.white};
    border-radius: 1px;
    height: ${form.HEIGHT};
    padding: 4px 8px;
    &:hover {
      box-shadow: ${form.BOXSHADOW(theme)};
    }
    &:focus-visible {
      border-color: ${theme.global.colors.brand};
      box-shadow: ${form.BOXSHADOW_CUSTOM(normalizeColor('brand', theme))};
    }
  `
}
