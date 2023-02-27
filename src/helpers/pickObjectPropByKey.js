import { isObject } from './isObject'
// https://lodash.com/docs#pick

export const pickObjectPropByKey = (obj, keys) => {
  if (!isObject(obj)) return null

  const result = {}

  for (const key of keys) {
    if (obj[key]) {
      result[key] = obj[key]
    }
  }

  return result
}
