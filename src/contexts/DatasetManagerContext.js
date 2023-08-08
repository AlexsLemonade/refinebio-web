// TEMPORARY
// NOTE: incoporates the refinbio API client to manage the dataset
import { createContext, useMemo } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const DatasetManagerContext = createContext({})

export const DatasetManagerContextProvider = ({ children }) => {
  const [dataset, setDataset] = useLocalStorage('dataset', null) // TEMPORARY
  const [datasetId, setDatasetId] = useLocalStorage('datasetId', null)

  const value = useMemo(
    () => ({
      dataset,
      setDataset,
      datasetId,
      setDatasetId
    }),
    [dataset, setDataset, datasetId, setDatasetId]
  )

  return (
    <DatasetManagerContext.Provider value={value}>
      {children}
    </DatasetManagerContext.Provider>
  )
}
