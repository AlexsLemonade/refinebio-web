import { memo } from 'react'
import { Box, Grid } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import formatString from 'helpers/formatString'
import { SearchCardHeader } from './SearchCardHeader'
import { SearchCardBody } from './SearchCardBody'
import { SearchCardFooter } from './SearchCardFooter'
import { SearchCardAction } from './SearchCardAction'
import { SearchCardMeta } from './SearchCardMeta'

export const SearchCard = ({ result = {} }) => {
  const { viewport, setResponsive } = useResponsive()
  const {
    accession_code: accessionCode,
    alternate_accession_code: alternateAccessionCode,
    description,
    num_downloadable_samples: downloadableSamples,
    organism_names: organismNames,
    platform_names: platformNames,
    publication_title: publicationTitle,
    sample_metadata_fields: sampleMetadataFields,
    technology,
    title
  } = result

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
          <SearchCardHeader accessionCode={accessionCode} title={title} />
        </Box>
        <Box gridArea="ctas" margin={{ top: setResponsive('none', 'large') }}>
          <Box align={setResponsive('start', 'end')} width="100%">
            <SearchCardAction experiment={result} technology={technology} />
          </Box>
        </Box>
        <Box gridArea="meta">
          <SearchCardMeta
            downloadableSamples={downloadableSamples}
            organismNames={organismNames}
            platformNames={platformNames}
            technology={technology}
          />
        </Box>
      </Grid>
      {viewport !== 'small' && (
        <>
          <SearchCardBody
            alternateAccessionCode={alternateAccessionCode}
            description={description}
            publicationTitle={publicationTitle}
            sampleMetadataFields={sampleMetadataFields}
          />
          <SearchCardFooter
            accessionCode={accessionCode}
            title={formatString(title)}
          />
        </>
      )}
    </Box>
  )
}

export default memo(SearchCard)
