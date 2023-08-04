// Returns an object composed from key-value 'pairs'
// equivalent to https://lodash.com/docs/4.17.15#fromPairs
export default (pairs) => {
  const temp = {}

  for (const pair of pairs) {
    const [key, value] = pair
    temp[key] = value
  }

  return temp
}
