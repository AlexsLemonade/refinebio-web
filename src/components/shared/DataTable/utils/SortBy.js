import { memo } from 'react'
import { Box } from 'grommet'
import { Icon } from 'components/shared/Icon'

export const SortByBorder = memo(({ isSorted }) => (
  <Box
    background={isSorted ? 'gray-shade-70' : 'transparent'}
    height="3px"
    width="100%"
    style={{
      position: 'absolute',
      left: 0,
      bottom: 0
    }}
  />
))

export const SortBy = ({ isSorted, isSortedDesc }) => {
  const size = '10px'

  return (
    <Box width="fit-content" justify="center" margin={{ top: '-2px' }}>
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

export default memo(SortBy)
