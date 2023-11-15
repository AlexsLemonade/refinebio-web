import { createContext, useMemo, useState } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const RefinebioContext = createContext({})

export const RefinebioContextProvider = ({ children }) => {
  const [dataset, setDataset] = useLocalStorage('dataset', {})
  const [datasetId, setDatasetId] = useLocalStorage('datasetId', null)
  const [downloadOptions, setDownloadOptions] = useState({})
  const [email, setEmail] = useLocalStorage('email-address', null)
  const [processingExperiments, setProcessingExperiments] = useLocalStorage(
    'processing-experiments',
    []
  )
  const [regeneratedDataset, setRegeneratedDataset] = useState(null)
  const [token, setToken] = useLocalStorage('token', null)

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
      regeneratedDataset,
      setRegeneratedDataset,
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
      regeneratedDataset,
      setRegeneratedDataset,
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
