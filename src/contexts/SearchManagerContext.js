import { createContext, useMemo, useState } from 'react'

export const SearchManagerContext = createContext({})

export const SearchManagerContextProvider = ({ children }) => {
  const [config, setConfig] = useState({})
  const [search, setSearch] = useState({})
  const [filterOrders, setFilterOrders] = useState([])

  const value = useMemo(
    () => ({
      config,
      setConfig,
      filterOrders,
      setFilterOrders,
      search,
      setSearch
    }),
    [config, setConfig, filterOrders, setFilterOrders, search, setSearch]
  )

  return (
    <SearchManagerContext.Provider value={value}>
      {children}
    </SearchManagerContext.Provider>
  )
}
