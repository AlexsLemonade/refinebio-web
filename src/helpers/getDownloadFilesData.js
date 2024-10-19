import getReadable from 'helpers/getReadable'
// metadata info of a download https://github.com/AlexsLemonade/refinebio-frontend/issues/25#issuecomment-395870627
// Returns the file size estimates of the given dataset and its aggregate_by value (either 'EXPERIMENT' or 'SPECIES')
export default (dataset) => {
  const aggregateBy = getReadable(dataset.aggregate_by)
  const isExperiment = aggregateBy === 'Experiment'
  const totalExperiments = Object.keys(dataset.data).length
  const totalSpecies = Object.keys(dataset.organism_samples).length
  const totalCount = isExperiment ? totalExperiments : totalSpecies

  return {
    files: [
      {
        title: `${totalCount} Gene Expression Matrices`,
        description: `1 file per ${aggregateBy}`,
        format: 'tsv'
      },
      {
        title: `${totalExperiments} Sample Metadata Files`,
        description: '1 file per Experiment',
        format: 'tsv'
      },
      {
        title: `${totalCount} ${aggregateBy} Metadata ${
          isExperiment ? 'Files' : ''
        }`,
        description: `1 file per ${aggregateBy}`,
        format: 'json'
      }
    ]
  }
}
