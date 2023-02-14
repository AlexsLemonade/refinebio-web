// Returns a union of multiple arrays
// https://lodash.com/docs#union
export const unionizeArrays = (...arrs) =>
  arrs.length === 1 ? arrs[0] : [...new Set([...arrs].flat())]
