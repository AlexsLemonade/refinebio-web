import { isEmptyStr } from 'helpers/isEmptyStr'
// Returns a formatted string
// e.g) 'HOMO_SAPIENS' to 'Homo sapiens'

export function formatString(key) {
  const temp = key.toLowerCase().replace(/_/g, ' ')

  return !isEmptyStr(key) ? temp.charAt(0).toUpperCase() + temp.slice(1) : null
}
