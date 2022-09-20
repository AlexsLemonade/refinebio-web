import { normalizeColor } from 'grommet/utils'

export default {
  height: '32px',
  background: {
    color: 'white'
  },
  border: {
    color: 'gray-shade-40',
    radius: '3px'
  },
  control: {
    extend: ({ theme }) => `
        input[type=text] {
            border:none;
            &:hover {
                box-shadow: none;
            }
            &:focus {
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
    height: '32px',
    container: {
      pad: 'xsmall'
    }
  },
  container: {
    extend: ({ theme }) => `
       button {
            &[aria-selected="true"] {
                &:hover, &:focus {
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
