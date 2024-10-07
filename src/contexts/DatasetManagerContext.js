import { createContext, useMemo } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'

export const DatasetManagerContext = createContext({})

export const DatasetManagerContextProvider = ({ children }) => {
  const {
    dataset: datasetState,
    setDataset: setDatasetState,
    datasetAccessions: datasetAccessionsState,
    setDatasetAccessions: setDatasetAccessionsState,
    datasetId: datasetIdState,
    downloadOptions: downloadOptionsState,
    setDownloadOptions: setDownloadOptionsState,
    setDatasetId: setDatasetIdState,
    email: emailState,
    setEmail: setEmailState,
    processingDatasets: processingDatasetsState,
    setProcessingDatasets: setProcessingDatasetsState,
    regeneratedDataset: regeneratedDatasetState,
    setRegeneratedDataset: setRegeneratedDatasetState,
    token: tokenState
  } = useRefinebio()

  const dataset = datasetState
  const setDataset = setDatasetState
  const datasetAccessions = datasetAccessionsState
  const setDatasetAccessions = setDatasetAccessionsState
  const datasetId = datasetIdState
  const downloadOptions = downloadOptionsState
  const setDownloadOptions = setDownloadOptionsState
  const setDatasetId = setDatasetIdState
  const email = emailState
  const setEmail = setEmailState
  const processingDatasets = processingDatasetsState
  const setProcessingDatasets = setProcessingDatasetsState
  const regeneratedDataset = regeneratedDatasetState
  const setRegeneratedDataset = setRegeneratedDatasetState
  const token = tokenState

  const value = useMemo(
    () => ({
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
      token
    }),
    [
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
      token
    ]
  )

  return (
    <DatasetManagerContext.Provider value={value}>
      {children}
    </DatasetManagerContext.Provider>
  )
}
