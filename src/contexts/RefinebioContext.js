import { createContext, useMemo, useState, useEffect } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { usePageRendered } from 'hooks/usePageRendered'
import {
  getOldLocalStorageKey,
  removeOldLocalStorageKey
} from 'helpers/migrateLocalStorage'

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
  const pageRendered = usePageRendered()
  const [downloadOptions, setDownloadOptions] = useState({})

  // NOTE: migration support is removed 12 months after the site swap
  useEffect(() => {
    if (pageRendered) {
      const oldKey = 'dataSetId'
      setDatasetId(getOldLocalStorageKey(oldKey) || datasetId)
      removeOldLocalStorageKey(oldKey)
    }
  }, [pageRendered])

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
