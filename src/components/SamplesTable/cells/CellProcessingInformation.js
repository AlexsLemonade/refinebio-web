import { memo } from 'react'
import moment from 'moment'
import { Text } from 'grommet'
import { TextNull } from 'components/shared/TextNull'

// TODO: modal implementation
export const CellProcessingInformation = ({ row: { original: sample } }) => {
  if (!sample.is_processed || !sample.results || !sample.results.length) {
    return <TextNull text="N/A" />
  }

  const processorBlacklistT = ['MultiQC', 'Salmontools']
  // returns the computational results to display in the modal
  const computationalResults = sample.results
    .filter((result) => !processorBlacklistT.includes(result.processor.name))
    .filter(
      // NOTE: current API returns the duplicated computational results
      // that needs to be filtered out
      (result, index, self) =>
        self.findIndex((r2) => r2.processor.name === result.processor.name) ===
        index
    )
    .sort((result1, result2) =>
      moment(result1.time_start).diff(moment(result2.time_start))
    )

  const pipelinesText = computationalResults
    .map((result) => result.processor.name)
    .join(', ')

  return (
    <Text color="brand" style={{ textDecoration: 'underline' }}>
      {pipelinesText}
    </Text>
  )
}

export default memo(CellProcessingInformation)
