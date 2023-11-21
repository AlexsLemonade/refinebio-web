import { memo } from 'react'
import { Box } from 'grommet'
import { useResourceLoader } from 'hooks/useResourceLoader'
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
  const { getProcessingResource } = useResourceLoader(accessionCode, true)
  const pageRendered = usePageRendered()
  const { setResponsive } = useResponsive()
  const processingExperiment = getProcessingResource(accessionCode)
  const hasMultipleOrganisms = organismNames.length > 1
  const rnaSeq = 'RNA-SEQ'
  const hasRnaSeq =
    typeof technology === 'string'
      ? technology === rnaSeq
      : technology.find((x) => x === rnaSeq)

  if (!pageRendered) return null

  if (!downloadableSamples)
    return <RequestExperimentFormButton accessionCode={accessionCode} />

  return (
    <>
      {processingExperiment && (
        <Box margin={{ bottom: 'small' }}>
          <ProcessingDatasetPill datasetId={processingExperiment.datasetId} />
        </Box>
      )}

      <DatasetActionButton
        accessionCode={accessionCode}
        downloadableSamples={downloadableSamples}
        data={getFormattedExperiment(accessionCode, downloadableSamples)}
        primary
      />

      {!processingExperiment && (
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
