import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Header as GrommetHeader } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import styled, { css } from 'styled-components'
import { Logo } from './Logo'
import { GlobalNav } from './GlobalNav'

const Overlay = styled(Box)`
  background: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  opacity: 0;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;

  ${({ toggle }) =>
    toggle &&
    css`
      animation: fadeIn 0.15s ease-in forwards;
    `}
`

export const Header = ({ light = false, ...props }) => {
  const { viewport } = useResponsive()
  const [toggle, setToggle] = useState(false)

  return (
    <GrommetHeader
      gap="0"
      justify="center"
      pad={{ top: 'medium' }}
      role="banner"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {viewport === 'small' && toggle && <Overlay toggle={toggle} />}
      <FixedContainer direction="row" justify="between">
        <Logo light={light} />
        <Box align="center" direction="row">
          <GlobalNav light={light} toggle={toggle} setToggle={setToggle} />
        </Box>
      </FixedContainer>
    </GrommetHeader>
  )
}

export default Header
