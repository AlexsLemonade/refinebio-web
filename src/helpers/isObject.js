// Returns true if 'value' is an object
// equivalent to  https://lodash.com/docs#isObject
export default (value) => {
  if (value === null || value === undefined) return false

  return value.constructor.name === 'Object'
}
