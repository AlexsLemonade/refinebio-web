// NOTE: We need to rename facet keys to match filter
// We'll remove these helpers in the future (1/16/2025)

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
export const getTranslateFacetNames = (facetNames) =>
  facetNames.map((facetName) => getTranslateFacetName(facetName) || facetName)

// translates keys in facets to their corresponding filter names
export const getTranslateKeysinFacets = (facets) =>
  Object.fromEntries(
    Object.entries(facets).map(([key, value]) => [
      getTranslateFacetName(key),
      value
    ])
  )
