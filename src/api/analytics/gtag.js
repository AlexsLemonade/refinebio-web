import { links, options } from 'config'
import formatFacetNames from 'helpers/formatFacetNames'
import formatFilterName from 'helpers/formatFilterName'

const { transformationHumanReadable: transformation } = options

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
    my_dataset_action: action
  })

const myDatasetDownloadOptions = (option) => {
  event('my_dataset_download_options', {
    my_dataset_download_options: `Aggregate: ${option[0]}, Transformation: ${
      transformation[option[1]]
    }, QN: ${option[2] === 'true' ? 'Not skipped' : 'Skipped'}
  `
  })
}

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
    regenerated_state: state,
    regenerated_download_options: `${format(defaultOptions)} ${
      newOptions ? `(new) ${format(newOptions)}` : ''
    }`
  })
}

const sharedDataset = (status) =>
  event('shared_dataset', { shared_state: status })

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

const outboundClick = (url, value) => {
  let parameter
  switch (true) {
    case url === links.alsf || url === links.ccdl:
      parameter = 'alsf_domain_name'
      break
    case url === links.ccdl_donate:
      parameter = 'donate_click_from'
      break
    case url.includes(links.refinebio_githubio):
      parameter = 'alsf_githubio_click_from'
      break
    case url.includes(links.alsf_github):
      parameter = 'alsf_repo_click_from'
      break
    case url.includes(links.refinebio_api_docs):
      parameter = 'api_docs_click_from'
      break
    case url.includes(links.refinebio_docs):
      parameter = 'docs_click_from'
      break
    case url.includes(links.ccdl_twitter):
      parameter = 'social_media'
      break
    default:
      break
  }

  event('click', {
    [parameter]: value
  })
}

/* --- Search --- */
const filterCombination = (facets, query) => {
  const filters = getSortedFilters(facets, query)
  const combination = getFilterCombination(filters)

  event('page_view', { filter_combination: combination })
}

const filterType = (type) => event('filter_type', { filter_type: type })

const toggleFilterItem = (item) =>
  event('toggled_filter_item', { toggled_filter_item: item })

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
