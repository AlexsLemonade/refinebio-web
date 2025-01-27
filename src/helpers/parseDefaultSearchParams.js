import { options } from 'config'
// Returns default params if no query, else converts number strings
export default (query = {}) => {
  const {
    search: { clientOnlyQueries, numDownloadableSamples }
  } = options

  const queryParams = {
    offset: 0,
    limit: 10,
    ordering: '_score',
    [numDownloadableSamples.key]: numDownloadableSamples.exclude
  }

  Object.keys(query).forEach((key) => {
    if (!clientOnlyQueries.includes(key)) {
      queryParams[key] = query[key]
    }
  })

  queryParams.offset = Number(queryParams.offset)
  queryParams.limit = Number(queryParams.limit)
  queryParams[numDownloadableSamples.key] = Number(
    queryParams[numDownloadableSamples.key]
  )

  return queryParams
}
