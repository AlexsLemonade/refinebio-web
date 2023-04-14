import getQueryParam from 'helpers/search/getQueryParam'
// Returns the filter list obtained by a url query parameter
export default (query) => {
  const queryParams = getQueryParam(query)
  const include = ['downloadable_organism', 'technology', 'platform']
  const temp = {}
  include.forEach((key) => {
    if (queryParams[key]) {
      if (typeof queryParams[key] === 'string') {
        temp[key] = [queryParams[key]]
      } else {
        temp[key] = queryParams[key]
      }
    }
  })

  return temp
}
