import { options } from 'config'
// Returns the API supported formatted facets
export default (facetNames) => {
  const {
    search: { formattedFacetNames }
  } = options
  const formattedNames = []

  for (const name of facetNames) {
    if (Object.keys(formattedFacetNames).includes(name)) {
      formattedNames.push(formattedFacetNames[name])
    } else {
      formattedNames.push(name)
    }
  }

  return formattedNames
}
