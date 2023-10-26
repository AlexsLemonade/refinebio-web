import fromPairs from 'helpers/fromPairs'
// NOTE: currently usesd in the dataset action button and the samples table, but it will be revised later
// formats the API response to an object with an experiment accession code as its key
// e.g., { GSE116436: { all: true, total: num_downloadable_samples } }
export const getFormattedExperiment = (experimentAccessionCode, total) => ({
  [experimentAccessionCode]: { all: true, total }
})

// formats the API response to objects with experiment accession codes as their keys
// e.g., { GSE116436: { all: true, total: num_downloadable_samples } }
export const getFormattedExperimentList = (experimentList) =>
  fromPairs(
    experimentList.map((experiment) => [
      experiment.accession_code,
      { all: true, total: experiment.num_downloadable_samples }
    ])
  )
