import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { IconBadge } from 'components/shared/IconBadge'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Link } from 'components/shared/Link'
import { Pill } from 'components/shared/Pill'
import styled from 'styled-components'
import data from 'api/data'

// Sub Components
// For the card title
const SearchCardTitle = ({ accessionId, title }) => (
  <>
    <IconBadge name="Accession" label={accessionId} pad={{ bottom: '20px' }} />
    <Heading level={3}>
      <strong>
        <Link href="#url" label={title} />
      </strong>
    </Heading>
  </>
)

// Wrapper
const Wrapper = styled(Box)`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px;
`

// RightCol
const RightCol = styled(Box)`
  min-width: 240px;
  > div {
    > div {
      align-self: self-end;
      flex-direction: row;
      justify-content: flex-end;

      &:not(:first-child) {
        margin-top: 20px;
      }
    }
  }
`

/* TEMPORARY the following prop is added for demo purpose
prop: status 
   - ''(default)
   - added
   - processing 
   - add_remaining
   - not_supporte
   - request
   - unavailable
   - qn_skipped
*/

export const SearchCardHeader = ({ status }) => {
  return (
    <Wrapper>
      <Box fill>
        <SearchCardTitle
          accessionId={data.SearchCardHeader.accessionId}
          title={data.SearchCardHeader.title}
        />
        {status === 'qn_skipped' && (
          <Pill
            label={data.SearchCardHeader.token[status]}
            status={data.SearchCardHeader.token.info}
          />
        )}
      </Box>
      <RightCol style={{ display: status === 'qn_skipped' ? 'none' : 'flex' }}>
        <Box align="center">
          {/* state: default  */}
          {!status && (
            <>
              <Button label="Add to Dataset" primary />
              <Button label="Download Now" secondary />
            </>
          )}

          {/* state: added  */}
          {status === 'added' && (
            <>
              <Box>
                <InlineMessage
                  label={data.SearchCardHeader.token[status]}
                  status={data.SearchCardHeader.token.success}
                />
                <Button label="Remove" link margin={{ left: 'xsmall' }} />
              </Box>

              <Button label="Download Now" secondary />
            </>
          )}

          {/* state: processing  */}
          {status === 'processing' && (
            <>
              <Pill
                label={data.SearchCardHeader.token[status]}
                status={data.SearchCardHeader.token.info}
              />
              <Button label="Add to Dataset" primary />
            </>
          )}

          {/* state: add-remaining  */}
          {status === 'add_remaining' && (
            <>
              <Button label="Add Remaining" secondary />
              <InlineMessage
                label={data.SearchCardHeader.token[status]}
                status={data.SearchCardHeader.token.info}
              />
              <Button label="Download Now" secondary />
            </>
          )}

          {/* state: not-supported  */}
          {status === 'not_supported' && (
            <>
              <Button label="View Source" secondary />
              <Box style={{ flexDirection: 'column' }}>
                <InlineMessage
                  label={data.SearchCardHeader.token[status]}
                  status={data.SearchCardHeader.token.info}
                />
                <Link
                  href={data.SearchCardHeader.token.learnmore}
                  label="Learn more"
                  margin={{ left: 'large', top: 'xxsmall' }}
                  size="small"
                  underline
                />
              </Box>
            </>
          )}

          {/* state: request  */}
          {status === 'request' && (
            <Button label="Request Experiment" secondary />
          )}

          {/* state: unavailable  */}
          {status === 'unavailable' && (
            <Box style={{ flexDirection: 'column', alignItems: 'center' }}>
              <InlineMessage
                label={data.SearchCardHeader.token[status]}
                status={data.SearchCardHeader.token.error}
              />
              <Link
                href={data.SearchCardHeader.token.learnmore}
                label="Learn more"
                margin={{ left: 'large', top: 'xxsmall' }}
                size="small"
                underline
              />
            </Box>
          )}
        </Box>
      </RightCol>
    </Wrapper>
  )
}

export default SearchCardHeader
