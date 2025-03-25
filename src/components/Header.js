import { forwardRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Header as GrommetHeader } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import isMatchPath from 'helpers/isMatchPath'
import { FixedContainer } from 'components/FixedContainer'
import { GithubLogoAnchor } from 'components/GithubLogoAnchor'
import { GlobalNav } from 'components/GlobalNav'
import { LogoAnchor } from 'components/LogoAnchor'

export const Header = forwardRef(({ light = false }, ref) => {
  const router = useRouter()
  const { viewport } = useResponsive()
  const [toggle, setToggle] = useState(false)
  const stickyHeaderPages = [
    '/dataset/[dataset_id]',
    '/download',
    '/experiments/[accession_code]/[title]',
    '/search'
  ]

  const isStickyHeader = isMatchPath(router.pathname, stickyHeaderPages)

  return (
    <GrommetHeader
      ref={ref}
      background={isStickyHeader ? 'white' : 'transparent'}
      gap="none"
      justify="center"
      pad={{ top: 'large', bottom: 'medium' }}
      role="banner"
      style={{
        position: isStickyHeader ? 'sticky' : 'relative',
        top: 0,
        left: isStickyHeader ? '50%' : '0',
        zIndex: 10
      }}
    >
      {viewport === 'small' && toggle && (
        <Box
          animation={{ type: toggle ? 'fadeIn' : 'fedeOut', duration: 150 }}
          background="rgba3"
          fill
          toggle={toggle}
          style={{ opacity: 0, position: 'fixed', left: 0, top: 0, zIndex: 1 }}
        />
      )}
      <FixedContainer direction="row" justify="between">
        <LogoAnchor light={light} />
        <Box align="center" direction="row">
          <GlobalNav light={light} toggle={toggle} setToggle={setToggle} />
        </Box>
      </FixedContainer>
      {viewport === 'large' && <GithubLogoAnchor light={light} />}
    </GrommetHeader>
  )
})

export default Header
