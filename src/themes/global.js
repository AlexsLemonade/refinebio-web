import { colors } from 'themes/colors'
// RULE: font-size should be defined in 'px' unit
export default {
  borderSize: {
    medium: '1px',
    large: '2px'
  },
  breakpoints: {
    small: {
      // for a phone
      value: 750,
      edgeSize: {
        xlarge: '40px'
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
    xxxxlarge: '64px',
    xxxxxlarge: '72px',
    xxxxxxlarge: '80px',
    xxxxxxxlarge: '96px'
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
