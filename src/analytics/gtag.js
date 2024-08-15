import { links, options } from 'config'
import formatFacetNames from 'helpers/formatFacetNames'
import formatFilterName from 'helpers/formatFilterName'

const { transformation: defaultTransformation } = options
//  converts defaultTransformation to an object with { value: label } pair for quick lookup
// i.e., { NONE: 'None', MINMAX: 'Zero to One', STANDARD: 'Z-score' }
const transformation = defaultTransformation.reduce((acc, { label, value }) => {
  acc[value] = label
  return acc
}, {})

// adds a custom event to GA4
// https://developers.google.com/analytics/devguides/collection/ga4/events?client_type=gtag
const event = (eventName, value = {}, nonInteraction = false) => {
  window.gtag('event', eventName, {
    ...value,
    non_interaction: nonInteraction
  })
}

/* --- General --- */
const emailSubscription = (from) =>
  event('email_subscription', { subscription_click_from: from })

/* --- Compendia --- */
const compendiaDownload = (type, organism) =>
  event(`compendia_${type}_download`, {
    [`${type}_organism`]: organism
  })

/* --- Datasets --- */
const myDatasetAction = (action) =>
  event('my_dataset_action', {
    my_dataset_action: `${action[0].toUpperCase()}${action.substring(
      1
    )} Samples`
  })

const myDatasetDownloadOptions = (dataset) =>
  event('my_dataset_download_options', {
    my_dataset_download_options: `Aggregate: ${
      dataset.aggregate_by
    }, Transformation: ${transformation[dataset.scale_by]}, QN: ${
      dataset.quantile_normalize ? 'Skipped' : 'Not skipped'
    }
  `
  })

const datasetDownload = (token) => event('dataset_downalod', { token })

const oneOffExperimentDownload = (accessionCode) =>
  event('one_off_experiment_download', {
    one_off_experiment_download: accessionCode
  })

const regeneratedDataset = (state, defaultOptions, newOptions) => {
  // due to GA char limit, keys names are abbreviated
  const format = (option) => {
    return `A: ${option.aggregate_by}, T: ${
      transformation[option.scale_by]
    }, QN: ${option.quantile_normalize ? 'Not skipped' : 'Skipped'}`
  }

  event('regenerated_dataset', {
    regenerated_state: state ? 'Expired' : 'Valid',
    regenerated_download_options: `${format(defaultOptions)} ${
      newOptions ? `(new) ${format(newOptions)}` : ''
    }`
  })
}

const sharedDataset = (isProcessed) =>
  event('shared_dataset', {
    shared_state: isProcessed ? 'Processed' : 'Unprocessed'
  })

/* --- Links --- */
const experimentPageClick = (from) =>
  event('page_view', {
    experiment_page_click_from: from
  })

const exploredUsageClick = (usage, type = 'dataset') =>
  event(`click`, { [`${type}_explored_usage`]: usage })

const navClick = (item, type = 'global') =>
  event(`page_view`, {
    [`${type}_nav_item`]: item
  })

const outboundClick = (url) => {
  // if url starts with one of below links, sets linkName to its corresponding key
  const specialCases = [
    { name: 'alsf_github', value: links.alsf_github },
    { name: 'refinebio_githubio', value: links.refinebio_githubio },
    { name: 'refinebio_docs', value: links.refinebio_docs }
  ]
  const linkName =
    specialCases.find(({ value }) => url.startsWith(value))?.name ||
    Object.keys(links).find((key) => links[key] === url)

  // no event will be sent if no match
  if (!linkName) return

  const parameter = `click_to_${linkName}`

  event('click', {
    [parameter]: url
  })
}

/* --- Search --- */
const filterCombination = (facets, query) => {
  const filters = getSortedFilters(facets, query)
  const combination = getFilterCombination(filters)

  event('page_view', { filter_combination: combination })
}

const filterType = (type) => event('filter_type', { filter_type: type })

const toggleFilterItem = (checked, item) =>
  event('toggled_filter_item', {
    toggled_filter_item: `${checked ? 'Add' : 'Remove'} - ${item}`
  })

const searchTerm = (term) => event('search_text', { search_text: term })

// helpers
const getFilterCombination = (sortedFilters) => {
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

const getSortedFilters = (facets, query) => {
  const sort = (filter) => {
    const key = Object.keys(filter)[0]

    return Array.isArray(filter[key])
      ? filter[key]
          .map((item) => formatFilterName(key, item))
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      : formatFilterName(key, filter[key])
  }

  const [, o, p, t] = formatFacetNames(Object.keys(facets))
  const filters = {}
  for (const x of [o, p, t]) {
    if (query[x]) {
      filters[x] = sort({ [x]: query[x] })
    }
  }

  return { keys: [o, p, t], filters }
}

export default {
  emailSubscription,
  compendiaDownload,
  myDatasetAction,
  myDatasetDownloadOptions,
  datasetDownload,
  oneOffExperimentDownload,
  regeneratedDataset,
  sharedDataset,
  experimentPageClick,
  exploredUsageClick,
  navClick,
  outboundClick,
  filterCombination,
  filterType,
  toggleFilterItem,
  searchTerm
}
