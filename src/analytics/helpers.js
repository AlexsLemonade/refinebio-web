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
  'click_dataset_action',
  'dataset_download',
  'set_dataset_download_options',
  'one_off_experiment_download',
  'regenerated_dataset',
  'shared_dataset',
  // Links
  'click_experiment_page',
  'click_explored_usage_link',
  'click_external_link',
  'click_internal_link',
  // Search
  'filter_type',
  'toggle_filter_item',
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
  'dataset_id',
  'experiment_accession_code',
  'regenerated_download_options_change',
  'regenerated_state',
  // Links
  'experiment_page_click_from',
  'explored_usage_link',
  'external_link',
  'internal_link',
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
        `Unsupported dimension names: ${unsupportedDimensions.join(', ')}`
      )
    }

    if (!supportedEvents.includes(eventName)) {
      throw new Error(`Unsupported event name: ${eventName}`)
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
  const changes = datasetOptionsKeys
    .map((key) => {
      const initialOption = getReadable(dataset[key])
      const regeneratedOption = getReadable(regeneratedDataset[key])

      return initialOption !== regeneratedOption
        ? `${initialOption} -> ${regeneratedOption}`
        : null
    })
    .filter(Boolean)

  return changes.length > 0 ? changes.join('|') : 'No change'
}

export const getDatasetState = (dataset) =>
  getReadable('expires_on', moment(dataset.expires_on).isBefore(Date.now()))

export const getFormattedDatasetOptions = (dataset) =>
  `${datasetOptionsKeys.map((key) => `${getReadable(dataset[key])}`).join('|')}`

// formats filter names in each facet
const formatFacets = (query) => {
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
