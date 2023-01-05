import { memo } from 'react'
import { Box } from 'grommet'
import { Icon } from 'components/shared/Icon'

export const SortByIcon = ({ isSorted, isSortedDesc, margin = 'none' }) => {
  const size = '10px'

  return (
    <Box width="fit-content" margin={margin}>
      <Icon
        name="ChevronUp"
        size={size}
        color={isSorted && !isSortedDesc ? 'brand' : 'gray-shade-40'}
      />
      <Icon
        name="ChevronDown"
        size={size}
        color={isSorted && isSortedDesc ? 'brand' : 'gray-shade-40'}
      />
    </Box>
  )
}

export default memo(SortByIcon)
