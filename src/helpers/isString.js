// Returns true if 'value' is a string
// https://lodash.com/docs#isString
export const isString = (value) => {
  if (value === null || value === undefined) return false

  return typeof value === 'string'
}
