// Returns an object composed from key-value 'pairs'
// https://lodash.com/docs/4.17.15#fromPairs
export const fromPairs = (pairs) => {
  const temp = {}

  for (const pair of pairs) {
    const [key, value] = pair
    temp[key] = value
  }

  return temp
}
