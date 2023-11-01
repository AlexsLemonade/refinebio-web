import { regex } from 'config'

export default (query) => {
  if (!query) return []

  const { accessionCode: re } = regex
  const accessionCodes = query.split(/,| /i)

  return accessionCodes.filter((code) => re.test(code))
}
