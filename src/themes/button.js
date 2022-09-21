import { normalizeColor } from 'grommet/utils'
import { form } from 'themes/variables'

const BOXSHADOW = `0px 3px 4px rgba(0, 0, 0, 0.3)`

export default {
  border: {
    radius: form.RADIUS,
    width: '1px'
  },
  default: {
    color: 'brand',
    border: { color: 'brand' },
    padding: {
      horizontal: '24px',
      vertical: '4px'
    }
  },
  primary: {
    background: 'brand',
    border: { color: 'brand', width: '1px' },
    color: 'white',
    extend: ({ theme }) => `
      &.light {
        background: ${normalizeColor('white', theme)};
        border-color: ${normalizeColor('white', theme)};
        color: ${normalizeColor('brand', theme)};
        &:hover {
          background: ${normalizeColor('alex-navy-tint-90', theme)};
          border-color: ${normalizeColor('alex-navy-tint-90', theme)};
          color: ${normalizeColor('brand', theme)};
        }
      }  
      `
  },
  secondary: {
    background: { color: 'white' },
    border: { color: 'brand', width: '1px' },
    color: 'brand',
    extend: ({ theme }) => `
      &.light {
        background: none;
        border-color: ${normalizeColor('white', theme)};
        color: ${normalizeColor('white', theme)};
        &:hover {
          border-color: ${normalizeColor('alex-navy-tint-90', theme)};
          color: ${normalizeColor('alex-navy-tint-90', theme)};
        }
      }  
      `
  },
  disabled: {
    opacity: 1,
    primary: {
      background: 'gray-shade-40',
      border: { color: 'gray-shade-40', width: '1px' },
      color: 'white'
    },
    secondary: {
      background: 'white',
      border: { color: 'gray-shade-40', width: '1px' },
      color: 'gray-shade-40'
    },
    extend: () => `
    &:hover {
      cursor: not-allowed
    }
    `
  },
  hover: {
    primary: {
      background: { color: 'brand-tint-20' },
      border: { color: 'brand-tint-20' },
      color: 'white'
    },
    secondary: {
      background: { color: 'brand' },
      color: 'white'
    }
  },
  active: {
    primary: {
      background: { color: 'brand-tint-20' },
      border: { color: 'brand-tint-20' },
      color: 'white'
    },
    secondary: {
      background: { color: 'brand' },
      color: 'white'
    }
  },
  extend: () => `
    white-space: nowrap;
    &:active:not([disabled]) {
      box-shadow: ${BOXSHADOW};
    }
    `
}
