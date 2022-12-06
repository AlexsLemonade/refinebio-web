import { Tabs as GrommetTabs } from 'grommet'
import styled, { css } from 'styled-components'

// NOTE: Set the prop 'text' to true for the text-based tab button

const CustomTabs = styled(GrommetTabs)`
  ${({ theme, text }) =>
    text &&
    css`
      div {
        > div {
          button {
            > div {
              background: none;
              border: none;
            }
            span {
              display: block;
              border-bottom: 1px solid transparent;
              color: ${theme.global.colors.brand};
              font-size: 26px;
              padding-bottom: 8px;
            }
            &:hover {
              span {
                border-color: ${theme.global.colors.brand};
              }
            }
            &[aria-selected='true'] {
              span {
                border-bottom-color: ${theme.global.colors.brand};
                border-bottom-width: 2px;
                font-weight: bold;
              }
            }
          }
        }
      }
    `}
`

export const Tabs = ({ text = false, ...props }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <CustomTabs text={text} {...props} />
}

export default Tabs
