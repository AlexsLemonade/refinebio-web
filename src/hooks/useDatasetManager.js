import { useContext, useMemo, useState, useEffect } from 'react'
import { DatasetManagerContext } from 'contexts/DatasetManagerContext'
import { useRefinebioContext } from 'hooks/useRefinebioContext'
import { useLocalStorage } from 'hooks/useLocalStorage'
import unionizeArrays from 'helpers/unionizeArrays'
import Refinebio from '@ccdl/refinebio/src'

// TODO: update/improve refinebio-js based on the below implementation
export const useDatasetManager = () => {
  const { email, token, setToken } = useRefinebioContext()
  const api = useMemo(() => Refinebio(), [])
  const { currentDatasetId, setCurrentDatasetId } = useContext(
    DatasetManagerContext
  )
  // eslint-disable-next-line no-unused-vars
  const [downloads, setDownloads] = useLocalStorage('refinebio-downloads', null) // One-off downloads dataset ids
  const [currentDataset, setCurrentDataset] = useState(null) // publicInterface methods

  // Refreshes currentDataset on currentDatasetId changes
  useEffect(() => {
    const getNewDataset = async () => {
      const newDataset = await getCurrentDataset()
      setCurrentDataset(newDataset)
    }

    getNewDataset()
  }, [currentDatasetId])

  /* --- Internal methods --- */
  // Dataset
  // Creates a new dataset and returns publicInterface methods
  const createDataset = async (setCurrent = true) => {
    const dataset = await saveDataset(api.Dataset())

    if (setCurrent) setCurrentDatasetId(dataset.get('id'))

    return dataset
  }

  // Fetchs the latest version of the dataset
  const getDataset = async (id, details = false) => {
    let dataset
    const { isOk, response } = await api.dataset.get(id, details)

    if (isOk) {
      dataset = await api.Dataset(response)

      return dataset
    }
    // TEMPORARY Returns the empty dataset on error
    dataset = await createDataset()

    return dataset
  }

  // Returns the latest version of the dataset
  // or create a new one
  const getCurrentDataset = async () => {
    let dataset

    if (!currentDatasetId) {
      dataset = await createDataset()

      return dataset
    }

    dataset = await getDataset(currentDatasetId, true)

    return dataset
  }

  const saveDataset = async (dataset) => {
    try {
      await dataset.save()
      updateCurrentDataset(dataset)

      return dataset
    } catch (e) {
      // TEMPORARY Handles the 'Unable to save' error
      console.error(e)
    }

    return dataset
  }

  // Updates currentDataset with a newly created reference
  const updateCurrentDataset = (newDataset) =>
    setCurrentDataset({ ...newDataset })

  // Empty the data object in the dataset
  const clearDataset = async () => {
    const dataset = await currentDataset.emptyData()
    await dataset.save()
    updateCurrentDataset(dataset)

    return dataset
  }

  /* --- Common methods for UI --- */
  // Experiment
  const getTotalExperiments = () =>
    Object.keys(currentDataset.getData() || {}).length

  const hasExperiment = (experimentAccessionCode) =>
    Object.keys(currentDataset.getData()).includes(experimentAccessionCode)

  const addExperiment = async (experimentAccessionCode) => {
    if (!currentDatasetId) {
      await createDataset()
    }

    currentDataset.addExperiment(experimentAccessionCode)
    const dataset = await currentDataset.save()
    updateCurrentDataset(dataset)
  }

  const removeExperiment = async (experimentAccessionCode) => {
    currentDataset.removeExperiment(experimentAccessionCode)
    const dataset = await dataset.save()
    updateCurrentDataset(dataset)
  }

  // Sample
  const getTotalSamples = () => {
    const data = currentDataset.getData() || {}

    return unionizeArrays(Object.values(data)).length
  }

  const hasSample = (experimentAccessionCode, sampleAccessionCode) => {
    const data = currentDataset.getData() || {}
    const experiment = data[experimentAccessionCode] || []

    return experiment.includes(sampleAccessionCode)
  }

  const addSample = async (experimentAccessionCode, sampleAccessionCode) => {
    currentDataset.addSample(experimentAccessionCode, sampleAccessionCode)
    const dataset = await currentDataset.save()
    updateCurrentDataset(dataset)
  }

  const removeSample = async (experimentAccessionCode, sampleAccessionCode) => {
    currentDataset.removeSample(experimentAccessionCode, sampleAccessionCode)
    const dataset = await currentDataset.save()
    updateCurrentDataset(dataset)
  }

  // For One-off Experiment Downloads
  const downloadExperiment = async (experimentAccessionCode, options) => {
    const dataset = await api.Dataset(options)
    dataset.addExperiment(experimentAccessionCode)
    dataset.setEmail(email)
    await processDataset(dataset)
    // Stores the newly created dataset id to downloads
    setDownloads((prev) => unionizeArrays(prev, dataset.get('id')))

    return dataset
  }

  const getDownloadOption = (option) => currentDataset.getOption(option)

  const setDownloadOption = (option, value) =>
    currentDataset.setOption(option, value)

  // Create a token if none and start the download process
  const processDataset = async (dataset) => {
    if (!token) {
      const response = await api.token.create({ is_activated: true })
      setToken(response.id)
    }

    dataset.setOption('start', true)
    await dataset.save()

    return dataset
  }

  return {
    currentDatasetId,
    setCurrentDatasetId,
    clearDataset,
    createDataset,
    getDataset,
    getTotalExperiments,
    hasExperiment,
    addExperiment,
    removeExperiment,
    getTotalSamples,
    hasSample,
    addSample,
    removeSample,
    downloadExperiment,
    getDownloadOption,
    setDownloadOption
  }
}
