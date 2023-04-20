import { createContext, useMemo } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { DatasetManagerContextProvider } from 'contexts/DatasetManagerContext'

export const RefinebioContext = createContext({})

export const RefinebioContextProvider = ({ children }) => {
  const [datasetId, setDatasetId] = useLocalStorage('refinebio-datasetId', null)
  const [email, setEmail] = useLocalStorage('refinebio-user-email', null)
  const [token, setToken] = useLocalStorage('refinebio-api-token', null)

  const value = useMemo(
    () => ({ datasetId, setDatasetId, email, setEmail, token, setToken }),
    [datasetId, setDatasetId, email, setEmail, token, setToken]
  )

  return (
    <RefinebioContext.Provider value={value}>
      <DatasetManagerContextProvider>{children}</DatasetManagerContextProvider>
    </RefinebioContext.Provider>
  )
}
