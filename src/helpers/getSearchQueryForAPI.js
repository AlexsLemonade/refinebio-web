import { options } from 'config'
import getQueryParam from 'helpers/getQueryParam'

export default (query) => {
  const {
    search: { clientOnlyQueries }
  } = options
  const queryParam = getQueryParam(query)

  const temp = {}

  Object.keys(queryParam).forEach((key) => {
    if (!clientOnlyQueries.includes(key)) {
      temp[key] = queryParam[key]
    }
  })

  return temp
}
