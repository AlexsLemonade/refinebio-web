import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Header as GrommetHeader } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
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
      {viewport === 'small' && toggle && (
        <Box
          animation={{ type: toggle ? 'fadeIn' : 'fedeOut', duration: 150 }}
          background="rgba_3"
          fill
          toggle={toggle}
          style={{ opacity: 0, position: 'fixed', left: 0, top: 0, zIndex: 1 }}
        />
      )}
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