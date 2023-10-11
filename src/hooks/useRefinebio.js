import { useContext } from 'react'
import { RefinebioContext } from 'contexts/RefinebioContext'

export const useRefinebio = () => {
  const {
    dataset,
    setDataset,
    datasetId,
    setDatasetId,
    downloadOptions,
    setDownloadOptions,
    email,
    setEmail,
    processingExperiments,
    setProcessingExperiments,
    token,
    setToken
  } = useContext(RefinebioContext)

  return {
    dataset,
    setDataset,
    datasetId,
    setDatasetId,
    downloadOptions,
    setDownloadOptions,
    email,
    setEmail,
    processingExperiments,
    setProcessingExperiments,
    token,
    setToken
  }
}
