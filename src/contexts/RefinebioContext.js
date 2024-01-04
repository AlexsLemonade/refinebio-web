import { createContext, useMemo, useState } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const RefinebioContext = createContext({})

export const RefinebioContextProvider = ({ children }) => {
  const [dataset, setDataset] = useLocalStorage('dataset', {})
  const [datasetId, setDatasetId] = useLocalStorage('datasetId', null)
  const [downloadOptions, setDownloadOptions] = useState({})
  const [email, setEmail] = useLocalStorage('email-address', null)
  const [processingResources, setProcessingResources] = useLocalStorage(
    'processing-resources',
    []
  )
  const [regeneratedDataset, setRegeneratedDataset] = useState(null)
  const [requestedExperiments, setRequestedExperiments] = useLocalStorage(
    'requested-experiments',
    []
  )
  const [samplesTableData, setSamplesTableData] = useState({})
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
      processingResources,
      setProcessingResources,
      regeneratedDataset,
      setRegeneratedDataset,
      requestedExperiments,
      setRequestedExperiments,
      samplesTableData,
      setSamplesTableData,
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
      processingResources,
      setProcessingResources,
      regeneratedDataset,
      setRegeneratedDataset,
      requestedExperiments,
      setRequestedExperiments,
      samplesTableData,
      setSamplesTableData,
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
