import { Box, Menu as GrommetMenu } from 'grommet'
import styled, { css } from 'styled-components'

// NOTE: Set the prop 'light' to true for the dark background

const Wrapper = styled(Box)`
  font-family: 'Rubik', sans-serif;
  ${({ theme, light }) => css`
    button:first-child {
      border-radius: 0;
      color: ${light ? theme.global.colors.white : theme.global.colors.black};
      padding: 2px 0;
      svg {
        fill: ${light ? theme.global.colors.white : theme.global.colors.black};
        stroke: ${light
          ? theme.global.colors.white
          : theme.global.colors.black};
      }
      &:hover,
      &[aria-expanded='true'] {
        border-bottom: 1px solid
          ${light ? theme.global.colors.white : theme.global.colors.brand};
        color: ${light ? theme.global.colors.white : theme.global.colors.brand};
        svg {
          fill: ${light
            ? theme.global.colors.white
            : theme.global.colors.brand};
          stroke: ${light
            ? theme.global.colors.white
            : theme.global.colors.brand};
        }
      }
    }
  `}
`

export const NavDropDown = ({ label, light = false, items, ...props }) => {
  return (
    <Wrapper light={light}>
      <GrommetMenu
        label={label}
        items={items}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Wrapper>
  )
}

export default NavDropDown
