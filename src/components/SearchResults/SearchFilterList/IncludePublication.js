import { useSearchManager } from 'hooks/useSearchManager'
import formatNumbers from 'helpers/formatNumbers'
import { isChecked } from 'helpers/search'
import { Box, CheckBox } from 'grommet'

export const IncludePublication = ({
  filterGroup,
  filterParam,
  filterLabel
}) => {
  const { filters, toggleFilter } = useSearchManager()
  const count =
    filterGroup && filterGroup.true
      ? `(${formatNumbers(filterGroup.true)})`
      : ''

  return (
    <Box>
      <CheckBox
        checked={isChecked(filters, filterParam)}
        label={`${filterLabel} ${count}`}
        onChange={(e) => toggleFilter(e, filterParam, true)}
      />
    </Box>
  )
}

export default IncludePublication
