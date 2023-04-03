// Returns true if the filter is selected, otherwise false
export default (filter, param, value) => {
  if (value) {
    return filter[param] ? filter[param].includes(value) : false
  }
  return param in filter
}
