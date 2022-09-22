import { normalizeColor } from 'grommet/utils'
import { form } from 'themes/variables'

export default {
  background: {
    color: form.BACKGROUND
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
            background: ${normalizeColor(form.GRAY_LIGHT, theme)}; 
            color: ${normalizeColor(form.GRAY, theme)};
            cursor: not-allowed;
            svg {
                  fill: ${normalizeColor(form.GRAY, theme)}; 
                  stroke: ${normalizeColor(form.GRAY, theme)}; 
                }
            }
        }
        &:hover:not([disabled]) {
            border-color: ${form.ACTIVE(theme)}; 
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
                    background: ${form.ACTIVE(theme)}; 
                    color: ${normalizeColor(form.BACKGROUND, theme)}; 
                }
            }
            &:not([aria-selected="true"]):hover, &:not([aria-selected="true"]):focus {
                color: ${form.ACTIVE(theme)}; 
            }
       }
    `
  }
}
