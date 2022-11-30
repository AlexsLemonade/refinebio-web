import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { IconBadge } from 'components/shared/IconBadge'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Link } from 'components/shared/Link'
import { Pill } from 'components/shared/Pill'
import { Row } from 'components/shared/Row'

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
const DatasetCTA = ({ status }) => (
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

export const SearchCardHeader = ({
  accessionCode = '',
  status = '',
  title = ''
}) => {
  return (
    <Box pad={{ bottom: 'medium' }}>
      <Row>
        <Box fill>
          <IconBadge
            name="Accession"
            label={accessionCode}
            pad={{ bottom: 'small' }}
            size="medium"
          />
          <Heading level={3}>
            <strong>
              <Link href="#url" label={title} />
            </strong>
          </Heading>
        </Box>
        <Box
          alignSelf="stretch"
          justify="center"
          margin={{ left: 'large' }}
          width="300px"
        >
          <DatasetCTA status={status} />
        </Box>
      </Row>
    </Box>
  )
}

export default SearchCardHeader
