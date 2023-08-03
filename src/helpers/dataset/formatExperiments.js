// Converts the sample and experiment arrays from the API response
// to objects with experiment accession codes as their keys
export default (experiments) => {
  if (!experiments.length) return []
  return experiments.reduce(
    (acc, experiment) => ({
      ...acc,
      [experiment.accession_code]: experiment
    }),
    {}
  )
}
