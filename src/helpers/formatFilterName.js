import formatString from 'helpers/formatString'
import formatPlatformName from 'helpers/formatPlatformName'
import formatTechnologyName from 'helpers/formatTechnologyName'

export default (filterOption, item) => {
  switch (filterOption) {
    case 'platform':
      return formatPlatformName(item)
    case 'technology':
      return formatTechnologyName(item)
    default:
      return formatString(item)
  }
}
