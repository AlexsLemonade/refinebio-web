import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const FixedContainer = ({ children, width = '1250px', ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      margin={{ horizontal: 'auto' }}
      pad={{ horizontal: setResponsive('large', 'small', 'large') }}
      width={width}
      style={{ position: 'relative' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}
