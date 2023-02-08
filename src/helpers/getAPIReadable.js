// Returns the API readable value based on the human-readable text
export const getAPIReadable = (value, object) =>
  Object.keys(object).find((key) => object[key] === value)
