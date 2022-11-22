import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Menu, Nav as GrommentNav, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Layer } from 'components/shared/Layer'
import { Icon } from 'components/shared/Icon'
import { SrOnly } from 'components/shared/SrOnly'
import styled, { css } from 'styled-components'
import { Logo } from './Logo'

const NavIcon = styled(Box)`
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

const A = styled(Anchor)`
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

    ${({ theme, current, light, viewport }) =>
    current &&
    css`
      border-bottom: 2px solid
        ${light ? theme.global.colors.white : theme.global.colors.black};
      border-bottom: ${viewport === 'small' && 'none'};
      text-decoration: ${viewport === 'small' ? 'underline' : 'none'};
      &:hover,
      &:focus {
        color: ${light && viewport !== 'small'
          ? theme.global.colors.white
          : theme.global.colors.black};
        background: ${viewport === 'small' && 'none'};
        text-decoration: ${viewport === 'small' ? 'underline' : 'none'};
      }
    `}
`

const List = styled(Box)`
  display: flex;
  align-items: center;

  ${({ theme, light }) => css`
    li {
      margin-left: 16px;
      button[aria-label='Open Menu'] {
        border-bottom: 2px solid transparent;
        border-radius: 0;
        color: ${light ? theme.global.colors.white : theme.global.colors.black};
        padding: 0;
        svg {
          fill: ${light
            ? theme.global.colors.white
            : theme.global.colors.black};
          stroke: ${light
            ? theme.global.colors.white
            : theme.global.colors.black};
        }
        &:hover,
        &[aria-expanded='true'] {
          border-bottom: 2px solid
            ${light ? theme.global.colors.white : theme.global.colors.brand};
          color: ${light
            ? theme.global.colors.white
            : theme.global.colors.brand};
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
    }
  `}

  ${({ viewport }) =>
    viewport === 'small' &&
    css`
      align-items: start;
      flex-direction: column;

      li {
        margin-left: 0;
        width: 100%;

        button {
          font-size: 18px;
          margin-left: 40px;
          padding: 12px 0;
          width: calc(100% - 40px);
        }

        &:last-child {
          margin-top: 24px;
        }
      }
    `}
`

const CustomNav = styled(GrommentNav)`
  font-family: 'Rubik', sans-serif;

  ${({ theme, viewport }) =>
    viewport === 'small' &&
    css`
      background: ${theme.global.colors.white};
      height: 100vh;
      width: 100vw;
      padding: 40px 0;
      position: fixed;
      z-index: 2;
    `}
`

export const GlobalNav = ({ light = false, toggle = false, setToggle }) => {
  const router = useRouter()
  const getCurrent = (path) => router.pathname === path
  const { viewport } = useResponsive()
  const buttonWidth = '80vw'

  const handleClick = () => {
    if (viewport !== 'small') return
    setToggle(!toggle)
  }

  return (
    <>
      {viewport === 'small' && (
        <NavIcon
          light={light}
          toggle={toggle}
          onClick={handleClick}
          role="button"
        >
          <Box as="span" />
          <SrOnly
            label={
              toggle ? 'Close the site navigation' : 'Open the site navigation'
            }
          />
        </NavIcon>
      )}
      <Layer position="right" show={toggle}>
        <CustomNav
          align="center"
          gap="0"
          light={light}
          role="navigation"
          toggle={toggle}
          viewport={viewport}
        >
          {viewport === 'small' && (
            <Logo margin={{ vertical: 'large' }} clickHandler={handleClick} />
          )}
          <List as="ul" light={light} viewport={viewport}>
            <Box as="li">
              <A
                current={getCurrent('/search')}
                label="Search"
                light={light}
                href="/search"
                viewport={viewport}
                onClick={handleClick}
              />
            </Box>
            <Box as="li">
              {viewport === 'small' ? (
                <>
                  <Box
                    alignSelf="start"
                    pad={{ vertical: 'medium' }}
                    margin={{ horizontal: 'xlarge' }}
                    width={buttonWidth}
                  >
                    <Text size="large">
                      Compendia <Icon name="ChevronDown" size="xsmall" />
                    </Text>
                  </Box>
                  <A
                    label="Normalized Compendia"
                    light={light}
                    href="/"
                    viewport={viewport}
                    onClick={handleClick}
                  />
                  <A
                    label="RNA-seq Sample Compendia"
                    light={light}
                    href="/"
                    viewport={viewport}
                    onClick={handleClick}
                  />
                </>
              ) : (
                <Menu
                  gap="0"
                  label="Compendia"
                  light={light}
                  items={[
                    { label: 'Normalized Compendia', onClick: () => {} },
                    { label: 'RNA-seq Sample Compendia', onClick: () => {} }
                  ]}
                />
              )}
            </Box>
            <Box as="li">
              <A
                label="Docs"
                light={light}
                href="https://docs.refine.bio"
                target="_blank"
                rel="noopener noreferrer"
                viewport={viewport}
                onClick={handleClick}
              />
            </Box>
            <Box as="li">
              <A
                current={router.pathname === '/about'}
                light={light}
                label="About"
                href="/about"
                viewport={viewport}
                onClick={() => handleClick()}
              />
            </Box>
            <Box as="li">
              <Button
                label="My Dataset"
                aria-label="View My Dataset"
                badge={{ max: 10000, value: 0 }}
                width={viewport === 'small' ? buttonWidth : 'max-content'}
                light={viewport !== 'small' ? light : false}
                secondary
              />
            </Box>
          </List>
        </CustomNav>
      </Layer>
    </>
  )
}

export default GlobalNav
