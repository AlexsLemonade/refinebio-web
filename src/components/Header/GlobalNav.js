import { useResponsive } from 'hooks/useResponsive'
import { Box, Menu, Nav as GrommentNav, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Layer } from 'components/shared/Layer'
import { SrOnly } from 'components/shared/SrOnly'
import styled, { css } from 'styled-components'
import { Logo } from './Logo'
import { ArrowDownIcon } from '../../images/chevron-down.svg'

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

const List = styled(Box)`
  display: flex;
  align-items: center;

  ${({ theme, light }) => css`
    li {
      margin-left: 16px;

      a {
        color: ${light ? theme.global.colors.white : theme.global.colors.black};
        &:hover,
        &:focus {
          border-bottom: 1px solid
            ${light ? theme.global.colors.white : theme.global.colors.brand};
          color: ${light
            ? theme.global.colors.white
            : theme.global.colors.brand};
        }
      }

      button[aria-label='Open Menu'] {
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
          border-bottom: 1px solid
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

  ${({ theme, viewport }) =>
    viewport === 'small' &&
    css`
      align-items: start;
      flex-direction: column;

      li {
        margin-left: 0;
        width: 100%;

        a {
          display: flex;
          align-items: center;
          font-size: 20px;
          height: 56px;
          width: 100%;
          margin: 0;
          padding: 40px 0 40px 40px;
          &:hover,
          &:focus {
            background: ${theme.global.colors['gray-shade-5']};
            border: none;
          }
        }

        button {
          font-size: 18px;
          margin-left: 40px;
          padding: 12px 0;
          width: 80vw;
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
  const { viewport } = useResponsive()

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
            <Logo light={false} margin={{ vertical: 'large' }} />
          )}
          <List as="ul" light={light} viewport={viewport}>
            <Box as="li">
              <Anchor label="Search " href="/search" underline={false} />
            </Box>
            <Box as="li">
              {viewport === 'small' ? (
                <>
                  <Box
                    alignSelf="start"
                    pad={{ vertical: 'medium' }}
                    margin={{ horizontal: '40px' }}
                    width="80vw"
                  >
                    <Text size="18px">
                      Compendia <ArrowDownIcon />
                    </Text>
                  </Box>
                  <Anchor
                    label="Normalized Compendia"
                    href="/"
                    underline={false}
                  />
                  <Anchor
                    label="RNA-seq Sample Compendia"
                    href="/"
                    underline={false}
                  />
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
            </Box>
            <Box as="li">
              <Anchor
                label="Docs "
                href="https://docs.refine.bio"
                target="_blank"
                rel="noopener noreferrer"
                underline={false}
              />
            </Box>
            <Box as="li">
              <Anchor label="About " href="/about" underline={false} />
            </Box>
            <Box as="li">
              <Button
                label="My Dataset"
                aria-label="View My Dataset"
                badge={{ max: 10000, value: 0 }}
                light={light}
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
