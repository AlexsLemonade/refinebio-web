import { useContext } from 'react'
import { RefinebioContext } from 'contexts/RefinebioContext'

export const useRefinebio = () => {
  const {
    dataset,
    setDataset,
    datasetAccessions,
    setDatasetAccessions,
    datasetId,
    setDatasetId,
    email,
    setEmail,
    processingDatasets,
    setProcessingDatasets,
    requestedExperiments,
    setRequestedExperiments,
    acceptedTerms,
    token,
    createToken
  } = useContext(RefinebioContext)

  return {
    dataset,
    setDataset,
    datasetAccessions,
    setDatasetAccessions,
    datasetId,
    setDatasetId,
    email,
    setEmail,
    processingDatasets,
    setProcessingDatasets,
    requestedExperiments,
    setRequestedExperiments,
    acceptedTerms,
    token,
    createToken
  }
}
