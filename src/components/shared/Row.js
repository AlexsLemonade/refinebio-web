import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const Row = ({ justify = 'between', children, ...props }) => {
  const { setResponsive } = useResponsive()
  return (
    <Box
      direction={setResponsive('column', 'row')}
      justify={justify}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}

export default Row
