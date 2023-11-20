import { options } from 'config'
import formatString from 'helpers/formatString'
import formatPlatformName from 'helpers/formatPlatformName'
import formatTechnologyName from 'helpers/formatTechnologyName'

export default (filterOption, item, formattedPlatformName) => {
  const { filterOptionsToFormat } = options.search
  const formatNames = () =>
    filterOption === 'platforom'
      ? formatPlatformName(formattedPlatformName)
      : formatTechnologyName(item)

  return !filterOptionsToFormat[filterOption]
    ? formatString(item)
    : formatNames()
}
