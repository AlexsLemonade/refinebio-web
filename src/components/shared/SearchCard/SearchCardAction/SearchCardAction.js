import { memo } from 'react'
import { Box } from 'grommet'
import { useOneOffExperiment } from 'hooks/useOneOffExperiment'
import { usePageRendered } from 'hooks/usePageRendered'
import { useResponsive } from 'hooks/useResponsive'
import { DatasetActionButton } from 'components/shared/DatasetActionButton'
import { DownloadNowButton } from './DownloadNowButton'
import { ProcessingDatasetPill } from './ProcessingDatasetPill'
import { RequestExperimentFormButton } from './RequestExperimentFormButton'

export const SearchCardAction = ({ accessionCode, downloadableSamples }) => {
  const { getProcessingExperiment } = useOneOffExperiment(accessionCode)
  const pageRendered = usePageRendered()
  const { setResponsive } = useResponsive()
  const experiment = getProcessingExperiment(accessionCode)

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
        data={{
          [accessionCode]: { all: true, total: downloadableSamples }
        }}
        primary
      />

      {!experiment && (
        <Box margin={{ top: 'small' }} width={setResponsive('100%', 'auto')}>
          <DownloadNowButton accessionCode={accessionCode} />
        </Box>
      )}
    </>
  )
}

export default memo(SearchCardAction)
