import moment from 'moment'
import { Box, Heading } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { usePageRendered } from 'hooks/usePageRendered'
import { FixedContainer } from 'components/shared/FixedContainer'
import { DatasetProcessingError } from './DatasetProcessingError'
import { DatasetProcessing } from './DatasetProcessing'
import { DatasetReady } from './DatasetReady'
import { DatasetRegenerate } from './DatasetRegenerate'

export const getServerSideProps = ({ query }) => {
  return { props: { query } }
}

// Dataset page has 4 states which correspond with the backend's states
// Processing - The download file is being created
// Processed - The download file is ready
// Expired - Download files expire after some time
// (https://github.com/AlexsLemonade/refinebio-frontend/issues/27)
// Error = A processing error or network error

const Block = ({ children }) => {
  const { setResponsive } = useResponsive()

  return (
    <FixedContainer>
      <Box>
        <Box
          pad={{
            top: setResponsive('basex6', 'basex8', 'basex14'),
            bottom: 'large'
          }}
        >
          {children}
        </Box>
      </Box>
    </FixedContainer>
  )
}

export const DatasetPageHeader = ({ dataset }) => {
  const { error, datasetId } = useDatasetManager()

  const pageRendered = usePageRendered()
  const { setResponsive } = useResponsive()

  if (!pageRendered) return null

  const expiredOn = dataset?.expires_on
  const isAvailable = dataset?.is_available
  const isExpired = moment(expiredOn).isBefore(Date.now())
  const isProcessed = dataset?.is_processed
  const isProcessing = dataset?.is_processing
  const isProcessingError = dataset?.success === false // 'success' may be null
  const isSharedDataset = datasetId !== dataset.id

  if (isExpired) {
    return (
      <Block>
        <DatasetRegenerate dataset={dataset} />
      </Block>
    )
  }

  if (isProcessed && isAvailable) {
    return (
      <Block>
        <DatasetReady dataset={dataset} />
      </Block>
    )
  }

  if (isProcessing) {
    return (
      <Block>
        <DatasetProcessing dataset={dataset} />
      </Block>
    )
  }

  if (isProcessingError || error) {
    return (
      <Block>
        <DatasetProcessingError dataset={dataset} />
      </Block>
    )
  }

  return (
    <FixedContainer pad="none">
      <Box>
        {dataset?.data && (
          <Box
            pad={{
              top: isSharedDataset ? 'large' : 'none',
              bottom: isSharedDataset ? 'medium' : 'large'
            }}
          >
            {isSharedDataset && (
              <Heading level={2} size={setResponsive('small', 'large')}>
                Shared Dataset
              </Heading>
            )}
          </Box>
        )}
      </Box>
    </FixedContainer>
  )
}

export default DatasetPageHeader
