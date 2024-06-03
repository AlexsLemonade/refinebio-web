import { useEffect, useState } from 'react'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { regex } from 'config'
import areValidAccessionCodes from 'helpers/areValidAccessionCodes'

// processingId: a processing dataset ID || a processing one-off experiment accession code
export const usePollDatasetStatus = (processingId) => {
  const { processingDatasets, setProcessingDatasets, getDataset } =
    useDatasetManager()
  const [latestPollDatasetState, setLatestPollDatasetState] = useState(false)

  // polls the latest state of the processing dataset per minute
  // (the processing usually takes a few minutes)
  useEffect(() => {
    let timerId = null
    if (getProcessingDataset()) {
      timerId = setInterval(() => {
        refreshProcessingDataset()
      }, 1000 * 60)
    }
    return () => {
      clearInterval(timerId)
    }
  }, [processingDatasets])

  // returns a mached processing dataset using id (either dataset ID or accession code)
  const getProcessingDataset = (id = processingId) =>
    processingDatasets.find(
      (item) =>
        item[
          areValidAccessionCodes(processingId, regex) ? 'ac' : 'datasetId'
        ] === id
    )

  const isProcessingDataset = latestPollDatasetState?.is_processing

  const refreshProcessingDataset = async () => {
    const { datasetId } = getProcessingDataset()
    const response = await getDataset(datasetId)

    // TEMP: until the fetchAsync is refactored
    if (response?.ok !== false) {
      setLatestPollDatasetState(response)
    }

    if (!response.is_processing) {
      setProcessingDatasets((prev) =>
        prev.filter((item) => item.datasetId !== response.id)
      )
    }

    return response
  }

  return {
    isProcessingDataset,
    latestPollDatasetState,
    getProcessingDataset
  }
}
