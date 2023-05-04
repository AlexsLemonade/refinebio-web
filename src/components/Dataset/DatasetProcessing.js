import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph } from 'grommet'
import { Column } from 'components/shared/Column'
import { IconProcessingGears } from 'components/shared/IconProcessingGears'
import { Row } from 'components/shared/Row'
import { DatasetExplore } from './DatasetExplore'

export const DatasetProcessing = ({ dataset }) => {
  const { setResponsive } = useResponsive()

  return (
    <>
      <Box align="center">
        <Row justify="center" width={setResponsive('100%', '80%', '60%')}>
          <Column align={setResponsive('center', 'start')}>
            <Heading
              level={1}
              margin={{ bottom: 'small' }}
              size={setResponsive('h1Xsmall', 'h1Small')}
            >
              Your dataset is being processed
            </Heading>
            <Paragraph>
              An email with a download link will be sent to{' '}
              <strong>{dataset?.email_address || 'jdoe@example.com'}</strong>{' '}
              when the dataset is ready or you can come back to this page later.
            </Paragraph>
          </Column>
          <Column
            align="center"
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
