import { Box } from 'grommet'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Link } from 'components/shared/Link'
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

// CTA for My Dataset based on a status
export const SearchCardHeaderCTA = ({ status }) => (
  <Box>
    {/* state: default  */}
    {!status && (
      <Box align="end">
        <Button label="Add to Dataset" primary />
        <Button label="Download Now" secondary margin={{ top: 'small' }} />
      </Box>
    )}

    {/* state: added  */}
    {status === 'added' && (
      <Box align="end">
        <Box direction="row">
          <InlineMessage label="Added to Datase" color="success" />
          <Button label="Remove" link margin={{ left: 'xsmall' }} />
        </Box>
        <Button label="Download Now" secondary margin={{ top: 'small' }} />
      </Box>
    )}

    {/* state: processing  */}
    {status === 'processing' && (
      <Box align="end">
        <Pill label="Processing Dataset" status="info" />
        <Button label="Add to Dataset" primary margin={{ top: 'small' }} />
      </Box>
    )}

    {/* state: add-remaining  */}
    {status === 'add_remaining' && (
      <Box align="end">
        <Button label="Add Remaining" secondary />
        <InlineMessage
          label={
            <>
              60,000 samples already
              <br />
              in My Dataset
            </>
          }
          color="info"
          margin={{ top: 'small' }}
        />
        <Button label="Download Now" secondary margin={{ top: 'small' }} />
      </Box>
    )}

    {/* state: not-supported  */}
    {status === 'not_supported' && (
      <Box align="end">
        <Button label="View Source" secondary />
        <InlineMessage
          label="Platform not supported"
          color="info"
          margin={{ top: 'small' }}
        />
        <Link
          href="#TEMPORARY"
          label="Learn more"
          margin={{ left: 'large', top: 'xxsmall' }}
          size="small"
          underline
        />
      </Box>
    )}

    {/* state: request  */}
    {status === 'request' && (
      <Box align="end">
        <Button label="Request Experiment" secondary />
      </Box>
    )}

    {/* state: unavailable  */}
    {status === 'unavailable' && (
      <Box direction="column" align="end">
        <InlineMessage label="Not available" color="error" />
        <Link
          href="#TEMPORARY"
          label="Learn more"
          margin={{ left: 'large', top: 'xxsmall' }}
          size="small"
          underline
        />
      </Box>
    )}
  </Box>
)

export default SearchCardHeaderCTA
