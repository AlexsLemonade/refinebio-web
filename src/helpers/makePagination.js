import getRange from 'helpers/getRange'
// Returns the pagination for a data table based on the currently selected page
// (resource) https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
export default (currentPage, totalPages, offset = 2, minPages = 5) => {
  if (totalPages <= 1 || totalPages === undefined) return [1]
  // returns the pagination without ellipsis
  if (totalPages <= minPages) return getRange(totalPages)

  const range = []
  const result = []
  const offsetNumber =
    currentPage <= offset || currentPage > totalPages - offset
      ? offset
      : offset - 1

  range.push(1)
  for (
    let i = currentPage - offsetNumber;
    i <= currentPage + offsetNumber;
    i++
  ) {
    if (i < totalPages && i > 1) {
      range.push(i)
    }
  }
  range.push(totalPages)

  range.reduce((acc, cur) => {
    if (acc === 1) {
      result.push(acc)
    }
    if (cur - acc !== 1) {
      result.push('...')
    }
    result.push(cur)

    return cur
  })

  return result
}
