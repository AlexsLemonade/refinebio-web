import { memo } from 'react'
import { Box, Select, Text } from 'grommet'

export const PageSizes = ({ count, pageSize, pageSizes, setPageSize }) => {
  const handleChange = (value) => {
    setPageSize(value)
  }

  return (
    <Box align="center" direction="row">
      <Text margin={{ right: 'xsmall' }}>Show</Text>
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
        of {count.toLocaleString()} Total Samples
      </Text>
    </Box>
  )
}

export default memo(PageSizes)
