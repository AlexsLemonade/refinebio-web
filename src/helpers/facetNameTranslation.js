// These helpers will be removed after the BE API update, which will
// eliminate the need to rename facet keys on FE.

// Returns API-supported formatted facet names and filter names for query parameters

const facetsMap = {
  downloadable_organism_names: 'downloadable_organism',
  platform_accession_codes: 'platform'
}

// translates an individual facet key in the search query or within facetNames
export const getTranslateFacetName = (name) => {
  const entry = Object.entries(facetsMap).find(
    ([k, v]) => k === name || v === name
  )

  return entry ? entry[name === entry[0] ? 1 : 0] : name
}

// translates an array of facet names (i.e, for facets)
export const getTranslateFacetNames = (facetNames) => {
  return facetNames.map(
    (facetName) => getTranslateFacetName(facetName) || facetName
  )
}
