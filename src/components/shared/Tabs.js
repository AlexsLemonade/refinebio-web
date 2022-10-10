import { Tabs as GrommetTabs } from 'grommet'
import styled, { css } from 'styled-components'

// NOTE: Set the prop 'text' to true for the text-based tab

const TextBaseTabs = styled(GrommetTabs)`
  ${({ theme }) => css`
    div > div {
      border: none;
      button {
        > div {
          background: none;
          border: none;
        }
        span {
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
  `}
`

export const Tabs = ({ text = false, ...props }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading, react/jsx-no-useless-fragment
  return <>{text ? <TextBaseTabs {...props} /> : <GrommetTabs {...props} />}</>
}

export default Tabs
