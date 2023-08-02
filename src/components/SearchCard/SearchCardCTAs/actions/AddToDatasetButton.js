import { useDataset } from 'hooks/useDataset'
import { Button } from 'components/shared/Button'

export const AddToDatasetButton = ({ accessionCode, downloadableSamples }) => {
  const { updateDataset } = useDataset()

  return (
    <Button
      label="Add to Dataset"
      primary
      responsive
      onClick={() =>
        updateDataset(
          {
            [accessionCode]: { all: true, total: downloadableSamples }
          },
          accessionCode // TEMPORARY for UI testing
        )
      }
    />
  )
}

export default AddToDatasetButton
