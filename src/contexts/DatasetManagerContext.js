import { createContext } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const DatasetManagerContext = createContext({})

export const DatasetManagerContextProvider = ({ children }) => {
  const [currentDatasetId, setCurrentDatasetId] = useLocalStorage(
    'refinebio-currentDatasetId',
    null
  )

  return (
    <DatasetManagerContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ currentDatasetId, setCurrentDatasetId }}
    >
      {children}
    </DatasetManagerContext.Provider>
  )
}
