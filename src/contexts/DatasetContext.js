// TEMPORARY
// NOTE: incoporates the refinbio API client to manage the dataset
import { createContext, useMemo } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { formatExperiments } from 'helpers/dataset'
import getDifferenceOfArrays from 'helpers/getDifferenceOfArrays'
import unionizeArrays from 'helpers/unionizeArrays'
import mock from 'api/mockDataDataset'

export const DatasetContext = createContext({})

export const DatasetContextProvider = ({ children }) => {
  const { token, email } = useRefinebio()
  const [dataset, setDataset] = useLocalStorage('refinebio-dataset', null) // TEMPORARY
  const [datasetId, setDatasetId] = useLocalStorage('refinebio-datasetId', null)

  // Necessary methods:
  // creates a new dataset and generate its dataset ID
  const createDataset = () => {
    const body = { data: {} }

    if (email) {
      body.email_address = email
    }
    // endpoint: POST v1/dataset/
    // e.g. ('/v1/dataset/', body)
    const response = mock[0].createDatasetResponse

    setDatasetId(response.id)

    return response
  }

  // fetches the dataset with the specified dataset ID
  // the query 'details' https://github.com/AlexsLemonade/refinebio-frontend/pull/485
  // eslint-disable-next-line no-unused-vars
  const getDataset = (details = true) => {
    if (!dataset) return null // TEMPORARY
    // TEMPORARY details set to true for mockData
    if (!datasetId) {
      createDataset()
    }
    // eslint-disable-next-line no-unused-vars
    const headers = token
      ? {
          'API-KEY': token
        }
      : {}

    // endpoint: GET v1/dataset/${datasetId}
    // if any params, append to a url, and pass the headers as fetch options
    // e.g., (v1/dataset/${datasetId}, params, headers)
    const response = { ...dataset }

    setDataset({
      ...response,
      experiments: formatExperiments(response.experiments)
    })

    return response
  }

  // updates the dataset with the specified dataset ID
  // TEMPORARY takes 'experimentAccessionCode' for UI testing
  const updateDataset = (datasetSlice, experimentAccessionCode) => {
    if (!datasetId) {
      createDataset()
    }

    const result = { ...dataset }

    for (const accessionCode of Object.keys(datasetSlice)) {
      if (datasetSlice[accessionCode].all) {
        // the special key to add all samples from an experiment
        // https://github.com/AlexsLemonade/refinebio-frontend/issues/496#issuecomment-456543865
        result[accessionCode] = ['ALL']
      } else {
        result[accessionCode] = unionizeArrays(
          result[accessionCode] || [],
          datasetSlice[accessionCode]
        )
      }
    }
    // endpoint: PUT v1/dataset/${datasetId}
    // e.g., (v1/dataset/${datasetId}, body)
    // TEMPORARY for UI testing
    // dataset will be updated via API call
    const response =
      experimentAccessionCode === 'GSE116436'
        ? mock[0].getDatasetResonse
        : mock[0].getDatasetResonse_hasRnaSeqExperiments

    setDataset(response)

    return result
  }

  // TEMPORARY
  // remove selected experiment from the dataset
  const removeExperiment = (experimentAccessionCode) => {
    const data = {}

    for (const experiment in dataset.data) {
      if (experimentAccessionCode.includes(experiment)) continue
      data[experiment] = dataset.data[experiment]
    }

    // TEMPORARY for UI testing
    // dataset will be updated via API call
    setDataset((prev) => ({
      ...prev,
      organism_samples: {
        MUS_MUSCULUS: dataset.organism_samples.MUS_MUSCULUS
      },
      experiments: {
        SRP066613: dataset.experiments.SRP066613
      },
      data
    }))
  }

  // TEMPORARY
  // takes an array of experiment objects and adds to users dataset via endpoint
  // endpoint: PUT v1/dataset/${datasetId}
  // eslint-disable-next-line no-unused-vars
  const addSamples = (datasetSlice) => {
    return ''
  }

  // TEMPORARY
  // replace the entire dataset with passed dataset
  // endpoint: PUT v1/dataset/${datasetId}
  // eslint-disable-next-line no-unused-vars
  const replaceSamples = (newDataset) => {
    return ''
  }

  // remove selected sample(s) from the dataset
  const removeSamples = (datasetSlice) => {
    const data = { ...dataset.data }
    const experiments = { ...dataset.experiments }

    for (const accessionCode of Object.keys(datasetSlice)) {
      if (!data[accessionCode] || !experiments[accessionCode]) continue

      const samplesStillSelected = getDifferenceOfArrays(
        data[accessionCode],
        datasetSlice[accessionCode]
      )

      if (samplesStillSelected.length > 0) {
        // TEMPORARY for UI testing
        // dataset will be updated via API call
        setDataset((prev) => ({
          ...prev,
          organism_samples: {
            MUS_MUSCULUS: dataset.organism_samples.MUS_MUSCULUS
          },
          experiments: { [accessionCode]: experiments[accessionCode] },
          data: { [accessionCode]: samplesStillSelected }
        }))
      } else {
        setDataset((prev) => ({ ...prev, data: {} }))
      }
    }
  }

  // deletes the dataset with the specified dataset ID
  const removeAllDataset = () => {
    // eslint-disable-next-line no-unused-vars
    const body = { data: {} }
    // endpoint: PUT v1/dataset/${datasetId}
    // e.g., (v1/dataset/${datasetId}, body)
    const response = mock[0].removeDatasetResponse

    setDataset(null)

    return response
  }

  const value = useMemo(
    () => ({
      dataset,
      datasetId,
      addSamples,
      createDataset,
      removeAllDataset,
      getDataset,
      removeExperiment,
      removeSamples,
      replaceSamples,
      updateDataset
    }),
    [
      dataset,
      datasetId,
      addSamples,
      createDataset,
      removeAllDataset,
      getDataset,
      removeExperiment,
      removeSamples,
      replaceSamples,
      updateDataset
    ]
  )

  return (
    <DatasetContext.Provider value={value}>{children}</DatasetContext.Provider>
  )
}
