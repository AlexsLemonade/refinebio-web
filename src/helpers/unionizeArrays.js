// Returns a union of multiple arrays

export const unionizeArrays = (...arrs) =>
  arrs.length === 1 ? arrs[0] : [...new Set([...arrs].flat())]
export default unionizeArrays
