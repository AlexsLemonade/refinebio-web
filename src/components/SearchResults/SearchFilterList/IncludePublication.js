import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import { Box, CheckBox } from 'grommet'

export const IncludePublication = ({
  filterGroup,
  filterOption,
  filterLabel
}) => {
  const { isFilterChecked, toggleFilter } = useSearchManager()
  const { viewport } = useResponsive()
  const count = `(${
    filterGroup && filterGroup.true ? formatNumbers(filterGroup.true) : 0
  })`

  return (
    <Box>
      <CheckBox
        checked={isFilterChecked(filterOption)}
        disabled={!filterGroup.true}
        label={`${filterLabel} ${count}`}
        onChange={(e) =>
          toggleFilter(
            e.target.checked,
            filterOption,
            true,
            viewport === 'large'
          )
        }
      />
    </Box>
  )
}

export default IncludePublication
