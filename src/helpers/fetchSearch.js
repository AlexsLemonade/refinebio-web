import { api } from 'api'
import getAccessionCodesQueryParam from './getAccessionCodesQueryParam'

export default async (queryString, searchTerm) => {
  const response = await api.search.get(queryString)
  let accessionCodesResponse

  const accessionCodes = getAccessionCodesQueryParam(searchTerm)

  if (accessionCodes) {
    accessionCodesResponse =
      (await Promise.all(
        accessionCodes.map((code) =>
          api.search.get({
            search: [
              `accession_code:${code}`,
              `alternate_accession_code:${code}`
            ]
          })
        )
      )) || []
  }

  return { response, accessionCodesResponse }
}
