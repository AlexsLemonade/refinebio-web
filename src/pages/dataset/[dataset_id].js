import { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { usePageRendered } from 'hooks/usePageRendered'
import { usePollDatasetStatus } from 'hooks/usePollDatasetStatus'
import { useResponsive } from 'hooks/useResponsive'
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

// TODO: create a new issue for the error handling
export const Dataset = ({ query }) => {
  const { dataset_id: idFromQuery, start } = query
  const { dataset, datasetId, loading, getDataset, regeneratedDataset } =
    useDatasetManager()
  const pageRendered = usePageRendered()
  const { isProcessingDataset, latestPollDatasetState } =
    usePollDatasetStatus(idFromQuery)
  const { setResponsive } = useResponsive()
  const [selectedDataset, setSelectedDataset] = useState({})
  const isProcessed = selectedDataset?.is_processed && selectedDataset?.success
  const isUnprocessedDataset =
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
    if (latestPollDatasetState && !isProcessingDataset) {
      setSelectedDataset(latestPollDatasetState)
    }
  }, [isProcessingDataset, latestPollDatasetState])

  if (!pageRendered) return null

  const isSameId = datasetId === idFromQuery

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
                  <ShareDatasetButton datasetId={idFromQuery} />
                  {isUnprocessedDataset && (
                    <DownloadDatasetButton dataset={selectedDataset} />
                  )}
                </Row>
              </Row>
              <FilesSummary
                dataset={regeneratedDataset || selectedDataset}
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
