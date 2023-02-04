import { makeEdgeSizes } from 'helpers/makeEdgeSizes'
import { colors } from 'themes/colors'

/* RULE: 
- font-size should be defined in 'px' unit 
- a base unit for spacing is 8px
*/

const base = 8

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
      borderSize: {
        small: '1px',
        medium: '2px',
        large: '3px'
      },
      edgeSize: {
        none: '0px',
        xxsmall: '4px',
        xsmall: '8px',
        small: '16px',
        medium: '24px',
        large: '32px',
        xlarge: '40px',
        ...makeEdgeSizes(base, 6, 7)
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
    none: '0px',
    xxsmall: '4px',
    xsmall: '8px',
    small: '16px',
    medium: '24px',
    large: '32px',
    xlarge: '40px',
    ...makeEdgeSizes(base, 6, 18)
  },
  elevation: {
    light: {
      small: '0px 2px 2px rgba(0, 0, 0, 0.2)',
      medium: '0px 3px 20px rgba(0, 0, 0, 0.1)',
      large: '0px 3px 20px rgba(0, 0, 0, 0.2)',
      xlarge: '0px 2px 4px rgba(0, 0, 0, 0.5)',
      alert: '0px 1px 5px rgba(0, 0, 0, 0.15)'
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
