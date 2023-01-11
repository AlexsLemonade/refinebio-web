import { memo } from 'react'
import { Text } from 'grommet'
import { TextNull } from 'components/shared/TextNull'

// TEMP
export const CellMetadataAnnotations = ({ row: { original: sample } }) => {
  if (sample.annotations.length === 0) {
    return <TextNull text="N/A" />
  }

  return (
    <Text color="brand" style={{ textDecoration: 'underline' }}>
      Modal Gose Here
    </Text>
  )
}

export default memo(CellMetadataAnnotations)
