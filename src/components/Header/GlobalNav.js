import { useResponsive } from 'hooks/useResponsive'
import { Anchor, Box, Button, Menu, Nav as GrommentNav, Text } from 'grommet'
import { SrOnly } from 'components/shared/SrOnly'
import styled, { css } from 'styled-components'
import { ArrowDownIcon } from '../../images/chevron-down.svg'

const NavIcon = styled(Box)`
  ${({ theme, light }) => css`
    box-shadow: none;
    cursor: pointer;
    display: block;
    height: 32px;
    width: 32px;
    position: absolute;
    right: 24px;
    top: 8px;
    z-index: 3;

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
      border-radius: 3px;
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

  ${({ toggle }) =>
    toggle &&
    css`
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

const CustomNav = styled(GrommentNav)`
  ${({ theme, light }) => css`
    font-family: 'Rubik', sans-serif;
    flex-direction: row;
    a {
      margin-left: 16px;
      color: ${light ? theme.global.colors.white : theme.global.colors.black};
      &:not(:first-child) {
      }
      &:hover,
      &:focus {
        border-bottom: 1px solid
          ${light ? theme.global.colors.white : theme.global.colors.brand};
        color: ${light ? theme.global.colors.white : theme.global.colors.brand};
        text-decoration: none;
      }
    }
    button[aria-label='Open Menu'] {
      border-radius: 0;
      color: ${light ? theme.global.colors.white : theme.global.colors.black};
      margin-left: 16px;
      padding: 0;

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

  ${({ theme, viewport }) =>
    viewport === 'small' &&
    css`
      background: ${theme.global.colors.white};
      flex-direction: column;
      height: 100vh;
      width: 80vw;
      padding: 64px 0;
      position: fixed;
      bottom: 0;
      top: 0;
      right: 0;
      z-index: 2;
      transform: translate3d(100%, 0, 0);

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 56px;
        width: 100%;
        padding-left: 24px;

        &:hover {
          background: ${theme.global.colors['gray-shade-5']};
          border: none;
        }
      }
      button {
        width: 64vw;
      }
    `}

    ${({ toggle }) =>
    toggle &&
    css`
      animation: slideInRight 0.2s cubic-bezier(0, 0.49, 0.56, 1.04) forwards;
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.3);
    `}
    
    ${({ toggle }) =>
    !toggle &&
    css`
      animation: slideInRight 0.15s cubic-bezier(0, 0.49, 0.56, 1.04) reverse;
    `}
`

export const GlobalNav = ({
  light = false,
  toggle = false,
  setToggle,
  ...props
}) => {
  const { viewport, setResponsive } = useResponsive()
  return (
    <>
      {viewport === 'small' && (
        <NavIcon
          light={light}
          toggle={toggle}
          onClick={() => setToggle(!toggle)}
          role="button"
        >
          <Box as="span" />
          <SrOnly>Open the site navigation</SrOnly>
        </NavIcon>
      )}
      <CustomNav
        align="center"
        gap="0"
        light={light}
        role="navigation"
        toggle={toggle}
        viewport={viewport}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <Anchor label="Search " href="/search" />
        {viewport === 'small' ? (
          <>
            <Text>
              Compendia <ArrowDownIcon />
            </Text>
            <Anchor label="Normalized Compendia" href="/" />
            <Anchor label="RNA-seq Sample Compendia" href="/" />
          </>
        ) : (
          <Menu
            gap="0"
            label="Compendia"
            items={[
              { label: 'Normalized Compendia', onClick: () => {} },
              { label: 'RNA-seq Sample Compendia', onClick: () => {} }
            ]}
          />
        )}
        <Anchor
          label="Docs "
          href="https://docs.refine.bio"
          target="_blank"
          rel="noopener noreferrer"
        />
        <Anchor
          label="About "
          href="/about"
          margin={{ bottom: setResponsive('24px', 0) }}
        />
        <Button
          label="My Dataset"
          aria-label="View My Dataset"
          badge={{ max: 10000, value: 0 }}
          light={light}
          margin={{ left: 'small' }}
          secondary
        />
      </CustomNav>
    </>
  )
}

export default GlobalNav
