// (discussion) https://github.com/AlexsLemonade/refinebio-frontend/issues/27
import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import {
  DatasetErrorDownloading,
  MoveToDatasetButton,
  ShareDatasetButton
} from 'components/Dataset'
import { Row } from 'components/shared/Row'

export const Dataset = () => {
  const { setResponsive } = useResponsive()

  return (
    <FixedContainer>
      <Box pad={{ top: 'basex14', bottom: 'large' }}>
        <DatasetErrorDownloading />
      </Box>
      <Row
        border={{ side: 'bottom' }}
        margin={{ bottom: 'xlarge' }}
        pad={{ bottom: setResponsive('medium', 'small') }}
      >
        <Box>
          <MoveToDatasetButton />
        </Box>
        <Box margin={{ top: setResponsive('medium', 'none') }}>
          <ShareDatasetButton />
        </Box>
      </Row>
    </FixedContainer>
  )
}

export default Dataset
