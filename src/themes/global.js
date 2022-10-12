import { colors } from 'themes/colors'
// RULE: font-size should be defined in 'px' unit
export default {
  borderSize: {
    medium: '1px',
    large: '2px'
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
    xxsmall: '4px',
    xsmall: '8px',
    small: '16px',
    medium: '24px',
    large: '32px',
    xlarge: '48px'
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
