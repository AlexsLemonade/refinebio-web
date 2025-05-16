import { api } from 'api'
import { getTranslateFacetName } from 'helpers/facetNameTranslation'
import getParsedAccessionCodes from './getParsedAccessionCodes'
import getUniqElementsBy from './getUniqElementsBy'

export default async (queryParams, filterOrders) => {
  const response = await api.search.get(queryParams)
  const { count: totalResults } = response
  let { results, facets } = response

  if (filterOrders.length > 0) {
    const lastFilterOrderName = filterOrders[filterOrders.length - 1]

    const { facets: previousFacets } = await api.search.get({
      ...queryParams,
      limit: 1,
      [lastFilterOrderName]: undefined // We need to use 'downloadable_organism'
    })

    const translatedLastFilterOrderName = getTranslateFacetName(
      filterOrders[filterOrders.length - 1]
    )

    facets = {
      ...facets,
      [translatedLastFilterOrderName]:
        previousFacets[translatedLastFilterOrderName] // We need to use 'downloadable_organism_names'
    }
  }

  /* Accession Codes and related results */
  const accessionCodes = getParsedAccessionCodes(queryParams.search)
  const numHideDownloadable = queryParams.num_downloadable_samples__gt

  // makes requests for accession codes only from the first page
  if (accessionCodes.length > 0 && queryParams.offset === 0) {
    const accessionCodesResponse = await Promise.all(
      accessionCodes.map((code) =>
        api.search.get({
          num_downloadable_samples__gt: numHideDownloadable,
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
    facets,
    results,
    totalResults,
    ok: response.ok,
    statusCode: response.statusCode
  }
}
