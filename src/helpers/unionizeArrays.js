// Returns a union of multiple arrays
// equivalent to https://lodash.com/docs#union
export default (...arrs) => [...new Set([...arrs].flat())]
