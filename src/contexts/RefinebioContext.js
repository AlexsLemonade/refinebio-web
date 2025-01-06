import { createContext, useMemo, useEffect } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'
import {
  getOldLocalStorageKey,
  removeOldLocalStorageKey
} from 'helpers/migrateLocalStorage'
import { useWaitFor } from 'hooks/useWaitFor'
import { api } from 'api'

export const RefinebioContext = createContext({})

export const RefinebioContextProvider = ({ children }) => {
  const [myDataset, setMyDataset] = useLocalStorage('dataset', {})
  const [myDatasetId, setMyDatasetId] = useLocalStorage('datasetId', null)
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

  const waitForToken = useWaitFor(validToken)

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
      setMyDatasetId(getOldLocalStorageKey(oldKeyValue))
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
      myDataset,
      setMyDataset,
      datasetAccessions,
      setDatasetAccessions,
      myDatasetId,
      setMyDatasetId,
      email,
      setEmail,
      processingDatasets,
      setProcessingDatasets,
      requestedExperiments,
      setRequestedExperiments,
      acceptedTerms,
      token: validToken,
      setAcceptedTerms,
      waitForToken
    }),
    [
      myDataset,
      setMyDataset,
      datasetAccessions,
      setDatasetAccessions,
      myDatasetId,
      setMyDatasetId,
      email,
      setEmail,
      processingDatasets,
      setProcessingDatasets,
      requestedExperiments,
      setRequestedExperiments,
      acceptedTerms,
      validToken,
      setAcceptedTerms,
      waitForToken
    ]
  )

  return (
    <RefinebioContext.Provider value={value}>
      {children}
    </RefinebioContext.Provider>
  )
}
