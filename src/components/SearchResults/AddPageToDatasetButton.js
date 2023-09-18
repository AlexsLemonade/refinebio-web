import { useResponsive } from 'hooks/useResponsive'
import fromPairs from 'helpers/fromPairs'
import { DatasetActionButton } from 'components/shared/DatasetActionButton'

export const AddPageToDatasetButton = ({ dataToAdd }) => {
  const { setResponsive } = useResponsive()

  const downloadableSamples = fromPairs(
    dataToAdd
      .filter((item) => item.num_downloadable_samples > 0)
      .map((item) => [
        item.accession_code,
        { all: true, total: item.num_downloadable_samples }
      ])
  )

  return (
    <DatasetActionButton
      btnType="secondary"
      data={downloadableSamples}
      disableAddRemaining
      label="Add Page to Dataset"
      responsive={setResponsive(true, false)}
      secondary
    />
  )
}

export default AddPageToDatasetButton
