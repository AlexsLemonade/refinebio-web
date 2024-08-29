import moment from 'moment'
import formatFilterName from 'helpers/formatFilterName'
import getReadable from 'helpers/getReadable'

const datasetOptionsKeys = ['aggregate_by', 'scale_by', 'quantile_normalize']

// adds a custom event to GA4
// https://developers.google.com/analytics/devguides/collection/ga4/events?client_type=gtag
const genericEvents = ['click', 'page_view']
const supportedEvents = [
  ...genericEvents,
  // General
  'email_subscription',
  // Compendia
  'compendia_rnaseq_download',
  'compendia_normalized_download',
  // Dataset
  'dataset_download',
  'dataset_action',
  'dataset_download_options',
  'one_off_experiment_download',
  'regenerated_dataset',
  'shared_dataset',
  // Search
  'filter_type',
  'toggled_filter_item',
  'search_text'
]
const supportedDimensions = [
  // Links
  'click_external_link',
  'click_internal_link',
  'compendia_explored_usage',
  'dataset_explored_usage'
]
export const event = (eventName, value = {}, nonInteraction = false) => {
  try {
    // throws an error if the given eventName or any dimension name is unsupported
    const unsupportedDimensions = Object.keys(value).filter(
      (key) => !supportedDimensions.includes(key)
    )
    if (unsupportedDimensions.length > 0) {
      throw new Error(`Unsupported dimensions: ${unsupportedDimensions.join()}`)
    }

    if (!supportedEvents.includes(eventName)) {
      throw new Error(`Unsupported event: ${eventName}`)
    }

    window.gtag('event', eventName, {
      ...value,
      non_interaction: nonInteraction
    })
  } catch (error) {
    console.error('Error sending event to GA4:', error)
  }
}

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

// formats filter names for each facet
const formatFacets = (query) => {
  // tracks only the following items from the query
  const { downloadable_organism: organisms, technology, platform } = query

  return [{ organisms }, { technology }, { platform }]
    .map((facet) => {
      const [key, items] = Object.entries(facet)[0]

      return Array.isArray(items)
        ? items.map((item) => formatFilterName(key, item))
        : [formatFilterName(key, items)]
    })
    .filter(Boolean) // makes sure to exclude undefined
}

export const getFilterCombination = (query) => {
  return formatFacets(query)
    .map((facet) => facet.sort().join())
    .join('|')
}

export const getToggledFilterItem = (isChecked, item) =>
  `${getReadable('checked', isChecked)}${item}`
