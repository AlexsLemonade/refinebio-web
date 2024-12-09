import { memo } from 'react'
import { Box, Select, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { options } from 'config'
import formatNumbers from 'helpers/formatNumbers'

export const PageSizes = ({
  textPrepend = 'Show',
  textAppended = 'Total Samples',
  pageSize,
  setPageSize,
  totalPages,
  updatePageSize
}) => {
  const { viewport } = useResponsive()
  const { pageSizes } = options
  const isSinglePage = totalPages < pageSizes[0]

  // syncs the search page url with selected page size
  const updateQueryForPageSize = (newPageSize) => {
    if (updatePageSize) {
      updatePageSize(newPageSize)
    }
  }

  const handleChange = (newPageSize) => {
    setPageSize(newPageSize)
    updateQueryForPageSize(newPageSize)
  }

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
            onChange={(e) => handleChange(Number(e.target.value))}
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
