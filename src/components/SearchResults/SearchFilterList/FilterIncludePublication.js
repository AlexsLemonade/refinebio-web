import { Box, CheckBox } from 'grommet'

export const FilterIncludePublication = ({
  checked,
  filterParam,
  label,
  handleToggle
}) => {
  return (
    <Box>
      <CheckBox
        checked={checked}
        label={label}
        onChange={(e) => handleToggle(e, filterParam, true)}
      />
    </Box>
  )
}

export default FilterIncludePublication
