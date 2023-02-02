import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Text } from 'grommet'
import { Row } from 'components/shared/Row'
import { ShareDatasetButton } from 'components/Dataset'

export const DownloadAdvancedOptions = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box>
      <Row>
        <Heading
          level={2}
          margin={{ bottom: 'small' }}
          size={setResponsive('h2_small', 'h2_large')}
        >
          My Dataset
        </Heading>
        <ShareDatasetButton />
      </Row>
    </Box>
  )
}

export default DownloadAdvancedOptions
