import { TextHighlight } from 'components/shared/TextHighlight'
import { TextNull } from 'components/shared/TextNull'

export const SampleMetadataCell = ({ value }) => {
  return value ? (
    <TextHighlight>{value}</TextHighlight>
  ) : (
    <TextNull text="N/A" />
  )
}

export default SampleMetadataCell
