import { options } from 'config'
// Returns the API supported formatted facets
export default (facetNames) => {
  const {
    search: { formattedFacetNames }
  } = options

  return facetNames.map(
    (facetName) => formattedFacetNames[facetName] || facetName
  )
}
