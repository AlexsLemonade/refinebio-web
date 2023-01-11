import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Header as GrommetHeader } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Overlay } from 'components/shared/Ovevrlay'
import { Logo } from './Logo'
import { GlobalNav } from './GlobalNav'

export const Header = ({ light = false }) => {
  const { viewport } = useResponsive()
  const [toggle, setToggle] = useState(false)

  return (
    <GrommetHeader
      gap="none"
      justify="center"
      pad={{ top: 'large' }}
      role="banner"
    >
      {viewport === 'small' && <Overlay toggle={toggle} />}
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
