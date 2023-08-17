import { Box } from 'grommet'
import { useRouter } from 'next/router'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import {
  AddRemainingButton,
  AddToDatasetButton,
  ProcessingDatasetButton,
  RemoveAddedButton
} from 'components/shared/SearchCard/SearchCardCTAs/'

export const SamplesTableCTA = ({ downloadableSamples }) => {
  const {
    query: { accession_code: accessionCode }
  } = useRouter()
  const { dataset } = useDatasetManager()
  const { setResponsive } = useResponsive()

  return (
    <Box align={setResponsive('start', 'end')} width="100%">
      <>
        {dataset?.is_processing && (
          <ProcessingDatasetButton dataset={dataset} />
        )}

        {/* If no samples have yet been added, this will add ["ALL"] samples in the experiment */}
        {dataset?.data[accessionCode] === undefined ? (
          <AddToDatasetButton
            accessionCode={accessionCode}
            downloadableSamples={downloadableSamples}
          />
        ) : (
          // when ["ALL"] samples have been added, this will remove all of them
          <RemoveAddedButton accessionCode={accessionCode} />
        )}

        {/* This will add the remaining samples if they haven't already been added. */}
        {dataset?.data[accessionCode]?.length < downloadableSamples && (
          <AddRemainingButton
            samplesInDataset={formatNumbers(
              dataset?.data[accessionCode]?.length
            )}
          />
        )}
      </>
    </Box>
  )
}

export default SamplesTableCTA
