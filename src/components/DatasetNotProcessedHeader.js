import { Box, Heading } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'

export const DatasetNotProcessedHeader = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box pad={{ top: 'large', bottom: 'medium' }}>
      <Heading level={2} size={setResponsive('small', 'large')}>
        Shared Dataset
      </Heading>
    </Box>
  )
}

export default DatasetNotProcessedHeader
