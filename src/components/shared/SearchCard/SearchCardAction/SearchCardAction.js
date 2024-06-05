import { memo, useEffect } from 'react'
import { Box } from 'grommet'
import { usePageRendered } from 'hooks/usePageRendered'
import { usePollDatasetStatus } from 'hooks/usePollDatasetStatus'
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
  const pageRendered = usePageRendered()
  const { datasetAccessions, pollDatasetAccession } = usePollDatasetStatus()
  const { setResponsive } = useResponsive()
  const hasMultipleOrganisms = organismNames.length > 1
  const rnaSeq = 'RNA-SEQ'
  const hasRnaSeq =
    typeof technology === 'string'
      ? technology === rnaSeq
      : technology.find((x) => x === rnaSeq)
  const processingExperiment = datasetAccessions[accessionCode]

  useEffect(() => {
    // sets a processing datasets for polling
    pollDatasetAccession(accessionCode)
  }, [accessionCode, datasetAccessions])

  if (!pageRendered) return null

  if (!downloadableSamples)
    return <RequestExperimentFormButton accessionCode={accessionCode} />

  return (
    <>
      {processingExperiment && (
        <Box margin={{ bottom: 'small' }}>
          <ProcessingDatasetPill datasetId={processingExperiment} />
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
            processingExperiment={processingExperiment}
          />
        </Box>
      )}
    </>
  )
}

export default memo(SearchCardAction)
