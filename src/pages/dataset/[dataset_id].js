import { useEffect, useState } from 'react'
import moment from 'moment'
import { Box, Heading } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { usePageRendered } from 'hooks/usePageRendered'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { Spinner } from 'components/shared/Spinner'
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
  FilesSummary,
  StartProcessing
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
  const { error, dataset, datasetId, loading, getDataset } = useDatasetManager()
  const { dataset_id: idFromQuery, ref, start } = query
  const pageRendered = usePageRendered()
  const { setResponsive } = useResponsive()
  const [selectedDataset, setSelectedDataset] = useState({})

  useEffect(() => {
    const getSelectedDataset = async (id) => {
      const response = await getDataset(id)
      setSelectedDataset(response)
      return response
    }

    getSelectedDataset(idFromQuery)
  }, [query])

  if (!pageRendered) return null
  const expiredOn = selectedDataset?.expires_on
  const isAvailable = selectedDataset?.is_available
  const isExpired = moment(expiredOn).isBefore(Date.now())
  const isProcessed = selectedDataset?.is_processed
  const isProcessing = selectedDataset?.is_processing
  const isProcessingError = selectedDataset?.success === false // 'success' may be null
  const isSameId = datasetId === idFromQuery
  const isSharedDataset = ref === 'share'
  const showSharedDatasetTitleHeader = isSharedDataset || !isProcessed

  if (start) {
    return (
      <FixedContainer>
        <StartProcessing dataset={selectedDataset} />
      </FixedContainer>
    )
  }

  return (
    <FixedContainer>
      {loading ? (
        <Box align="center" fill justify="center" margin={{ top: 'large' }}>
          <Spinner />
        </Box>
      ) : (
        <Box>
          {selectedDataset?.data && (
            <>
              <Box
                pad={{
                  top: showSharedDatasetTitleHeader
                    ? 'large'
                    : setResponsive('basex6', 'basex8', 'basex14'),
                  bottom: isSharedDataset ? 'medium' : 'large'
                }}
              >
                {showSharedDatasetTitleHeader && (
                  <Heading level={2} size={setResponsive('small', 'large')}>
                    Shared Dataset
                  </Heading>
                )}
                {(error || isProcessingError) && (
                  <DatasetErrorDownloading dataset={selectedDataset} />
                )}
                {isProcessing && (
                  <DatasetProcessing dataset={selectedDataset} />
                )}
                {isExpired ? (
                  <DatasetRegenerate dataset={selectedDataset} />
                ) : (
                  <Box>
                    {isProcessed && isAvailable && (
                      <DatasetReady dataset={selectedDataset} />
                    )}
                  </Box>
                )}
              </Box>
              <Row
                border={{ side: 'bottom' }}
                margin={{
                  top: showSharedDatasetTitleHeader ? 'none' : 'large'
                }}
                pad={{ bottom: setResponsive('medium', 'small') }}
              >
                <Box>
                  <MoveToDatasetButton
                    dataset={dataset}
                    selectedDataset={selectedDataset}
                    disabled={isSameId}
                  />
                </Box>
                <Row
                  gap={setResponsive('medium', 'small')}
                  margin={{ top: setResponsive('medium', 'none') }}
                >
                  <ShareDatasetButton datasetId={idFromQuery} />
                  {showSharedDatasetTitleHeader && (
                    <Button label="Download Dataset" primary responsive />
                  )}
                </Row>
              </Row>
              <FilesSummary dataset={selectedDataset} />
              <DatasetSummary dataset={selectedDataset} />
              <DatasetDetails dataset={selectedDataset} isImmutable />
            </>
          )}
        </Box>
      )}
    </FixedContainer>
  )
}

export default Dataset
