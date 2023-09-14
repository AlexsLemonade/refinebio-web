import hasSameElements from 'helpers/hasSameElements'
import intersectArrays from 'helpers/intersectArrays'
import unionizeArrays from 'helpers/unionizeArrays'
// This hook is used for the dataset action buttons and compares the following datasets
// - data1: a data object in a user-created dataset)
// - data2: the given dataset - a data object in the API response selected by a user via UI)
export const useDatasetAction = (data1 = {}, data2 = {}) => {
  // returns true if any downloadable samples in data2
  const anyProcessedSamples = () =>
    Object.values(data2).some(
      (samples) =>
        (samples && samples.length > 0) ||
        (samples && samples.all && samples.total > 0)
    )

  // returns true if all the processed samples in data2 were added to data1
  const allProcessedInDataset = () => {
    if (!anyProcessedSamples()) return false

    const addedSlice = getAddedSlice()
    return hasSameSamples(addedSlice, data2)
  }

  // returns true if any processed samples in data2 were added in data1
  const anyProcessedInDataset = () =>
    Object.values(getAddedSlice()).some(
      (samples) => samples && samples.length > 0
    )

  // returns the samples in data2 that were added in data1
  const getAddedSlice = () => intersectDatasets(data1, data2)

  // returns all the samples that are in both data1 and data2
  const getSamplesInDatasets = () => {
    const addedSlice = getAddedSlice()

    return unionizeArrays(...Object.values(addedSlice))
  }

  // returns true if two given datasets have the same samples, otherwise false
  const hasSameSamples = (d1, d2) => {
    const d1Keys = Object.keys(d1)
    const d2Keys = Object.keys(d2)

    if (!hasSameElements(d1Keys, d2Keys)) {
      return false
    }

    for (const accession of d1Keys) {
      if (d1[accession].all) {
        if (d1[accession].total !== d2[accession].length) {
          return false
        }
        continue
      }
      if (d2[accession].all) {
        if (d2[accession].total !== d1[accession].length) {
          return false
        }
        continue
      }
      if (!hasSameElements(d1[accession], d2[accession])) {
        return false
      }
    }

    return true
  }

  // returns the intersection of two given datasets
  const intersectDatasets = (d1, d2) => {
    const data = {}
    const experimentAccessions = intersectArrays(
      Object.keys(d1),
      Object.keys(d2)
    )

    for (const experimentAccession of experimentAccessions) {
      if (d2[experimentAccession].all) {
        data[experimentAccession] = d1[experimentAccession]
      } else if (d1[experimentAccession].all) {
        data[experimentAccession] = d2[experimentAccession]
      } else {
        data[experimentAccession] = intersectArrays(
          d1[experimentAccession],
          d2[experimentAccession]
        )
      }
    }
    return data
  }

  // returns the total samples added in data1
  const totalSamplesInDataset = () => {
    return getSamplesInDatasets().length
  }

  return {
    anyProcessedSamples,
    allProcessedInDataset,
    anyProcessedInDataset,
    getAddedSlice,
    totalSamplesInDataset
  }
}
