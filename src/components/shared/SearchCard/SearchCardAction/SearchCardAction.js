import { memo } from 'react'
import { Box } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { DownloadNowButton } from './DownloadNowButton'
import { ProcessingDatasetPill } from './ProcessingDatasetPill'
import { RequestExperimentFormButton } from './RequestExperimentFormButton'

// TODO: remove mock data and need to test with API response

export const SearchCardAction = ({ accessionCode, downloadableSamples }) => {
  const { dataset } = useDatasetManager()
  const { setResponsive } = useResponsive()

  return (
    <Box align={setResponsive('start', 'end')} width="100%">
      {downloadableSamples ? (
        <>
          {dataset?.is_processing && (
            <ProcessingDatasetPill dataset={dataset} />
          )}

          {!dataset?.is_processing && (
            <Box
              margin={{ top: 'small' }}
              width={setResponsive('100%', 'auto')}
            >
              <DownloadNowButton accessionCode={accessionCode} />
            </Box>
          )}
        </>
      ) : (
        // For non-downloadable experiment
        <RequestExperimentFormButton accessionCode={accessionCode} />
      )}
    </Box>
  )
}

export default memo(SearchCardAction)
