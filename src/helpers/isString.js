// Returns true if 'value' is a string
// equivalent to https://lodash.com/docs#isString
export default (value) => {
  if (value === null || value === undefined) return false

  return typeof value === 'string'
}
