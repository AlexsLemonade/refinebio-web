import { useEffect, useState } from 'react'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useRefinebio } from 'hooks/useRefinebio'
import { regex } from 'config'
import areValidAccessionCodes from 'helpers/areValidAccessionCodes'

// processingId: a processing dataset ID || a processing one-off experiment accession code
export const usePollDatasetStatus = (processingId) => {
  const { getDataset } = useDatasetManager()
  const { processingDatasets, setProcessingDatasets } = useRefinebio()
  const [latestPollDatasetState, setLatestPollDatasetState] = useState(false)

  // fetches the latest state of the processing dataset on mount
  useEffect(() => {
    if (getProcessingDataset()) {
      refreshProcessingDataset()
    }
  }, [])

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

  // { datasetId: processing dataset ID, accessionCode:  a processing one-off experiment accession code || '' }
  const addProcessingDataset = (datasetId, accessionCode = '') => {
    setProcessingDatasets((prev) => {
      if (prev.find((item) => item.datasetId === datasetId)) return prev

      return [...processingDatasets, { datasetId, accessionCode }]
    })
  }

  // returns a mached processing dataset using id (either dataset ID or accession code)
  const getProcessingDataset = (id = processingId) =>
    processingDatasets.find(
      (item) =>
        item[
          areValidAccessionCodes(processingId, regex)
            ? 'accessionCode'
            : 'datasetId'
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
    processingDatasets,
    addProcessingDataset,
    getProcessingDataset
  }
}
