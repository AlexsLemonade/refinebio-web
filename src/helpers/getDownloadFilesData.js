// Returns the file size estimates of the given dataset and its aggregate_by value (either 'EXPERIMENT' or 'SPECIES')
export default (dataset, samplesBySpecies, aggregateByOption) => {
  const { data } = dataset
  const totalExperiments = Object.keys(data).length
  // metadata info of a download https://github.com/AlexsLemonade/refinebio-frontend/issues/25#issuecomment-395870627
  // the samples aggregated by 'EXPERIMENT'
  const aggregatedByExperiment = () => ({
    files: [
      {
        title: `${totalExperiments} Gene Expression Matrices`,
        description: '1 file per Experiment',
        format: 'tsv'
      },
      {
        title: `${totalExperiments} Sample Metadata Files`,
        description: '1 file per Experiment',
        format: 'tsv'
      },
      {
        title: `${totalExperiments} Experiment Metadata Files`,
        description: '1 file per Experiment',
        format: 'json'
      }
    ]
  })
  // the samples aggregated by 'SPECIES'
  const aggregatedBySpecies = () => {
    const totalSpecies = Object.keys(samplesBySpecies).length

    return {
      files: [
        {
          title: `${totalSpecies} Gene Expression Matrices`,
          description: '1 file per Species',
          format: 'tsv'
        },
        {
          title: `${totalExperiments} Sample Metadata Files`,
          description: '1 file per Experiment',
          format: 'tsv'
        },
        {
          title: `${totalSpecies} Species Metadata`,
          description: '1 file per Species',
          format: 'json'
        }
      ]
    }
  }

  return aggregateByOption === 'SPECIES'
    ? aggregatedBySpecies(dataset, samplesBySpecies)
    : aggregatedByExperiment(dataset)
}
