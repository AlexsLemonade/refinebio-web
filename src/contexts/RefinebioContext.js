import { createContext, useMemo } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const RefinebioContext = createContext({})

export const RefinebioContextProvider = ({ children }) => {
  const [dataset, setDataset] = useLocalStorage('dataset', {})
  const [datasetId, setDatasetId] = useLocalStorage('datasetId', null)
  const [email, setEmail] = useLocalStorage('user-email', null)
  const [token, setToken] = useLocalStorage('token', null)

  const value = useMemo(
    () => ({
      dataset,
      setDataset,
      datasetId,
      setDatasetId,
      email,
      setEmail,
      token,
      setToken
    }),
    [
      dataset,
      setDataset,
      datasetId,
      setDatasetId,
      email,
      setEmail,
      token,
      setToken
    ]
  )

  return (
    <RefinebioContext.Provider value={value}>
      {children}
    </RefinebioContext.Provider>
  )
}
