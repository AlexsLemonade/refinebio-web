export const options = {
  // setting for the compendia
  compendia: {
    // default values for common queries
    commonQueries: {
      latest_version: true,
      limit: 1000
    },
    heading: {
      normalized: 'Normalized Compendia',
      'rna-seq': 'RNA-seq Sample Compendia'
    },
    svg: {
      normalized: 'normalizaed-curve.svg',
      'rna-seq': 'gene-expression-matrix.svg'
    },
    tabs: [
      {
        type: 'normalized',
        label: 'Normalized Compendia',
        path: '/compendia/normalized'
      },
      {
        type: 'rnaSeq',
        label: 'RNA-seq Sample Compendia',
        path: '/compendia/rna-seq'
      }
    ]
  },
  // setting for the dataset manager
  dataset: {
    downloadOptionsKeys: [
      'aggregate_by',
      'data',
      'scale_by',
      'quantile_normalize'
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
  // setting for the samples table
  samplesTable: {
    // default values for common queries
    commonQueries: {
      offset: 0,
      limit: 10
    },
    page: 1
  },
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
  },
  // TODO: This will be cleaned up once the following PR is merged
  // https://github.com/AlexsLemonade/refinebio-web/pull/365
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
