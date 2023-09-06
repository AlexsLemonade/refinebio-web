import { Box, Heading } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { usePageRendered } from 'hooks/usePageRendered'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import {
  DatasetErrorDownloading,
  DatasetProcessing,
  DatasetReady,
  DatasetRegenerate,
  MoveToDatasetButton,
  ShareDatasetButton
} from 'components/Dataset'
import {
  DatasetDetails,
  DatasetSummary,
  FilesSummary
} from 'components/Download'

export const getServerSideProps = ({ query }) => {
  return { props: { query } }
}

// Dataset page has 3 states which correspond with the backend's states
// Processing - The download file is being created
// Processed - The download file is ready
// Expired - Download files expire after some time
// https://github.com/AlexsLemonade/refinebio-frontend/issues/27

export const Dataset = ({ query }) => {
  const { dataset } = useDatasetManager()
  const { dataset_id: datasetId, ref } = query
  const isSharedDataset = ref === 'share'
  const pageRendered = usePageRendered()
  const { setResponsive } = useResponsive()

  if (!pageRendered) return null

  return (
    <FixedContainer>
      <Box
        pad={{
          top: isSharedDataset
            ? 'large'
            : setResponsive('basex6', 'basex8', 'basex14'),
          bottom: 'large'
        }}
      >
        {/* TEMPORARY START */}
        {datasetId === 'error' && <DatasetErrorDownloading />}
        {datasetId === 'processing' && <DatasetProcessing dataset={dataset} />}
        {datasetId === 'ready' && <DatasetReady />}
        {datasetId === 'regenerate' && <DatasetRegenerate />}
        {/* TEMPORARY END */}
      </Box>
      {isSharedDataset && (
        <Heading
          level={2}
          margin={{ bottom: setResponsive('small', 'large') }}
          size={setResponsive('small', 'large')}
        >
          Shared Dataset
        </Heading>
      )}
      <Row
        border={{ side: 'bottom' }}
        margin={{ bottom: isSharedDataset ? 'none' : 'xlarge' }}
        pad={{ bottom: setResponsive('medium', 'small') }}
      >
        <Box>
          <MoveToDatasetButton dataset={dataset} />
        </Box>
        <Row
          gap={setResponsive('medium', 'small')}
          margin={{ top: setResponsive('medium', 'none') }}
        >
          <ShareDatasetButton datasetId={datasetId} />
          {isSharedDataset && (
            <Button label="Download Dataset" primary responsive />
          )}
        </Row>
      </Row>
      {isSharedDataset && (
        <>
          <FilesSummary dataset={dataset} />
          <DatasetSummary dataset={dataset} />
          <DatasetDetails dataset={dataset} isImmutable />
        </>
      )}
    </FixedContainer>
  )
}

export default Dataset
