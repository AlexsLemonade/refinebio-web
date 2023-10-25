import { api } from 'api'
import getAccessionCodesQueryParam from './getAccessionCodesQueryParam'
import getUniqElementBy from './getUniqElementBy'

export default async (queryString) => {
  const response = await api.search.get(queryString)
  let { results } = response
  const { count: totalResults, facets } = response
  const accessionCodes = getAccessionCodesQueryParam(queryString.search)

  if (accessionCodes) {
    const accessionCodesResponse = await Promise.all(
      accessionCodes.map((code) =>
        api.search.get({
          search: [`accession_code:${code}`, `alternate_accession_code:${code}`]
        })
      )
    )

    const matchedAccessionCodes = []
      .concat(...accessionCodesResponse.map((data) => data.results))
      .map((result) => ({
        ...result,
        // adds the flag below to accession codes that matches the user's searched accession codes
        // these are usually from accession code search
        isMatchedAccessionCode: true
      }))

    if (matchedAccessionCodes.length > 0) {
      // removes duplicates due to multiple requests for fetching accession codes
      results = getUniqElementBy(
        [...matchedAccessionCodes, ...results],
        (x) => x.accession_code
      )
    } else if (accessionCodes.length === 1) {
      // returns no result if no match found for a single accession code that users searched for
      results = []
    }
  }

  return { facets, results, totalResults }
}
