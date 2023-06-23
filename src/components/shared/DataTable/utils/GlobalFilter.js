import { memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { FilterTextInput } from 'components/shared/FilterTextInput'

export const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      direction="row"
      justify="start"
      align={setResponsive('start', 'center')}
    >
      <FilterTextInput
        filter={globalFilter}
        setFilter={setGlobalFilter}
        placeholder="Filter samples"
      />
    </Box>
  )
}

export default memo(GlobalFilter)
