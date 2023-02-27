// Returns true if 'value' is an object
// https://lodash.com/docs#isObject
export const isObject = (value) => {
  if (value === null || value === undefined) return false

  return value.constructor.name === 'Object'
}
