// Returns the filter list obtained by a url query parameter
export const getQueryParam = (query) => {
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

// Returns true if the filter is selected, otherwise false
export const isChecked = (filter, param, value) => {
  if (value) {
    return filter[param] ? filter[param].includes(value) : false
  }
  return param in filter
}
