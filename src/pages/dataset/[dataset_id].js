import { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { usePageRendered } from 'hooks/usePageRendered'
import { usePollDatasetStatus } from 'hooks/usePollDatasetStatus'
import { useResponsive } from 'hooks/useResponsive'
import { Error } from 'components/shared/Error'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { Spinner } from 'components/shared/Spinner'
import {
  DatasetPageHeader,
  MoveToDatasetButton,
  ShareDatasetButton
} from 'components/Dataset'
import {
  DatasetDetails,
  DatasetSummary,
  DownloadDatasetButton,
  FilesSummary,
  StartProcessing
} from 'components/Download'

export const getServerSideProps = ({ query }) => {
  return { props: { query } }
}

export const Dataset = ({ query }) => {
  const pageRendered = usePageRendered()
  const { setResponsive } = useResponsive()
  const { dataset_id: idFromQuery, start } = query
  const { dataset, datasetId, error, loading, getDataset, regeneratedDataset } =
    useDatasetManager()
  const { isProcessingDataset, polledDatasetState } =
    usePollDatasetStatus(idFromQuery)
  const [selectedDataset, setSelectedDataset] = useState({}) // stores the dataset currently displayed on the page
  const isProcessed = selectedDataset?.is_processed && selectedDataset?.success // sets visibility of the download options in Dwonload Files Summary
  const isUnprocessedDataset = // sets visibility of the Download Dataset button
    !selectedDataset?.is_processing &&
    !selectedDataset?.is_processed &&
    selectedDataset?.success !== false

  const getSelectedDataset = async (id) => {
    const response = await getDataset(id)
    setSelectedDataset(response)
  }

  useEffect(() => {
    getSelectedDataset(idFromQuery)
  }, [query])

  useEffect(() => {
    // swaps selectedDataset to the last fetched polledDatasetState
    // (only if the dataset ID in URL was being processed) to update
    // DatasetPageHeader
    if (!isProcessingDataset && polledDatasetState) {
      setSelectedDataset(polledDatasetState)
    }
  }, [isProcessingDataset, polledDatasetState])

  if (!pageRendered) return null

  const isSameId = datasetId === idFromQuery

  if (start) {
    return (
      <FixedContainer>
        <StartProcessing dataset={selectedDataset} />
      </FixedContainer>
    )
  }

  if (error) {
    return (
      <Error
        statusCode={error}
        align="center"
        direction="column"
        marginTop="none"
      />
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
              <DatasetPageHeader dataset={selectedDataset} />
              <Row
                border={{ side: 'bottom' }}
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
                  <ShareDatasetButton dataset={selectedDataset} />
                  {isUnprocessedDataset && (
                    <DownloadDatasetButton dataset={selectedDataset} />
                  )}
                </Row>
              </Row>
              <FilesSummary
                dataset={regeneratedDataset || selectedDataset}
                defaultDataset={selectedDataset}
                isProcessed={isProcessed}
              />
              <DatasetSummary dataset={regeneratedDataset || selectedDataset} />
              <DatasetDetails
                dataset={regeneratedDataset || selectedDataset}
                isImmutable
              />
            </>
          )}
        </Box>
      )}
    </FixedContainer>
  )
}

export default Dataset
