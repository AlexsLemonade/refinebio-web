import { createContext, useMemo, useState } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const RefinebioContext = createContext({})

export const RefinebioContextProvider = ({ children }) => {
  const [dataset, setDataset] = useLocalStorage('dataset', {})
  const [datasetId, setDatasetId] = useLocalStorage('datasetId', null)
  const [email, setEmail] = useLocalStorage('email-address', null)
  const [processingExperiments, setProcessingExperiments] = useLocalStorage(
    'processing-experiments',
    []
  )
  const [token, setToken] = useLocalStorage('token', null)
  const [downloadOptions, setDownloadOptions] = useState({})

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
      processingExperiments,
      setProcessingExperiments,
      token,
      setToken
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
      processingExperiments,
      setProcessingExperiments,
      token,
      setToken
    ]
  )

  return (
    <RefinebioContext.Provider value={value}>
      {children}
    </RefinebioContext.Provider>
  )
}
