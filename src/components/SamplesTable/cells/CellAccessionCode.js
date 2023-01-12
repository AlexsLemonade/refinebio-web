import { memo } from 'react'
import { Anchor } from 'components/shared/Anchor'

export const CellAccessionCode = ({ value }) => {
  return <Anchor href={`/samples/${value}`} label={value} underline />
}

export default memo(CellAccessionCode)
