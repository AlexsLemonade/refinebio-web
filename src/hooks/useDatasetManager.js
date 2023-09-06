import { useContext, useState } from 'react'
import { DatasetManagerContext } from 'contexts/DatasetManagerContext'
import formatString from 'helpers/formatString'
import differenceOfArrays from 'helpers/differenceOfArrays'
import isEmptyObject from 'helpers/isEmptyObject'
import unionizeArrays from 'helpers/unionizeArrays'
import { api } from 'api'

export const useDatasetManager = () => {
  const { dataset, setDataset, datasetId, setDatasetId, email, token } =
    useContext(DatasetManagerContext)
  const [error, setError] = useState(false) // TODO: create a new issue for the error handling
  const [loading, setLoading] = useState(false)

  /* Dataset */
  const createDataset = async () => {
    const params = { data: {} }

    if (email) {
      params.email_address = email
    }

    const response = await api.dataset.create(params)
    setDatasetId(response.id)

    return response.id
  }

  const getDataset = async () => {
    setLoading(true)
    const headers = token
      ? {
          'APT-KEY': token
        }
      : {}
    const response = await api.dataset.get(datasetId, null, headers)
    setDataset({
      ...response
    })
    setLoading(false)
  }

  // fetches the dataset with the query 'details'
  // details: https://github.com/AlexsLemonade/refinebio-frontend/pull/485
  // we pass the dataset id in URL if it differs from one in localStorage
  const getDatasetDetails = async (idFromQuery = '') => {
    setLoading(true)
    const headers = token
      ? {
          'APT-KEY': token
        }
      : {}
    const response = await api.dataset.get(
      idFromQuery || datasetId,
      { details: true },
      headers
    )

    const formattedResponse = {
      ...response,
      experiments: formatExperiments(response.experiments)
    }

    if (!idFromQuery) {
      setDataset(formattedResponse)
    }

    setLoading(false)

    return formattedResponse
  }

  const emptyDataset = async () => {
    setLoading(true)
    const params = { data: {} }
    const response = await api.dataset.update(datasetId, params)
    setDataset(response)
    setLoading(false)
  }

  /* Experiment */
  // formats the sample and experiment arrays from the API response
  // to objects with experiment accession codes as their keys
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

  const removeExperiment = async (experimentAccessionCode, details = false) => {
    setLoading(true)
    const params = { data: {} }

    for (const experiment in dataset.data) {
      if (experimentAccessionCode.includes(experiment)) continue
      params.data[experiment] = dataset.data[experiment]
    }

    const response = await api.dataset.update(datasetId, params, details)
    setDataset({
      ...response,
      ...(details
        ? { experiments: formatExperiments(response.experiments) }
        : {})
    })
    setLoading(false)
  }

  /* Sample */
  const addSamples = async (data, details = false) => {
    setLoading(true)
    const params = { data: dataset ? { ...dataset.data } : {} }

    for (const accessionCode of Object.keys(data)) {
      if (data[accessionCode].all) {
        // the special key 'ALL' to add all samples from an experiment
        // https://github.com/AlexsLemonade/refinebio-frontend/issues/496#issuecomment-456543865
        params.data[accessionCode] = ['ALL']
      } else {
        params.data[accessionCode] = unionizeArrays(
          params.data[accessionCode] || [],
          data[accessionCode]
        )
      }
    }

    const response = await api.dataset.update(
      datasetId || (await createDataset()),
      params,
      details
    )
    setDataset({
      ...response,
      ...(details
        ? { experiments: formatExperiments(response.experiments) }
        : {})
    })
    setLoading(false)
  }

  // formats the sample metadata names for UI (e.g., 'specimen_part' to 'Specimen part')
  const formatSampleMetadata = (metadata) => metadata.map(formatString)

  const getTotalSamples = (data) => {
    return !datasetId || isEmptyObject(data)
      ? 0
      : unionizeArrays(...Object.values(data)).length
  }

  const removeSamples = async (data, details = false) => {
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
    const response = await api.dataset.update(datasetId, params, details)
    setDataset({
      ...response,
      ...(details
        ? { experiments: formatExperiments(response.experiments) }
        : {})
    })
    setLoading(false)
  }

  const replaceSamples = async (data) => {
    setLoading(true)
    const response = await api.dataset.update(datasetId, { data }, true)
    setDataset({
      ...response,
      experiments: formatExperiments(response.experiments)
    })
    setLoading(false)
  }

  return {
    error,
    setError,
    dataset,
    datasetId,
    loading,
    createDataset,
    emptyDataset,
    getDataset,
    getDatasetDetails,
    removeExperiment,
    addSamples,
    formatSampleMetadata,
    getTotalSamples,
    removeSamples,
    replaceSamples
  }
}
