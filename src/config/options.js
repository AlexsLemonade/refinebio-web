export const options = {
  // setting for the page size
  pageSizes: [10, 20, 50],
  // setting for the search manager
  search: {
    // default values for common queries
    commonQueries: {
      ordering: '_score',
      num_downloadable_samples__gt: {
        hide: 0,
        show: -1
      }
    },
    // client-only queries
    clientOnlyQueries: ['empty', 'filter_order', 'sortby'],
    // client-only filter queries
    clientOnlyFilterQueries: ['empty'],
    formattedFacetNames: {
      downloadable_organism_names: 'downloadable_organism',
      platform_accession_codes: 'platform',
      technology: 'technology'
    },
    sortby: [
      {
        label: 'Best Match',
        value: '_score'
      },
      {
        label: 'Most No. of samples',
        value: '-num_downloadable_samples'
      },
      {
        label: 'Least No. of samples',
        value: 'num_downloadable_samples'
      },
      {
        label: 'Newest Experiment',
        value: '-source_first_published'
      },
      {
        label: 'Oldest Experiment',
        value: 'source_first_published'
      }
    ]
  }
}

export default options
