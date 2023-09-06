import differenceOfArrays from 'helpers/differenceOfArrays'
// Returns true if both given arguments have the same elements
// e.g., ([1,2], [2,1]) === true

export default (arr1, arr2) =>
  differenceOfArrays(arr1, arr2).length === 0 &&
  differenceOfArrays(arr2, arr1).length === 0
