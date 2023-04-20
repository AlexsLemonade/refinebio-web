import { createContext } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const DatasetManagerContext = createContext({})

export const DatasetManagerContextProvider = ({ children }) => {
  const [datasetId, setDatasetId] = useLocalStorage('refinebio-datasetId', null)

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DatasetManagerContext.Provider value={{ datasetId, setDatasetId }}>
      {children}
    </DatasetManagerContext.Provider>
  )
}
