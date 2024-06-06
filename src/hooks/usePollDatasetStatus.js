import { useEffect, useState, useRef } from 'react'
import { useDatasetManager } from 'hooks/useDatasetManager'

export const usePollDatasetStatus = () => {
  const { datasetAccessions, processingDatasets, getDataset } =
    useDatasetManager()
  const [polledDatasetId, setPolledDatasetId] = useState(null)
  const [polledDatasetState, setPolledDatasetState] = useState(null)
  const timerRef = useRef(null)
  const [isProcessingDataset, setIsProcessingDataset] = useState(false)

  // polls the latest state of the processing dataset per minute
  // (the processing usually takes a few minutes)
  useEffect(() => {
    if (polledDatasetId) {
      timerRef.current = setInterval(() => {
        refreshProcessingDataset()
      }, 1000 * 60)
    }
  }, [polledDatasetId])

  // stops the running timer when finished processing
  useEffect(() => {
    if (polledDatasetId && !isProcessingDataset) {
      setPolledDatasetId(null)
      clearInterval(timerRef.current)
    }
  }, [isProcessingDataset])

  // if one-off, sets the matched accession code's dataset ID to polledDatasetId
  const pollDatasetAccession = (accessionCode) => {
    if (Object.hasOwn(datasetAccessions, accessionCode)) {
      pollDatasetId(datasetAccessions[accessionCode])
    }
  }

  // sets the mached dataset ID to polledDatasetId
  const pollDatasetId = (datasetId) => {
    const isProcessing = processingDatasets.includes(datasetId)
    if (isProcessing) {
      setPolledDatasetId(datasetId)
    }
    setIsProcessingDataset(isProcessing)
  }

  const refreshProcessingDataset = async () => {
    const response = await getDataset(polledDatasetId)
    // TEMP: until the fetchAsync is refactored
    if (response?.ok !== false) {
      setPolledDatasetState(response)
    }

    setIsProcessingDataset(response.is_processing)

    return response
  }

  return {
    datasetAccessions,
    isProcessingDataset,
    polledDatasetState,
    pollDatasetAccession,
    pollDatasetId
  }
}
