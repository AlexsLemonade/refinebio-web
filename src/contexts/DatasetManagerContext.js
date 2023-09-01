// TEMPORARY
// NOTE: incoporates the refinbio API client to manage the dataset
import { createContext, useMemo } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'

export const DatasetManagerContext = createContext({})

export const DatasetManagerContextProvider = ({ children }) => {
  // import the necessary states from RefinebioContext
  const {
    dataset: datasetState,
    setDataset: setDatasetState,
    datasetId: datasetIdState,
    setDatasetId: setDatasetIdState,
    email: emailState,
    token: tokenState
  } = useRefinebio()

  const dataset = datasetState
  const setDataset = setDatasetState
  const datasetId = datasetIdState
  const setDatasetId = setDatasetIdState
  const email = emailState
  const token = tokenState

  const value = useMemo(
    () => ({
      dataset,
      setDataset,
      datasetId,
      setDatasetId,
      email,
      token
    }),
    [dataset, setDataset, datasetId, setDatasetId, email, token]
  )

  return (
    <DatasetManagerContext.Provider value={value}>
      {children}
    </DatasetManagerContext.Provider>
  )
}
