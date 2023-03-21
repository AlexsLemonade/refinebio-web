import { useFilter } from 'hooks/useFilter'
import { formatNumbers } from 'helpers/formatNumbers'
import { isChecked } from 'helpers/search'
import { Box, CheckBox } from 'grommet'

export const FilterIncludePublication = ({
  filterGroup,
  filterParam,
  filterLabel
}) => {
  const { filter, toggleFilter } = useFilter()
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
