import { useContext, useState } from 'react'
import { DatasetManagerContext } from 'contexts/DatasetManagerContext'
import { useRefinebio } from 'hooks/useRefinebio'
import differenceOfArrays from 'helpers/differenceOfArrays'
import formatString from 'helpers/formatString'
import getDatasetState from 'helpers/getDatasetState'
import isEmptyObject from 'helpers/isEmptyObject'
import unionizeArrays from 'helpers/unionizeArrays'
import { api } from 'api'

export const useDatasetManager = () => {
  const {
    myDataset,
    setMyDataset,
    datasetAccessions,
    setDatasetAccessions,
    myDatasetId,
    setMyDatasetId,
    email,
    setEmail,
    processingDatasets,
    setProcessingDatasets
  } = useContext(DatasetManagerContext)
  const { acceptedTerms, tokenPromise } = useRefinebio()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  /* --- Dataset Methods --- */
  /* Processing Dataset */
  const addToProcessingDatasets = (id, accessionCode) => {
    // if one-off, adds an accession code and a dataset ID to datasetAccessions
    if (accessionCode) {
      setDatasetAccessions({ ...datasetAccessions, [accessionCode]: id })
    }
    // adds a dataset ID to processingDatasets[] for polling
    setProcessingDatasets((prev) => {
      if (prev.includes(id)) return prev
      return [...prev, id]
    })
  }

  // returns a dataset ID of the processing experiment's accession code
  const getProcessingDatasetByAccession = (accessionCode) =>
    datasetAccessions[accessionCode]

  // removes the processing dataset ID when finish processing
  const removeFromProcessingDatasets = (id) => {
    // if one-off, returns the matched accession code by the given dataset ID
    const accesionCode = Object.keys(datasetAccessions).find(
      (k) => datasetAccessions[k] === id
    )
    // if found, removes it from datasetAccessions
    if (accesionCode) {
      setDatasetAccessions((prev) => {
        const temp = { ...prev }
        delete temp[accesionCode]
        return temp
      })
    }

    setProcessingDatasets((prev) => prev.filter((i) => i !== id))
  }

  /* Common */
  const clearDataset = async (id = '') => {
    setLoading(true)
    const body = { data: {} }
    const response = await updateDataset(id || myDatasetId, body)

    setMyDataset(response)
    setLoading(false)
  }

  const createDataset = async (setCurrentDatasetId = false) => {
    const params = { data: {}, ...(email ? { email_address: email } : {}) }
    const response = await api.dataset.create(params)

    // stores the newly created dataset ID to localStorge
    if (setCurrentDatasetId) {
      setMyDatasetId(response.id)
    }

    return response.id
  }

  const downloadDataset = async (id) => {
    if (!acceptedTerms) {
      throw new Error('Terms of Use must be accepted to proceed.')
    }

    const response = await getDataset(id, await tokenPromise)
    window.location.href = response.download_url
  }

  const getDataset = async (id = myDatasetId) => {
    if (!id && !myDatasetId) return null // TODO: Throw an error

    setLoading(true)

    const headers = {}

    if (acceptedTerms) {
      headers['API-KEY'] = await tokenPromise
    }

    const response = await api.dataset.get(id || myDatasetId, headers)
    const { ok, statusCode } = response

    if (ok && isMyDatasetId(id)) {
      setMyDataset(response)
    }

    // sets the error if any, otherwise resets it
    setError(ok ? null : statusCode)

    const { isProcessing } = getDatasetState(response)
    // removes the dataset ID from processingDatasets[] once it finishes processing
    if (!isProcessing) {
      removeFromProcessingDatasets(response.id)
    }

    setLoading(false)

    return response
  }

  // checks if the given dataset ID is myDatasetId
  const isMyDatasetId = (id) => myDatasetId !== null && id === myDatasetId

  const startProcessingDataset = async (
    options,
    id = null, // no dataset ID initially for one-off download
    accessionCode = null // for one-off download
  ) => {
    if (!acceptedTerms) {
      throw new Error('Terms of Use must be accepted to proceed.')
    }

    const body = {
      ...options,
      start: true
    }

    const processingDatasetId = isMyDatasetId(id)
      ? myDatasetId
      : await createDataset() // creates new dataset ID for one-off download and shared dataset

    const response = await updateDataset(processingDatasetId, body)

    // adds this dataset ID to processingDatasets[] for polling
    addToProcessingDatasets(processingDatasetId, accessionCode)
    // saves the user's newly entered email or replace the existing one
    setEmail(options.email_address)

    // deletes the locally saved dataset data once it has started processing (no longer mutable)
    if (id && isMyDatasetId(id)) {
      setMyDataset({})
      setMyDatasetId(null)
    }

    return response
  }

  const updateDataset = async (id, body) => {
    const headers = {}

    if (acceptedTerms) {
      headers['API-KEY'] = await tokenPromise
    }

    const response = await api.dataset.update(id, body, headers)

    if (isMyDatasetId(id)) {
      setMyDataset(response)
    }

    return response
  }

  // copies the specified properties from the given dataset
  // for dataset regeneration
  const getDatasetPropertiesFrom = (sourceDataset) => {
    const includeKeys = [
      'is_processed',
      'is_available',
      'success',
      'organism_samples' // for the download files summary UI change
    ]

    return includeKeys.reduce(
      (acc, key) =>
        key in sourceDataset
          ? { ...acc, [key]: structuredClone(sourceDataset[key]) }
          : acc,
      {}
    )
  }

  /* --- Experiment Methods --- */
  /* Experiment */
  const getTotalExperiments = (data) =>
    isEmptyObject(data) ? 0 : Object.keys(data).length

  const removeExperiment = async (experimentAccessionCode) => {
    setLoading(true)
    const body = { data: {} }

    for (const experiment in myDataset.data) {
      if (experimentAccessionCode.includes(experiment)) continue
      body.data[experiment] = myDataset.data[experiment]
    }

    const response = await updateDataset(myDatasetId, body)
    setMyDataset(response)
    setLoading(false)
  }

  /* Sample */
  const addSamples = async (data) => {
    setLoading(true)
    const body = { data: myDataset ? { ...myDataset.data } : {} }

    for (const accessionCode of Object.keys(data)) {
      if (data[accessionCode].all) {
        // the key 'ALL' is used to add all samples in an experiment
        // (ref) https://github.com/AlexsLemonade/refinebio-frontend/issues/496#issuecomment-456543865
        body.data[accessionCode] = ['ALL']
      } else {
        body.data[accessionCode] = unionizeArrays(
          body.data[accessionCode] || [],
          data[accessionCode]
        )
      }
    }

    const response = await updateDataset(
      myDatasetId || (await createDataset(true)),
      body
    )
    setMyDataset(response)
    setLoading(false)

    return response
  }

  // formats the sample metadata names for UI (e.g., 'specimen_part' to 'Specimen part')
  const formatSampleMetadata = (metadata) => metadata.map(formatString)

  const getTotalSamples = (data) =>
    isEmptyObject(data) ? 0 : unionizeArrays(...Object.values(data)).length

  const removeSamples = async (data) => {
    const body = { data: { ...myDataset.data } }

    for (const accessionCode of Object.keys(data)) {
      if (!body.data[accessionCode]) continue

      const samplesStillSelected = differenceOfArrays(
        body.data[accessionCode],
        data[accessionCode]
      )

      if (samplesStillSelected.length > 0) {
        body.data[accessionCode] = samplesStillSelected
      } else {
        delete body.data[accessionCode]
      }
    }

    setLoading(true)
    const response = await updateDataset(myDatasetId, body)
    setMyDataset(response)
    setLoading(false)
  }

  const replaceSamples = async (data) => {
    setLoading(true)
    const response = await updateDataset(myDatasetId, { data })
    setMyDataset(response)
    setLoading(false)
  }

  return {
    email,
    error,
    setError,
    datasetAccessions,
    setDatasetAccessions,
    myDataset,
    myDatasetId,
    loading,
    processingDatasets,
    setProcessingDatasets,
    // Processing Dataset
    getProcessingDatasetByAccession,
    // Common
    clearDataset,
    createDataset,
    downloadDataset,
    getDataset,
    getDatasetPropertiesFrom,
    isMyDatasetId,
    startProcessingDataset,
    updateDataset,
    // Experiment
    getTotalExperiments,
    removeExperiment,
    addSamples,
    formatSampleMetadata,
    getTotalSamples,
    removeSamples,
    replaceSamples
  }
}
