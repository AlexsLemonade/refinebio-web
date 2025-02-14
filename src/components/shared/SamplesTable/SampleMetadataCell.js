import { TextHighlight } from 'components/TextHighlight'
import { TextNull } from 'components/TextNull'

export const SampleMetadataCell = ({ value }) => {
  return value ? (
    <TextHighlight>{value}</TextHighlight>
  ) : (
    <TextNull text="N/A" />
  )
}

export default SampleMetadataCell
