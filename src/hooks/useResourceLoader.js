import { useEffect, useState } from 'react'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useRefinebio } from 'hooks/useRefinebio'

// resourceId: a processing dataset ID || a processing experiment accession code for the one-off experiment
export const useResourceLoader = (resourceId, oneOffExperiment = false) => {
  const { getDataset } = useDatasetManager()
  const { processingResources, setProcessingResources } = useRefinebio()
  const [hasError, setHasError] = useState(false)
  const [latestDatasetState, setLatestDatasetState] = useState(false)
  let startTimer = false

  // fetches the latest state of the processing resource on mount
  useEffect(() => {
    if (getProcessingResource(resourceId)) {
      refreshProcessingResource()
    }
  }, [])

  // polls the latest state of the processing resource per minute
  // (the processing usually takes a few minutes)
  useEffect(() => {
    let timerId = null
    if (!startTimer && getProcessingResource(resourceId)) {
      timerId = setInterval(() => {
        startTimer = true
        refreshProcessingResource()
      }, 1000 * 60)
    }
    return () => {
      if (startTimer) {
        clearInterval(timerId)
      }
    }
  }, [startTimer, processingResources])

  // data structure {  datasetId: processingDatasetId, accesionCode: experimentAccessionCode || null }
  const addProcessingResource = (datasetId, accesionCode = null) => {
    setProcessingResources((prev) => {
      if (prev.find((item) => item.datasetId === datasetId)) return prev

      return [...processingResources, { datasetId, accesionCode }]
    })
  }

  // id: a dataset ID || an experiment accession code
  const getProcessingResource = (id) => {
    const keyToFind = oneOffExperiment ? 'accesionCode' : 'datasetId'
    const resource = processingResources.find((item) => item[keyToFind] === id)

    return resource
  }

  const isProcessingDataset = latestDatasetState?.is_processing

  const refreshProcessingResource = async () => {
    const { datasetId } = getProcessingResource(resourceId)
    const response = await getDataset(datasetId)

    setHasError(response?.ok === false)
    setLatestDatasetState(response)

    if (!response.is_processing) {
      setProcessingResources((prev) =>
        prev.filter((item) => item.datasetId !== response.id)
      )
    }

    return response
  }

  return {
    hasError,
    isProcessingDataset,
    latestDatasetState,
    processingResources,
    addProcessingResource,
    getProcessingResource
  }
}
