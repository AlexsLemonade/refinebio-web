import styled, { css } from 'styled-components'
import { Anchor as SharedAnchor } from 'components/Anchor'

const Anchor = styled(SharedAnchor)`
  ${({ theme, light, viewport }) => css`
    border-bottom: 2px solid transparent;
    color: ${light && viewport !== 'small'
      ? theme.global.colors.white
      : theme.global.colors.black};
    &:hover,
    &:focus {
      text-decoration: none;
      border-bottom: 2px solid
        ${light ? theme.global.colors.white : theme.global.colors.brand};
      color: ${light ? theme.global.colors.white : theme.global.colors.brand};
    }
  `}

  ${({ theme, viewport }) =>
    viewport === 'small' &&
    css`
      display: flex;
      align-items: center;
      font-size: 20px;
      height: 56px;
      width: 100%;
      margin: 0;
      padding: 40px 0 40px 40px;
      border: none;
      &:hover,
      &:focus {
        color: ${theme.global.colors.brand};
        background: ${theme.global.colors['gray-shade-5']};
        border: none;
      }
    `}

    ${({ theme, active, light, viewport }) =>
    active &&
    css`
      border-bottom: 2px solid
        ${light ? theme.global.colors.white : theme.global.colors.brand};
      border-bottom: ${viewport === 'small' && 'none'};
      color: ${light && viewport !== 'small'
        ? theme.global.colors.white
        : theme.global.colors.brand};
      text-decoration: ${viewport === 'small' ? 'underline' : 'none'};
      &:hover,
      &:focus {
        color: ${light && viewport !== 'small'
          ? theme.global.colors.white
          : theme.global.colors.brand};
        background: ${viewport === 'small' && 'none'};
        text-decoration: ${viewport === 'small' ? 'underline' : 'none'};
      }
    `}
`

export const NavLink = ({ active, light, viewport, ...props }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Anchor active={active} light={light} viewport={viewport} {...props} />
}
