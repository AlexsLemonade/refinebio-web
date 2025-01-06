import { useContext } from 'react'
import { RefinebioContext } from 'contexts/RefinebioContext'

export const useRefinebio = () => {
  const {
    myDataset,
    setMyDataset,
    datasetAccessions,
    setDatasetAccessions,
    myDatasetId,
    setMyDatasetId,
    email,
    setEmail,
    processingDatasets,
    setProcessingDatasets,
    requestedExperiments,
    setRequestedExperiments,
    acceptedTerms,
    token,
    setAcceptedTerms,
    waitForToken
  } = useContext(RefinebioContext)

  return {
    myDataset,
    setMyDataset,
    datasetAccessions,
    setDatasetAccessions,
    myDatasetId,
    setMyDatasetId,
    email,
    setEmail,
    processingDatasets,
    setProcessingDatasets,
    requestedExperiments,
    setRequestedExperiments,
    acceptedTerms,
    token,
    setAcceptedTerms,
    waitForToken
  }
}
