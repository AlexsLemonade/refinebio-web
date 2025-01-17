import { Box } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import { CheckBox } from 'components/shared/CheckBox'
import getReadable from 'helpers/getReadable'

export const IncludePublication = ({ facet = {}, filter }) => {
  const { isFilterChecked, toggleFilter } = useSearchManager()
  const { viewport } = useResponsive()
  const count = formatNumbers(facet.true) || 0

  return (
    <Box>
      <CheckBox
        checked={isFilterChecked(filter)}
        disabled={!facet.true}
        label={`${getReadable(filter)} (${count})`}
        onChange={(e) =>
          toggleFilter(e.target.checked, filter, null, viewport === 'large')
        }
      />
    </Box>
  )
}

export default IncludePublication
