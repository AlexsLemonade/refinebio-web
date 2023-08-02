// Formats platform names in the frontend
// https://github.com/AlexsLemonade/refinebio/blob/eab6d04387fe76fe6c56f15cb8c51e85bd5e8de7/api/data_refinery_api/serializers.py#L320-L326
export const formatPlatformName = (platformName) => {
  if (!platformName) return ''
  if (platformName.includes(']')) {
    const [accessionCode, name] = platformName.split(']')
    const formattedAccessionCode = accessionCode
      .substr(1)
      .toLowerCase()
      .replace(/[-_\s]/g, '')
    return `${name} (${formattedAccessionCode})`
  }
  return platformName
}
