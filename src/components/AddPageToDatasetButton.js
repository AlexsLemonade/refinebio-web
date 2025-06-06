import { useResponsive } from 'hooks/useResponsive'
import { getFormattedExperimentList } from 'helpers/formatDatasetAction'
import { DatasetActionButton } from 'components/DatasetActionButton'

export const AddPageToDatasetButton = ({ dataToAdd }) => {
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
