import { useDatasetManager } from 'hooks/useDatasetManager'
import { useDatasetAction } from 'hooks/useDatasetAction'
import { usePageRendered } from 'hooks/usePageRendered'
import { Button } from 'components/shared/Button'
import { AddRemainingDatasetButton } from './AddRemainingDatasetButton'
import { AddToDatasetButton } from './AddToDatasetButton'
import { RemoveDatasetButton } from './RemoveDatasetButton'

export const DatasetActionButton = ({
  accessionCode,
  data,
  downloadableSamples,
  disableAddRemaining = false,
  label,
  ...props
}) => {
  const { dataset } = useDatasetManager()
  const pageRendered = usePageRendered()

  if (!pageRendered) return null

  const {
    getHasAllProcessed,
    anyProcessedSamples,
    getAddedSamples,
    getTotalSamplesInDataset
  } = useDatasetAction(dataset?.data, data)

  // shows the disabled add button if no processed samples
  if (!anyProcessedSamples()) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Button disabled {...props} />
  }

  // shows the remvove from button if all processed samples are in my dataset
  if (getHasAllProcessed()) {
    return <RemoveDatasetButton dataToRemove={getAddedSamples()} />
  }

  // shows the add remaming button if some of the processed samples are in my dataset
  if (
    !disableAddRemaining &&
    dataset?.data &&
    dataset.data[accessionCode]?.length < downloadableSamples &&
    getTotalSamplesInDataset() > 0
  ) {
    return (
      <AddRemainingDatasetButton
        samplesInDataset={getTotalSamplesInDataset()}
        dataToAdd={data}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    )
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <AddToDatasetButton dataToAdd={data} label={label} {...props} />
}

export default DatasetActionButton
