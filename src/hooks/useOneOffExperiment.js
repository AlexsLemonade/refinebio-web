import { useEffect } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'
import { useDatasetManager } from 'hooks/useDatasetManager'

// make sure to pass the experiment accession code for the search card
export const useOneOffExperiment = (experimentAccessionCode = null) => {
  const { processingExperiments, setProcessingExperiments } = useRefinebio()
  const { getDataset } = useDatasetManager()
  let startTimer = false

  // fetches the latest dataset status of the processing experiment on mount
  useEffect(() => {
    if (getProcessingExperiment(experimentAccessionCode)) {
      refreshProcessingExperiment()
    }
  }, [])

  // polls the latest dataset status of the processing experiment per minute
  // (the processing usually takes a few minutes)
  useEffect(() => {
    let timerId = null
    if (!startTimer && getProcessingExperiment(experimentAccessionCode)) {
      timerId = setInterval(() => {
        startTimer = true
        refreshProcessingExperiment()
      }, 1000 * 60)
    }
    return () => {
      if (startTimer) {
        clearInterval(timerId)
      }
    }
  }, [startTimer, processingExperiments])

  // data structure { accesionCode: experimentAccessionCode, datasetId: datasetIdForOneOffExperiment }
  const addProcessingExperiment = (accessionCode, datasetId) => {
    setProcessingExperiments([
      ...processingExperiments,
      { accessionCode, datasetId }
    ])
  }

  const getProcessingExperiment = (accessionCode) => {
    if (!accessionCode || !processingExperiments.length) return null

    const experiment = processingExperiments.find(
      (item) => item.accessionCode === accessionCode
    )
    return experiment
  }

  const refreshProcessingExperiment = async () => {
    const { datasetId } = getProcessingExperiment(experimentAccessionCode)
    const response = await getDataset(datasetId)
    if (!response.is_processing) {
      setProcessingExperiments((prev) =>
        prev.filter((item) => item.datasetId !== response.id)
      )
    }
  }

  return {
    addProcessingExperiment,
    getProcessingExperiment
  }
}
