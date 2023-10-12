import { Box } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import getFormattedExperiment from 'helpers/getFormattedExperiment'
import { DatasetActionButton } from 'components/shared/DatasetActionButton'
import { ProcessingDatasetPill } from 'components/shared/SearchCard/SearchCardAction'

export const SamplesTableAction = ({ accessionCode, downloadableSamples }) => {
  const { dataset } = useDatasetManager()
  const { setResponsive } = useResponsive()

  if (!downloadableSamples) return null

  return (
    <Box align={setResponsive('start', 'end')} width="100%">
      {dataset?.is_processing && <ProcessingDatasetPill dataset={dataset} />}
      <DatasetActionButton
        accessionCode={accessionCode}
        downloadableSamples={downloadableSamples}
        data={getFormattedExperiment(accessionCode, downloadableSamples)}
        primary
      />
    </Box>
  )
}

export default SamplesTableAction
