import { normalizeColor } from 'grommet/utils'

const boxShadow = 'gray-shade-20'
const height = '32px'

export const textInput = {
  extend: ({ theme }) => `
    background-color: ${theme.global.colors.white};
    border-radius: 1px;
    height: ${height};
    padding: 4px 8px;
    &:hover {
      box-shadow: 0 0 1px 1px ${normalizeColor(boxShadow, theme)};
    }
    &:focus-visible {
      border-color: ${theme.global.colors.brand};
      box-shadow: 0 0 1px 1px ${theme.global.colors.brand};
    }
  `
}
