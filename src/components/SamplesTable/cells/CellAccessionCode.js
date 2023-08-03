import { memo } from 'react'
import { TextHighlight } from 'components/shared/TextHighlight'

export const CellAccessionCode = ({ value }) => {
  return <TextHighlight>{value}</TextHighlight>
}

export default memo(CellAccessionCode)
