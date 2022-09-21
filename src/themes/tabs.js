import { normalizeColor } from 'grommet/utils'

export default {
  header: {
    extend: ({ theme }) => `
    border-top: 1px solid ${normalizeColor('gray-shade-40', theme)};
    border-bottom: 1px solid ${normalizeColor('gray-shade-40', theme)};
    border-left: 1px solid ${normalizeColor('gray-shade-40', theme)};
    `
  }
}
