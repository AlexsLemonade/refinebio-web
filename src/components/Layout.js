import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useBand } from 'hooks/useBand'
import { useResponsive } from 'hooks/useResponsive'
import { useMatchMedia } from 'hooks/useMatchMedia'
import { Box, Main } from 'grommet'
import { BackToTopButton } from 'components/shared/BackToTopButton'
import { Band } from 'components/shared/Band'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'

export const Layout = ({ children }) => {
  const router = useRouter()
  const isMax420 = useMatchMedia('(max-width: 420px)')
  const { band, setBand } = useBand()
  const { setResponsive } = useResponsive()
  const [path, setPath] = useState('')
  const pathWithBand = ['/', '/about', '/compendia/[type]']

  useEffect(() => {
    setPath(router.pathname)
    setBand(pathWithBand.includes(path))
  }, [router, path])

  return (
    <Box height={{ min: '100vh' }}>
      {band && (
        <Band
          bandHeight={
            // eslint-disable-next-line no-nested-ternary
            path === '/about'
              ? setResponsive('600px', '520px')
              : path === '/compendia/[type]'
              ? setResponsive(isMax420 ? '420px' : '320px', '320px', '368px')
              : setResponsive('500px', '368px')
          }
          light={path === '/compendia/[type]'}
        />
      )}
      <Header light={band && path !== '/compendia/[type]'} />
      <Main role="main">{children}</Main>
      <Footer />
      <BackToTopButton />
    </Box>
  )
}
export default Layout
