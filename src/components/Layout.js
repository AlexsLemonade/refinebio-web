import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useBand } from 'hooks/useBand'
import { Box, Main } from 'grommet'
import { Band } from 'components/shared/Band'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'

export const Layout = ({ children }) => {
  const router = useRouter()
  const { band, setBand } = useBand()
  const [path, setPath] = useState('')
  const pathWithBand = ['/', '/about']

  useEffect(() => {
    setPath(router.asPath)
    setBand(pathWithBand.includes(path))
  }, [router, path])

  return (
    <Box height={{ min: '100vh' }}>
      {band && <Band />}
      <Header light={band} />
      <Main role="main">{children}</Main>
      <Footer />
    </Box>
  )
}
export default Layout
