import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useBand } from 'hooks/useBand'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Main } from 'grommet'
import { BackToTopButton } from 'components/shared/BackToTopButton'
import { Band } from 'components/shared/Band'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'

export const Layout = ({ children }) => {
  const router = useRouter()
  const { band, setBand } = useBand()
  const { setResponsive } = useResponsive()
  const [path, setPath] = useState('')
  const pathWithBand = ['/', '/about', '/compendia']

  useEffect(() => {
    setPath(router.asPath)
    setBand(pathWithBand.includes(path))
  }, [router, path])

  return (
    <Box height={{ min: '100vh' }}>
      {band && (
        <Band
          bandHeight={
            path === '/about'
              ? setResponsive('650px', '520px')
              : setResponsive('500px', '368px')
          }
          light={path === '/compendia'}
        />
      )}
      <Header light={band && path !== '/compendia'} />
      <Main role="main">{children}</Main>
      <Footer />
      <BackToTopButton />
    </Box>
  )
}
export default Layout
