import dynamic from 'next/dynamic'
import { Box } from 'grommet'
import { usePollDatasetStatus } from 'hooks/usePollDatasetStatus'
import { useResponsive } from 'hooks/useResponsive'
import getDatasetState from 'helpers/getDatasetState'
import { DatasetNotProcessedHeader } from 'components/DatasetNotProcessedHeader'
import { DatasetProcessingErrorHeader } from 'components/DatasetProcessingErrorHeader'
import { DatasetRegenerateHeader } from 'components/DatasetRegenerateHeader'
import { FixedContainer } from 'components/FixedContainer'

const DatasetProcessingHeader = dynamic(
  () => import('./DatasetProcessingHeader'),
  {
    ssr: false
  }
)

const DatasetReadyHeader = dynamic(() => import('./DatasetReadyHeader'), {
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
    isNotProcessed: DatasetNotProcessedHeader,
    isProcessing: DatasetProcessingHeader,
    isFailed: DatasetProcessingErrorHeader,
    isReady: DatasetReadyHeader,
    isReadyExpired: DatasetRegenerateHeader
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
