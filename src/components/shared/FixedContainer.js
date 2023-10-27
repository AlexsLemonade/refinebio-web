import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'

export const FixedContainer = ({ children, width = '1250px', ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      margin={{ horizontal: 'auto' }}
      pad={{ horizontal: setResponsive('large', 'small', 'large') }}
      width={setResponsive('100%', '100%', width)}
      style={{ position: 'relative' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}
