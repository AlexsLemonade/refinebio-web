import { formatString } from 'helpers/formatString'
import { isEmptyObject } from 'helpers/isEmptyObject'
import { unionizeArrays } from 'helpers/unionizeArrays'

// Checks if there is any downladable dataset added in My Dataset
export const isDownloadableDataset = (dataset) =>
  isEmptyObject(dataset) ? false : Object.keys(dataset).length > 0

// Converts the sample and experiment arrays from the API response
// to objects with experiment accession codes as their keys
export const formatExperiments = (experiments) => {
  if (!experiments.length) return []
  return experiments.reduce(
    (acc, experiment) => ({
      ...acc,
      [experiment.accession_code]: experiment
    }),
    {}
  )
}

// Formats the pipelines' name for UI (e.g., ['Salmon Quant', 'Tximport'] to 'Salmon Quant, and Specimen part')
export const formatPipelinesText = (names) =>
  names.length === 1
    ? names[0]
    : `${names.slice(0, names.length - 1).join(', ')}, and ${
        names[names.length - 1]
      }`

// Formats sample_metadata names for UI (e.g., 'specimen_part' to 'Specimen part')
export const formatSampleMetadata = (sampleMetadata) =>
  sampleMetadata.map(formatString)

// Returns the count of expriment by spcecies
export const getExperimentCountBySpecies = (dataset, experiments) => {
  if (!dataset || !experiments) return {}

  const species = {}

  for (const accessionCode of Object.keys(dataset)) {
    const experimentInfo = experiments[accessionCode]

    if (!experimentInfo) return {}

    const { organism_names: organismNames } = experimentInfo

    for (const organism of organismNames) {
      if (!species[organism]) species[organism] = 0
      species[organism] += 1
    }
  }

  return species
}

// Returns the total length of experiments added in My Dataset
export const getTotalExperiments = (dataset) =>
  isEmptyObject(dataset) ? 0 : Object.keys(dataset).length

// Returns the total length of samples added in My Dataset
export const getTotalSamples = (dataset) =>
  isEmptyObject(dataset) ? 0 : unionizeArrays(...Object.values(dataset)).length

// Returns the file size estimates of given dataset and its aggregate_by value (either 'EXPERIMENT' or 'SPECIES')
// (for Download/DownloadFileSummary)
export const downloadFilesData = (dataset, samplesBySpecies, aggregateBy) => {
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
