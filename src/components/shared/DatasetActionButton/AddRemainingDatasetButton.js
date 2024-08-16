import gtag from 'analytics/gtag'
import { useDatasetManager } from 'hooks/useDatasetManager'
import formatNumbers from 'helpers/formatNumbers'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'

export const AddRemainingDatasetButton = ({
  dataToAdd,
  samplesInDataset,
  label = 'Add Remaining'
}) => {
  const { loading, addSamples } = useDatasetManager()

  const handleClick = () => {
    addSamples(dataToAdd)
    gtag.myDatasetAction(label)
  }

  return (
    <>
      <Button
        isLoading={loading}
        label={label}
        secondary
        responsive
        onClick={handleClick}
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
