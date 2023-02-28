import { memo } from 'react'
import { Text } from 'grommet'
import { TextNull } from 'components/shared/TextNull'

export const CellAdditionalMetadata = ({ row: { original: sample } }) => {
  if (sample.annotations.length === 0) {
    return <TextNull text="N/A" />
  }

  return (
    <Text color="brand" style={{ textDecoration: 'underline' }}>
      View
    </Text>
  )
}

export default memo(CellAdditionalMetadata)
