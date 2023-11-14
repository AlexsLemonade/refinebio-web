import { memo } from 'react'
import { Box } from 'grommet'
import { useOneOffExperiment } from 'hooks/useOneOffExperiment'
import { usePageRendered } from 'hooks/usePageRendered'
import { useResponsive } from 'hooks/useResponsive'
import { getFormattedExperiment } from 'helpers/formatDatasetAction'
import { DatasetActionButton } from 'components/shared/DatasetActionButton'
import { DownloadNowButton } from './DownloadNowButton'
import { ProcessingDatasetPill } from './ProcessingDatasetPill'
import { RequestExperimentFormButton } from './RequestExperimentFormButton'

export const SearchCardAction = ({
  accessionCode,
  downloadableSamples,
  organismNames,
  technology
}) => {
  const { getProcessingExperiment } = useOneOffExperiment(accessionCode)
  const pageRendered = usePageRendered()
  const { setResponsive } = useResponsive()
  const experiment = getProcessingExperiment(accessionCode)
  const hasMultipleOrganisms = organismNames.length > 1
  const hasRnaSeq =
    typeof technology === 'string'
      ? technology === 'RNA-SEQ'
      : technology.find((x) => x === 'RNA-SEQ')

  if (!pageRendered) return null

  if (!downloadableSamples)
    return <RequestExperimentFormButton accessionCode={accessionCode} />

  return (
    <>
      {experiment && (
        <Box margin={{ bottom: 'small' }}>
          <ProcessingDatasetPill datasetId={experiment.datasetId} />
        </Box>
      )}

      <DatasetActionButton
        accessionCode={accessionCode}
        downloadableSamples={downloadableSamples}
        data={getFormattedExperiment(accessionCode, downloadableSamples)}
        primary
      />

      {!experiment && (
        <Box margin={{ top: 'small' }} width={setResponsive('100%', 'auto')}>
          <DownloadNowButton
            accessionCode={accessionCode}
            hasMultipleOrganisms={hasMultipleOrganisms}
            hasRnaSeq={hasRnaSeq}
          />
        </Box>
      )}
    </>
  )
}

export default memo(SearchCardAction)
