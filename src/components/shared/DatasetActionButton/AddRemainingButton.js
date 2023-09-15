import formatNumbers from 'helpers/formatNumbers'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'

export const AddRemainingButton = ({ dataToAdd, samplesInDataset }) => {
  const handleAdd = () => {} // TEMP: replace with useDatasetManager method

  return (
    <>
      <Button
        label="Add Remaining"
        secondary
        responsive
        onClick={() => handleAdd(dataToAdd)}
      />
      <InlineMessage
        label={
          <>{formatNumbers(samplesInDataset)} samples already in My Dataset</>
        }
        color="info"
        iconSize="small"
        height="fit-content"
        margin={{ top: 'small' }}
      />
    </>
  )
}

export default AddRemainingButton
