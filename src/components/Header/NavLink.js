import { Box, Anchor as GrommetAnchor } from 'grommet'
import styled, { css } from 'styled-components'

// NOTE: Set the prop 'light' to true for the dark background

const Wrapper = styled(Box)`
  ${({ theme, light }) => css`
    font-family: 'Rubik', sans-serif;
    padding: 2px 0;
    width: max-content;
    a {
      color: ${light ? theme.global.colors.white : theme.global.colors.black};
      &:hover {
        color: ${light ? theme.global.colors.white : theme.global.colors.brand};
        text-decoration: none;
      }
    }
    &:hover {
      border-bottom: 1px solid
        ${light ? theme.global.colors.white : theme.global.colors.brand};
    }
  `}
`

export const NavLink = ({ light = false, link, children, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper light={light} {...props}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <GrommetAnchor link={link} {...props}>
        {children}
      </GrommetAnchor>
    </Wrapper>
  )
}
