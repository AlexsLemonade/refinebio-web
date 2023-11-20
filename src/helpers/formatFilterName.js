import formatString from 'helpers/formatString'
import formatPlatformName from 'helpers/formatPlatformName'
import formatTechnologyName from 'helpers/formatTechnologyName'

const filterOptionsToFormat = {
  platform: 'platform',
  technology: 'technology'
}

export default (filterOption, item, formattedPlatformName) => {
  const formatName = () =>
    filterOption === 'platforom'
      ? formatPlatformName(formattedPlatformName)
      : formatTechnologyName(item)

  return !filterOptionsToFormat[filterOption]
    ? formatString(item)
    : formatName()
}
