import { memo } from 'react'
import { useDataset } from 'hooks/useDataset'
import { useResponsive } from 'hooks/useResponsive'
import { formatNumbers } from 'helpers/formatNumbers'
import { Box } from 'grommet'
import {
  AddRemainingButton,
  AddToDatasetButton,
  DownloadNowButton,
  ProcessingDataset,
  RemoveAddedDataset,
  RequestExperimentFormButton
} from './actions'

// TODO: remove mock data and need to test with API response

export const SearchCardCTAs = ({ accessionCode, downloadableSamples }) => {
  const { dataset } = useDataset() // TEMPORARY
  const { setResponsive } = useResponsive()

  return (
    <Box align={setResponsive('start', 'end')} width="100%">
      {downloadableSamples ? (
        <>
          {dataset?.is_processing && <ProcessingDataset dataset={dataset} />}

          {/* If no samples have yet been added, this will add ["ALL"] samples in the experiment */}
          {dataset?.data[accessionCode] === undefined ? (
            <AddToDatasetButton
              accessionCode={accessionCode}
              downloadableSamples={downloadableSamples}
            />
          ) : (
            // when ["ALL"] samples have been added, this will remove all of them
            <RemoveAddedDataset />
          )}

          {/* This will add the remaining samples if they haven't already been added. */}
          {dataset?.data[accessionCode]?.length < downloadableSamples && (
            <AddRemainingButton
              samplesInDataset={formatNumbers(
                dataset?.data[accessionCode]?.length
              )}
            />
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

export default memo(SearchCardCTAs)
