import { normalizeColor } from 'grommet/utils'

export const form = {
  // General
  WHITE: 'white',
  HEIGHT: '32px',
  RADIUS: '3px',
  GRAY: 'gray-shade-40',
  GRAY_LIGHT: 'gray-shade-5',
  // CheckBox & ReadioButton
  SIZE_16: '16px',
  // Methods to normalize common colors
  ACTIVE: (theme) => `${normalizeColor('brand', theme)}`,
  ERROR: (theme) => `${normalizeColor('coral', theme)}`,
  // default
  BOXSHADOW: (theme) =>
    ` 0 0 1px 1px ${normalizeColor('gray-shade-20', theme)}`,
  // custom
  BOXSHADOW_CUSTOM: (color) => ` 0 0 1px 1px ${color}`
}
