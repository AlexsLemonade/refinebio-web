import moment from 'moment'
import { Box, Heading } from 'grommet'
import { usePageRendered } from 'hooks/usePageRendered'
import { useResponsive } from 'hooks/useResponsive'
import { FixedContainer } from 'components/shared/FixedContainer'
import { DatasetProcessing } from './DatasetProcessing'
import { DatasetProcessingError } from './DatasetProcessingError'
import { DatasetReady } from './DatasetReady'
import { DatasetRegenerate } from './DatasetRegenerate'

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
      <Box
        pad={{
          vertical: setResponsive('basex6', 'basex8', 'basex14')
        }}
      >
        {children}
      </Box>
    </FixedContainer>
  )
}

export const DatasetPageHeader = ({ dataset }) => {
  const pageRendered = usePageRendered()
  const { setResponsive } = useResponsive()
  const {
    expires_on: expiredOn,
    is_available: isAvailable,
    is_processed: isProcessed,
    is_processing: isProcessing,
    success
  } = dataset
  const isExpired = moment(expiredOn).isBefore(Date.now())
  const isProcessingError = success === false // 'success' may be null

  if (!pageRendered) return null

  if (isProcessingError) {
    return (
      <Block>
        <DatasetProcessingError dataset={dataset} />
      </Block>
    )
  }

  if (isProcessing && !isProcessingError) {
    return (
      <Block>
        <DatasetProcessing dataset={dataset} />
      </Block>
    )
  }

  if (isProcessed) {
    if (isAvailable && !isExpired) {
      return (
        <Block>
          <DatasetReady dataset={dataset} />
        </Block>
      )
    }
    return (
      <Block>
        <DatasetRegenerate dataset={dataset} />
      </Block>
    )
  }

  return (
    <FixedContainer pad="none">
      <Box>
        <Box pad={{ top: 'large', bottom: 'medium' }}>
          <Heading level={2} size={setResponsive('small', 'large')}>
            Shared Dataset
          </Heading>
        </Box>
      </Box>
    </FixedContainer>
  )
}

export default DatasetPageHeader
