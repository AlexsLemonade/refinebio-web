import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const Column = ({ flexValue = '1 1 0', children, ...props }) => {
  const { viewport, setResponsive } = useResponsive()
  return (
    <Box
      flexValue={flexValue}
      viewport={viewport}
      style={{ flex: setResponsive('1 1 auto', flexValue) }}
      width={setResponsive('100%', 'auto')}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}

export default Column
