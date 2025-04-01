import { memo } from 'react'
import { TextHighlight } from 'components/TextHighlight'
import { TextNull } from 'components/TextNull'

export const SamplesTableCell = ({ value, nullText = 'N/A' }) => {
  return value ? (
    <TextHighlight>{value}</TextHighlight>
  ) : (
    <TextNull text={nullText} />
  )
}

export default memo(SamplesTableCell)
