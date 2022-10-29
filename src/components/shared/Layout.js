import { Box, Main } from 'grommet'

export const Layout = ({ children }) => {
  return (
    <Box height={{ min: '100vh' }}>
      <Main role="main">{children}</Main>
    </Box>
  )
}
export default Layout
