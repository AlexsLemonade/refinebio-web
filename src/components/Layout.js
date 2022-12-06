import { Box, Main } from 'grommet'
import { BackToTopButton } from 'components/shared/BackToTopButton'

export const Layout = ({ children }) => {
  return (
    <Box height={{ min: '100vh' }}>
      <Main role="main">{children}</Main>
      <BackToTopButton />
    </Box>
  )
}
export default Layout
