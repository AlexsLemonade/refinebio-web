import isEmptyObject from 'helpers/isEmptyObject'
// Checks if there is any downladable dataset added in My Dataset
export default (dataset) =>
  isEmptyObject(dataset) ? false : Object.keys(dataset).length > 0
