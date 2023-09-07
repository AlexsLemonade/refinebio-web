import { Box, Heading, Paragraph } from 'grommet'
import { useRefinebio } from 'hooks/useRefinebio'
import { useResponsive } from 'hooks/useResponsive'
import { Column } from 'components/shared/Column'
import { IconProcessingGears } from 'components/shared/IconProcessingGears'
import { Row } from 'components/shared/Row'
import { DatasetExplore } from './DatasetExplore'

export const DatasetProcessing = ({ dataset }) => {
  const { email } = useRefinebio()
  const { setResponsive } = useResponsive()

  return (
    <>
      <Box align="center">
        <Row justify="center" width={setResponsive('100%', '80%')}>
          <Column
            align={setResponsive('center', 'start')}
            flexValue={setResponsive('1 1 auto', 'auto')}
          >
            <Heading level={1} margin={{ bottom: 'small' }}>
              Your dataset is being processed
            </Heading>
            <Paragraph>
              {email ? (
                <>
                  An email with a download link will be sent to{' '}
                  <strong>{email}</strong> when the dataset is ready or you can
                  come back to this page later.
                </>
              ) : (
                <>
                  This can take several minutes. Check back in later to download
                  the data.
                </>
              )}
            </Paragraph>
          </Column>
          <Column
            align="center"
            flexValue={setResponsive('1 1 auto', 'auto')}
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
