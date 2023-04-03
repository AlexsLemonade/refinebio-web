// Returns the filter list obtained by a url query parameter
export default (query) => {
  const temp = {}
  Object.keys(query).forEach((key) => {
    if (typeof query[key] === 'string') {
      temp[key] = [query[key]]
    } else {
      temp[key] = query[key]
    }
  })

  return temp
}
