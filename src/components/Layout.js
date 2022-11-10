import { Box, Main } from 'grommet'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'

export const Layout = ({ children }) => {
  return (
    <Box height={{ min: '100vh' }}>
      <Header />
      <Main role="main">{children}</Main>
      <Footer />
    </Box>
  )
}
export default Layout
