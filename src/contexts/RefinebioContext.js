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
  const [downloadOptions, setDownloadOptions] = useState({})
  const [email, setEmail] = useLocalStorage('email-address', null)
  const [processingExperiments, setProcessingExperiments] = useLocalStorage(
    'processing-experiments',
    []
  )
  const [regeneratedDataset, setRegeneratedDataset] = useState(null)
  const [token, setToken] = useLocalStorage('token', null)
  const pageRendered = usePageRendered()

  // NOTE: migration support is removed 12 months after the site swap
  useEffect(() => {
    if (pageRendered) {
      // after the code swap, if the old key exists in the users' browsers, assign that
      // value to the new key to prevent them from losing their customized dataset
      const oldKey = 'dataSetId'
      const oldKeyValue = getOldLocalStorageKey(oldKey)

      if (oldKeyValue) {
        setDatasetId(getOldLocalStorageKey(oldKeyValue))
        removeOldLocalStorageKey(oldKey)
      }
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
