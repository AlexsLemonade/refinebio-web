import { TextHighlight } from 'components/shared/TextHighlight'
import { TextNull } from 'components/shared/TextNull'

export const TitleCell = ({ value }) => {
  return <TextHighlight>{value}</TextHighlight> || <TextNull text="N/A" />
}

export default TitleCell
