import { useState } from 'react'
import { useDatasetAction } from 'hooks/useDatasetAction'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useSamplesContext } from 'hooks/useSamplesContext'
import { CheckBox } from 'components/shared/CheckBox'

export const ShowOnlyAddedSamplesFilter = ({ samples }) => {
  const { myDataset } = useDatasetManager()
  const { updateDatasetId } = useSamplesContext()
  const { getAnyProcessedInDataset } = useDatasetAction(
    myDataset?.data,
    samples
  )
  const samplesInMyDataset = getAnyProcessedInDataset()
  const [showOnly, setShowOnly] = useState(false)

  const handleToggle = () => {
    const newShowOnly = !showOnly
    updateDatasetId(newShowOnly ? myDataset.id : null)
    setShowOnly(newShowOnly)
  }

  return (
    <CheckBox
      checked={showOnly}
      label="Show only samples in current dataset"
      disabled={!samplesInMyDataset}
      onChange={handleToggle}
    />
  )
}

export default ShowOnlyAddedSamplesFilter
