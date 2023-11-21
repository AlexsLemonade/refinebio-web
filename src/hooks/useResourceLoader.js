import { useEffect, useState } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'
import { useDatasetManager } from 'hooks/useDatasetManager'

// resourceId: the processing dataset ID || the processing experiment accession code for the one-off experiment
export const useResourceLoader = (resourceId, oneOffExperiment = false) => {
  const {
    processingDatasets,
    setProcessingDatasets,
    processingExperiments,
    setProcessingExperiments
  } = useRefinebio()
  const processingResources = oneOffExperiment
    ? processingExperiments
    : processingDatasets

  const setProcessingResources = oneOffExperiment
    ? setProcessingExperiments
    : setProcessingDatasets

  const { getDataset } = useDatasetManager()
  const [hasError, setHasError] = useState(false)
  const [latestDatasetState, setLatestDatasetState] = useState(false)
  let startTimer = false

  // fetches the latest dataset status of the processing resource on mount
  useEffect(() => {
    if (getProcessingResource(resourceId)) {
      refreshProcessingResource()
    }
  }, [])

  // polls the latest dataset status of the processing resource per minute
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

  // id: an experiment accession code or a dataset ID
  const getProcessingResource = (id) => {
    const keyToFind = oneOffExperiment ? 'accesionCode' : 'datasetId'
    const resource = processingResources.find((item) => item[keyToFind] === id)

    return resource
  }

  const isProcessingDataset = latestDatasetState?.is_processing

  const refreshProcessingResource = async () => {
    const { datasetId } = getProcessingResource(resourceId, oneOffExperiment)
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
