import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Text } from 'grommet'
import styled, { css } from 'styled-components'
import { options } from 'config'
import gtag from 'analytics/gtag'
import isMatchPath from 'helpers/isMatchPath'
import { Anchor } from 'components/shared/Anchor'
import { Button as SharedButton } from 'components/shared/Button'
import { List } from 'components/shared/List'
import { Icon } from 'components/shared/Icon'

const Button = styled(SharedButton)`
  ${({ theme, light }) =>
    light &&
    css`
      &:hover {
        color: ${light ? theme.global.colors.white : theme.global.colors.black};
      }
    `}

  ${({ active }) =>
    active &&
    css`
      background: none;
      border: none;
    `}
`

const Li = styled(Box)`
  ${({ theme, active }) => css`
    background: ${active ? theme.global.colors.brand : 'transparent'};
    &:hover {
      background: ${active
        ? theme.global.colors.brand
        : theme.global.colors['gray-shade-5']};
      a {
        color: ${active
          ? theme.global.colors.white
          : theme.global.colors.brand};
        text-decoration: none;
      }
    }
  `}
`

const ListItem = ({ active, href, label, ...props }) => (
  <Li
    as="li"
    active={active}
    role="none"
    style={{ listStyle: 'none' }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <Anchor
      color={active ? 'white' : 'black'}
      href={href}
      label={label}
      role="menuitem"
      style={{ display: 'block', whiteSpace: 'nowrap', padding: '16px' }}
      onClick={() => gtag.navClick(label)}
    />
  </Li>
)

export const NavDropDown = ({ active, light }) => {
  const router = useRouter()
  const { asPath } = router
  const {
    compendia: { tabs }
  } = options
  const menuItems = tabs.map(({ label, path }) => ({ label, path }))
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(false)
  }

  return (
    <Box
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Box direction="row">
        <Button
          active={active}
          aria-controls="nav-menu"
          aria-expanded={isOpen}
          aria-haspopup="true"
          // eslint-disable-next-line no-nested-ternary
          color={active ? 'brand' : light ? 'white' : 'black'}
          gap="xsmall"
          label="Compendia"
          light={light}
          style={{
            borderBottom: active ? '2px solid red' : '2px solid transparent',
            borderColor: active ? '#386DB0' : 'transparent',
            borderRadius: '0',
            padding: '0'
          }}
        />
        <Text
          // eslint-disable-next-line no-nested-ternary
          color={active ? 'brand' : light ? 'white' : 'black'}
          margin={{ left: 'xsmall' }}
        >
          <Icon name="ChevronDown" size="xsmall" />
        </Text>
      </Box>
      {isOpen && (
        <Box
          animation={{ type: 'zoomIn', duration: 200 }}
          background="white"
          margin={{ top: '24px', left: '-40px' }}
          style={{
            boxShadow: ' 0px 3px 20px rgba(0, 0, 0, 0.1)',
            position: 'absolute'
          }}
        >
          <List
            alignItems="left"
            flexDirection="column"
            id="nav-menu"
            pad="none"
            role="menu"
          >
            {menuItems.map(({ label, path }) => (
              <ListItem
                key={label}
                active={isMatchPath(asPath, path)}
                href={path}
                label={label}
                onClick={handleClick}
              />
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default NavDropDown
