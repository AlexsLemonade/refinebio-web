import { useEffect } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'
import { useDatasetManager } from 'hooks/useDatasetManager'

export const useOneOffExperiment = (experimentAccessionCode = null) => {
  const { processingExperiments, setProcessingExperiments } = useRefinebio()
  const { getDataset } = useDatasetManager()
  let startTimer = false

  useEffect(() => {
    if (getProcessingExperiment(experimentAccessionCode)) {
      refreshProcessingExperiment()
    }
  }, [])

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

  const addProcessingExperiment = (accessionCode, datasetId) => {
    setProcessingExperiments([
      ...processingExperiments,
      { accessionCode, datasetId }
    ])
  }

  const getProcessingExperiment = (accessionCode) => {
    if (!accessionCode || !processingExperiments.length) return null

    const [experiment] = processingExperiments.filter(
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
    getProcessingExperiment,
    processingExperiments
  }
}
