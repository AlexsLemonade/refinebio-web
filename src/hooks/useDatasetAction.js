import intersectArrays from 'helpers/intersectArrays'
import matchElements from 'helpers/matchElements'
import unionizeArrays from 'helpers/unionizeArrays'

// NOTE: Only processed samples can be added to my dataset

// a hook for calculating stats between my dataset and the given dataset slice
export const useDatasetAction = (dataset = {}, datasetSlice = {}) => {
  // returns the intersection of two dataset
  const intersectDatasets = (d1, d2) => {
    const temp = {}
    const experimentAccessions = intersectArrays(
      Object.keys(d1),
      Object.keys(d2)
    )

    for (const experimentAccession of experimentAccessions) {
      if (d2[experimentAccession].all) {
        temp[experimentAccession] = d1[experimentAccession]
      } else if (d1[experimentAccession].all) {
        temp[experimentAccession] = d2[experimentAccession]
      } else {
        temp[experimentAccession] = intersectArrays(
          d1[experimentAccession],
          d2[experimentAccession]
        )
      }
    }
    return temp
  }
  // returns true if two datasets are the same
  const compareDatasets = (d1, d2) => {
    const d1Keys = Object.keys(d1)
    const d2Keys = Object.keys(d2)

    if (!matchElements(d1Keys, d2Keys)) {
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
      if (!matchElements(d1[accession], d2[accession])) {
        return false
      }
    }

    return true
  }

  // returns true if any processed samples in the slice
  const anyProcessedSamples = () =>
    Object.values(datasetSlice).some(
      (samples) =>
        (samples && samples.length > 0) ||
        (samples && samples.all && samples.total > 0)
    )

  // returns true if the processed samples in my dataset and the slice are the same
  const allProcessedInDataset = () => {
    if (!anyProcessedSamples()) return false

    const addedSlice = getAddedSlice()
    return compareDatasets(addedSlice, datasetSlice)
  }

  // returns true if any processed samples in the experiment are added in my dataset
  const anyProcessedInDataset = () =>
    Object.values(getAddedSlice()).some(
      (samples) => samples && samples.length > 0
    )

  // returns the samples in the slice that are added in my dataset
  const getAddedSlice = () => intersectDatasets(dataset, datasetSlice)

  // returns a list of processed samples that are in both my dataset and the slice
  const getSamplesInDataset = () => {
    const addedSlice = getAddedSlice()

    return unionizeArrays(...Object.values(addedSlice))
  }

  // returns the total samples in my dataset
  const totalSamplesInDataset = () => {
    return getSamplesInDataset().length
  }

  return {
    anyProcessedSamples,
    allProcessedInDataset,
    anyProcessedInDataset,
    getAddedSlice,
    getSamplesInDataset,
    totalSamplesInDataset
  }
}
