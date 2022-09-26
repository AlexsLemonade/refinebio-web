import { Box, Menu as GrommetMenu } from 'grommet'
import styled, { css } from 'styled-components'

// NOTE: Set the prop 'light' to true for the dark background

const Wrapper = styled(Box)`
  font-family: 'Rubik', sans-serif;
  ${({ theme }) => css`
    button:first-child {
      border-radius: 0;
      color: ${theme.global.colors.black};
      padding: 2px 0;
      svg {
        fill: ${theme.global.colors.black};
        stroke: ${theme.global.colors.black};
      }
      &:hover,
      &[aria-expanded='true'] {
        border-bottom: 1px solid ${theme.global.colors.brand};
        color: ${theme.global.colors.brand};
        svg {
          fill: ${theme.global.colors.brand};
          stroke: ${theme.global.colors.brand};
        }
      }
      &.light {
        color: ${theme.global.colors.white};
        svg {
          fill: ${theme.global.colors.white};
          stroke: ${theme.global.colors.white};
        }
        &:hover,
        &[aria-expanded='true'] {
          border-bottom: 1px solid ${theme.global.colors.white};
        }
      }
    }
  `}
`

export const NavDropDown = ({ label, light = false, items, ...props }) => {
  return (
    <Wrapper>
      <GrommetMenu
        className={light ? 'light' : ''}
        label={label}
        items={items}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Wrapper>
  )
}

export default NavDropDown
