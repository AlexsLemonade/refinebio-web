import isObject from 'helpers/isObject'
// equivalent to https://lodash.com/docs#pick
export default (obj, keys) => {
  if (!isObject(obj)) return null

  const result = {}

  for (const key of keys) {
    if (obj[key]) {
      result[key] = obj[key]
    }
  }

  return result
}
