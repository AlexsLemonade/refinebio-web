import { useEffect } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'
import { useDatasetManager } from 'hooks/useDatasetManager'

export const useOneOffExperiment = (experimentAccessionCode = null) => {
  const { processingExperiments, setProcessingExperiments } = useRefinebio()
  const { getDataset } = useDatasetManager()

  useEffect(() => {
    if (getProcessingExperiment(experimentAccessionCode)) {
      updateProcessingExperiments()
    }
  }, [])

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

  const updateProcessingExperiments = async () => {
    processingExperiments.forEach(async (experiment) => {
      const response = await getDataset(experiment.datasetId)
      if (!response.is_processing) {
        setProcessingExperiments((prev) =>
          prev.filter((item) => item.datasetId !== response.id)
        )
      }
    })
  }

  return {
    addProcessingExperiment,
    getProcessingExperiment,
    processingExperiments
  }
}
