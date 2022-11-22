import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const FixedContainer = ({ width = '1250px', children, ...props }) => {
  const { setResponsive } = useResponsive()
  return (
    <Box
      margin={{ horizontal: 'auto' }}
      pad={setResponsive(
        { horizontal: 'large' },
        { horizontal: 'small' },
        { horizontal: 'large' }
      )}
      width={width}
      style={{ position: 'relative' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}
