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

  // sets default query parameters
  if (query.offset === undefined) queryParams.offset = 0

  if (query.limit === undefined) queryParams.limit = 10

  if (query.ordering === undefined) queryParams.ordering = defaultOrdering

  if (query[numDownloadableSamples.key] === undefined)
    queryParams[numDownloadableSamples.key] = numDownloadableSamples.exclude

  return queryParams
}
