import { useState } from 'react'
import { useRouter } from 'next/router'
import { isMatchPath } from 'helpers/isMatchPath'
import { Box, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button as SharedButton } from 'components/shared/Button'
import { List } from 'components/shared/List'
import { Icon } from 'components/shared/Icon'
import styled, { css } from 'styled-components'

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

const ListItem = ({ active, label, href, clickHandler }) => {
  return (
    <Li
      as="li"
      active={active}
      onClick={clickHandler}
      style={{ listStyle: 'none' }}
    >
      <Anchor
        color={active ? 'white' : 'black'}
        label={label}
        href={href}
        style={{ display: 'block', whiteSpace: 'nowrap', padding: '16px' }}
      />
    </Li>
  )
}

export const NavDropDown = ({ active, light }) => {
  const router = useRouter()
  const { asPath } = router
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
          elevation="small"
          margin={{ top: '24px', left: '-40px' }}
          style={{ position: 'absolute' }}
        >
          <List alignItems="left" flexDirection="column" pad="medium">
            <ListItem
              active={isMatchPath(asPath, '/compendia/normalized')}
              href="/compendia/normalized"
              label="Normalized Compendia"
              clickHandler={handleClick}
            />
            <ListItem
              active={isMatchPath(asPath, '/compendia/rna-seq')}
              href="/compendia/rna-seq"
              label="RNA-seq Sample Compendia"
              clickHandler={handleClick}
            />
          </List>
        </Box>
      )}
    </Box>
  )
}

export default NavDropDown
