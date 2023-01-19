import { memo } from 'react'
import { Anchor } from 'components/shared/Anchor'
import { TextHighlighted } from 'components/shared/TextHighlighted'

export const CellAccessionCode = ({ value }) => {
  return (
    <Anchor href={`/samples/${value}`} underline>
      <TextHighlighted text={value} />
    </Anchor>
  )
}

export default memo(CellAccessionCode)
