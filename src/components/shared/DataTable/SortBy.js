import { memo } from 'react'
import { Box } from 'grommet'
import { Icon } from 'components/shared/Icon'

const Border = memo(({ isSorted }) => (
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
  const size = '12px'

  return (
    <>
      <Box
        fill
        justify="center"
        margin={{ top: '-2px' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <Box fill align="end" pad={{ right: 'xsmall' }}>
          <Box margin={{ top: 'small' }}>
            {isSorted && !isSortedDesc && (
              <Icon name="ChevronUp" size={size} color="black" />
            )}
            {isSorted && isSortedDesc && (
              <Icon name="ChevronDown" size={size} color="black" />
            )}
          </Box>
          {!isSorted && (
            <Box margin={{ top: '-6px' }}>
              <Icon name="ChevronUp" size={size} color="gray-shade-40" />
              <Icon name="ChevronDown" size={size} color="gray-shade-40" />
            </Box>
          )}
        </Box>
      </Box>
      <Border isSorted={isSorted} />
    </>
  )
}

export default memo(SortBy)
