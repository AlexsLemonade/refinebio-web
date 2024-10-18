import uniqueArray from 'helpers/uniqueArray'
// Returns a union of multiple arrays
// equivalent to https://lodash.com/docs#union
export default (...arrs) =>
  arrs.length === 1 ? arrs[0] : uniqueArray([...arrs].flat())
