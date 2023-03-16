import { memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { formatNumbers } from 'helpers/formatNumbers'
import { Box, Select, Text } from 'grommet'

export const PageSizes = ({
  textPrepend = 'Show',
  textAppended = 'Total Samples',
  totalPages,
  pageSize,
  pageSizes,
  setPageSize
}) => {
  const { viewport } = useResponsive()
  const handleChange = (value) => {
    setPageSize(value)
  }

  return (
    <Box align="center" direction="row">
      <Text margin={{ right: 'xsmall' }}>{textPrepend}</Text>
      <Box width="84px">
        <Select
          id="page-sizes"
          defaultValue={pageSize}
          options={pageSizes}
          value={pageSize}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
      </Box>
      <Text margin={{ left: 'xsmall' }}>
        of {formatNumbers(totalPages)} {viewport !== 'small' && textAppended}
      </Text>
    </Box>
  )
}

export default memo(PageSizes)
