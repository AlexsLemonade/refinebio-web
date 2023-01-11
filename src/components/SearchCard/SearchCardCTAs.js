import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Anchor } from 'components/shared/Anchor'
import { Pill } from 'components/shared/Pill'
/* TEMPORARY the following prop is added for demo purpose
prop name: 'status' 
   - ''(default)
   - added
   - processing 
   - add_remaining
   - not_supporte
   - request
   - unavailable
*/

// display CTAs based on a 'status'
export const SearchCardCTAs = ({ status }) => {
  const { viewport, setResponsive } = useResponsive()

  return (
    <Box align={setResponsive('start', 'end')} width="100%">
      {/* state: default  */}
      {!status && (
        <>
          <Button label="Add to Dataset" primary responsive />
          <Button
            label="Download Now"
            margin={{ top: 'small' }}
            secondary
            responsive
          />
        </>
      )}

      {/* state: added  */}
      {status === 'added' && (
        <>
          <Box direction="row">
            <InlineMessage label="Added to Datase" color="success" />
            <Button
              label="Remove"
              link
              linkFontSize={setResponsive('medium', 'small')}
              margin={{ left: 'xsmall' }}
            />
          </Box>
          <Button
            label="Download Now"
            margin={{ top: 'small' }}
            secondary
            responsive
          />
        </>
      )}

      {/* state: processing  */}
      {status === 'processing' && (
        <>
          <Pill label="Processing Dataset" status="info" />
          <Button
            label="Add to Dataset"
            margin={{ top: 'small' }}
            primary
            responsive
          />
        </>
      )}

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
          <Button
            label="Download Now"
            margin={{ top: 'small' }}
            secondary
            responsive
          />
        </>
      )}

      {/* state: not-supported  */}
      {status === 'not_supported' && (
        <>
          <Button label="View Source" secondary responsive />
          <Box direction={setResponsive('row', 'column')} wrap>
            <InlineMessage
              label="Platform not supported"
              color="info"
              margin={{ top: 'small' }}
            />
            <Anchor
              href="#TEMPORARY"
              label="Learn More"
              margin={{
                left: setResponsive('xsmall', 'large'),
                top: setResponsive('small', 'xxsmall')
              }}
              size={setResponsive('medium', 'small')}
              underline
            />
          </Box>
        </>
      )}

      {/* state: request  */}
      {status === 'request' && (
        <Button label="Request Experiment" secondary responsive />
      )}

      {/* state: unavailable  */}
      {status === 'unavailable' && (
        <Box direction={setResponsive('row', 'column')}>
          <InlineMessage label="Not available" color="error" />
          <Anchor
            href="#TEMPORARY"
            label="Learn More"
            margin={{
              left: setResponsive('xsmall', 'large'),
              top: setResponsive('none', 'xxsmall')
            }}
            size={setResponsive('medium', 'small')}
            underline
          />
        </Box>
      )}
    </Box>
  )
}

export default SearchCardCTAs
