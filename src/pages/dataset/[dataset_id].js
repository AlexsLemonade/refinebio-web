import { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { usePageRendered } from 'hooks/usePageRendered'
import { Button } from 'components/shared/Button'
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
  const { dataset_id: idFromQuery, ref, start } = query
  const { dataset, datasetId, loading, getDataset } = useDatasetManager()
  const pageRendered = usePageRendered()
  const { setResponsive } = useResponsive()

  const [selectedDataset, setSelectedDataset] = useState({})
  const isSharedDataset = ref === 'share' || !selectedDataset.is_processed

  useEffect(() => {
    const getSelectedDataset = async (id) => {
      const response = await getDataset(id)
      setSelectedDataset(response)
      return response
    }

    getSelectedDataset(idFromQuery)
  }, [query])

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
                  {isSharedDataset && (
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
