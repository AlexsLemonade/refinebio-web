import { Box } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import { CheckBox } from 'components/shared/CheckBox'

export const SearchBooleanFilter = ({
  label,
  filter,
  facet = {},
  values = {
    checked: true,
    unchecked: false
  }
}) => {
  const { isFilterChecked, updateFilterValue } = useSearchManager()

  return (
    <Box>
      <CheckBox
        checked={isFilterChecked(filter)}
        disabled={!facet.true}
        label={label}
        onChange={(e) =>
          updateFilterValue(
            filter,
            e.target.checked ? values.checked : values.unchecked
          )
        }
      />
    </Box>
  )
}

export default SearchBooleanFilter
