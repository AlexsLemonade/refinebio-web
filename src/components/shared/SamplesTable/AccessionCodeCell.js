import { memo } from 'react'
import { TextHighlight } from 'components/TextHighlight'

export const AccessionCodeCell = ({ value }) => {
  return <TextHighlight>{value}</TextHighlight>
}

export default memo(AccessionCodeCell)
