import { createContext, useMemo, useState, useEffect } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'
import {
  getOldLocalStorageKey,
  removeOldLocalStorageKey
} from 'helpers/migrateLocalStorage'
import { api } from 'api'

export const RefinebioContext = createContext({})

export const RefinebioContextProvider = ({ children }) => {
  const [dataset, setDataset] = useLocalStorage('dataset', {})
  const [datasetId, setDatasetId] = useLocalStorage('datasetId', null)
  const [downloadOptions, setDownloadOptions] = useState({})
  const [email, setEmail] = useLocalStorage('email-address', null)
  const [datasetAccessions, setDatasetAccessions] = useLocalStorage(
    'dataset-accessions',
    {}
  )
  const [processingDatasets, setProcessingDatasets] = useLocalStorage(
    'processing-datasets',
    []
  )
  const [requestedExperiments, setRequestedExperiments] = useLocalStorage(
    'requested-experiments',
    []
  )
  const [acceptedTerms, setAcceptedTerms] = useLocalStorage(
    'accepted-terms',
    false
  )
  const [token, setToken] = useLocalStorage('token', null)

  const createToken = async () => {
    const { id } = await api.token.create()
    await api.token.update(id, { is_activated: true })
    setToken(id)
    setAcceptedTerms(true)

    return id
  }

  const validateToken = async () => {
    const response = await api.token.get(token)
    // create a new token if validation fails
    // (e.g., a corrupted token value, API version changes)
    if (!response.ok) await createToken()
  }

  // NOTE: migration support is removed 12 months after the site swap
  useEffect(() => {
    // after the code swap, if the old key exists in the users' browsers, assign that
    // value to the new key to prevent them from losing their customized dataset
    const oldKey = 'dataSetId'
    const oldKeyValue = getOldLocalStorageKey(oldKey)

    if (oldKeyValue) {
      setDatasetId(getOldLocalStorageKey(oldKeyValue))
      removeOldLocalStorageKey(oldKey)
    }
  }, [])

  // validates the stored token only if the user has accepted the terms
  useEffect(() => {
    if (acceptedTerms && token) {
      validateToken()
    }
  }, [acceptedTerms, token])

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
      requestedExperiments,
      setRequestedExperiments,
      acceptedTerms,
      token,
      createToken
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
      requestedExperiments,
      setRequestedExperiments,
      acceptedTerms,
      token,
      createToken
    ]
  )

  return (
    <RefinebioContext.Provider value={value}>
      {children}
    </RefinebioContext.Provider>
  )
}
