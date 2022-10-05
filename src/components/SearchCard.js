import { Box } from 'grommet'
import { SearchCardHeader } from 'components/SearchCardHeader'
import { SearchCardBody } from 'components/SearchCardBody'
import { SearchCardFooter } from 'components/SearchCardFooter'
import { SearchCardMeta } from 'components/SearchCardMeta'
import styled from 'styled-components'

const Wrapper = styled(Box)`
  + div {
    margin-top: 24px;
  }
`

/* TEMPORARY the following prop is added for demo purpose
prop name: `status` 
   - ''(default)
   - added
   - processing 
   - add_remaining
   - not_supported
   - request
   - unavailable
   - qn_skipped
*/

export const SearchCard = ({ result = {} }) => {
  return (
    <Wrapper elevation="medium" pad="medium">
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
    </Wrapper>
  )
}

export default SearchCard
