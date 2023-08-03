import { useEffect, useState } from 'react'
import { Box, Heading } from 'grommet'
import { useDataset } from 'hooks/useDataset'
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
  DownloadDatasetDetails,
  DownloadDatasetSummary,
  DownloadFilesSummary
} from 'components/Download'

// NOTE: Add the Spinner component for loading after replacing the mock with the API response
// TEMPORARY
// endpoint: https://api.refine.bio/v1/dataset/{datasetId}/?details=true
export const getServerSideProps = ({ query }) => {
  return { props: { query } }
}

// Dataset page has 3 states which correspond with the backend's states
// Processing - The download file is being created
// Processed - The download file is ready
// Expired - Download files expire after some time
// https://github.com/AlexsLemonade/refinebio-frontend/issues/27

export const Dataset = ({ query }) => {
  const { dataset } = useDataset()
  const { dataset_id: datasetId, ref } = query
  const isSharedDataset = ref === 'share'
  const pageRendered = usePageRendered()
  const { setResponsive } = useResponsive()

  const [data, setData] = useState(null)

  useEffect(() => {
    if (pageRendered) {
      setData(dataset)
    }
  }, [pageRendered])

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
        {datasetId === 'processing' && <DatasetProcessing />}
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
          <MoveToDatasetButton dataset={data} />
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
      {data && isSharedDataset && (
        <>
          <DownloadFilesSummary dataset={data} />
          <DownloadDatasetSummary dataset={data} />
          <DownloadDatasetDetails dataset={data} isImmutable />
        </>
      )}
    </FixedContainer>
  )
}

export default Dataset
