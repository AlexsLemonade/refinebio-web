import { createContext, useMemo } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'

export const DatasetManagerContext = createContext({})

export const DatasetManagerContextProvider = ({ children }) => {
  const {
    myDataset,
    setMyDataset,
    datasetAccessions,
    setDatasetAccessions,
    myDatasetId,
    setMyDatasetId,
    email,
    setEmail,
    processingDatasets,
    setProcessingDatasets
  } = useRefinebio()

  const value = useMemo(
    () => ({
      myDataset,
      setMyDataset,
      datasetAccessions,
      setDatasetAccessions,
      myDatasetId,
      setMyDatasetId,
      email,
      setEmail,
      processingDatasets,
      setProcessingDatasets
    }),
    [
      myDataset,
      setMyDataset,
      datasetAccessions,
      setDatasetAccessions,
      myDatasetId,
      setMyDatasetId,
      email,
      setEmail,
      processingDatasets,
      setProcessingDatasets
    ]
  )

  return (
    <DatasetManagerContext.Provider value={value}>
      {children}
    </DatasetManagerContext.Provider>
  )
}
