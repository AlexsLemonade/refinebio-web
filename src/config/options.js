export const options = {
  // setting for the page size
  pageSizes: [10, 20, 50],
  // setting for the search manager
  search: {
    defaultOrdering: '_score',
    numDownloadableSamples: {
      key: 'num_downloadable_samples__gt',
      exclude: 0, // excludes non-downloadable samples (by default)
      include: -1
    },
    // client-only queries
    clientOnlyQueries: ['filter_order'],
    // client-only filter queries
    formattedFacetNames: {
      downloadable_organism_names: 'downloadable_organism',
      platform_accession_codes: 'platform',
      technology: 'technology'
    }
  }
}

export default options
