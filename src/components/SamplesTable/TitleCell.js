import { TextHighlight } from 'components/TextHighlight'
import { TextNull } from 'components/TextNull'

export const TitleCell = ({ value }) => {
  return <TextHighlight>{value}</TextHighlight> || <TextNull text="N/A" />
}

export default TitleCell
