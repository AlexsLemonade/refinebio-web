import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { IconBadge } from 'components/shared/IconBadge'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Link } from 'components/shared/Link'
import { Pill } from 'components/shared/Pill'
import styled from 'styled-components'
import data from 'api/data'

// Wrapper
const Wrapper = styled(Box)`
  > div {
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 20px;

    &:nth-child(2) {
      align-items: flex-end;
      > div:first-child {
        align-self: self-start;
      }
    }
  }
`
// RightCol
const RightCol = styled(Box)`
  margin-left: 16px;
  min-width: 205px;
  > div {
    align-items: center;
    > div {
      align-self: self-end;
      flex-direction: row;
      justify-content: flex-end;

      &:not(:first-child) {
        margin-top: 20px;
      }
    }
    .inline-message {
      max-width: 180px;
    }
  }
`

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

export const SearchCardHeader = ({
  accessionCode = '',
  status = '',
  title = ''
}) => {
  return (
    <Wrapper>
      <IconBadge
        name="Accession"
        label={accessionCode}
        pad={{ bottom: '20px' }}
      />
      <Box>
        <Box fill>
          <Heading level={3}>
            <strong>
              <Link href="#url" label={title} />
            </strong>
          </Heading>
        </Box>
        <RightCol>
          <Box>
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
                    status="success"
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
                  status="info"
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
                  status="info"
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
                    status="info"
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
                  status="error"
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
      </Box>
    </Wrapper>
  )
}

export default SearchCardHeader
