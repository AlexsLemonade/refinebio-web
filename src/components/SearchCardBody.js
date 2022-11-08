import { Box, Heading, Paragraph, Text } from 'grommet'
import { Link } from 'components/shared/Link'
import { formatString } from 'helpers/formatString'
import styled from 'styled-components'
import data from 'api/data'

const Wrapper = styled(Box)`
  > div {
    + div {
      margin-top: 16px;
    }
  }
`

export const SearchCardBody = ({
  alternateAccessionCode = '',
  description = '',
  publicationTitle = '',
  sampleMetadataFields = []
}) => {
  return (
    <Wrapper pad={{ top: 'medium', bottom: 'small' }}>
      <Box>
        <Heading level={4}>Description</Heading>
        <Paragraph>{description}</Paragraph>
      </Box>
      <Box>
        <Heading level={4}>Publication Title</Heading>
        {publicationTitle ? (
          <Text>{publicationTitle}</Text>
        ) : (
          <Text color="gray-shade-40">
            <i>No associated publication</i>
          </Text>
        )}
      </Box>
      <Box>
        <Heading level={4}>Alternate Accession IDs</Heading>
        <Link href={data.SearchCardBody.url} label={alternateAccessionCode} />
      </Box>
      <Box>
        <Heading level={4}>Sample Metadata Fields</Heading>
        <Box direction="row">
          {sampleMetadataFields.map((field, i) => (
            <Text key={field}>{(i ? ', ' : '') + formatString(field)}</Text>
          ))}
        </Box>
      </Box>
    </Wrapper>
  )
}

export default SearchCardBody
