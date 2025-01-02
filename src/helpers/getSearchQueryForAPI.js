import { options } from 'config'

export default (query) => {
  const {
    search: { clientOnlyQueries, defaultOrdering, numDownloadableSamples }
  } = options

  const queryParams = {}

  Object.keys(query).forEach((key) => {
    if (!clientOnlyQueries.includes(key)) {
      queryParams[key] = query[key]
    }
  })

  // sets default values for common query parameters
  queryParams.offset = query.offset !== undefined ? Number(query.offset) : 0
  queryParams.limit = query.limit !== undefined ? Number(query.limit) : 10
  queryParams.ordering =
    query.ordering !== undefined ? queryParams.ordering : defaultOrdering
  queryParams[numDownloadableSamples.key] =
    query[numDownloadableSamples.key] !== undefined
      ? Number(queryParams[numDownloadableSamples.key])
      : numDownloadableSamples.exclude

  return queryParams
}
