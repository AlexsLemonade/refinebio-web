import { useEffect, useState } from 'react'
import { Box, Heading } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import getDatasetState from 'helpers/getDatasetState'
import { FixedContainer } from 'components/shared/FixedContainer'
import { DatasetProcessing } from './DatasetProcessing'
import { DatasetProcessingError } from './DatasetProcessingError'
import { DatasetReady } from './DatasetReady'
import { DatasetRegenerate } from './DatasetRegenerate'

export const DatasetPageHeader = ({ dataset }) => {
  const { setResponsive } = useResponsive()
  const [datasetStates, setDatasetStates] = useState({})

  useEffect(() => {
    setDatasetStates(getDatasetState(dataset))
  }, [dataset])

  // maps dataset states to their corresponding component
  const statusHeaders = {
    isProcessing: DatasetProcessing,
    isFailed: DatasetProcessingError,
    isReady: DatasetReady,
    isReadyExpired: DatasetRegenerate
  }

  // finds the current dataset state
  const currentState = Object.keys(statusHeaders).find(
    (state) => datasetStates[state]
  )
  // gets the corresponding component for the current dataset state
  const Component = currentState ? statusHeaders[currentState] : null

  return (
    <FixedContainer pad="none">
      {Component ? (
        <Box
          pad={{
            vertical: setResponsive('basex6', 'basex8', 'basex14')
          }}
        >
          <Component dataset={dataset} />
        </Box>
      ) : (
        <Box pad={{ top: 'large', bottom: 'medium' }}>
          <Heading level={2} size={setResponsive('small', 'large')}>
            Shared Dataset
          </Heading>
        </Box>
      )}
    </FixedContainer>
  )
}

export default DatasetPageHeader
