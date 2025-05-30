import { Box } from 'grommet'
import styled, { css } from 'styled-components'
import { SrOnly } from 'components/SrOnly'

const IconToggle = styled(Box)`
  ${({ theme, light }) => css`
    box-shadow: none;
    cursor: pointer;
    height: 32px;
    width: 32px;
    position: absolute;
    right: 24px;
    top: 8px;
    z-index: 18;
    &::before,
    &::after {
      content: '';
    }

    &::before,
    &::after,
    span {
      background: ${light
        ? theme.global.colors.white
        : theme.global.colors.black};
      border-radius: 2px;
      display: block;
      height: 4px;
      width: 100%;
      transition: transform 0.25s ease-out;
    }

    &:before,
    span {
      margin-bottom: 4px;
    }
  `}

  ${({ theme, toggle }) =>
    toggle &&
    css`
      top: 40px;
      &::before,
      &::after,
      span {
        background: ${theme.global.colors.black};
      }

      &::before {
        transform: translateY(10px) rotate(-45deg);
      }

      &::after {
        transform: translateY(-6px) rotate(45deg);
      }

      span {
        opacity: 0;
      }
    `}
`

export const NavIcon = ({ light, toggle, ...props }) => {
  return (
    <IconToggle
      light={light}
      toggle={toggle}
      role="button"
      style={{ boxShadow: 'none' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Box as="span" />
      <SrOnly
        label={
          toggle ? 'Close the site navigation' : 'Open the site navigation'
        }
      />
    </IconToggle>
  )
}
