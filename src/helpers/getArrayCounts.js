// Returns an object with the count of element occurrences in the given array
// e.g.,
// Input: [ 'a', 'b', 'b' ]
// Output: { a: 1, b: 2 }
export default (arr) =>
  arr.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1
    return acc
  }, {})
