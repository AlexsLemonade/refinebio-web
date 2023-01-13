import { memo } from 'react'
import { Box } from 'grommet'
import { Icon } from 'components/shared/Icon'

export const SortByIcon = ({ isSorted, isSortedDesc, margin = 'none' }) => {
  const size = '10px'

  return (
    <Box width="fit-content" justify="center" margin={margin}>
      {isSorted && !isSortedDesc && (
        <Icon name="ChevronUp" size={size} color="black" />
      )}
      {isSorted && isSortedDesc && (
        <Icon name="ChevronDown" size={size} color="black" />
      )}
      {!isSorted && (
        <>
          <Icon name="ChevronUp" size={size} color="gray-shade-40" />
          <Icon name="ChevronDown" size={size} color="gray-shade-40" />
        </>
      )}
    </Box>
  )
}

export default memo(SortByIcon)
