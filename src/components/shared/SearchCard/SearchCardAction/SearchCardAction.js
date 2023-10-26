import { memo } from 'react'
import { Box } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { getFormattedExperiment } from 'helpers/formatDatasetAction'
import { DatasetActionButton } from 'components/shared/DatasetActionButton'
import { DownloadNowButton } from './DownloadNowButton'
import { ProcessingDatasetPill } from './ProcessingDatasetPill'
import { RequestExperimentFormButton } from './RequestExperimentFormButton'

export const SearchCardAction = ({ accessionCode, downloadableSamples }) => {
  const { dataset } = useDatasetManager()
  const { setResponsive } = useResponsive()

  if (!downloadableSamples)
    return <RequestExperimentFormButton accessionCode={accessionCode} />

  return (
    <>
      {dataset?.is_processing && <ProcessingDatasetPill dataset={dataset} />}

      <DatasetActionButton
        accessionCode={accessionCode}
        downloadableSamples={downloadableSamples}
        data={getFormattedExperiment(accessionCode, downloadableSamples)}
        primary
      />

      {!dataset?.is_processing && (
        <Box margin={{ top: 'small' }} width={setResponsive('100%', 'auto')}>
          <DownloadNowButton accessionCode={accessionCode} />
        </Box>
      )}
    </>
  )
}

export default memo(SearchCardAction)
