// TEMPORARY
// NOTE: incoporates the refinbio API client to manage the dataset
import { createContext, useMemo } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { unionizeArrays } from 'helpers/unionizeArrays'
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
  const getDataset = () => {
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
    const response = mock[0].getDatasetResonse

    setDataset(response.data)

    return response
  }

  // updates the dataset with the specified dataset ID
  const updateDataset = (datasetSlice) => {
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
    const response = mock[0].updateDatasetResponse

    setDataset(response.data)

    return result
  }

  // deletes the dataset with the specified dataset ID
  const deleteDataset = () => {
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
      createDataset,
      getDataset,
      updateDataset,
      deleteDataset
    }),
    [dataset, createDataset, getDataset, updateDataset, deleteDataset]
  )

  return (
    <DatasetContext.Provider value={value}>{children}</DatasetContext.Provider>
  )
}
