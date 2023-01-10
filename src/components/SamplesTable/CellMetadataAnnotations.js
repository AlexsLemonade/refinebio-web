import { memo } from 'react'
import { TextNull } from 'components/shared/TextNull'

// TEMP
export const CellMetadataAnnotations = ({ row: { original: sample } }) => {
  if (sample.annotations.length === 0) {
    return <TextNull text="N/A" />
  }

  return <TextNull text="Modal goes here" />
}

export default memo(CellMetadataAnnotations)
