export const readableAttributes = {
  normalized: 'Normalized Compendia',
  'rna-seq': 'RNA-seq Sample Compendia'
}

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
  EXPERIMENT: 'Experiment',
  SPECIES: 'Species',
  NONE: 'None',
  MINMAX: 'Zero to One',
  STANDARD: 'Z-score'
}
