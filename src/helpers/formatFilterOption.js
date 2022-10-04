import { isEmptyStr } from 'helpers/isEmptyStr'
// Returns a formatted filter option
// e.g) 'HOMO_SAPIENS' to 'Homo sapiens'

export function formatFilterOption(key) {
  const temp = key.toLowerCase().replace(/_/g, ' ')

  return !isEmptyStr(key) ? temp.charAt(0).toUpperCase() + temp.slice(1) : null
}
