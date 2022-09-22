import { normalizeColor } from 'grommet/utils'
import { form } from 'themes/variables'

export default {
  height: form.HEIGHT,
  background: {
    color: 'white'
  },
  border: {
    color: 'gray-shade-40',
    radius: form.RADIUS
  },
  control: {
    extend: ({ theme }) => `
        input[type=text] {
            border:none;
            &:hover {
                box-shadow: none;
            }
            &:focus-visible {
                box-shadow: none;
            }
        }
        &:disabled * {
            background: ${normalizeColor('gray-shade-5', theme)}; 
            color: ${normalizeColor('gray-shade-40', theme)};
            cursor: not-allowed;
            svg {
                    fill: ${normalizeColor('gray-shade-40', theme)}; 
                    stroke: ${normalizeColor('gray-shade-40', theme)}; 
                }
            }
        }
        &:hover:not([disabled]) {
            border-color: ${normalizeColor('brand', theme)}; 
        }
    `
  },
  icons: {
    color: 'brand',
    margin: '0 8px'
  },
  options: {
    height: form.HEIGHT,
    container: {
      pad: 'xsmall'
    }
  },
  container: {
    extend: ({ theme }) => `
       button {
            &[aria-selected="true"] {
                &:hover, &:focus-visible {
                    background: ${normalizeColor('brand', theme)}; 
                    color: ${normalizeColor('white', theme)}; 
                }
            }
            &:not([aria-selected="true"]):hover, &:not([aria-selected="true"]):focus {
                color: ${normalizeColor('brand', theme)}; 
            }
       }
    `
  }
}
