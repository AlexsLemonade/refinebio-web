import { api } from 'api'
import getAccessionCodesQueryParam from './getAccessionCodesQueryParam'
import getUniqElementsBy from './getUniqElementsBy'

export default async (queryString, currentPage) => {
  const response = await api.search.get(queryString)
  let { results } = response
  const { count: totalResults, facets } = response
  const accessionCodes = getAccessionCodesQueryParam(queryString.search)

  // makes requests for accession codes only from the first page
  if (accessionCodes.length > 0 && currentPage === 1) {
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
      results = getUniqElementsBy(
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
