import { memo } from 'react'
import { Box, Grid } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { SearchCardHeader } from './SearchCardHeader'
import { SearchCardBody } from './SearchCardBody'
import { SearchCardFooter } from './SearchCardFooter'
import { SearchCardAction } from './SearchCardAction'
import { SearchCardMeta } from './SearchCardMeta'

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
          <SearchCardHeader experiment={result} isLinked />
        </Box>
        <Box gridArea="ctas" margin={{ top: setResponsive('none', 'large') }}>
          <Box align={setResponsive('start', 'end')} width="100%">
            <SearchCardAction experiment={result} />
          </Box>
        </Box>
        <Box gridArea="meta">
          <SearchCardMeta experiment={result} />
        </Box>
      </Grid>
      {viewport !== 'small' && (
        <>
          <SearchCardBody experiment={result} />
          <SearchCardFooter experiment={result} />
        </>
      )}
    </Box>
  )
}

export default memo(SearchCard)
