// Returns a filtered array of objects based on a match of the cleaned query and key
// e.g., fuzzyFilter([{ id: 1, organism: 'HOMO_SAPIENS' }, { id: 2, organism: 'ANOPHELES_GAMBIAE' }], 'organism', 'homosapi')
// Returns [{ id: 1, name: 'HOMO_SAPIENS' }]
export default (arr, key, query = '') => {
  if (!query) return arr

  const clean = (str) => {
    return str.toLowerCase().replace(/[_\s]/g, '')
  }

  const cleanedQuery = clean(query)

  return arr.filter((obj) => {
    const cleanedValue = clean(obj[key])
    return cleanedValue.includes(cleanedQuery)
  })
}
