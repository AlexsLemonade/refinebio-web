import unionizeArrays from 'helpers/unionizeArrays'
// Returns the technology field from the samples array that matches
// the experiment data structure of the search endpoint
export default ({ samples = [], technology }) => {
  if (samples.length) {
    return unionizeArrays(
      ...samples.map((sample) => sample.technology.toUpperCase())
    )
  }
  return technology
}
