import { createContext } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const DatasetManagerContext = createContext({})

export const DatasetManagerContextProvider = ({ children }) => {
  // currently selected dataset id
  const [activeDatasetId, setActiveDatasetId] = useLocalStorage(
    'active-dataset-id',
    null
  )

  // a history of user-created dataset ids
  const [datasetIdHistory, setDatasetHistoryId] = useLocalStorage(
    'dataset-id-history',
    []
  )

  // any dataset ids currenly being processed
  const [processingDatasetIds, setProcessingDatasetIds] = useLocalStorage(
    'processing-dataset-ids',
    []
  )

  return (
    <DatasetManagerContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        activeDatasetId,
        setActiveDatasetId,
        datasetIdHistory,
        setDatasetHistoryId,
        processingDatasetIds,
        setProcessingDatasetIds
      }}
    >
      {children}
    </DatasetManagerContext.Provider>
  )
}
