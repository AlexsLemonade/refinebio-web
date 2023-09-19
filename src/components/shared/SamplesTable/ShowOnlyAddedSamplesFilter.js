import { useEffect, useState } from 'react'
import { CheckBox } from 'grommet'
import { useDatasetAction } from 'hooks/useDatasetAction'
import { useDatasetManager } from 'hooks/useDatasetManager'

export const ShowOnlyAddedSamplesFilter = ({
  data,
  showOnlyAddedSamples,
  updateDatasetId
}) => {
  const { dataset } = useDatasetManager()
  const { allProcessedInDataset, anyProcessedInDataset } = useDatasetAction(
    dataset?.data,
    data
  )

  const [showOnly, setShowOnly] = useState(false)

  const handleToggle = () => {
    if (!allProcessedInDataset()) {
      if (!showOnly) {
        setShowOnly(true)
        updateDatasetId(dataset.id)
      } else {
        setShowOnly(false)
        updateDatasetId()
      }
    }
  }

  useEffect(() => {
    if (!showOnlyAddedSamples) return

    if (dataset) setShowOnly(allProcessedInDataset())
  }, [dataset])

  return (
    <CheckBox
      checked={showOnly || allProcessedInDataset()}
      label="Show only samples in current dataset"
      disabled={!anyProcessedInDataset()}
      onChange={handleToggle}
    />
  )
}

export default ShowOnlyAddedSamplesFilter
