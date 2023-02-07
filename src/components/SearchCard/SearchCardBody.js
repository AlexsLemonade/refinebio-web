import { Box, Heading, Paragraph, Text } from 'grommet'
import { Link } from 'components/shared/Link'
import { formatString } from 'helpers/formatString'
import { getURLForAccessionCode } from 'helpers/getURLForAccessionCode'

export const SearchCardBody = ({
  alternateAccessionCode = '',
  description = '',
  publicationTitle = '',
  sampleMetadataFields = []
}) => {
  return (
    <Box pad={{ top: 'medium', bottom: 'small' }}>
      <Box>
        <Heading level={4} weight="500">
          Description
        </Heading>
        {description ? (
          <Paragraph>{description}</Paragraph>
        ) : (
          <Text color="gray-shade-40">
            <i>No description</i>
          </Text>
        )}
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={4} weight="500">
          Publication Title
        </Heading>
        {publicationTitle ? (
          <Text>{publicationTitle}</Text>
        ) : (
          <Text color="gray-shade-40">
            <i>No associated publication</i>
          </Text>
        )}
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={4} weight="500">
          Alternate Accession IDs
        </Heading>
        {alternateAccessionCode ? (
          <Link
            href={getURLForAccessionCode(alternateAccessionCode)}
            label={alternateAccessionCode}
            rel="noopener noreferrer"
            target="_blank"
          />
        ) : (
          <Text color="gray-shade-40">
            <i>None</i>
          </Text>
        )}
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={4} weight="500">
          Sample Metadata Fields
        </Heading>
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
