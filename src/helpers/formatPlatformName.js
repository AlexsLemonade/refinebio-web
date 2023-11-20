import { cache } from 'config'

// Formats platform names in the frontend
// https://github.com/AlexsLemonade/refinebio/blob/eab6d04387fe76fe6c56f15cb8c51e85bd5e8de7/api/data_refinery_api/serializers.py#L320-L326
export default (platformName) => {
  if (!platformName) return ''

  const formattedPlatformName = cache.platforms[platformName] || platformName

  if (formattedPlatformName.includes(']')) {
    const [accessionCode, name] = formattedPlatformName.split(']')
    const formattedAccessionCode = accessionCode
      .substr(1)
      .toLowerCase()
      .replace(/[-_\s]/g, '')

    return `${name} (${formattedAccessionCode})`
  }

  return formattedPlatformName
}
