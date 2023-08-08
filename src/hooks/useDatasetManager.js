import { useContext, useState } from 'react'
import { DatasetManagerContext } from 'contexts/DatasetManagerContext'
import { useRefinebio } from 'hooks/useRefinebio'
import { formatExperiments } from 'helpers/dataset'
import getDifferenceOfArrays from 'helpers/getDifferenceOfArrays'
import unionizeArrays from 'helpers/unionizeArrays'
import { api } from 'api'

export const useDatasetManager = () => {
  const {
    dataset: datasetState,
    setDataset: setDatasetState,
    datasetId: datasetIdState,
    setDatasetId: setDatasetIdState
  } = useContext(DatasetManagerContext)
  const { email } = useRefinebio()
  const dataset = datasetState
  const setDataset = setDatasetState
  const datasetId = datasetIdState
  const setDatasetId = setDatasetIdState
  const tempDatasetId = '7236578f-70ba-4c69-b2da-9f68de3e0847' // TEMPORARY created dataset for demo
  const [loading, setLoading] = useState(false)

  /* Dataset */
  const createDataset = async () => {
    const body = { data: {} }

    if (email) {
      body.email_address = email
    }

    // replac with api request to POST v1/dataset/ here
    await setDatasetId(tempDatasetId) // TEMPORRAY
  }

  const getDataset = async () => {
    if (!datasetId) {
      createDataset()
    }

    setLoading(true)
    const response = await api.dataset.get(tempDatasetId) // TEMPORRAY
    setDataset({
      ...response
    })
    setLoading(false)
  }

  // fetches the dataset with the query 'details'
  // details: https://github.com/AlexsLemonade/refinebio-frontend/pull/485
  const getDatasetDetails = async () => {
    if (!datasetId) {
      return
    }

    const params = {
      details: true
    }

    setLoading(true)
    const response = await api.dataset.get(tempDatasetId, params) // TEMPORRAY
    setDataset({
      ...response,
      experiments: formatExperiments(response.experiments)
    })
    setLoading(false)
  }

  const emptyDataset = async () => {
    const data = {}

    setLoading(true)
    const response = await api.dataset.update(tempDatasetId, { data }) // TEMPORARY
    setDataset(response)
    setLoading(false)
  }

  const updateDataset = async (datasetSlice) => {
    if (!datasetId) {
      createDataset()
    }

    const data = dataset ? { ...dataset.data } : {}

    for (const accessionCode of Object.keys(datasetSlice)) {
      if (datasetSlice[accessionCode].all) {
        // the special key 'ALL' to add all samples from an experiment
        // ALL: https://github.com/AlexsLemonade/refinebio-frontend/issues/496#issuecomment-456543865
        data[accessionCode] = ['ALL']
      } else {
        data[accessionCode] = unionizeArrays(
          data[accessionCode] || [],
          datasetSlice[accessionCode]
        )
      }
    }

    setLoading(true)
    const response = await api.dataset.update(tempDatasetId, { data }) // TEMPORRAY
    setDataset(response)
    setLoading(false)
  }

  /* Experiment */
  const removeExperiment = async (experimentAccessionCode, details = false) => {
    const data = {}

    for (const experiment in dataset.data) {
      if (experimentAccessionCode.includes(experiment)) continue
      data[experiment] = dataset.data[experiment]
    }

    setLoading(true)
    const response = await api.dataset.update(tempDatasetId, { data }, details)
    setDataset({
      ...response,
      ...(details
        ? { experiments: formatExperiments(response.experiments) }
        : {})
    })
    setLoading(false)
  }

  /* Sample */
  const addSample = () => {}

  const removeSample = () => {}

  const removeSamples = async (datasetSlice, details = false) => {
    const data = { ...dataset.data }

    for (const accessionCode of Object.keys(datasetSlice)) {
      if (!data[accessionCode]) continue

      const samplesStillSelected = getDifferenceOfArrays(
        data[accessionCode],
        datasetSlice[accessionCode]
      )

      if (samplesStillSelected.length > 0) {
        data[accessionCode] = samplesStillSelected
      } else {
        delete data[accessionCode]
      }
    }

    setLoading(true)
    const response = await api.dataset.update(tempDatasetId, { data }, details)
    setDataset({
      ...response,
      ...(details
        ? { experiments: formatExperiments(response.experiments) }
        : {})
    })
    setLoading(false)
  }

  return {
    dataset,
    datasetId,
    loading,
    createDataset,
    emptyDataset,
    getDataset,
    getDatasetDetails,
    updateDataset,
    removeExperiment,
    addSample,
    removeSample,
    removeSamples
  }
}
