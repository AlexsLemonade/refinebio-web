import { normalizeColor } from 'grommet/utils'

const backgroundDisabled = 'gray-shade-5'
const gray = 'gray-shade-40'

export default {
  background: {
    color: 'white'
  },
  control: {
    extend: ({ theme }) => `
        input[type=text] {
            border:none;
            &:hover, &:focus-visible{
                box-shadow: none;
            }
        }
        &:disabled * {
            background: ${normalizeColor(backgroundDisabled, theme)}; 
            color: ${normalizeColor(gray, theme)};
            cursor: not-allowed;
            svg {
                  fill: ${normalizeColor(gray, theme)}; 
                  stroke: ${normalizeColor(gray, theme)}; 
                }
            }
        }
        &:hover:not([disabled]) {
            border-color: ${theme.global.colors.brand}; 
        }
    `
  },
  icons: {
    color: 'brand',
    margin: '0 8px'
  },
  options: {
    container: {
      align: 'start',
      pad: 'xsmall'
    }
  },
  container: {
    extend: ({ theme }) => `
      div > span {
        align-self: start;
      }
       button {
            &[aria-selected="true"] {
                &:hover, &:focus-visible {
                    background: ${theme.global.colors.brand}; 
                    color: ${theme.global.colors.white}; 
                }
            }
            &:not([aria-selected="true"]):hover, &:not([aria-selected="true"]):focus {
                color: ${theme.global.colors.brand}; 
            }
       }
    `
  }
}
