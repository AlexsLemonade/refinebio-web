import { useContext, useState } from 'react'
import { DatasetManagerContext } from 'contexts/DatasetManagerContext'
import { useToken } from 'hooks/useToken'
import differenceOfArrays from 'helpers/differenceOfArrays'
import formatString from 'helpers/formatString'
import isEmptyObject from 'helpers/isEmptyObject'
import unionizeArrays from 'helpers/unionizeArrays'
import { api } from 'api'

export const useDatasetManager = () => {
  const {
    dataset,
    setDataset,
    datasetId,
    setDatasetId,
    email,
    setEmail,
    token
  } = useContext(DatasetManagerContext)
  const { createToken } = useToken()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  /* Dataset */
  const createDataset = async (setCurrentDatasetId = false) => {
    const params = { data: {}, ...(email ? { email_address: email } : {}) }
    const response = await api.dataset.create(params)

    // stores the newly created dataset Id to localStorge
    if (setCurrentDatasetId) {
      setDatasetId(response.id)
    }

    return response.id
  }

  const getDataset = async (id = '') => {
    if (!id && !datasetId) return null

    setLoading(true)
    const headers = token
      ? {
          'API-KEY': token
        }
      : {}

    const response = await api.dataset.get(id || datasetId, headers)
    const formattedResponse = {
      ...response,
      experiments: formatExperiments(response.experiments)
    }

    if (!id && datasetId) {
      setDataset(formattedResponse)
    }

    setLoading(false)

    return formattedResponse
  }

  const clearDataset = async (id = '') => {
    setLoading(true)
    const params = { data: {} }
    const response = await api.dataset.update(id || datasetId, params)

    setDataset(response)
    setLoading(false)
  }

  const startProcessingDataset = async (id, downloadOptions) => {
    // create a new token if none
    const tokenId = token || (await createToken())
    const { data, emailAddress, receiveUpdates } = downloadOptions
    // saves the user entered email in localStorage or replace the existing one
    setEmail(emailAddress)
    const params = {
      data,
      email_address: emailAddress,
      ...(receiveUpdates ? { email_ccdl_ok: true } : {}),
      start: true,
      token_id: tokenId
    }

    const response = await updateDataset(id, params)

    return response
  }

  const updateDataset = async (id, params) => {
    const isCurrentDatasetId = id === datasetId
    const response = await api.dataset.update(id, params)

    if (isCurrentDatasetId) {
      setDataset({
        ...response,
        experiments: formatExperiments(response.experiments)
      })
    }

    return response
  }

  /* Experiment */
  const getTotalExperiments = (data) =>
    isEmptyObject(data) ? 0 : Object.keys(data).length

  // formats the sample and experiment arrays from the API response
  // to objects with experiment accession codes as their keys for UI
  const formatExperiments = (experiments = []) => {
    if (!experiments.length) return []

    return experiments.reduce(
      (acc, experiment) => ({
        ...acc,
        [experiment.accession_code]: experiment
      }),
      {}
    )
  }

  const removeExperiment = async (experimentAccessionCode) => {
    setLoading(true)
    const params = { data: {} }

    for (const experiment in dataset.data) {
      if (experimentAccessionCode.includes(experiment)) continue
      params.data[experiment] = dataset.data[experiment]
    }

    const response = await api.dataset.update(datasetId, params)
    setDataset({
      ...response,
      experiments: formatExperiments(response.experiments)
    })
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
    setDataset({
      ...response,
      experiments: formatExperiments(response.experiments)
    })
    setLoading(false)

    return {
      ...response,
      experiments: formatExperiments(response.experiments)
    }
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
    setDataset({
      ...response,
      experiments: formatExperiments(response.experiments)
    })
    setLoading(false)
  }

  const replaceSamples = async (data) => {
    setLoading(true)
    const response = await api.dataset.update(datasetId, { data })
    setDataset({
      ...response,
      experiments: formatExperiments(response.experiments)
    })
    setLoading(false)
  }

  return {
    email,
    error,
    setError,
    dataset,
    datasetId,
    loading,
    token,
    createDataset,
    clearDataset,
    startProcessingDataset,
    updateDataset,
    getDataset,
    getTotalExperiments,
    removeExperiment,
    addSamples,
    formatSampleMetadata,
    getTotalSamples,
    removeSamples,
    replaceSamples
  }
}
