import isEmptyObject from 'helpers/isEmptyObject'
import unionizeArrays from 'helpers/unionizeArrays'
// Returns the total length of samples added in My Dataset
export default (dataset) =>
  isEmptyObject(dataset) ? 0 : unionizeArrays(...Object.values(dataset)).length
