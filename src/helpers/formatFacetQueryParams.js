import { options } from 'config'
import formatFacetNames from 'helpers/formatFacetNames'

// Converts facet query parameters from strings to arrays (except 'has_publication')
export default (facets, query) => {
  const {
    search: { hasPublication }
  } = options
  const formattedFacetNames = formatFacetNames(facets)

  return Object.entries(query).reduce((acc, [key, value]) => {
    if (formattedFacetNames.includes(key) && key !== hasPublication.key) {
      acc[key] = Array.isArray(value) ? value : [value]
    } else {
      acc[key] = value
    }
    return acc
  }, {})
}
