import { TextHighlight } from 'components/shared/TextHighlight'
import { TextNull } from 'components/shared/TextNull'

export const CellSampleMetadata = ({ value }) => {
  return value ? (
    <TextHighlight>{value}</TextHighlight>
  ) : (
    <TextNull text="N/A" />
  )
}

export default CellSampleMetadata
