import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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

export const Dataset = ({ query: { dataset_id: datasetId, start } }) => {
  const pageRendered = usePageRendered()
  const { push } = useRouter()
  const { setResponsive } = useResponsive()
  const { dataset: myDataset, error, loading, getDataset } = useDatasetManager()
  const { isProcessingDataset, polledDatasetState, pollDatasetId } =
    usePollDatasetStatus()
  const [dataset, setDataset] = useState({}) // dataset currently displayed on the page
  const isUnprocessedDataset = // sets visibility of the Download Dataset button
    !dataset.is_processing && !dataset.is_processed && dataset.success !== false

  const getDatasetFromQuery = async (id) => {
    const response = await getDataset(id)
    setDataset(response)
  }

  useEffect(() => {
    // redirects users to /download if datasetId matches My dataset ID
    if (datasetId === myDataset.id) push('/download')

    getDatasetFromQuery(datasetId)
    pollDatasetId(datasetId) // sets a processing datasets for polling
  }, [datasetId])

  useEffect(() => {
    // swaps dataset to the last fetched polledDatasetState
    // (only if the dataset ID in URL was being processed) to update
    // DatasetPageHeader
    if (!isProcessingDataset && polledDatasetState) {
      setDataset(polledDatasetState)
    }
  }, [isProcessingDataset, polledDatasetState])

  if (!pageRendered) return null

  if (start) {
    return (
      <FixedContainer>
        <StartProcessing dataset={dataset} />
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

  if (loading) {
    return (
      <Box align="center" fill justify="center" margin={{ top: 'large' }}>
        <Spinner />
      </Box>
    )
  }

  return (
    <FixedContainer>
      <Box>
        {dataset?.data && (
          <>
            <DatasetPageHeader dataset={dataset} />
            <Row
              border={{ side: 'bottom' }}
              pad={{ bottom: setResponsive('medium', 'small') }}
            >
              <Box>
                <MoveToDatasetButton dataset={dataset} />
              </Box>
              <Row
                gap={setResponsive('medium', 'small')}
                margin={{ top: setResponsive('medium', 'none') }}
              >
                <ShareDatasetButton dataset={dataset} />
                {isUnprocessedDataset && (
                  <DownloadDatasetButton dataset={dataset} />
                )}
              </Row>
            </Row>
            <FilesSummary dataset={dataset} />
            <DatasetSummary dataset={dataset} />
            <DatasetDetails dataset={dataset} isImmutable />
          </>
        )}
      </Box>
    </FixedContainer>
  )
}

export default Dataset
