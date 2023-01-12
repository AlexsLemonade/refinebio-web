import { TextNull } from 'components/shared/TextNull'

export const CellSampleMetadata = ({ value }) => {
  return value || <TextNull text="N/A" />
}

export default CellSampleMetadata
