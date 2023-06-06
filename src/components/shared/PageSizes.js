import { memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import { Box, Select, Text } from 'grommet'
import { options } from 'config'

export const PageSizes = ({
  textPrepend = 'Show',
  textAppended = 'Total Samples',
  totalPages,
  pageSize,
  setPageSize
}) => {
  const { pageSizes } = options
  const { viewport } = useResponsive()
  const handleChange = (value) => {
    setPageSize(value)
  }
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
