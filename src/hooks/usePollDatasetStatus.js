import { useEffect, useState, useRef } from 'react'
import { useDatasetManager } from 'hooks/useDatasetManager'

// takes either an accession code or a dataset ID to poll / check status
export const usePollDatasetStatus = (accessionOrId) => {
  const { datasetAccessions, processingDatasets, getDataset } =
    useDatasetManager()
  const [polledDatasetId, setPolledDatasetId] = useState(null)
  const [polledDatasetState, setPolledDatasetState] = useState(null)
  const timerRef = useRef(null)
  const [isProcessingDataset, setIsProcessingDataset] = useState(false)

  // starts polling the dataset status
  useEffect(() => {
    if (accessionOrId in datasetAccessions) {
      pollDatasetId(datasetAccessions[accessionOrId])
    }
    if (processingDatasets.includes(accessionOrId)) {
      pollDatasetId(accessionOrId)
    }
  }, [accessionOrId, processingDatasets])

  // polls the latest dataset status per minute
  // (the processing usually takes a few minutes)
  useEffect(() => {
    if (polledDatasetId && isProcessingDataset) {
      clearInterval(timerRef.current) // clears the previous interval if any
      timerRef.current = setInterval(() => {
        refreshProcessingDataset()
      }, 1000 * 60)
    } else {
      //  stops the interval when processing is finished
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current)
  }, [polledDatasetId, isProcessingDataset, processingDatasets])

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
    setPolledDatasetState(response)
    setIsProcessingDataset(response.is_processing)

    return response
  }

  return {
    isProcessingDataset,
    polledDatasetState
  }
}
