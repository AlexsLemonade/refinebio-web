import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useBand } from 'hooks/useBand'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Main } from 'grommet'
import { isMatchPath } from 'helpers/isMatchPath'
import { BackToTopButton } from 'components/shared/BackToTopButton'
import { Band } from 'components/shared/Band'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'

export const Layout = ({ children }) => {
  const router = useRouter()
  const { pathname } = router
  const { band, setBand } = useBand()
  const { getForBreakpoint, setResponsive } = useResponsive()
  const mobile = getForBreakpoint(420, '420px', '320px')
  const pageWithBand = ['/', '/about', '/compendia/[type]']

  useEffect(() => {
    setBand(pageWithBand.includes(pathname))
  }, [pathname])

  return (
    <Box height={{ min: '100vh' }}>
      {band && (
        <Band
          bandHeight={
            // eslint-disable-next-line no-nested-ternary
            isMatchPath('/about')
              ? setResponsive('600px', '520px')
              : isMatchPath(pathname, '/compendia/[type]')
              ? setResponsive(mobile, '320px', '368px')
              : setResponsive('500px', '368px')
          }
          light={isMatchPath(pathname, '/compendia/[type]')}
        />
      )}
      <Header light={band && !isMatchPath(pathname, '/compendia/[type]')} />
      <Main role="main">{children}</Main>
      <Footer />
      <BackToTopButton />
    </Box>
  )
}
export default Layout
