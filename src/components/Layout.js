import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Main } from 'grommet'
import { useBand } from 'hooks/useBand'
import { useResponsive } from 'hooks/useResponsive'
import { useMatchMedia } from 'hooks/useMatchMedia'
import isMatchPath from 'helpers/isMatchPath'
import { BackToTopButton } from 'components/shared/BackToTopButton'
import { Band } from 'components/shared/Band'
import { Notification } from 'components/shared/Notification'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'

export const Layout = ({ children }) => {
  const router = useRouter()
  const { pathname } = router
  const isMax420 = useMatchMedia('(max-width: 420px)')
  const { band, setBand } = useBand()
  const { setResponsive } = useResponsive()

  const pathWithBand = ['/', '/about', '/compendia/[type]']

  useEffect(() => {
    setBand(pathWithBand.includes(pathname))
  }, [pathname])

  return (
    <Box height={{ min: '100vh' }}>
      <Notification />
      {band && (
        <Band
          bandHeight={
            // eslint-disable-next-line no-nested-ternary
            isMatchPath('/about')
              ? setResponsive('600px', '520px')
              : isMatchPath(pathname, '/compendia/[type]')
              ? setResponsive(isMax420 ? '420px' : '320px', '320px', '368px')
              : setResponsive('500px', '368px')
          }
          light={isMatchPath(pathname, '/compendia/[type]')}
        />
      )}
      <Header light={band && !isMatchPath(pathname, '/compendia/[type]')} />
      <Main role="main">{children}</Main>
      <Footer />
      <BackToTopButton />
      <Box id="portal" />
    </Box>
  )
}
export default Layout
