import isEmptyObject from 'helpers/isEmptyObject'

// Returns the total length of experiments added in My Dataset
export default (dataset) =>
  isEmptyObject(dataset) ? 0 : Object.keys(dataset).length
