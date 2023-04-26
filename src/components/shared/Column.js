import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const Column = ({
  basis = 'full',
  flex = { grow: 1, shrink: 1 },
  children,
  ...props
}) => {
  const { viewport } = useResponsive()
  return (
    <Box
      flex={flex}
      basis={basis}
      viewport={viewport}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}

export default Column
