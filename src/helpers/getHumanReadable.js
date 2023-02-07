// a list of values for API and client (human-readable text)
const humanReadableNames = {
  _score: 'Best Match',
  '-num_downloadable_samples': 'Most No. of samples',
  num_downloadable_samples: 'Least No. of samples',
  '-source_first_published': 'Newest Experiment',
  source_first_published: 'Oldest Experiment'
}

export const getHumanReadable = (key) => humanReadableNames[key] || key
