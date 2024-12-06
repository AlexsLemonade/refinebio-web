// Returns the filtered object with the given keys
export default (obj, keys) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (keys.includes(key)) {
      acc[key] = obj[key]
    }
    return acc
  }, {})
}
