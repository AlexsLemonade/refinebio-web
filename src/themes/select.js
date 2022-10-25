import { normalizeColor } from 'grommet/utils'
import { form } from 'themes/variables'

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
            background: ${form.DISABLED_BG(theme)}; 
            color: ${normalizeColor(form.GRAY, theme)};
            cursor: not-allowed;
            svg {
                  fill: ${normalizeColor(form.GRAY, theme)}; 
                  stroke: ${normalizeColor(form.GRAY, theme)}; 
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
      pad: 'xsmall'
    }
  },
  container: {
    extend: ({ theme }) => `
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
