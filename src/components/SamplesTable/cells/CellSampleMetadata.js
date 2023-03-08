import { TextHighlighted } from 'components/shared/TextHighlighted'
import { TextNull } from 'components/shared/TextNull'

export const CellSampleMetadata = ({ value }) => {
  return value ? <TextHighlighted text={value} /> : <TextNull text="N/A" />
}

export default CellSampleMetadata
