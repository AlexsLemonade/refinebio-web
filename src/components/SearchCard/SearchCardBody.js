import { Box, Heading, Paragraph, Text } from 'grommet'
import { Link } from 'components/shared/Link'
import { formatString } from 'helpers/formatString'

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
        {description ? (
          <Paragraph>{description}</Paragraph>
        ) : (
          <Text color="gray-shade-40">
            <i>No description</i>
          </Text>
        )}
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
        {alternateAccessionCode ? (
          <Link href={SearchCardBody.url} label={alternateAccessionCode} />
        ) : (
          <Text color="gray-shade-40">
            <i>None</i>
          </Text>
        )}
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={4}>Sample Metadata Fields</Heading>
        <Box direction="row">
          {sampleMetadataFields.length > 0 ? (
            <Text>{formatString(sampleMetadataFields.join(', '))}</Text>
          ) : (
            <Text color="gray-shade-40">
              <i>No sample metadata fields</i>
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default SearchCardBody
