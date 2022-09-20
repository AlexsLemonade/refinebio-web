import { normalizeColor } from 'grommet/utils'

export const textInput = {
  extend: ({ theme }) => `
    background: ${normalizeColor('white', theme)};
    border: 1px solid ${normalizeColor('gray-shade-40', theme)};
    border-radius: 1px;
    height: 32px;
    padding: 4px 8px;
    &:hover {
      border-color: ${normalizeColor('gray-shade-40', theme)};
      box-shadow: 0 0 1px 1px ${normalizeColor('gray-shade-20', theme)};
    }
    &:focus {
      border-color: ${normalizeColor('brand', theme)};
      box-shadow: 0 0 1px 1px ${normalizeColor('brand', theme)};
    }
    &::placeholder {
      color: ${normalizeColor('gray-shade-40', theme)};
    }
  `
}
