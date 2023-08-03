import { useDataset } from 'hooks/useDataset'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'

export const AddRemainingButton = ({ samplesInDataset }) => {
  const { addSamples } = useDataset() // TEMPORARY
  const { viewport } = useResponsive()

  return (
    <>
      <Button label="Add Remaining" secondary responsive onClick={addSamples} />
      <InlineMessage
        label={
          <>
            {samplesInDataset} samples already
            {viewport !== 'small' && <br />}
            in My Dataset
          </>
        }
        color="info"
        margin={{ top: 'small' }}
      />
    </>
  )
}

export default AddRemainingButton
