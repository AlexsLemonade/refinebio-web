import { useEffect, useState } from 'react'
import moment from 'moment'
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

// Dataset page has 4 states which correspond with the backend's states
// Processing - The download file is being created
// Processed - The download file is ready
// Expired - Download files expire after some time
// (https://github.com/AlexsLemonade/refinebio-frontend/issues/27)
// Error = A processing error or network error

// TODO: create a new issue for the error handling
export const Dataset = ({ query }) => {
  const { error, dataset, datasetId, getDatasetDetails } = useDatasetManager()
  const { dataset_id: idFromQuery, ref } = query
  const pageRendered = usePageRendered()
  const { setResponsive } = useResponsive()
  const [data, setData] = useState(dataset)

  useEffect(() => {
    const getDataset = async (id) => {
      const response = await getDatasetDetails(id)
      setData(response)
      return response
    }

    if (!isSameId) {
      getDataset(idFromQuery)
    }
  }, [])

  if (!pageRendered) return null

  const isSharedDataset = ref === 'share'
  const isSameId = datasetId === idFromQuery
  const {
    is_processed: isProcessed,
    is_processing: isProcessing,
    is_available: isAvailable,
    expires_on: expiredOn,
    success
  } = data
  const isExpired = moment(expiredOn).isBefore(Date.now())
  const isProcessingError = success === false // 'success' may be null

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
        {(error || isProcessingError) && (
          <DatasetErrorDownloading dataset={data} />
        )}
        {isProcessing && <DatasetProcessing dataset={data} />}
        {isExpired ? (
          <DatasetRegenerate dataset={data} />
        ) : (
          <Box>
            {isProcessed && isAvailable && <DatasetReady dataset={data} />}
          </Box>
        )}
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
        margin={{
          top: isSharedDataset ? 'none' : 'xlarge',
          bottom: isSharedDataset ? 'none' : 'xlarge'
        }}
        pad={{ bottom: setResponsive('medium', 'small') }}
      >
        <Box>
          <MoveToDatasetButton
            dataset={dataset}
            newDataset={data}
            disabled={isSameId}
          />
        </Box>
        <Row
          gap={setResponsive('medium', 'small')}
          margin={{ top: setResponsive('medium', 'none') }}
        >
          <ShareDatasetButton datasetId={idFromQuery} />
          {isSharedDataset && (
            <Button label="Download Dataset" primary responsive />
          )}
        </Row>
      </Row>
      <Box>
        <FilesSummary dataset={data} />
        <DatasetSummary dataset={data} />
        <DatasetDetails dataset={data} isImmutable />
      </Box>
    </FixedContainer>
  )
}

export default Dataset
