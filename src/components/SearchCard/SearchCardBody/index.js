import { Box, Paragraph, Text } from 'grommet'
import { Link } from 'components/shared/Link'
import { formatString } from 'helpers/formatString'
import { getURLForAccessionCode } from 'helpers/getURLForAccessionCode'
import { CardBlock } from './CardBlock'

export const SearchCardBody = ({
  alternateAccessionCode = '',
  description = '',
  publicationTitle = '',
  sampleMetadataFields = []
}) => {
  return (
    <Box pad={{ top: 'medium', bottom: 'small' }}>
      <Box>
        <CardBlock
          content={<Paragraph>{description}</Paragraph>}
          emptyText="No description"
          heading="Description"
          isValue={description}
        />
      </Box>
      <Box margin={{ top: 'small' }}>
        <CardBlock
          content={<Text>{publicationTitle}</Text>}
          emptyText="No associated publication"
          heading="Publication Title"
          isValue={publicationTitle}
        />
      </Box>
      <Box margin={{ top: 'small' }}>
        <CardBlock
          content={
            <Link
              href={getURLForAccessionCode(alternateAccessionCode)}
              label={alternateAccessionCode}
              rel="noopener noreferrer"
              target="_blank"
            />
          }
          emptyText="None"
          heading="Alternate Accession IDs"
          isValue={alternateAccessionCode}
        />
      </Box>
      <Box margin={{ top: 'small' }}>
        <CardBlock
          content={<Text>{formatString(sampleMetadataFields.join(', '))}</Text>}
          emptyText="No sample metadata fields"
          heading="Sample Metadata Fields"
          isValue={sampleMetadataFields.length > 0}
        />
      </Box>
    </Box>
  )
}

export default SearchCardBody
