import { api } from 'api'
import { options } from 'config'
import getAccessionCodesQueryParam from './getAccessionCodesQueryParam'
import getUniqElementsBy from './getUniqElementsBy'

export default async (queryString, currentPage, filterOrders) => {
  const {
    search: { formattedFacetNames }
  } = options
  const response = await api.search.get(queryString)
  const { count: totalResults } = response
  let { results, facets } = response

  if (filterOrders.length > 0) {
    const lastFilterOrderName = filterOrders[filterOrders.length - 1]
    const { facets: previousFacets } = await api.search.get({
      ...queryString,
      limit: 1,
      [formattedFacetNames[lastFilterOrderName]]: undefined
    })

    facets = {
      ...facets,
      [lastFilterOrderName]: previousFacets[lastFilterOrderName]
    }
  }
  /* Accession Codes */
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

  return {
    message: response.message,
    facets,
    hasError: !response.ok,
    results,
    totalResults,
    statusCode: response.statusCode
  }
}
