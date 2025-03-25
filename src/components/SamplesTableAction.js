import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { getFormattedExperiment } from 'helpers/formatDatasetAction'
import { DatasetActionButton } from 'components/DatasetActionButton'

export const SamplesTableAction = ({ experiment }) => {
  const { setResponsive } = useResponsive()
  const {
    accession_code: accessionCode,
    num_downloadable_samples: downloadableSamples
  } = experiment

  if (!downloadableSamples) return null

  return (
    <Box align={setResponsive('start', 'end')} width="100%">
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
