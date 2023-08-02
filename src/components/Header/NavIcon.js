import { Box } from 'grommet'
import { SrOnly } from 'components/shared/SrOnly'
import styled, { css } from 'styled-components'

const IconToggle = styled(Box)`
  ${({ theme, light }) => css`
    box-shadow: none;
    cursor: pointer;
    height: 32px;
    width: 32px;
    position: absolute;
    right: 24px;
    top: 8px;
    z-index: 100;

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

export const NavIcon = ({ light, toggle, clickHandler }) => {
  return (
    <IconToggle
      light={light}
      toggle={toggle}
      onClick={clickHandler}
      role="button"
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
