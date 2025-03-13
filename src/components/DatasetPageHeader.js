import dynamic from 'next/dynamic'
import { Box } from 'grommet'
import { usePollDatasetStatus } from 'hooks/usePollDatasetStatus'
import { useResponsive } from 'hooks/useResponsive'
import getDatasetState from 'helpers/getDatasetState'
import { DatasetNotProcessed } from 'components/DatasetNotProcessed'
import { DatasetProcessingError } from 'components/DatasetProcessingError'
import { DatasetRegenerate } from 'components/DatasetRegenerate'
import { FixedContainer } from 'components/FixedContainer'

const DatasetProcessing = dynamic(() => import('./DatasetProcessing'), {
  ssr: false
})

const DatasetReady = dynamic(() => import('./DatasetReady'), {
  ssr: false
})

export const DatasetPageHeader = ({ dataset }) => {
  const { setResponsive } = useResponsive()
  const { polledDatasetState } = usePollDatasetStatus(dataset.id)
  const currentDataset = polledDatasetState || dataset
  const currentDatasetState = getDatasetState(currentDataset)
  const vPad = !currentDatasetState.isNotProcessed
    ? setResponsive('basex6', 'basex8', 'basex14')
    : 'none'

  const datasetStateComponents = {
    isNotProcessed: DatasetNotProcessed,
    isProcessing: DatasetProcessing,
    isFailed: DatasetProcessingError,
    isReady: DatasetReady,
    isReadyExpired: DatasetRegenerate
  }

  const Component =
    datasetStateComponents[
      Object.keys(datasetStateComponents).find(
        (state) => currentDatasetState[state]
      )
    ]

  return (
    <FixedContainer pad="none">
      <Box pad={{ vertical: vPad }}>
        <Component dataset={dataset} />
      </Box>
    </FixedContainer>
  )
}

export default DatasetPageHeader
