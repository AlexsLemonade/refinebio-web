import moment from 'moment'
// Returns the dataset lifecycle state variables for the UI rendering
export default (dataset) => {
  const {
    expires_on: expiredOn,
    is_available: isAvailable,
    is_processed: isProcessed,
    is_processing: isProcessing,
    success
  } = dataset

  const isExpired = moment(expiredOn).isBefore(Date.now())
  const isComplete = isProcessed && isAvailable && success
  const isProcessingError = success === false

  return {
    // mutable
    isNotProcessed: !isComplete && success === null, // unprocessed and editable
    // immutable
    isProcessing: isProcessing && !isProcessingError, // currently being processed
    isProcessingError, // failed during processing
    isReady: isComplete && !isExpired, // available for download
    isRegenerative: isComplete && isExpired // available for regenerative download
  }
}
