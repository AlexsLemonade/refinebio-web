import unionizeArrays from 'helpers/unionizeArrays'
// equivalent to https://lodash.com/docs#intersection
export default (arr1, arr2) =>
  unionizeArrays(arr1.filter((value) => arr2.includes(value)))
