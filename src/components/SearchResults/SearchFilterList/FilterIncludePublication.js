import { formatNumbers } from 'helpers/formatNumbers'
import { isChecked } from 'helpers/search'
import { Box, CheckBox } from 'grommet'

export const FilterIncludePublication = ({
  filter,
  filterGroup,
  filterParam,
  filterLabel,
  toggleFilter
}) => {
  const count = filterGroup.true ? `(${formatNumbers(filterGroup.true)})` : ''

  return (
    <Box>
      <CheckBox
        checked={isChecked(filter, filterParam)}
        label={`${filterLabel} ${count}`}
        onChange={(e) => toggleFilter(e, filterParam, true)}
      />
    </Box>
  )
}

export default FilterIncludePublication
