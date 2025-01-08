import { createContext, useMemo, useEffect } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'
import {
  getOldLocalStorageKey,
  removeOldLocalStorageKey
} from 'helpers/migrateLocalStorage'
import { usePromise } from 'hooks/usePromise'
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

  const tokenPromise = usePromise(validToken)

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
    const createToken = async () => {
      const { id } = await api.token.create()
      setToken(id)
    }
    if (!token) {
      createToken()
    }
  }, [token])

  // sync user's token with acceptedTerms
  useEffect(() => {
    const syncToken = async () => {
      if (token) {
        const { ok, statusCode } = await api.token.update(token, {
          is_activated: acceptedTerms
        })
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
      setAcceptedTerms,
      token: validToken,
      tokenPromise
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
      setAcceptedTerms,
      tokenPromise,
      validToken
    ]
  )

  return (
    <RefinebioContext.Provider value={value}>
      {children}
    </RefinebioContext.Provider>
  )
}
