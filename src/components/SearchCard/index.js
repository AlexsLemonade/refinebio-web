import { useResponsive } from 'hooks/useResponsive'
import { formatString } from 'helpers/formatString'
import { Box, Grid } from 'grommet'
import { SearchCardHeader } from './SearchCardHeader'
import { SearchCardBody } from './SearchCardBody'
import { SearchCardCTAs } from './SearchCardCTAs'
import { SearchCardFooter } from './SearchCardFooter'
import { SearchCardMeta } from './SearchCardMeta'

/* TEMPORARY the following prop is added to the mock data for demo purpose
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
  const { viewport, setResponsive } = useResponsive()

  return (
    <Box
      background="white"
      elevation="medium"
      margin={{ bottom: setResponsive('large', 'medium') }}
      pad="medium"
    >
      <Grid
        areas={setResponsive(
          [
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'meta', start: [0, 1], end: [1, 1] },
            { name: 'ctas', start: [0, 2], end: [1, 2] }
          ],
          [
            { name: 'header', start: [0, 0], end: [0, 1] },
            { name: 'ctas', start: [1, 0], end: [1, 1] },
            { name: 'meta', start: [0, 2], end: [1, 2] }
          ]
        )}
        columns={['1fr', 'auto']}
        rows={['auto', 'auto', 'auto']}
        gap={{
          row: setResponsive('small', 'medium'),
          column: 'medium'
        }}
      >
        <Box gridArea="header">
          <SearchCardHeader
            accessionCode={result.accession_code}
            title={formatString(result.title)}
          />
        </Box>
        <Box gridArea="ctas" margin={{ top: setResponsive('none', 'large') }}>
          <SearchCardCTAs status={result.status} />
        </Box>
        <Box gridArea="meta">
          <SearchCardMeta
            metaData={{
              downloadableSamples: result.num_downloadable_samples,
              organismNames: result.organism_names,
              platformNames: result.platform_names,
              technology: result.technology
            }}
          />
        </Box>
      </Grid>
      {viewport !== 'small' && (
        <>
          <SearchCardBody
            alternateAccessionCode={result.alternate_accession_code}
            description={result.description}
            publicationTitle={result.publication_title}
            sampleMetadataFields={result.sample_metadata_fields}
          />
          <SearchCardFooter />
        </>
      )}
    </Box>
  )
}

export default SearchCard