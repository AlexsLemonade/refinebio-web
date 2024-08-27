import getReadable from 'helpers/getReadable'
import {
  event,
  getDatasetOptionsChanges,
  getDatasetState,
  getFormattedDatasetOptions,
  getFilterCombination,
  getParameterForLink,
  getSnakeCase,
  getToggledFilterItem
} from './helpers'

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
  const key = 'quant_sf_only'
  const type = getReadable(key, compendia[key])
  const payload = {}
  payload[`${type}_organism`] = compendia.primary_organism_name
  event(`compendia_${type}_download`, payload)
}

/* --- Datasets --- */
// tracks user clicks on the dataset actions buttons
const trackDatasetAction = (Component) => {
  const payload = {}
  payload.my_dataset_action = Component.name
  event('my_dataset_action', payload)
}
// tracks the dataset download options selected by the user
const tracktrackDatasetDownloadOptions = (dataset) => {
  const payload = {}
  payload.my_dataset_download_options = getFormattedDatasetOptions(dataset)
  event('my_dataset_download_options', payload)
}
// tracks the number of dataset downloads associated with each token
const trackDatasetDownload = (token) => {
  const payload = {}
  payload.token = token
  event('dataset_downalod', token)
}
// tracks the number of one-off downloads associated with each accession code
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
// tracks user clicks on the share dataset button
const trackSharedDataset = () => {
  event('shared_dataset')
}

/* --- Links --- */
// tracks click-through to the experiment page from search results
// (via title and "View Samples" button)
const trackExperimentPageClick = (Component) => {
  const payload = {}
  payload.experiment_page_click_from = Component.name
  event('page_view', payload)
}
// tracks which "Explore what you can do with your dataset" link users click on
const trackExploredUsageClick = (linkLabel, Component) => {
  const payload = {}
  payload[`${getSnakeCase(Component.name)}_explored_usage`] = linkLabel
  event(`click`, payload)
}
// tracks the internal site navigation clicks
const trackNavClick = (item, Component) => {
  const payload = {}
  payload[`${getSnakeCase(Component.name)}_nav_item`] = item
  event(`page_view`, payload)
}
// tracks the outbound link clicks
const trackOutboundClick = (url) => {
  const linkName = getParameterForLink(url)
  // no event will be sent if no match
  if (!linkName) return

  const payload = {}
  payload[`click_to_${linkName}`] = url
  event('click', payload)
}

/* --- Search --- */
// tracks the most used filter combinations
const trackFilterCombination = (facets, query) => {
  const payload = {}
  payload.filter_combination = getFilterCombination(facets, query)
  event('page_view', payload)
}
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
// tracks the user-entered search terms
const trackSearchTerm = (term) => {
  const payload = {}
  payload.search_text = term
  event('search_text', payload)
}

export default {
  trackEmailSubscription,
  trackCompendiaDownload,
  trackDatasetAction,
  tracktrackDatasetDownloadOptions,
  trackDatasetDownload,
  trackOneOffExperimentDownload,
  trackRegeneratedDataset,
  trackSharedDataset,
  trackExperimentPageClick,
  trackExploredUsageClick,
  trackNavClick,
  trackOutboundClick,
  trackFilterCombination,
  trackFilterType,
  trackToggleFilterItem,
  trackSearchTerm
}
