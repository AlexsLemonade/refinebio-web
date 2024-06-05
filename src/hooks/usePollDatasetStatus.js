import { useEffect, useState, useRef } from 'react'
import { useDatasetManager } from 'hooks/useDatasetManager'

export const usePollDatasetStatus = () => {
  const {
    datasetAccessions,
    setDatasetAccessions,
    processingDatasets,
    setProcessingDatasets,
    getDataset
  } = useDatasetManager()
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

  // if one-off, sets the matched accession code's dataset ID to polledDatasetId
  const pollDatasetAccession = (accessionCode) => {
    if (Object.hasOwn(datasetAccessions, accessionCode)) {
      pollDatasetId(datasetAccessions[accessionCode])
    }
  }

  // sets the mached dataset ID to polledDatasetId
  const pollDatasetId = (datasetId) => {
    if (processingDatasets.includes(datasetId)) setPolledDatasetId(datasetId)
  }

  // removes the processing dataset ID when finish processing
  const removeProcessingDataset = (datasetId = polledDatasetId) => {
    // if one-off, removes the property from datasetAccessions
    const keyToFRemove = Object.keys(datasetAccessions).find(
      (k) => datasetAccessions[k] === datasetId
    )
    if (keyToFRemove) {
      setDatasetAccessions((prev) => {
        const temp = { ...prev }
        delete temp[keyToFRemove]

        return temp
      })
    }

    setProcessingDatasets((prev) => prev.filter((id) => id !== datasetId))
    setPolledDatasetId(null) // removes polledDatasetId to stop the running timer
  }

  const refreshProcessingDataset = async () => {
    const response = await getDataset(polledDatasetId)
    // TEMP: until the fetchAsync is refactored
    if (response?.ok !== false) {
      setPolledDatasetState(response)
    }

    if (!response.is_processing) {
      removeProcessingDataset()
    }

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
