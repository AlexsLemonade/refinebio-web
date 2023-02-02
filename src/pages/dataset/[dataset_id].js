import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import {
  DatasetErrorDownloading,
  DatasetProcessing,
  DatasetReady,
  DatasetRegenerate,
  MoveToDatasetButton,
  ShareDatasetButton
} from 'components/Dataset'
import { Row } from 'components/shared/Row'

// https://github.com/AlexsLemonade/refinebio-frontend/issues/27

// TEMPORARY
export const getServerSideProps = ({ query }) => {
  const { dataset_id: datasetId } = query

  return { props: { datasetId } }
}

export const Dataset = ({ datasetId }) => {
  const { setResponsive } = useResponsive()

  return (
    <FixedContainer>
      <Box
        pad={{
          top: setResponsive('basex6', 'basex8', 'basex14'),
          bottom: 'large'
        }}
      >
        {/* TEMPORARY START */}
        {datasetId === 'error' && <DatasetErrorDownloading />}
        {datasetId === 'processing' && <DatasetProcessing />}
        {datasetId === 'ready' && <DatasetReady />}
        {datasetId === 'regenerate' && <DatasetRegenerate />}
        {/* TEMPORARY END */}
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
