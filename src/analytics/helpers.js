import moment from 'moment'
import { links } from 'config'
import formatFacetNames from 'helpers/formatFacetNames'
import formatFilterName from 'helpers/formatFilterName'
import getReadable from 'helpers/getReadable'

const datasetOptionsKeys = ['aggregate_by', 'scale_by', 'quantile_normalize']

// adds a custom event to GA4
// https://developers.google.com/analytics/devguides/collection/ga4/events?client_type=gtag
export const event = (eventName, value = {}, nonInteraction = false) => {
  window.gtag('event', eventName, {
    ...value,
    non_interaction: nonInteraction
  })
}

// formats a given string to snake_case for event parameters
export const getSnakeCase = (str) =>
  str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()

export const getDatasetOptionsChanges = (dataset, regeneratedDataset) => {
  const changes = datasetOptionsKeys.map((key) => {
    return `${getReadable(key, dataset[key])} -> ${getReadable(
      key,
      regeneratedDataset[key]
    )}`
  })
  return changes.join('|')
}

export const getDatasetState = (dataset) =>
  getReadable('expires_on', moment(dataset.expires_on).isBefore(Date.now()))

export const getFormattedDatasetOptions = (dataset) =>
  `${datasetOptionsKeys
    .map((key) => `${getReadable(key, dataset[key])}`)
    .join('|')}`

export const getFilterCombination = (facets, query) => {
  const sortedFilters = getSortedFilters(facets, query)
  const { keys, filters } = sortedFilters
  let formattedFilters = ''
  // due to GA char limit, keys names are abbreviated
  for (const x of keys) {
    if (filters[x]) {
      formattedFilters = `${formattedFilters}[${
        x === keys[0] ? 'O' : x[0].toUpperCase()
      }]:${filters[x]} `
    }
  }

  return formattedFilters
}

export const getParameterForLink = (url) => {
  // if url starts with one of below links, sets linkName to its corresponding key
  const specialCases = [
    { name: 'alsf_github', value: links.alsf_github },
    { name: 'refinebio_githubio', value: links.refinebio_githubio },
    { name: 'refinebio_docs', value: links.refinebio_docs }
  ]
  return (
    specialCases.find(({ value }) => url.startsWith(value))?.name ||
    Object.keys(links).find((key) => links[key] === url)
  )
}

export const getSortedFilters = (facets, query) => {
  const sort = (filter) => {
    const key = Object.keys(filter)[0]

    return Array.isArray(filter[key])
      ? filter[key]
          .map((item) => formatFilterName(key, item))
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      : formatFilterName(key, filter[key])
  }
  //  the first facet item, 'has_publication', is excluded from the data collection
  const [, organismFacet, platformFacet, technologyFacet] = formatFacetNames(
    Object.keys(facets)
  )
  const filters = {}
  for (const item of [organismFacet, platformFacet, technologyFacet]) {
    if (query[item]) {
      filters[item] = sort({ [item]: query[item] })
    }
  }

  return { keys: [organismFacet, platformFacet, technologyFacet], filters }
}

export const getToggledFilterItem = (isChecked, item) =>
  `${isChecked ? 'Add' : 'Remove'} - ${item}`
