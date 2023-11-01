import { useEffect, useState } from 'react'
import { useDatasetAction } from 'hooks/useDatasetAction'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { CheckBox } from 'components/shared/CheckBox'

export const ShowOnlyAddedSamplesFilter = ({
  data,
  showOnlyAddedSamples,
  updateDatasetId
}) => {
  const { dataset } = useDatasetManager()
  const { getHasAllProcessed, getAnyProcessedInDataset } = useDatasetAction(
    dataset?.data,
    data
  )

  const [showOnly, setShowOnly] = useState(false)

  const handleToggle = () => {
    if (!getHasAllProcessed()) {
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

    if (dataset) setShowOnly(getHasAllProcessed())
  }, [dataset])

  return (
    <CheckBox
      checked={showOnly || getHasAllProcessed()}
      label="Show only samples in current dataset"
      disabled={!getAnyProcessedInDataset()}
      onChange={handleToggle}
    />
  )
}

export default ShowOnlyAddedSamplesFilter
