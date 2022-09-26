import { Box, Anchor as GrommetAnchor } from 'grommet'
import styled, { css } from 'styled-components'

// NOTE: Set the prop 'light' to true for the dark background

const Wrapper = styled(Box)`
  ${({ theme }) => css`
    font-family: 'Rubik', sans-serif;
    padding: 2px 0;
    width: max-content;
    a {
      color: ${theme.global.colors.black};
      &:hover {
        color: ${theme.global.colors.brand};
        text-decoration: none;
      }
    }
    &:hover {
      border-bottom: 1px solid ${theme.global.colors.brand};
    }
    &.light {
      a {
        color: ${theme.global.colors.white};
      }
      &:hover {
        border-bottom: 1px solid ${theme.global.colors.white};
      }
    }
  `}
`

export const NavLink = ({ light = false, link, children, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper className={light ? 'light' : ''} {...props}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <GrommetAnchor link={link} {...props}>
        {children}
      </GrommetAnchor>
    </Wrapper>
  )
}
