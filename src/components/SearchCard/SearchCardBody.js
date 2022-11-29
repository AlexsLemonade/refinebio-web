import { Box, Heading, Paragraph, Text } from 'grommet'
import { Link } from 'components/shared/Link'
import { formatString } from 'helpers/formatString'
import data from 'api/data'

export const SearchCardBody = ({
  alternateAccessionCode = '',
  description = '',
  publicationTitle = '',
  sampleMetadataFields = []
}) => {
  return (
    <Box pad={{ top: 'medium', bottom: 'small' }}>
      <Box>
        <Heading level={4}>Description</Heading>
        <Paragraph>{description}</Paragraph>
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={4}>Publication Title</Heading>
        {publicationTitle ? (
          <Text>{publicationTitle}</Text>
        ) : (
          <Text color="gray-shade-40">
            <i>No associated publication</i>
          </Text>
        )}
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={4}>Alternate Accession IDs</Heading>
        <Link href={data.SearchCardBody.url} label={alternateAccessionCode} />
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={4}>Sample Metadata Fields</Heading>
        <Box direction="row">
          {formatString(sampleMetadataFields.join(', '))}
        </Box>
      </Box>
    </Box>
  )
}

export default SearchCardBody
