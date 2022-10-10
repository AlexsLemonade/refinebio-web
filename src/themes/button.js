import { form } from 'themes/variables'

const BOXSHADOW = `0px 3px 4px rgba(0, 0, 0, 0.3)`

export default {
  border: {
    radius: form.RADIUS,
    width: '1px'
  },
  default: {
    color: 'brand',
    padding: {
      horizontal: '24px',
      vertical: '4px'
    }
  },
  primary: {
    background: 'brand',
    border: { color: 'brand', width: '1px' },
    color: form.WHITE
  },
  secondary: {
    background: { color: form.WHITE },
    border: { color: 'brand', width: '1px' },
    color: 'brand'
  },
  disabled: {
    opacity: 1,
    primary: {
      background: 'gray-shade-40',
      border: { color: 'gray-shade-40', width: '1px' },
      color: form.WHITE
    },
    secondary: {
      background: form.WHITE,
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
    default: {
      color: 'brand'
    },
    primary: {
      background: { color: 'brand-tint-20' },
      border: { color: 'brand-tint-20' },
      color: form.WHITE
    },
    secondary: {
      background: { color: 'brand' },
      color: form.WHITE
    }
  },
  active: {
    default: {
      color: 'brand'
    },
    primary: {
      background: { color: 'brand-tint-20' },
      border: { color: 'brand-tint-20' },
      color: form.WHITE
    },
    secondary: {
      background: { color: 'brand' },
      color: form.WHITE
    }
  },
  // Badge
  badge: {
    text: {
      size: { medium: '12px' }
    },
    container: {
      pad: {
        vertical: '4px',
        horizontal: '8px'
      }
    }
  },

  extend: () => `
    white-space: nowrap;
    &:active:not([disabled]) {
      box-shadow: ${BOXSHADOW};
    }
    `
}
