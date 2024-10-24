export const readableAttributes = {}

const readableAnalyticsBooleans = {
  checked: ['Add - ', 'Remove - '],
  expires_on: ['Expired', 'Valid']
}

export const readableBooleans = {
  ...readableAnalyticsBooleans,
  quantile_normalize: ['Not skipped', 'Skipped'],
  quant_sf_only: ['rna-seq', 'normalized']
}

export const readableValues = {
  ALL: 'All Speciess',
  EXPERIMENT: 'Experiment',
  SPECIES: 'Species',
  NONE: 'None',
  MINMAX: 'Zero to One',
  STANDARD: 'Z-score',
  _score: 'Best Match',
  '-num_downloadable_samples': 'Most No. of samples',
  num_downloadable_samples: 'Least No. of samples',
  '-source_first_published': 'Newest Experiment',
  source_first_published: 'Oldest Experiment',
  // database names
  ARRAY_EXPRESS: 'ArrayExpress',
  GEO: 'Gene Expression Omnibus (GEO)',
  SRA: 'Sequence Read Archive (SRA)'
}
