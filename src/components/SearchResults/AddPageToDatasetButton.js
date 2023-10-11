import { useDatasetAction } from 'hooks/useDatasetAction'
import { useResponsive } from 'hooks/useResponsive'
import { DatasetActionButton } from 'components/shared/DatasetActionButton'

export const AddPageToDatasetButton = ({ dataToAdd }) => {
  const { getFormattedExperimentList } = useDatasetAction()
  const { setResponsive } = useResponsive()

  const downloadableSamples = getFormattedExperimentList(
    dataToAdd.filter((item) => item.num_downloadable_samples > 0)
  )

  return (
    <DatasetActionButton
      data={downloadableSamples}
      disableAddRemaining
      label="Add Page to Dataset"
      responsive={setResponsive(true, false)}
      secondary
    />
  )
}

export default AddPageToDatasetButton
