import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Header as GrommetHeader } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import styled from 'styled-components'
import { LogoAnchor } from './LogoAnchor'
import { GlobalNav } from './GlobalNav'

const Overlay = styled(Box)`
  opacity: 0;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
`

export const Header = ({ light = false }) => {
  const { viewport } = useResponsive()
  const [toggle, setToggle] = useState(false)

  return (
    <GrommetHeader
      gap="0"
      justify="center"
      pad={{ top: 'large' }}
      role="banner"
    >
      {viewport === 'small' && toggle && (
        <Overlay
          animation={{ type: toggle ? 'fadeIn' : 'fedeOut', duration: 150 }}
          background="rgba_3"
          fill
          toggle={toggle}
        />
      )}
      <FixedContainer direction="row" justify="between">
        <LogoAnchor light={light} />
        <Box align="center" direction="row">
          <GlobalNav light={light} toggle={toggle} setToggle={setToggle} />
        </Box>
      </FixedContainer>
    </GrommetHeader>
  )
}

export default Header
