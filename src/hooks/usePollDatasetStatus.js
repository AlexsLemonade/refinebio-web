import { useEffect, useState, useRef } from 'react'
import { useDatasetManager } from 'hooks/useDatasetManager'

export const usePollDatasetStatus = () => {
  const { processingDatasets, setProcessingDatasets, getDataset } =
    useDatasetManager()
  const [polledDatasetId, setPolledDatasetId] = useState(null)
  const [polledDatasetState, setPolledDatasetState] = useState(false)
  const timerRef = useRef(null)
  const isProcessingDataset = polledDatasetState?.is_processing

  // polls the latest state of the processing dataset per minute
  // (the processing usually takes a few minutes)
  useEffect(() => {
    if (polledDatasetId) {
      timerRef.current = setInterval(() => {
        refreshProcessingDataset()
      }, 1000 * 60)
    }

    return () => clearInterval(timerRef.current)
  }, [polledDatasetId])

  // sets the mached dataset ID in processingDatasets
  const pollDatasetId = (datasetId) => {
    if (processingDatasets.includes(datasetId)) setPolledDatasetId(datasetId)
  }

  const removeProcessingDataset = (datasetId) => {
    setProcessingDatasets((prev) => prev.filter((id) => id !== datasetId))
  }

  const refreshProcessingDataset = async () => {
    const response = await getDataset(polledDatasetId)
    // TEMP: until the fetchAsync is refactored
    if (response?.ok !== false) {
      setPolledDatasetState(response)
    }

    if (!response.is_processing) {
      // remove polledDatasetId
      removeProcessingDataset(polledDatasetId)
      setPolledDatasetId(null)
    }

    return response
  }

  return {
    isProcessingDataset,
    polledDatasetState,
    pollDatasetId
  }
}
