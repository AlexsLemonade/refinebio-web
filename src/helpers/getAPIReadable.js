// Returns the human-readable text based on the human-readable text value
export const getAPIReadable = (value, object) =>
  Object.keys(object).find((key) => object[key] === value)
