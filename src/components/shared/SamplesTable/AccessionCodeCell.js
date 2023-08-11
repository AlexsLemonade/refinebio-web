import { memo } from 'react'
import { TextHighlight } from 'components/shared/TextHighlight'

export const AccessionCodeCell = ({ value }) => {
  return <TextHighlight>{value}</TextHighlight>
}

export default memo(AccessionCodeCell)
