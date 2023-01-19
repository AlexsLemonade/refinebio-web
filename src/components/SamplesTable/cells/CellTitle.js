import { TextHighlighted } from 'components/shared/TextHighlighted'
import { TextNull } from 'components/shared/TextNull'

export const CellTitle = ({ value }) => {
  return <TextHighlighted text={value} /> || <TextNull text="N/A" />
}

export default CellTitle
