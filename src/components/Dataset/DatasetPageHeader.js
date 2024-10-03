import { Box, Heading } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import getDatasetState from 'helpers/getDatasetState'
import { FixedContainer } from 'components/shared/FixedContainer'
import { DatasetProcessing } from './DatasetProcessing'
import { DatasetProcessingError } from './DatasetProcessingError'
import { DatasetReady } from './DatasetReady'
import { DatasetRegenerate } from './DatasetRegenerate'

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
  const { setResponsive } = useResponsive()
  const { isProcessing, isProcessingError, isReady, isReadyExpired } =
    getDatasetState(dataset)

  if (isProcessing) {
    return (
      <Block>
        <DatasetProcessing dataset={dataset} />
      </Block>
    )
  }

  if (isProcessingError) {
    return (
      <Block>
        <DatasetProcessingError dataset={dataset} />
      </Block>
    )
  }

  if (isReady) {
    return (
      <Block>
        <DatasetReady dataset={dataset} />
      </Block>
    )
  }

  if (isReadyExpired) {
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
