import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph } from 'grommet'
import { Column } from 'components/shared/Column'
import { ProcessingGearsIcon } from 'components/shared/ProcessingGearsIcon'
import { Row } from 'components/shared/Row'
import { DownloadExplore } from './DownloadExplore'
import { DownloadFolterCTA } from './DownloadFooterCTA'

export const DownloadProcessing = ({ dataset }) => {
  const { setResponsive } = useResponsive()

  return (
    <>
      <Box align="center">
        <Row justify="center" width={setResponsive('100%', '80%', '50%')}>
          <Column
            align={setResponsive('center', 'start')}
            flexValue={setResponsive('1 1 auto', 'auto')}
          >
            <Heading
              level={2}
              margin={{ bottom: 'small' }}
              size={setResponsive('h2_small', 'h2_large')}
            >
              Your dataset is being processed
            </Heading>
            <Paragraph>
              An email with a download link will be sent to{' '}
              <strong>{dataset?.email_address || 'johndoe@gmail.com'}</strong>{' '}
              when the dataset is ready or you can come back to this page later.
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
            <ProcessingGearsIcon />
          </Column>
        </Row>
      </Box>

      <Box margin={{ top: setResponsive('xlarge', 'basex7', 'basex13') }}>
        <DownloadExplore dataset={dataset} />
      </Box>
      <DownloadFolterCTA dataset={dataset} />
    </>
  )
}

export default DownloadProcessing
