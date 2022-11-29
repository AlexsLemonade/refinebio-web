import { Box } from 'grommet'
import { SearchCardHeader } from './SearchCardHeader'
import { SearchCardBody } from './SearchCardBody'
import { SearchCardFooter } from './SearchCardFooter'
import { SearchCardMeta } from './SearchCardMeta'

/* TEMPORARY the following prop is added for demo purpose
prop name: `status` 
   - ''(default)
   - added
   - processing 
   - add_remaining
   - not_supported
   - request
   - unavailable
*/

export const SearchCard = ({ result = {} }) => {
  return (
    <Box elevation="medium" margin={{ bottom: 'medium' }} pad="medium">
      <SearchCardHeader
        accessionCode={result.accession_code}
        status={result.status}
        title={result.title}
      />
      <SearchCardMeta />
      <SearchCardBody
        alternateAccessionCode={result.alternate_accession_code}
        description={result.description}
        publicationTitle={result.publication_title}
        sampleMetadataFields={result.sample_metadata_fields}
      />
      <SearchCardFooter />
    </Box>
  )
}

export default SearchCard
