import isArray from 'helpers/isArray'
// Make the query parameters for API calls based on the given object 'params'
export default (params) => {
  return Object.keys(params)
    .filter((key) => params[key] !== undefined)
    .reduce((accum, key) => {
      // e.g.) { downloadable_organism: ['HOMO_SAPIENS', 'MUS_MUSCULUS']) }
      if (isArray(params[key])) {
        return accum.concat(
          params[key].map((value) => `${key}=${encodeURI(value)}`)
        )
      }
      // e.g.) { has_publication: true }
      accum.push(`${key}=${encodeURI(params[key])}`)
      return accum
    }, [])
    .join('&')
}
