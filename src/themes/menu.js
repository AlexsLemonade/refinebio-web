import { normalizeColor } from 'grommet/utils'

export default {
  drop: {
    align: { top: 'bottom' }
  },
  icons: {
    margin: '4px 0 0'
  },
  extend: ({ theme }) => `
    button:hover { color: ${normalizeColor('brand', theme)}; }
    }
  `
}
