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
  const isComplete = isProcessed && isAvailable && success // successfully processed
  const isProcessingError = success === false // failed during processing

  return {
    // mutable
    isNotProcessed: !isComplete && success === null, // unprocessed and editable
    // immutable
    isProcessing: isProcessing && !isProcessingError, // currently being processed
    isProcessingError,
    isReady: isComplete && !isExpired, // available for download
    isReadyExpired: isComplete && isExpired // available for regenerative download
  }
}
