export const options = {
  aggregation: [
    { label: 'Experiment', value: 'EXPERIMENT' },
    { label: 'Species', value: 'SPECIES' }
  ],
  // setting for the compendia
  compendia: {
    // default values for common queries
    commonQueries: {
      latest_version: true,
      limit: 1000
    },
    heading: {
      normalized: 'Normalized Compendia',
      rnaSeq: 'RNA-seq Sample Compendia'
    },
    svg: {
      normalized: 'normalizaed-curve.svg',
      rnaSeq: 'gene-expression-matrix.svg'
    },
    tabs: [
      {
        type: 'normalized',
        label: 'Normalized Compendia'
      },
      {
        type: 'rnaSeq',
        label: 'RNA-seq Sample Compendia'
      }
    ]
  },
  // setting for the experiment hook
  experiment: {
    databaseNames: {
      GEO: 'Gene Expression Omnibus (GEO)',
      SRA: 'Sequence Read Archive (SRA)',
      ARRAY_EXPRESS: 'ArrayExpress'
    }
  },
  // setting for the search manager
  search: {
    // default values for common queries
    commonQueries: {
      offset: 0,
      ordering: '_score',
      limit: 10,
      num_downloadable_samples__gt: {
        hide: 0,
        show: -1
      }
    },
    // client-only queries
    clientOnlyQueries: ['empty', 'p', 'size', 'sortby'],
    // client-only filter queries
    clientOnlyFilterQueries: ['empty'],
    formattedFacetNames: {
      downloadable_organism_names: 'downloadable_organism',
      platform_accession_codes: 'platform',
      technology: 'technology'
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
  // setting for the samples table
  samplesTable: {
    // default values for common queries
    commonQueries: {
      offset: 0,
      limit: 10
    },
    page: 1,
    pageSizes: [10, 20, 50]
  },
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
