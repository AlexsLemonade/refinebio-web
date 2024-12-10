import { createContext, useMemo, useEffect } from 'react'
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

  // For user token
  const [acceptedTerms, setAcceptedTerms] = useLocalStorage(
    'accepted-terms',
    false
  )
  const [token, setToken] = useLocalStorage('token', null)
  const [validToken, setValidToken] = useLocalStorage('valid-token', null)

  // triggers the token activation for a file download
  const applyAcceptedTerms = () => {
    setAcceptedTerms((prev) => prev || true)
  }

  const activateToken = async () => {
    const response = await api.token.update(token, {
      is_activated: acceptedTerms
    })

    return response
  }

  const createToken = async () => {
    const { id } = await api.token.create()
    setToken(id)

    return id
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

  // creates the application token per user on initial visit
  useEffect(() => {
    if (!token) {
      createToken()
    }
  }, [token])

  // sync user's token with acceptedTerms
  useEffect(() => {
    const syncToken = async () => {
      if (token) {
        const { ok, statusCode } = await activateToken()
        const badRequest = !ok && statusCode >= 400 && statusCode < 500

        if (badRequest) {
          setToken(null)
        } else {
          setValidToken(acceptedTerms ? token : null)
        }
      }
    }

    syncToken()
  }, [acceptedTerms, token])

  const value = useMemo(
    () => ({
      dataset,
      setDataset,
      datasetAccessions,
      setDatasetAccessions,
      datasetId,
      setDatasetId,
      email,
      setEmail,
      processingDatasets,
      setProcessingDatasets,
      requestedExperiments,
      setRequestedExperiments,
      acceptedTerms,
      token: validToken,
      applyAcceptedTerms
    }),
    [
      dataset,
      setDataset,
      datasetAccessions,
      setDatasetAccessions,
      datasetId,
      setDatasetId,
      email,
      setEmail,
      processingDatasets,
      setProcessingDatasets,
      requestedExperiments,
      setRequestedExperiments,
      acceptedTerms,
      validToken,
      applyAcceptedTerms
    ]
  )

  return (
    <RefinebioContext.Provider value={value}>
      {children}
    </RefinebioContext.Provider>
  )
}
