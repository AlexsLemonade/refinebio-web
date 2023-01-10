import { memo } from 'react'
import { TextNull } from 'components/shared/TextNull'

// TEMP
export const CellProcessingInformation = ({ row: { original: sample } }) => {
  if (!sample.is_processed || !sample.results || !sample.results.length) {
    return <TextNull text="N/A" />
  }

  return <TextNull text="Modal goes here" />
}

export default memo(CellProcessingInformation)
