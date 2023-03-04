import { useEffect, useState } from 'react'
import { useDataset } from 'hooks/useDataset'
import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
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

// https://github.com/AlexsLemonade/refinebio-frontend/issues/27

// TEMPORARY
export const getServerSideProps = ({ query }) => {
  return { props: { query } }
}

export const Dataset = ({ query }) => {
  const { dataset_id: datasetId, ref } = query
  const { dataset } = useDataset()
  const isSharedDataset = ref === 'share'
  const { setResponsive } = useResponsive()
  const [pageRendered, setPagetRendered] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    setPagetRendered(true)
  }, [])

  useEffect(() => {
    if (pageRendered) {
      setData(dataset)
    }
  }, [pageRendered])

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
        margin={{ bottom: isSharedDataset ? 'none' : 'xlarge' }}
        pad={{ bottom: setResponsive('medium', 'small') }}
      >
        <Box>
          <MoveToDatasetButton />
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
          <DownloadDatasetDetails dataset={data} shared={isSharedDataset} />
        </>
      )}
    </FixedContainer>
  )
}

export default Dataset
