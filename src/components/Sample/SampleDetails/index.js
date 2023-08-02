import { memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Grid } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import { SearchCardHeader } from 'components/SearchCard/SearchCardHeader'
import { SearchCardMeta } from 'components/SearchCard/SearchCardMeta'
import { SampleMetadataFields } from './SampleMetadataFields'

export const SampleDetails = ({ accessionCode, sample }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box>
      <FixedContainer pad="none">
        <Box elevation="medium" pad="large">
          <Grid
            areas={[
              { name: 'header', start: [0, 0], end: [1, 0] },
              { name: 'meta', start: [0, 1], end: [1, 1] }
            ]}
            columns={['1fr', 'auto']}
            rows={['auto', 'auto']}
            gap={{
              row: setResponsive('small', 'medium'),
              column: 'medium'
            }}
            margin={{ bottom: 'medium' }}
          >
            <Box gridArea="header">
              <SearchCardHeader
                accessionCode={accessionCode}
                title="Sample Details"
                isLinked={false}
              />
            </Box>
            <Box gridArea="meta">
              <SearchCardMeta
                organismNames={[sample.organism.name]}
                platformNames={[sample.platform_name]}
                technology={sample.technology}
                size="medium"
              />
            </Box>
          </Grid>
          <SampleMetadataFields sample={sample} />
        </Box>
      </FixedContainer>
    </Box>
  )
}

export default memo(SampleDetails)
