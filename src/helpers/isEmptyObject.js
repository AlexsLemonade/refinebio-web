// Checks whether the dataset.data is empty
export const isEmptyObject = (obj) => {
  if (obj === null || obj === undefined) return true

  return Object.keys(obj).length === 0
}
