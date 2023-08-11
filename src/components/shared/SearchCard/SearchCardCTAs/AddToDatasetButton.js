import { useDatasetManager } from 'hooks/useDatasetManager'
import { Button } from 'components/shared/Button'

export const AddToDatasetButton = ({ accessionCode, downloadableSamples }) => {
  const { loading, updateDataset } = useDatasetManager()

  return (
    <Button
      isLoading={loading}
      label="Add to Dataset"
      primary
      responsive
      onClick={() =>
        updateDataset({
          [accessionCode]: { all: true, total: downloadableSamples }
        })
      }
    />
  )
}

export default AddToDatasetButton
