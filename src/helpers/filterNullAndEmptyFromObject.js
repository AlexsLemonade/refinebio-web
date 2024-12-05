// Returns the filtered object without null or empty string values
export default (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== '')
  )
