import { Anchor, Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { IconBadge } from 'components/shared/IconBadge'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Pill } from 'components/shared/Pill'
import styled from 'styled-components'

/* TEMPORARY ====== */
const data = {
  title:
    'Transcription profiling of human neuroblast tumours reveals two distinct gene signatures identify malignant Neuroblast and Schwannian stromal cells',
  accessionId: 'GSE7530',
  inlineMessage: {
    successLabel: 'Added to Dataset',
    success: 'success',
    infoLabel: 'Platform not supported',
    info: 'info',
    info_learnmore: '#'
  },
  processInfo: {
    infoLabel: 'Processing Dataset',
    info: 'info'
  }
}
/* ================ */

// Sub Components
// Title
const Title = ({ accessionId, title }) => (
  <>
    <IconBadge name="Accession" label={accessionId} pad={{ bottom: '20px' }} />
    <Heading level={3}>
      <Anchor>
        <strong>{title}</strong>
      </Anchor>
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

export const SearchResultHeader = () => {
  return (
    <Box direction="row" pad="medium" justify="between">
      <Box fill style={{ border: '1px dotted green' }}>
        <Title accessionId={data.accessionId} title={data.title} />
      </Box>
      <RightCol
        style={{ border: '1px dotted hotpink' }}
        width={{ min: '250px' }}
      >
        <Box>
          <InlineMessage
            label={data.inlineMessage.successLabel}
            status={data.inlineMessage.success}
          />
          <Button label="Remove" link margin={{ left: 'xsmall' }} />
        </Box>
        <Box>
          <Pill
            label={data.processInfo.infoLabel}
            status={data.processInfo.info}
          />
        </Box>
        <Box>
          <Button label="Add to Dataset" primary />
        </Box>
        <Box>
          <InlineMessage
            label={data.inlineMessage.infoLabel}
            status={data.inlineMessage.info}
          />
          {data.inlineMessage.info_learnmore && (
            <Anchor
              href={data.inlineMessage.info_learnmore}
              label="Learn more"
            />
          )}
        </Box>
        <Box>
          <Button label="Download Now" secondary />
        </Box>
      </RightCol>
    </Box>
  )
}

export default SearchResultHeader
