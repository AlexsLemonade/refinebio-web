import isEmptyStr from 'helpers/isEmptyStr'
// Returns a formatted string
// e.g) 'HOMO_SAPIENS' to 'Homo sapiens'

export default (str) => {
  const temp = str.toLowerCase().replace(/_/g, ' ')

  return !isEmptyStr(str) ? temp.charAt(0).toUpperCase() + temp.slice(1) : null
}
