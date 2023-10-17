import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { DatasetActionButton } from 'components/shared/DatasetActionButton'

export const SamplesTableAction = ({ accessionCode, downloadableSamples }) => {
  const { setResponsive } = useResponsive()

  if (!downloadableSamples) return null

  return (
    <Box align={setResponsive('start', 'end')} width="100%">
      <DatasetActionButton
        accessionCode={accessionCode}
        downloadableSamples={downloadableSamples}
        data={{
          [accessionCode]: { all: true, total: downloadableSamples }
        }}
        primary
      />
    </Box>
  )
}

export default SamplesTableAction
