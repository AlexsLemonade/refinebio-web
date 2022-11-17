import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const FixedContainer = ({ children, ...props }) => {
  const { setResponsive } = useResponsive()
  const MAX_WIDTH = '1250px' // to preserve UI layout for wider screens
  return (
    <Box
      margin={{ horizontal: 'auto' }}
      pad={setResponsive(
        { horizontal: 'large' },
        { horizontal: 'small' },
        { horizontal: 'large' }
      )}
      width={MAX_WIDTH}
      style={{ position: 'relative' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}
