/* eslint-disable react/jsx-props-no-spreading */
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useDatasetAction } from 'hooks/useDatasetAction'
import { usePageRendered } from 'hooks/usePageRendered'
import { Button } from 'components/shared/Button'
import { AddRemainingButton } from './AddRemainingButton'
import { AddToDatasetButton } from './AddToDatasetButton'
import { RemoveDatasetButton } from './RemoveDatasetButton'

export const DatasetActionButton = ({
  accessionCode,
  data,
  downloadableSamples,
  disableAddRemaining = false,
  ...props
}) => {
  const { dataset } = useDatasetManager()
  const pageRendered = usePageRendered()

  if (!pageRendered) return null

  const {
    allProcessedInDataset,
    anyProcessedSamples,
    getAddedSamples,
    totalSamplesInDataset
  } = useDatasetAction(dataset?.data, data)

  if (!anyProcessedSamples()) {
    // shows the disabled add button if no processed samples
    return <Button disabled {...props} />
  }

  if (allProcessedInDataset()) {
    // shows the remvove from button if all processed samples are in my dataset
    return <RemoveDatasetButton dataToRemove={getAddedSamples()} />
  }

  if (
    !disableAddRemaining &&
    dataset?.data &&
    dataset.data[accessionCode]?.length < downloadableSamples &&
    totalSamplesInDataset() > 0
  ) {
    // shows the add remaming button if some of the processed samples are in my dataset
    return (
      <AddRemainingButton
        samplesInDataset={totalSamplesInDataset()}
        dataToAdd={data}
        {...props}
      />
    )
  }

  return <AddToDatasetButton dataToAdd={data} {...props} />
}

export default DatasetActionButton
