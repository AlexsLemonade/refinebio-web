import fromPairs from 'helpers/fromPairs'
// formats the API response to objects with experiment accession codes as their keys
// e.g., { GSE116436: { all: true, total: num_downloadable_samples } }
export default (experimentList) =>
  fromPairs(
    experimentList.map((experiment) => [
      experiment.accession_code,
      { all: true, total: experiment.num_downloadable_samples }
    ])
  )
