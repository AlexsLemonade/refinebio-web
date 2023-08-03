import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'

/* TEMPORARY the following prop is added for demo purpose
prop name: 'status' 
   - ''(default)
   - add_remaining
*/
// display CTAs based on a 'status'
export const SamplesTableCTA = ({ status }) => {
  const { viewport, setResponsive } = useResponsive()

  return (
    <Box align={setResponsive('start', 'end')} width="100%">
      {/* state: default  */}
      {!status && <Button label="Add to Dataset" primary responsive />}

      {/* state: add-remaining  */}
      {status === 'add_remaining' && (
        <>
          <Button label="Add Remaining" secondary responsive />
          <InlineMessage
            label={
              <>
                60,000 samples already
                {viewport !== 'small' && <br />}
                in My Dataset
              </>
            }
            color="info"
            margin={{ top: 'small' }}
          />
        </>
      )}
    </Box>
  )
}

export default SamplesTableCTA
