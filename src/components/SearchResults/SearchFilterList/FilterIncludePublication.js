import { formatNumbers } from 'helpers/formatNumbers'
import { Box, CheckBox } from 'grommet'

export const FilterIncludePublication = ({
  checked,
  filterGroup,
  filterParam,
  label,
  handleToggle
}) => {
  const count = filterGroup.true ? `(${formatNumbers(filterGroup.true)})` : ''

  return (
    <Box>
      <CheckBox
        checked={checked}
        label={`${label} ${count}`}
        onChange={(e) => handleToggle(e, filterParam, true)}
      />
    </Box>
  )
}

export default FilterIncludePublication
