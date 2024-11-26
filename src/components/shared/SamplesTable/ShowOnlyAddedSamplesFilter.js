import { useEffect, useState } from 'react'
import { useDatasetAction } from 'hooks/useDatasetAction'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { CheckBox } from 'components/shared/CheckBox'

export const ShowOnlyAddedSamplesFilter = ({ data, updateDatasetId }) => {
  const { dataset } = useDatasetManager()
  const { getAnyProcessedInDataset } = useDatasetAction(dataset?.data, data)
  const samplesInMyDataset = getAnyProcessedInDataset()
  const [showOnly, setShowOnly] = useState(false)

  useEffect(() => {
    if (samplesInMyDataset) {
      // updates the dataset ID on checkbox toggle
      updateDatasetId(showOnly ? dataset.id : null)
    }
  }, [showOnly, samplesInMyDataset])

  return (
    <CheckBox
      checked={showOnly}
      label="Show only samples in current dataset"
      disabled={!samplesInMyDataset}
      onChange={() => setShowOnly(!showOnly)}
    />
  )
}

export default ShowOnlyAddedSamplesFilter
