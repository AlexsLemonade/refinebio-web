import { memo } from 'react'
import { Anchor } from 'components/shared/Anchor'
import { TextHighlight } from 'components/shared/TextHighlight'

export const CellAccessionCode = ({ value }) => {
  return (
    <Anchor href={`/samples/${value}`} underline>
      <TextHighlight>{value}</TextHighlight>
    </Anchor>
  )
}

export default memo(CellAccessionCode)
