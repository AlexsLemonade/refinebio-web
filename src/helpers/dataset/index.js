// Checks if there is any downladable dataset added in My Dataset
export const isDownloadableDataset = (dataset) =>
  dataset ? Object.keys(dataset).length > 0 : false

// Returns the total length of samples added in My Dataset
export const getTotalSamples = (dataset) =>
  dataset ? Object.values(dataset)[0].length : 0

// Returns the file size estimates of given dataset and its aggregate_by value (either 'EXPERIMENT' or 'SPECIES')
// (for Download/DownloadFileSummary)
export const downloadFilesData = (dataset, samplesBySpecies, aggregateBy) => {
  // When the samples are aggregated by 'SPECIES'
  function downloadsFilesDataBySpecies() {
    const totalExperiments = Object.keys(dataset).length
    const totalSpecies = Object.keys(samplesBySpecies).length

    const data = {
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

    return data
  }

  // When the samples are aggregated by 'EXPERIMENT'
  // https://github.com/AlexsLemonade/refinebio-frontend/issues/25#issuecomment-395870627
  function downloadsFilesDataByExperiment() {
    const totalExperiments = Object.keys(dataset).length

    const data = {
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
    }

    return data
  }

  return aggregateBy === 'SPECIES'
    ? downloadsFilesDataBySpecies(dataset, samplesBySpecies)
    : downloadsFilesDataByExperiment(dataset)
}
