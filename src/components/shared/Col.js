import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const Col = ({ flexValue = '1 1 0', children, ...props }) => {
  const { viewport } = useResponsive()
  return (
    <Box
      flexValue={flexValue}
      viewport={viewport}
      style={{ flex: viewport === 'small' ? '1 1 auto' : flexValue }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}

export default Col
