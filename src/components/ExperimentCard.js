import { memo } from 'react'
import { Box, Grid } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { ExperimentCardAction } from 'components/ExperimentCardAction'
import { ExperimentCardHeader } from 'components/ExperimentCardHeader'
import { ExperimentCardBody } from 'components/ExperimentCardBody'
import { ExperimentCardFooter } from 'components/ExperimentCardFooter'
import { ExperimentCardMeta } from 'components/ExperimentCardMeta'

export const ExperimentCard = ({ experiment }) => {
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
          <ExperimentCardHeader experiment={experiment} isLinked />
        </Box>
        <Box gridArea="ctas" margin={{ top: setResponsive('none', 'large') }}>
          <Box align={setResponsive('start', 'end')} width="100%">
            <ExperimentCardAction experiment={experiment} />
          </Box>
        </Box>
        <Box gridArea="meta">
          <ExperimentCardMeta experiment={experiment} />
        </Box>
      </Grid>
      {viewport !== 'small' && (
        <>
          <ExperimentCardBody experiment={experiment} />
          <ExperimentCardFooter experiment={experiment} />
        </>
      )}
    </Box>
  )
}

export default memo(ExperimentCard)
