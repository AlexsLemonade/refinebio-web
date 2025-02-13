import { memo } from 'react'
import { Box } from 'grommet'
import { usePollDatasetStatus } from 'hooks/usePollDatasetStatus'
import { useResponsive } from 'hooks/useResponsive'
import { getFormattedExperiment } from 'helpers/formatDatasetAction'
import getTechnologyFromExperiment from 'helpers/getTechnologyFromExperiment'
import { DatasetActionButton } from 'components/shared/DatasetActionButton'
import { DownloadNowButton } from 'components/shared/DownloadNowButton'
import { ProcessingDatasetPill } from 'components/shared/ProcessingDatasetPill'
import { RequestExperimentFormButton } from 'components/shared/RequestExperimentFormButton'

export const ExperimentCardAction = ({ experiment }) => {
  const { setResponsive } = useResponsive()
  const {
    accession_code: accessionCode,
    num_downloadable_samples: downloadableSamples,
    organism_names: organismNames
  } = experiment
  const { isProcessingDataset } = usePollDatasetStatus(accessionCode)
  // gets the technology from the samples array if it exists
  const technology = getTechnologyFromExperiment(experiment)
  const hasMultipleOrganisms = organismNames.length > 1
  const rnaSeq = 'RNA-SEQ'
  const hasRnaSeq =
    typeof technology === 'string'
      ? technology === rnaSeq
      : technology.find((x) => x === rnaSeq)

  if (!downloadableSamples)
    return <RequestExperimentFormButton accessionCode={accessionCode} />

  return (
    <>
      {isProcessingDataset && (
        <Box margin={{ bottom: 'small' }}>
          <ProcessingDatasetPill accessionCode={accessionCode} />
        </Box>
      )}

      <DatasetActionButton
        accessionCode={accessionCode}
        downloadableSamples={downloadableSamples}
        data={getFormattedExperiment(accessionCode, downloadableSamples)}
        primary
      />

      {!isProcessingDataset && (
        <Box margin={{ top: 'small' }} width={setResponsive('100%', 'auto')}>
          <DownloadNowButton
            accessionCode={accessionCode}
            experiment={experiment}
            hasMultipleOrganisms={hasMultipleOrganisms}
            hasRnaSeq={hasRnaSeq}
          />
        </Box>
      )}
    </>
  )
}

export default memo(ExperimentCardAction)
