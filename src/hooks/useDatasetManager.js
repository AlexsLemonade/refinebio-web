import { useContext, useEffect, useMemo, useState } from 'react'
import { DatasetManagerContext } from 'contexts/DatasetManagerContext'
import { useRefinebioContext } from 'hooks/useRefinebioContext'
import { useInterval } from 'hooks/useInterval'
import moment from 'moment'
import unionizeArrays from 'helpers/unionizeArrays'
import Refinebio from '@ccdl/refinebio/src'

// TODO: update/improve refinebio-js based on the below implementation
export const useDatasetManager = () => {
  const { email, token, setToken } = useRefinebioContext()
  const api = useMemo(() => Refinebio(), [])
  const {
    activeDatasetId,
    setActiveDatasetId,
    setDatasetHistoryId,
    processingDatasetIds,
    setProcessingDatasetIds
  } = useContext(DatasetManagerContext)

  // stores the latest publicInterface instance
  const [currentDataset, setCurrentDataset] = useState(null)
  // stores the last API response for datasets currently being processed
  const [processingDatasets, setProcessingDatasets] = useState([])

  // refreshes currentDataset on activeDatasetId changes
  useEffect(() => {
    const getNewDataset = async () => {
      const newDataset = await getCurrentDataset()
      setCurrentDataset(newDataset)
    }

    getNewDataset()
  }, [activeDatasetId])

  const updateProcessingDatasets = async () => {
    // don't make api call when no processingDatasetIds
    if (processingDatasetIds.length === 0) return

    const fetchProcessingDataset = async (id) => {
      const dataset = await getDataset(id)

      return dataset
    }

    const datasets = await Promise.all(
      processingDatasetIds.map(fetchProcessingDataset)
    )

    // removes any processed dataset ids from processingDatasetIds AFTER 1 day
    // and filter them out from the API response
    const filteredDatasets = []
    for (const dataset of datasets) {
      if (dataset.is_processed) {
        if (moment.utc().diff(moment(dataset.last_modified, 'days')) < 1) {
          filteredDatasets.push(dataset)
        } else {
          setProcessingDatasetIds((prev) =>
            prev.filter((id) => id !== dataset.id)
          )
        }
      } else {
        filteredDatasets.push(dataset)
      }
    }

    setProcessingDatasets(filteredDatasets)
  }

  // listens for changes in processingDatasets
  // polls the most recent API data every 5 seconds
  // once the process is finished, removes them from processingDatasets
  // regardless of whether there are processingDatasetIds,
  // starts the interval when the component is mounted.
  useInterval(updateProcessingDatasets, 5000)

  /* --- Internal methods --- */
  /* --- Dataset --- */
  // formats each element in the API response's 'experiments' array into
  // an object with the experiment 'accession_code' as its key.
  // only for details=true
  const formatExperiments = (experiments) => {
    if (!experiments.length) return []

    return experiments.reduce(
      (acc, experiment) => ({
        ...acc,
        [experiment.accession_code]: experiment
      }),
      {}
    )
  }

  // creates a new dataset and returns publicInterface
  const createDataset = async (setCurrent = true) => {
    const dataset = await saveDataset(api.Dataset())
    // stores the newly created dataset id to a user's browser
    setDatasetHistoryId(dataset.get('id'))

    if (setCurrent) setActiveDatasetId(dataset.get('id'))

    return dataset
  }

  // fetchs the latest version of the dataset
  const getDataset = async (id, details = false) => {
    let dataset
    const { isOk, response } = await api.dataset.get(id, details)

    if (isOk) {
      dataset = api.Dataset(
        details
          ? {
              ...response,
              experiments: formatExperiments(response.experiments)
            }
          : response
      )

      return dataset
    }
    // TEMPORARY Returns the empty dataset on error
    dataset = await createDataset()

    return dataset
  }

  // returns the latest version of the dataset
  // or create a new one
  const getCurrentDataset = async () => {
    let dataset

    if (!activeDatasetId) {
      dataset = await createDataset()

      return dataset
    }

    dataset = await getDataset(activeDatasetId, true)

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

  // updates currentDataset with a newly created reference
  const updateCurrentDataset = (newDataset) =>
    setCurrentDataset({ ...newDataset })

  /* Common methods for UI */
  /* --- Dataset --- */

  // checks whether any data has been added to My Dataset
  const hasData = (dataset) => Object.keys(dataset).length > 0

  // empty the data object in currently selected dataset
  const removeAllDataset = async () => {
    const dataset = await currentDataset.emptyData()
    await dataset.save()
    updateCurrentDataset(dataset)

    return dataset
  }

  /* --- Experiment --- */
  // returns the lastest state of the dataset being processed by experimentAccessionCode
  // for one-off download
  const getProcessingExperimentDataset = (experimentAccessionCode) => {
    // filter out the dataset that has more than one experiments
    // and has no experimentAccessionCode
    const experimentDataset = processingDatasets.filter(
      (dataset) =>
        Object.keys(dataset.data).length === 1 &&
        experimentAccessionCode in dataset.data
    )

    return experimentDataset
  }

  const getTotalExperiments = () =>
    Object.keys(currentDataset.getData() || {}).length

  const hasExperiment = (experimentAccessionCode) =>
    Object.keys(currentDataset.getData()).includes(experimentAccessionCode)

  const addExperiment = async (experimentAccessionCode) => {
    if (!activeDatasetId) {
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

  /* --- Sample --- */
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

  /* --- One-off Experiment Downloads --- */
  const downloadExperiment = async (experimentAccessionCode, options) => {
    const dataset = await api.Dataset(options)
    dataset.addExperiment(experimentAccessionCode)
    dataset.setEmail(email)
    await processDataset(dataset)
    // add the dataset id to processingDatasetIds
    setProcessingDatasetIds((prev) => [...prev, dataset.get('id')])

    return dataset
  }

  const getDownloadOption = (option) => currentDataset.getOption(option)

  const setDownloadOption = (option, value) =>
    currentDataset.setOption(option, value)

  // creates a token if none and start the download process
  const processDataset = async (dataset) => {
    if (!token) {
      const response = await api.token.create({ is_activated: true })
      setToken(response.id)
    }

    dataset.setOption('start', true)
    await dataset.save()

    return dataset
  }

  /* --- Others --- */
  // formats sample_metadata names for UI (e.g., 'specimen_part' to 'Specimen part')
  // eslint-disable-next-line no-unused-vars
  const formatSampleMetadata = (sampleMtadata) => {}

  // returns the file count estimates of given dataset and its aggregate_by value (either 'EXPERIMENT' or 'SPECIES')
  // (for Download/DownloadFileSummary)
  // eslint-disable-next-line no-unused-vars
  const getDownloadFileCount = (dataset, samplesBySpecies, aggregateBy) => {}

  return {
    hasData,
    removeAllDataset,
    getProcessingExperimentDataset,
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
    setDownloadOption,
    formatSampleMetadata,
    getDownloadFileCount
  }
}
