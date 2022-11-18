import { colors } from 'themes/colors'
// RULE: font-size should be defined in 'px' unit
export default {
  borderSize: {
    small: '1px',
    medium: '2px',
    large: '3px'
  },
  breakpoints: {
    small: {
      // for a phone
      value: 750,
      edgeSize: {
        xxxsmall: '2px',
        xxsmall: '4px',
        xsmall: '8px',
        small: '16px',
        medium: '24px',
        large: '32px',
        xlarge: '40px',
        xxlarge: '48px',
        xxxlarge: '56px'
      }
    },
    medium: {
      // for a tablet
      value: 1024
    }
  },
  colors,
  control: {
    // default border for inputs
    border: {
      color: 'gray-shade-40',
      radius: '3px'
    }
  },
  edgeSize: {
    xxxsmall: '2px',
    xxsmall: '4px',
    xsmall: '8px',
    small: '16px',
    medium: '24px',
    large: '32px',
    xlarge: '40px',
    xxlarge: '48px',
    xxxlarge: '56px',
    basex8: '64px',
    basex9: '72px',
    basex10: '80px',
    basex12: '96px'
  },
  elevation: {
    light: {
      medium: '0px 3px 20px rgba(0, 0, 0, 0.1)',
      large: '0px 3px 20px rgba(0, 0, 0, 0.2)',
      xlarge: '0px 2px 4px rgba(0, 0, 0, 0.5)'
    }
  },
  font: {
    family: `'Lato', sans-serif`,
    size: '16px', // 1rem
    height: 1.5
  },
  input: {
    font: {
      size: '16px', // 1rem
      weight: 400
    }
  }
}
