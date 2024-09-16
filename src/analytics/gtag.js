import formatString from 'helpers/formatString'
import {
  event,
  getDatasetOptionsChanges,
  getDatasetState,
  getFormattedDatasetOptions,
  getFilterCombination,
  getToggledFilterItem
} from 'analytics/helpers'

// NOTE: User-defined event parameters must be configured as custom definitions in the GA property.
// Please make sure they are registered if you create any new ones.

/* --- General --- */
// tracks email subscriptions and the user-subscribed location
const trackEmailSubscription = (Component) => {
  const payload = {}
  payload.subscription_click_from = Component.name
  event('email_subscription', payload)
}

/* --- Compendia --- */
// tracks the compendia downloads and organism names
const trackCompendiaDownload = (compendia) => {
  // if quant_sf_only is true, it's rna-seq, otherwise normalized compendia
  if (compendia.quant_sf_only) {
    trackDownloadRnaSeqCompendia(compendia)
  } else {
    trackDownloadNormalizedCompendia(compendia)
  }
}
// for RNA-req Sample compendia
const trackDownloadRnaSeqCompendia = (compendia) => {
  const payload = {}
  payload.rnaseq_organism = formatString(compendia.organism)
  event(`compendia_rnaseq_download`, payload)
}
// for Normalized compendia
const trackDownloadNormalizedCompendia = (compendia) => {
  const payload = {}
  payload.normalized_organism = formatString(compendia.organism)
  event(`compendia_normalized_download`, payload)
}

/* --- Datasets --- */
// tracks user clicks on the dataset actions buttons
const trackDatasetAction = (Component) => {
  const payload = {}
  payload.dataset_action = Component.name
  event('dataset_action', payload)
}
// tracks the number of dataset downloads by dataset ID
const trackDatasetDownload = (dataset) => {
  const payload = {}
  payload.dataset_id = dataset.id
  event('dataset_download', payload)
}
// tracks the dataset download options selected by the user
const trackDatasetDownloadOptions = (dataset) => {
  const payload = {}
  payload.dataset_download_options = getFormattedDatasetOptions(dataset)
  event('dataset_download_options', payload)
}
// tracks the number of one-off downloads by accession code
const trackOneOffExperimentDownload = (experiment) => {
  const payload = {}
  payload.one_off_experiment_download = experiment.accession_code
  event('one_off_experiment_download', payload)
}
// tracks the dataset's state (expired or valid) and changes in download options (initial and updated)
const trackRegeneratedDataset = (dataset, regeneratedDataset) => {
  const payload = {}
  payload.regenerated_state = getDatasetState(dataset)
  payload.dataset_download_option_changes = getDatasetOptionsChanges(
    dataset,
    regeneratedDataset
  )
  event('regenerated_dataset', payload)
}
// tracks user clicks on the share dataset button by dataset ID
const trackSharedDataset = (dataset) => {
  const payload = {}
  payload.dataset_id = dataset.id
  event('shared_dataset', payload)
}

/* --- Links --- */
// tracks click-through to the experiment page from search results
// used to create a report to differentiate which component users click
const trackExperimentPageClick = (Component) => {
  const payload = {}
  payload.experiment_page_click_from = Component.name
  event('page_view', payload)
}
// tracks the explore links that users click on after downloads
const trackExploredUsageClick = (link) => {
  // sets the dimension key for dataset or compendia usage
  const payload = {}
  payload.explored_usage_link = link
  event(`click`, payload)
}

// tracks internal and external link clicks
const trackLinks = (link) => {
  // sets the dimension key for internal or extrenal links
  const key = link.startWith('http')
    ? 'click_internal_link'
    : 'click_external_link'
  const payload = {}
  payload[key] = link
  event(`click`, payload)
}

/* --- Search --- */
// tracks the types of filters being used the most
// (i.e., organism, platform, technology)
const trackFilterType = (type) => {
  const payload = {}
  payload.filter_type = type
  event('filter_type', payload)
}
// tracks user-interactions with toggling filters on and off
const trackToggleFilterItem = (isChecked, item) => {
  const payload = {}
  payload.toggled_filter_item = getToggledFilterItem(isChecked, item)
  event('toggled_filter_item', payload)
}

const trackSearchQuery = (query) => {
  // tracks only the following items from the query
  const {
    downloadable_organism: organisms,
    technology,
    platform,
    search
  } = query

  if (search) trackSearchQueryTerm(query)

  if (organisms || technology || platform) {
    trackSearchQueryFilterCombination(query)
  }
}

// tracks the most used filter combinations
const trackSearchQueryFilterCombination = (query) => {
  const payload = {}
  payload.filter_combination = getFilterCombination(query)
  event('page_view', payload)
}

// tracks the user-entered search terms
const trackSearchQueryTerm = (query) => {
  const payload = {}
  payload.search_text = query.search
  event('search_text', payload)
}

export default {
  trackEmailSubscription,
  trackCompendiaDownload,
  trackDatasetAction,
  trackDatasetDownload,
  trackDatasetDownloadOptions,
  trackOneOffExperimentDownload,
  trackRegeneratedDataset,
  trackSharedDataset,
  trackExperimentPageClick,
  trackExploredUsageClick,
  trackLinks,
  trackFilterType,
  trackToggleFilterItem,
  trackSearchQuery
}
