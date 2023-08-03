// Returns true if 'value' is an array
export default (value) => {
  if (value === null || value === undefined) return false

  return Array.isArray(value)
}
