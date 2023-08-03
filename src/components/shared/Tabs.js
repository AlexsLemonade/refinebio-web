import { Tabs as GrommetTabs } from 'grommet'
import styled, { css } from 'styled-components'
import { useResponsive } from 'hooks/useResponsive'

// NOTE: Set the prop 'text' to true for the text-based tab button

const CustomTabs = styled(GrommetTabs)`
  ${({ theme, text, viewport }) =>
    text &&
    css`
      div {
        border: none;
        button {
          border: none;
          > div {
            background: none;
          }
          span {
            display: block;
            border-bottom: 2px solid transparent;
            color: ${theme.global.colors.brand};
            font-size: ${viewport === 'small' ? '16px' : '26px'};
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
              border-bottom-width: 3px;
            }
          }
        }
      }
    `}
`

export const Tabs = ({ text = false, ...props }) => {
  const { viewport } = useResponsive()

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <CustomTabs text={text} viewport={viewport} {...props} />
}

export default Tabs
