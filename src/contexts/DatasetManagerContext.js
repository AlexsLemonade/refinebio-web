import { createContext, useMemo } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'

export const DatasetManagerContext = createContext({})

export const DatasetManagerContextProvider = ({ children }) => {
  const {
    dataset: datasetState,
    setDataset: setDatasetState,
    datasetId: datasetIdState,
    downloadOptions: downloadOptionsState,
    setDownloadOptions: setDownloadOptionsState,
    setDatasetId: setDatasetIdState,
    email: emailState,
    setEmail: setEmailState,
    regeneratedDataset: regeneratedDatasetState,
    setRegeneratedDataset: setRegeneratedDatasetState,
    token: tokenState
  } = useRefinebio()

  const dataset = datasetState
  const setDataset = setDatasetState
  const datasetId = datasetIdState
  const downloadOptions = downloadOptionsState
  const setDownloadOptions = setDownloadOptionsState
  const setDatasetId = setDatasetIdState
  const email = emailState
  const setEmail = setEmailState
  const regeneratedDataset = regeneratedDatasetState
  const setRegeneratedDataset = setRegeneratedDatasetState
  const token = tokenState

  const value = useMemo(
    () => ({
      dataset,
      setDataset,
      datasetId,
      setDatasetId,
      downloadOptions,
      setDownloadOptions,
      email,
      setEmail,
      regeneratedDataset,
      setRegeneratedDataset,
      token
    }),
    [
      dataset,
      setDataset,
      datasetId,
      setDatasetId,
      downloadOptions,
      setDownloadOptions,
      email,
      setEmail,
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
