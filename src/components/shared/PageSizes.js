import { memo } from 'react'
import { Box, Select, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'

export const PageSizes = ({
  textPrepend = 'Show',
  textAppended = 'Total Samples',
  pageSize,
  totalPages,
  pageSizes = [10, 20, 50],
  onPageSizeChange
}) => {
  const { viewport } = useResponsive()
  const isSinglePage = totalPages < pageSizes[0]

  return (
    <Box align="center" direction="row">
      <Text margin={{ right: 'xxsmall' }}>{textPrepend}</Text>
      {isSinglePage ? (
        <Text>{totalPages}</Text>
      ) : (
        <Box width="84px">
          <Select
            id="page-sizes"
            defaultValue={pageSize}
            options={pageSizes}
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          />
        </Box>
      )}
      <Text margin={{ left: 'xxsmall' }}>
        of {formatNumbers(totalPages)} {viewport !== 'small' && textAppended}
      </Text>
    </Box>
  )
}

export default memo(PageSizes)
