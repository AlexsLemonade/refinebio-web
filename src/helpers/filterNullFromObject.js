// Returns the filtered object without null values
export default (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null))
