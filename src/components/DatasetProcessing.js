import { Box, Heading, Paragraph } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Column } from 'components/Column'
import { DatasetExplore } from 'components/DatasetExplore'
import { IconProcessingGears } from 'components/IconProcessingGears'
import { Row } from 'components/Row'

export const DatasetProcessing = ({ dataset }) => {
  const { setResponsive } = useResponsive()
  const { email } = useDatasetManager()

  return (
    <>
      <Box align="center">
        <Row justify="center" width={setResponsive('100%', '80%', '50%')}>
          <Column align={setResponsive('center', 'start')}>
            <Heading level={1} margin={{ bottom: 'small' }}>
              Your dataset is being processed
            </Heading>
            <Paragraph>
              An email with a download link will be sent to{' '}
              <strong>{email}</strong> when the dataset is ready or you can come
              back to this page later.
            </Paragraph>
          </Column>
          <Column
            align="center"
            basis="1"
            margin={{
              top: setResponsive('xlarge', 'none'),
              left: setResponsive('none', 'basex13')
            }}
          >
            <IconProcessingGears />
          </Column>
        </Row>
      </Box>
      <Box margin={{ top: setResponsive('xlarge', 'basex7', 'basex10') }}>
        <DatasetExplore dataset={dataset} />
      </Box>
    </>
  )
}

export default DatasetProcessing
