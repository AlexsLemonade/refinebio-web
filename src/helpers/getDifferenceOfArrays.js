import unionizeArrays from 'helpers/unionizeArrays'
// equivalent to https://lodash.com/docs#difference
export default (arr, ...arrsToCompare) =>
  arr.filter((element) => !unionizeArrays(...arrsToCompare).includes(element))
