export const options = {
  aggregation: [
    { label: 'Experiment', value: 'EXPERIMENT' },
    { label: 'Species', value: 'SPECIES' }
  ],
  // default setting for the search manager
  search: {
    clientOnlyQuery: ['empty'],
    empty: {
      hide: 0,
      show: -1
    },
    pageSizes: [10, 20, 50],
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
  },
  pageSizes: [10, 20, 50],
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
  ],
  transformation: [
    {
      label: 'None',
      value: 'NONE'
    },
    {
      label: 'Zero to One',
      value: 'MINMAX'
    },
    {
      label: 'Z-score',
      value: 'STANDARD'
    }
  ]
}

export default options
