import { useDatasetManager } from 'hooks/useDatasetManager'
import formatNumbers from 'helpers/formatNumbers'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'

export const AddRemainingDatasetButton = ({ dataToAdd, samplesInDataset }) => {
  const { loading, addSamples } = useDatasetManager()

  return (
    <>
      <Button
        isLoading={loading}
        label="Add Remaining"
        secondary
        responsive
        onClick={() => addSamples(dataToAdd)}
      />
      <InlineMessage
        label={
          <>{formatNumbers(samplesInDataset)} samples already in My Dataset</>
        }
        iconSize="small"
        height="16px"
        margin={{ top: 'small' }}
      />
    </>
  )
}

export default AddRemainingDatasetButton
