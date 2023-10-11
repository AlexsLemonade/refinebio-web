import hasSameElements from 'helpers/hasSameElements'
import fromPairs from 'helpers/fromPairs'
import intersectArrays from 'helpers/intersectArrays'
import unionizeArrays from 'helpers/unionizeArrays'
// This hook is used for the dataset action buttons and compares the following datasets:
// - datasetData: a data object (added processed samples) in a user-created dataset
// - datasetDataChanges: all processed samples in the experiment selected by a user via the search results page
export const useDatasetAction = (datasetData = {}, datasetDataChanges = {}) => {
  // returns true if any downloadable samples in datasetDataChanges
  const anyProcessedSamples = () =>
    Object.values(datasetDataChanges).some(
      (samples) =>
        (samples && samples.length > 0) ||
        (samples && samples.all && samples.total > 0)
    )

  // formats the API response to objects with experiment accession codes as their keys
  // e.g., { GSE116436: { all: true, total: num_downloadable_samples } }
  const getFormattedExperimentList = (experimentList) =>
    fromPairs(
      experimentList.map((experiment) => [
        experiment.accession_code,
        { all: true, total: experiment.num_downloadable_samples }
      ])
    )

  // formats the API response to an object with an experiment accession code as its key
  // e.g., { GSE116436: { all: true, total: num_downloadable_samples } }
  const getFormattedExperiment = (experimentAccessionCode, total) => ({
    [experimentAccessionCode]: { all: true, total }
  })

  // returns true if all the processed samples in datasetDataChanges were added to datasetData
  const getHasAllProcessed = () => {
    if (!anyProcessedSamples()) return false

    const addedSamples = getAddedSamples()
    return hasSameSamples(addedSamples, datasetDataChanges)
  }

  // returns true if any processed samples in datasetDataChanges were added in datasetData
  const getAnyProcessedInDataset = () =>
    Object.values(getAddedSamples()).some(
      (samples) => samples && samples.length > 0
    )

  // returns the samples in datasetDataChanges that were added in datasetData
  const getAddedSamples = () => getDatasetIntersection()

  // returns all the samples that are in both datasetData and datasetDataChanges
  const getSamplesInDatasets = () => {
    const addedSamples = getAddedSamples()

    return unionizeArrays(...Object.values(addedSamples))
  }

  // returns true if two given datasets have the same samples, otherwise false
  const hasSameSamples = (datasetDataOne, datasetDataTwo) => {
    const datasetDataOneKeys = Object.keys(datasetDataOne)
    const datasetDataTwoKeys = Object.keys(datasetDataTwo)

    if (!hasSameElements(datasetDataOneKeys, datasetDataTwoKeys)) {
      return false
    }

    for (const accession of datasetDataOneKeys) {
      if (datasetDataOne[accession].all) {
        if (
          datasetDataOne[accession].total !== datasetDataTwo[accession].length
        ) {
          return false
        }
        continue
      }
      if (datasetDataTwo[accession].all) {
        if (
          datasetDataTwo[accession].total !== datasetDataOne[accession].length
        ) {
          return false
        }
        continue
      }
      if (
        !hasSameElements(datasetDataOne[accession], datasetDataTwo[accession])
      ) {
        return false
      }
    }

    return true
  }

  // returns the intersection of two given datasets
  const getDatasetIntersection = () => {
    const data = {}
    const experimentAccessions = intersectArrays(
      Object.keys(datasetData),
      Object.keys(datasetDataChanges)
    )

    for (const experimentAccession of experimentAccessions) {
      if (datasetDataChanges[experimentAccession].all) {
        data[experimentAccession] = datasetData[experimentAccession]
      } else if (datasetData[experimentAccession].all) {
        data[experimentAccession] = datasetDataChanges[experimentAccession]
      } else {
        data[experimentAccession] = intersectArrays(
          datasetData[experimentAccession],
          datasetDataChanges[experimentAccession]
        )
      }
    }
    return data
  }

  // returns the total samples added in datasetData
  const getTotalSamplesInDataset = () => {
    return getSamplesInDatasets().length
  }

  return {
    anyProcessedSamples,
    getFormattedExperiment,
    getFormattedExperimentList,
    getHasAllProcessed,
    getAnyProcessedInDataset,
    getAddedSamples,
    getTotalSamplesInDataset
  }
}
