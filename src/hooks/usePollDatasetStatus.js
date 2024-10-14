import { useEffect, useState, useRef } from 'react'
import { useDatasetManager } from 'hooks/useDatasetManager'

// takes either an accession code (one-off) or a dataset ID
export const usePollDatasetStatus = (accessionCodeOrDatasetId) => {
  const { datasetAccessions, processingDatasets, getDataset } =
    useDatasetManager()
  const [polledDatasetId, setPolledDatasetId] = useState(null)
  const [polledDatasetState, setPolledDatasetState] = useState(null)
  const timerRef = useRef(null)
  const [isProcessingDataset, setIsProcessingDataset] = useState(false)

  // starts polling the dataset status
  useEffect(() => {
    pollDatasetStatus()
  }, [])

  // polls the latest state of the processing dataset per minute
  // (the processing usually takes a few minutes)
  useEffect(() => {
    if (polledDatasetId) {
      clearInterval(timerRef.current) // clears the previous interval if any
      timerRef.current = setInterval(() => {
        refreshProcessingDataset()
      }, 1000 * 60)
    }
  }, [polledDatasetId])

  // stops the running timer when finished processing
  useEffect(() => {
    if (polledDatasetId && !isProcessingDataset) {
      clearInterval(timerRef.current)
    }
  }, [isProcessingDataset])

  // sets the dataset ID via the given accessionCodeOrDatasetId
  const pollDatasetStatus = () => {
    pollDatasetAccession(accessionCodeOrDatasetId)
    pollDatasetId(accessionCodeOrDatasetId)
  }

  // if one-off, sets the matched accession code's dataset ID to polledDatasetId
  const pollDatasetAccession = (accessionCode) => {
    if (accessionCode in datasetAccessions) {
      pollDatasetId(datasetAccessions[accessionCode])
    }
  }

  // sets the mached dataset ID to polledDatasetId
  const pollDatasetId = (datasetId) => {
    if (datasetId === polledDatasetId) return

    const isProcessing = processingDatasets.includes(datasetId)
    if (isProcessing) {
      setPolledDatasetId(datasetId)
    }
    setIsProcessingDataset(isProcessing)
  }

  const refreshProcessingDataset = async () => {
    const response = await getDataset(polledDatasetId)

    if (response.ok) {
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
