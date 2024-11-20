import unionizeArrays from 'helpers/unionizeArrays'
// Returns the platform_names field from the samples array that matches
// the experiment data structure of the search endpoint
export default ({
  samples = [],
  pretty_platforms: prettyPlatforms = [],
  platform_names: platformNames = []
}) => {
  if (prettyPlatforms) return prettyPlatforms

  if (samples.length) {
    return unionizeArrays(...samples.map((sample) => sample.pretty_platform))
  }

  return platformNames
}
