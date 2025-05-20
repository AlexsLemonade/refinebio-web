import getReadable from 'helpers/getReadable'
// Docs: https://docs.refine.bio/en/latest/main_text.html#downloadable-files
// The UI reflects the contents of the downloaded zip files as listed in the doc.
export default (dataset) => {
  const aggregateBy = getReadable(dataset.aggregate_by)
  const totalExperiments = Object.keys(dataset.data).length
  const totalSpecies = Object.keys(dataset.organism_samples).length
  const totalCount =
    aggregateBy === 'Experiment' ? totalExperiments : totalSpecies

  return {
    files: [
      {
        title: `${totalCount} Gene Expression Matrices`,
        description: `1 file per ${aggregateBy}`,
        format: 'tsv'
      },
      {
        title: `${totalCount} Sample Metadata Files`,
        description: `1 file per ${aggregateBy}`,
        format: 'tsv'
      },
      {
        title: '1 Aggregate Metadata File',
        description: '1 file per download',
        format: 'json'
      }
    ]
  }
}
