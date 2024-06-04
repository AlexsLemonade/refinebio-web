import { useEffect, useState, useRef } from 'react'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { regex } from 'config'
import areValidAccessionCodes from 'helpers/areValidAccessionCodes'

// processingId: a processing dataset ID || a processing one-off experiment accession code
export const usePollDatasetStatus = (processingId) => {
  const { processingDatasets, setProcessingDatasets, getDataset } =
    useDatasetManager()
  const [polledDatasetState, setPolledDatasetState] = useState(false)
  const timerRef = useRef(null)

  // polls the latest state of the processing dataset per minute
  // (the processing usually takes a few minutes)
  useEffect(() => {
    if (getProcessingDataset()) {
      timerRef.current = setInterval(() => {
        refreshProcessingDataset()
      }, 1000 * 60)
    }
    return () => {
      clearInterval(timerRef.current)
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

  const isProcessingDataset = polledDatasetState?.is_processing

  const refreshProcessingDataset = async () => {
    const { datasetId } = getProcessingDataset()
    const response = await getDataset(datasetId)

    // TEMP: until the fetchAsync is refactored
    if (response?.ok !== false) {
      setPolledDatasetState(response)
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
    polledDatasetState,
    getProcessingDataset
  }
}
