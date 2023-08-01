import { Box } from 'grommet'

export const BoxBlock = ({ children, style, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Box style={{ display: 'block', ...style }} {...props}>
    {children}
  </Box>
)

export default BoxBlock
