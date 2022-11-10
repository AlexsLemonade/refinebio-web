import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const FixedContainer = ({ children, ...props }) => {
  const { setResponsive } = useResponsive()
  return (
    <Box
      margin={{ horizontal: 'auto' }}
      pad={setResponsive(
        { horizontal: 'large' },
        { horizontal: 'small' },
        { horizontal: 'large' }
      )}
      width="1250px" // fixed value to preserve UI layout for wider screens
      style={{ position: 'relative' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}
