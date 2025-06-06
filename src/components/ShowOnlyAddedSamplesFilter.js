import { useState } from 'react'
import { useDatasetAction } from 'hooks/useDatasetAction'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useSamplesContext } from 'hooks/useSamplesContext'
import { getFormattedExperiment } from 'helpers/formatDatasetAction'
import { CheckBox } from 'components/CheckBox'

export const ShowOnlyAddedSamplesFilter = ({ experiment }) => {
  const { myDataset } = useDatasetManager()
  const { updateDatasetId, samplesQuery } = useSamplesContext()
  const { getAnyProcessedInDataset } = useDatasetAction(
    myDataset.data,
    getFormattedExperiment(
      samplesQuery.experiment_accession_code,
      experiment.num_downloadable_samples
    )
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
