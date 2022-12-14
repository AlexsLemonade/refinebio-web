import { normalizeColor } from 'grommet/utils'

export const form = {
  // General
  WHITE: 'white',
  GRAY: 'gray-shade-40',
  HEIGHT: '32px',
  RADIUS: '3px',
  // Methods to normalize common colors
  DISABLED_BG: (theme) => `${normalizeColor('gray-shade-5', theme)}`,
  // default box-shoadow
  BOXSHADOW: (theme) =>
    ` 0 0 1px 1px ${normalizeColor('gray-shade-20', theme)}`,
  // custom box-shoadow
  BOXSHADOW_CUSTOM: (color) => ` 0 0 1px 1px ${color}`
}
