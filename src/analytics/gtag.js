import { links, options } from 'config'
import formatFacetNames from 'helpers/formatFacetNames'
import formatFilterName from 'helpers/formatFilterName'

// NOTE: User-defined event parameters must be configured as custom definitions in the GA property.
// Please make sure they are registered if you create any new ones.

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
// tracks email subscriptions and the user-subscribed location
const emailSubscription = (from) =>
  event('email_subscription', { subscription_click_from: from })

/* --- Compendia --- */
// tracks the compendia downloads and organism names
const compendiaDownload = (type, organism) =>
  event(`compendia_${type}_download`, {
    [`${type}_organism`]: organism
  })

/* --- Datasets --- */
// tracks user clicks on the dataset actions buttons
const myDatasetAction = (action) =>
  event('my_dataset_action', {
    my_dataset_action: `${action[0].toUpperCase()}${action.substring(
      1
    )} Samples`
  })

// tracks the dataset download options selected by the user
const myDatasetDownloadOptions = (dataset) =>
  event('my_dataset_download_options', {
    my_dataset_download_options: getFormattedDatasetOptions(dataset)
  })

// tracks the number of dataset downloads associated with each token
const datasetDownload = (token) => event('dataset_downalod', { token })

// tracks the number of one-off downloads associated with each accession code
const oneOffExperimentDownload = (accessionCode) =>
  event('one_off_experiment_download', {
    one_off_experiment_download: accessionCode
  })

// tracks the dataset's state (expired or valid) and changes in download options (initial and updated)
const regeneratedDataset = (isExpired, defaultOptions, newOptions) => {
  event('regenerated_dataset', {
    regenerated_state: isExpired ? 'Expired' : 'Valid',
    regenerated_download_options: `${getFormattedDatasetOptions(
      defaultOptions
    )} ${newOptions ? `(new) ${getFormattedDatasetOptions(newOptions)}` : ''}`
  })
}

// tracks user clicks on the share dataset button
const sharedDataset = (isProcessed) =>
  event('shared_dataset', {
    shared_state: isProcessed ? 'Processed' : 'Unprocessed'
  })

// helper
const getFormattedDatasetOptions = (dataset) => {
  // due to GA char limit, keys names are abbreviated
  return `A: ${dataset.aggregate_by}, T: ${
    transformation[dataset.scale_by]
  }, QN: ${dataset.quantile_normalize ? 'Not skipped' : 'Skipped'}`
}

/* --- Links --- */
// tracks click-through to the experiment page from search results (via title and "View Samples" button)
const experimentPageClick = (from) =>
  event('page_view', {
    experiment_page_click_from: from
  })

// tracks which "Explore what you can do with your dataset" link users click on (via dataset and compendia after download)
const exploredUsageClick = (usage, type = 'dataset') =>
  event(`click`, { [`${type}_explored_usage`]: usage })

// tracks the global navigation clicks
const navClick = (item, type = 'global') =>
  event(`page_view`, {
    [`${type}_nav_item`]: item
  })

// tracks the outbound link clicks
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
// tracks the most used filter combinations
const filterCombination = (facets, query) => {
  const filters = getSortedFilters(facets, query)
  const combination = getFilterCombination(filters)

  event('page_view', { filter_combination: combination })
}

// tracks the types of filters being used the most (i.e., organism, platform, technology)
const filterType = (type) => event('filter_type', { filter_type: type })

// tracks user-interactions with toggling filters on and off
const toggleFilterItem = (isChecked, item) =>
  event('toggled_filter_item', {
    toggled_filter_item: `${isChecked ? 'Add' : 'Remove'} - ${item}`
  })

// tracks the user-entered search terms
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
