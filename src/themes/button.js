const boxShadow = `0px 3px 4px rgba(0, 0, 0, 0.3)`
const gray = 'gray-shade-40'
const radius = '3px'

export default {
  border: {
    radius,
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
    border: { color: 'brand', radius, width: '1px' },
    color: 'white'
  },
  secondary: {
    background: { color: 'transparent' },
    border: { color: 'brand', radius, width: '1px' },
    color: 'brand'
  },
  disabled: {
    opacity: 1,
    color: gray,
    primary: {
      background: gray,
      border: { color: gray, radius, width: '1px' },
      color: 'white'
    },
    secondary: {
      background: 'white',
      border: { color: gray, radius, width: '1px' },
      color: gray
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
      color: 'white'
    },
    secondary: {
      background: { color: 'brand' },
      color: 'white'
    }
  },
  active: {
    default: {
      color: 'brand'
    },
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
    > div {
      border-radius: ${radius};
<<<<<<< HEAD
      //  to center an icon
=======
      // to center an icon
>>>>>>> dev
      > span {
        display: inline-flex;
        align-self: center;
      }
    }
  
    white-space: nowrap;
    &:active:not([disabled]) {
      box-shadow: ${boxShadow};
    }
    `
}
