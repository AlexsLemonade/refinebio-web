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
    downloadOptions,
    setDownloadOptions,
    email,
    setEmail,
    processingDatasets,
    setProcessingDatasets,
    regeneratedDataset,
    setRegeneratedDataset,
    token,
    setToken
  } = useContext(RefinebioContext)

  return {
    dataset,
    setDataset,
    datasetAccessions,
    setDatasetAccessions,
    datasetId,
    setDatasetId,
    downloadOptions,
    setDownloadOptions,
    email,
    setEmail,
    processingDatasets,
    setProcessingDatasets,
    regeneratedDataset,
    setRegeneratedDataset,
    token,
    setToken
  }
}
