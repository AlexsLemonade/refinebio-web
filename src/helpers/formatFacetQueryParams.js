import { getTranslateFacetNames } from 'helpers/facetNameTranslation'

// Converts facet query parameters from strings to arrays (except 'has_publication')
export default (facets, query) => {
  const formattedFacetNames = getTranslateFacetNames(facets)

  return Object.entries(query).reduce((acc, [key, value]) => {
    if (formattedFacetNames.includes(key)) {
      acc[key] = Array.isArray(value) ? value : [value]
    } else {
      acc[key] = value
    }
    return acc
  }, {})
}
