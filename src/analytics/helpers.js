import moment from 'moment'
import formatFilterName from 'helpers/formatFilterName'
import formatString from 'helpers/formatString'
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
  // General
  'subscription_click_from',
  // Compendia
  'normalized_organism',
  'rnaseq_organism',
  // Dataset
  'dataset_action',
  'dataset_download_options',
  'dataset_download_option_changes',
  'dataset_id',
  'one_off_experiment_download',
  'regenerated_state',
  // Links
  'click_external_link',
  'click_internal_link',
  'experiment_page_click_from',
  'explored_usage_link',
  // Search
  'filter_combination',
  'filter_type',
  'toggled_filter_item',
  'search_text'
]
export const event = (eventName, value = {}, nonInteraction = false) => {
  try {
    // throws an error if the given eventName or any dimension name is unsupported
    const unsupportedDimensions = Object.keys(value).filter(
      (key) => !supportedDimensions.includes(key)
    )
    if (unsupportedDimensions.length > 0) {
      throw new Error(
        `The dimension name${unsupportedDimensions.join()} is unsupported`
      )
    }

    if (!supportedEvents.includes(eventName)) {
      throw new Error(`The event name ${eventName} is unsupported`)
    }

    window.gtag('event', eventName, {
      ...value,
      non_interaction: nonInteraction
    })
  } catch (error) {
    console.error('Error sending event to GA4', error)
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

export const getFormattedOrganismName = (organism) => formatString(organism)

// formats filter names in each facet
const formatFacets = (query) => {
  // tracks only the following items from the query
  const { downloadable_organism: organisms, technology, platform } = query

  return Object.entries({ organisms, technology, platform })
    .filter(([, value]) => value)
    .map(([key, value]) =>
      (Array.isArray(value) ? value : [value]).map((item) =>
        formatFilterName(key, item)
      )
    )
}

export const getFilterCombination = (query) => {
  return formatFacets(query)
    .map((facet) => facet.sort().join())
    .join('|')
}

export const getToggledFilterItem = (isChecked, item) =>
  `${getReadable('checked', isChecked)}${item}`
