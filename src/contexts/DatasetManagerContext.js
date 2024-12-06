import { createContext, useMemo } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'

export const DatasetManagerContext = createContext({})

export const DatasetManagerContextProvider = ({ children }) => {
  const {
    dataset,
    setDataset,
    datasetAccessions,
    setDatasetAccessions,
    datasetId,
    setDatasetId,
    email,
    setEmail,
    processingDatasets,
    setProcessingDatasets,
    token
  } = useRefinebio()

  const value = useMemo(
    () => ({
      dataset,
      setDataset,
      datasetAccessions,
      setDatasetAccessions,
      datasetId,
      setDatasetId,
      email,
      setEmail,
      processingDatasets,
      setProcessingDatasets,
      token
    }),
    [
      dataset,
      setDataset,
      datasetAccessions,
      setDatasetAccessions,
      datasetId,
      setDatasetId,
      email,
      setEmail,
      processingDatasets,
      setProcessingDatasets,
      token
    ]
  )

  return (
    <DatasetManagerContext.Provider value={value}>
      {children}
    </DatasetManagerContext.Provider>
  )
}
