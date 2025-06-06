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
const trackEmailSubscription = (componentName) => {
  const payload = {}
  payload.subscription_click_from = componentName
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
  payload.rnaseq_organism = formatString(compendia.primary_organism_name)
  event(`compendia_rnaseq_download`, payload)
}
// for Normalized compendia
const trackDownloadNormalizedCompendia = (compendia) => {
  const payload = {}
  payload.normalized_organism = formatString(compendia.primary_organism_name)
  event(`compendia_normalized_download`, payload)
}

/* --- Datasets --- */
// tracks user clicks on the dataset actions buttons
const trackDatasetAction = (componentName) => {
  const payload = {}
  payload.dataset_action = componentName
  event('click_dataset_action', payload)
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
  event('set_dataset_download_options', payload)
}
// tracks the number of one-off downloads by accession code
const trackOneOffExperimentDownload = (experiment) => {
  const payload = {}
  payload.experiment_accession_code = experiment.accession_code
  event('one_off_experiment_download', payload)
}
// tracks the dataset's state (expired or valid) and download options change (initial and updated)
const trackRegeneratedDataset = (dataset, regeneratedDataset) => {
  const payload = {}
  payload.regenerated_state = getDatasetState(dataset)
  payload.regenerated_download_options_change = getDatasetOptionsChanges(
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
const trackExperimentPageClick = (componentName) => {
  const payload = {}
  payload.experiment_page_click_from = componentName
  event('click_experiment_page', payload)
}
// tracks the explore links that users click on after downloads
const trackExploredUsageClick = (link) => {
  // sets the dimension key for dataset or compendia usage
  const payload = {}
  payload.explored_usage_link = link
  event(`click_explored_usage_link`, payload)
}
// tracks internal and external link clicks
const trackLink = (link) => {
  if (link.startsWith('http')) {
    trackExternalClick(link)
  } else {
    trackInternalClick(link)
  }
}
// for outbounds
const trackExternalClick = (link) => {
  const payload = {}
  payload.external_link = link
  event('click_external_link', payload)
}
// for internal navigations
const trackInternalClick = (link) => {
  const payload = {}
  payload.internal_link = link
  event('click_internal_link', payload)
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
  event('toggle_filter_item', payload)
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
  trackLink,
  trackFilterType,
  trackToggleFilterItem,
  trackSearchQuery
}
