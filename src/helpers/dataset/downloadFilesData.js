// Returns the file size estimates of given dataset and its aggregate_by value (either 'EXPERIMENT' or 'SPECIES')
// (for Download/DownloadFileSummary)
export default (dataset, samplesBySpecies, aggregateBy) => {
  const totalExperiments = Object.keys(dataset).length

  // When the samples are aggregated by 'EXPERIMENT'
  // https://github.com/AlexsLemonade/refinebio-frontend/issues/25#issuecomment-395870627
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

  // When the samples are aggregated by 'SPECIES'
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

  return aggregateBy === 'SPECIES'
    ? aggregatedBySpecies(dataset, samplesBySpecies)
    : aggregatedByExperiment(dataset)
}
