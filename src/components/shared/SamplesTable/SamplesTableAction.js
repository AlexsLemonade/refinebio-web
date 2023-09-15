/* eslint-disable no-unused-vars */
import { Box } from 'grommet'
import { useRouter } from 'next/router'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { ProcessingDatasetPill } from 'components/shared/SearchCard/SearchCardAction'

export const SamplesTableAction = ({ downloadableSamples }) => {
  const {
    query: { accession_code: accessionCode }
  } = useRouter()
  const { dataset } = useDatasetManager()
  const { setResponsive } = useResponsive()

  return (
    <Box align={setResponsive('start', 'end')} width="100%">
      {dataset?.is_processing && <ProcessingDatasetPill dataset={dataset} />}
    </Box>
  )
}

export default SamplesTableAction
