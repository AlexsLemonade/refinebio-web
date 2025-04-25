// Returns a union of multiple arrays
// equivalent to https://lodash.com/docs#union
export default (...arrs) =>
  arrs.length === 1 ? arrs[0] : [...new Set([...arrs].flat())]
