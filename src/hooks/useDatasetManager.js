import { useContext, useState } from 'react'
import { DatasetManagerContext } from 'contexts/DatasetManagerContext'
import { useToken } from 'hooks/useToken'
import differenceOfArrays from 'helpers/differenceOfArrays'
import formatString from 'helpers/formatString'
import isEmptyObject from 'helpers/isEmptyObject'
import unionizeArrays from 'helpers/unionizeArrays'
import { options as configOptions } from 'config'
import { api } from 'api'

export const useDatasetManager = () => {
  const {
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
    token
  } = useContext(DatasetManagerContext)
  const { createToken, resetToken, validateToken } = useToken()
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
    const params = { data: {} }
    const response = await api.dataset.update(id || datasetId, params)

    setDataset(response)
    setLoading(false)
  }

  const createDataset = async (setCurrentDatasetId = false) => {
    const params = { data: {}, ...(email ? { email_address: email } : {}) }
    const response = await api.dataset.create(params)

    // stores the newly created dataset ID to localStorge
    if (setCurrentDatasetId) {
      setDatasetId(response.id)
    }

    return response.id
  }

  const downloadDataset = async (id, downloadUrl) => {
    let href = ''
    if (validateToken() && downloadUrl) {
      href = downloadUrl
    } else {
      // creates a new token and requests a download url with API-Key
      const tokenId = await createToken()
      const { download_url: url } = await getDataset(id, tokenId)
      href = url
    }

    window.location.href = href
  }

  const getDataset = async (id = '', tokenId = '') => {
    if (!id && !datasetId) return null

    setLoading(true)

    const headers =
      token || tokenId
        ? {
            'API-KEY': token || tokenId
          }
        : {}
    const response = await api.dataset.get(id || datasetId, headers)
    const { ok, statusCode } = response
    // sets the error if any, otherwise resets it
    // TODO: add a check (ok && error) to default the error state
    // related created PR https://github.com/AlexsLemonade/refinebio-web/pull/337
    if (error !== statusCode) {
      setError(ok ? null : statusCode)
    }

    const { is_processing: isProcessing, success } = response

    if (!id && datasetId) {
      setDataset(response)
    }

    // removes this dataset ID from processingDatasets[] if it exists
    if (!isProcessing && success !== null) {
      removeFromProcessingDatasets(response.id)
    }

    setLoading(false)

    return response
  }

  // takes download options, and optional dataset ID and one-off experiment accession code
  const startProcessingDataset = async (
    options,
    id = null, // no dataset ID initially for one-off download
    accessionCode = null
  ) => {
    const isMyDatasetId = id && id === datasetId
    // validates the existing token or create a new token if none
    const tokenId = validateToken() ? token : await resetToken()
    const { emailAddress, receiveUpdates } = options
    const params = {
      ...getDownloadOptions(options),
      email_address: emailAddress,
      ...(receiveUpdates ? { email_ccdl_ok: true } : {}),
      start: true,
      token_id: tokenId
    }
    const processingDatasetId = id || (await createDataset()) // creates new dataset ID for one-off download
    const response = await updateDataset(processingDatasetId, params)
    // adds this dataset ID to processingDatasets[] for polling
    addToProcessingDatasets(processingDatasetId, accessionCode)
    // saves the user's newly entered email or replace the existing one
    setEmail(emailAddress)
    // deletes the locally saved dataset data once it has started processing (no longer mutable)
    if (isMyDatasetId) {
      setDataset({})
      setDatasetId(null)
    }

    return response
  }

  const updateDataset = async (id, params) => {
    const isMyDatasetId = id === datasetId
    const response = await api.dataset.update(id, params)

    if (isMyDatasetId) {
      setDataset(response)
    }

    return response
  }

  /* --- Download Options Methods --- */
  const getDownloadOptions = (options) => {
    const {
      dataset: { downloadOptionsKeys }
    } = configOptions
    const temp = {}

    Object.keys(options).forEach((key) => {
      if (downloadOptionsKeys.includes(key)) {
        temp[key] = options[key]
      }
    })

    return temp
  }

  // copies the specified properties from the given dataset
  // for dataset regeneration
  const getDatasetPropertiesFrom = (sourceDataset) => {
    // TODO: options.downloadOptionsKeys will be removed once PR #411 is merged
    const {
      dataset: { downloadOptionsKeys }
    } = configOptions
    const includeKeys = [
      ...downloadOptionsKeys,
      'is_processed',
      'is_available',
      'success',
      'organism_samples' // for the download files summary UI change
    ]

    const temp = {}

    includeKeys.forEach((key) => {
      if (key in sourceDataset) {
        temp[key] = structuredClone(sourceDataset[key])
      }
    })

    return temp
  }

  // sends the download options change to the API for My Dataset to preserve
  // users' preferences, otherwise just updates DownloadOptions with new change
  const updateDownloadOptions = async (options, id, regenerate = false) => {
    const newOptions = { ...downloadOptions, ...options }
    // makes API request for My Dataset only
    if (!regenerate) await updateDataset(id, newOptions)
    setDownloadOptions(newOptions)
  }

  /* --- Experiment Methods --- */
  /* Experiment */
  const getTotalExperiments = (data) =>
    isEmptyObject(data) ? 0 : Object.keys(data).length

  const removeExperiment = async (experimentAccessionCode) => {
    setLoading(true)
    const params = { data: {} }

    for (const experiment in dataset.data) {
      if (experimentAccessionCode.includes(experiment)) continue
      params.data[experiment] = dataset.data[experiment]
    }

    const response = await api.dataset.update(datasetId, params)
    setDataset(response)
    setLoading(false)
  }

  /* Sample */
  const addSamples = async (data) => {
    setLoading(true)
    const params = { data: dataset ? { ...dataset.data } : {} }

    for (const accessionCode of Object.keys(data)) {
      if (data[accessionCode].all) {
        // the key 'ALL' is used to add all samples in an experiment
        // (ref) https://github.com/AlexsLemonade/refinebio-frontend/issues/496#issuecomment-456543865
        params.data[accessionCode] = ['ALL']
      } else {
        params.data[accessionCode] = unionizeArrays(
          params.data[accessionCode] || [],
          data[accessionCode]
        )
      }
    }

    const response = await api.dataset.update(
      datasetId || (await createDataset(true)),
      params
    )
    setDataset(response)
    setLoading(false)

    return response
  }

  // formats the sample metadata names for UI (e.g., 'specimen_part' to 'Specimen part')
  const formatSampleMetadata = (metadata) => metadata.map(formatString)

  const getTotalSamples = (data) =>
    isEmptyObject(data) ? 0 : unionizeArrays(...Object.values(data)).length

  const removeSamples = async (data) => {
    const params = { data: { ...dataset.data } }

    for (const accessionCode of Object.keys(data)) {
      if (!params.data[accessionCode]) continue

      const samplesStillSelected = differenceOfArrays(
        params.data[accessionCode],
        data[accessionCode]
      )

      if (samplesStillSelected.length > 0) {
        params.data[accessionCode] = samplesStillSelected
      } else {
        delete params.data[accessionCode]
      }
    }

    setLoading(true)
    const response = await api.dataset.update(datasetId, params)
    setDataset(response)
    setLoading(false)
  }

  const replaceSamples = async (data) => {
    setLoading(true)
    const response = await api.dataset.update(datasetId, { data })
    setDataset(response)
    setLoading(false)
  }

  return {
    email,
    error,
    setError,
    datasetAccessions,
    setDatasetAccessions,
    dataset,
    datasetId,
    loading,
    processingDatasets,
    setProcessingDatasets,
    token,
    // Processing Dataset
    getProcessingDatasetByAccession,
    // Common
    clearDataset,
    createDataset,
    downloadDataset,
    getDataset,
    startProcessingDataset,
    updateDataset,
    // Download options
    getDownloadOptions,
    getDatasetPropertiesFrom,
    updateDownloadOptions,
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
