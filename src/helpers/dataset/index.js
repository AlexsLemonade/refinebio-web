// Checks if there is any downladable dataset added in My Dataset
export const isDownloadableDataset = (dataset) =>
  dataset ? Object.keys(dataset).length > 0 : false

// Returns the total length of samples added in My Dataset
export const getTotalSamples = (dataset) =>
  dataset ? Object.values(dataset)[0].length : 0
