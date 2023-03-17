import { isArray } from 'helpers/isArray'

// Returns the checked filter list obtained by a url query parameter
export const getDefaultCheckedFilter = (query) => {
  const temp = []
  Object.keys(query).forEach((key) => {
    if (key === 'has_publication') {
      temp.push(key)
    } else if (isArray(query[key])) {
      temp.push(...query[key])
    } else {
      temp.push(query[key])
    }
  })
  return temp
}

// Returns the filter list obtained by a url query parameter
export const getDefaultFilter = (query) => {
  const temp = {}
  Object.keys(query).forEach((key) => {
    if (typeof query[key] === 'string') {
      temp[key] = [query[key]]
    } else {
      temp[key] = query[key]
    }
  })

  return temp
}
