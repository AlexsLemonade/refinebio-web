export const options = {
  // setting for the search manager
  search: {
    numDownloadableSamples: {
      key: 'num_downloadable_samples__gt',
      exclude: 0, // excludes non-downloadable samples (by default)
      include: -1
    },
    // client-only queries
    clientOnlyQueries: ['filter_order']
  }
}

export default options
