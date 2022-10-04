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

// RightCol
const RightCol = styled(Box)`
  > div {
    align-item: center;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
`

export const SearchCardHeader = () => {
  return (
    <Box direction="row" pad="medium" justify="between">
      <Box fill style={{ border: '1px dotted green' }}>
        <SearchCardTitle
          accessionId={data.SearchCardHeader.accessionId}
          title={data.title}
        />
      </Box>
      <RightCol
        style={{ border: '1px dotted hotpink' }}
        width={{ min: '204px' }}
      >
        <Box>
          <InlineMessage
            label={data.SearchCardHeader.inlineMessage.successLabel}
            status={data.SearchCardHeader.inlineMessage.success}
          />
          <Button label="Remove" link margin={{ left: 'xsmall' }} />
        </Box>
        <Box>
          <Pill
            label={data.SearchCardHeader.processInfo.infoLabel}
            status={data.SearchCardHeader.processInfo.info}
          />
        </Box>
        <Box>
          <Box align="end">
            <Button label="Add Remaining" secondary />
            <InlineMessage
              label={data.SearchCardHeader.inlineMessage.infoLabel2}
              status={data.SearchCardHeader.inlineMessage.info}
            />
            <Button label="Download Now" secondary />
          </Box>
        </Box>
        <Box>
          <Button label="Add to Dataset" primary />
        </Box>
        <Box>
          <Box>
            <InlineMessage
              label={data.SearchCardHeader.inlineMessage.infoLabel}
              status={data.SearchCardHeader.inlineMessage.info}
            />
            <Link
              href={data.SearchCardHeader.inlineMessage.info_learnmore}
              label="Learn more"
              size="small"
              underline
            />
          </Box>
        </Box>
        <Box>
          <Button label="Download Now" secondary />
        </Box>
        <Box>
          <InlineMessage
            label={data.SearchCardHeader.inlineMessage.errorLabel}
            status={data.SearchCardHeader.inlineMessage.error}
          />
          <Link
            href={data.SearchCardHeader.inlineMessage.error_learnmore}
            label="Learn more"
            size="small"
            underline
          />
        </Box>
      </RightCol>
    </Box>
  )
}

export default SearchCardHeader
