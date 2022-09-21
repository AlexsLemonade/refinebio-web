import { normalizeColor } from 'grommet/utils'

const BACKGROUND = {
  default: 'white',
  active: 'gray-shade-5'
}
const FONT_SIZE = '1rem'
const HEIGHT = '36px'

export default {
  active: {
    background: BACKGROUND.active
  },
  background: {
    color: BACKGROUND.default
  },
  border: {
    size: '3px',
    color: 'transparent',
    active: {
      color: 'brand'
    },
    hover: {
      color: 'transparent'
    }
  },
  margin: '0',
  pad: { horizontal: 'medium', vertical: 'xsmall' },
  extend: ({ theme }) => `
    border-right: 1px solid ${normalizeColor('gray-shade-40', theme)};
    height: ${HEIGHT};
    span {
        color: ${normalizeColor('black', theme)};
        font-size: ${FONT_SIZE};
    }
  `
}
