import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'

export const FixedContainer = ({ children, width, ...props }) => {
  const { setResponsive } = useResponsive()
  const boxWidth = width || setResponsive('100%', '100%', '1250px')

  return (
    <Box
      margin={{ horizontal: 'auto' }}
      pad={{ horizontal: setResponsive('large', 'small', 'large') }}
      width={boxWidth}
      style={{ position: 'relative' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}
