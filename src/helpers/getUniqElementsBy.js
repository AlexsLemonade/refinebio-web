import isArray from 'helpers/isArray'
// Returns a new duplicate free array of the given array
// 'iteratee' can be either a function or a string
// equivalent to https://lodash.com/docs#uniqBy
// (resource) https://stackoverflow.com/questions/40801349/converting-lodashs-uniqby-to-native-javascript/40808569#40808569
export default (arr, iteratee) => {
  if (!isArray(arr)) return []

  const cb = typeof iteratee === 'function' ? iteratee : (o) => o[iteratee]

  return [
    ...arr
      .filter((item) => item) // removes undefined or null values
      .reduce((map, item) => {
        const key = cb(item)

        if (!key) {
          return map
        }

        return map.has(key) ? map : map.set(key, item)
      }, new Map())
      .values()
  ]
}
