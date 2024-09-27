// Returns the formatted dataset.experiments array for the UI,
// converting it into an object with nested experiment objects where each
// experiment accession code serves as a key
// e.g., {
// { GSE116436: { title: ..., accession_code: GSE116436, technology: ... },
// { ERP006132: { title: ...}}
// }
export default (detaset) => {
  const { experiments } = detaset

  if (!experiments.length) return {}

  return experiments.reduce(
    (acc, experiment) => ({
      ...acc,
      [experiment.accession_code]: experiment
    }),
    {}
  )
}
