import { memo } from 'react'
import { Text } from 'grommet'
import { TextNull } from 'components/shared/TextNull'

// TEMP
export const CellProcessingInformation = ({ row: { original: sample } }) => {
  if (!sample.is_processed || !sample.results || !sample.results.length) {
    return <TextNull text="N/A" />
  }

  return (
    <Text color="brand" style={{ textDecoration: 'underline' }}>
      Modal Gose Here
    </Text>
  )
}

export default memo(CellProcessingInformation)
